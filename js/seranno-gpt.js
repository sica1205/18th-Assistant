// ===== SeraNNo-GPT — local support chat (fără API extern) =====
const seraGptBody = document.getElementById('chatBody');
const seraGptForm = document.getElementById('chatForm');
const seraGptInput = document.getElementById('chatInput');
const seraGptClearBtn = document.getElementById('chatClearBtn');

// ===== Catalog Counter =====
const seraGptCatalogCount = document.getElementById('chatCatalogCount');

if (seraGptCatalogCount) {
    seraGptCatalogCount.textContent = SERA_GPT_CATALOG.length;
}

// Sunetul de "mesaj primit" — același pop.ogg folosit și la click pe avatare
const seraGptPop = new Audio('audio/pop.ogg');
seraGptPop.volume = 0.5;
seraGptPop.preload = 'auto';

function seraGptPlayPop() {
    // Repornim de la început ca fiecare mesaj să aibă pop-ul lui
    seraGptPop.currentTime = 0;
    seraGptPop.play().catch(function () {
        // Autoplay blocat / eșec audio — ignorăm
    });
}

// ===== Status indicator (Online / Idle / Offline) =====
let seraGptIdleTimer = null;
let seraGptOfflineTimer = null;

function seraGptSetStatus(state) {
    const dot = document.getElementById('chatStatusDot');
    const text = document.getElementById('chatStatusText');
    if (!dot || !text) return;

    dot.classList.toggle('idle', state === 'idle');
    dot.classList.toggle('offline', state === 'offline');
    text.textContent = SERA_GPT_STATUS_TEXT[state] || SERA_GPT_STATUS_TEXT.online;
}

// Cronologie: Online -> (2 minute fără activitate) Idle -> (încă 8 minute) Offline
// Orice activitate (botul trimite, userul scrie) repornește cronologia.
function seraGptResetStatus() {
    clearTimeout(seraGptIdleTimer);
    clearTimeout(seraGptOfflineTimer);

    seraGptSetStatus('online');

    seraGptIdleTimer = setTimeout(function () {
        seraGptSetStatus('idle');

        seraGptOfflineTimer = setTimeout(function () {
            seraGptSetStatus('offline');
        }, SERA_GPT_OFFLINE_AFTER);
    }, SERA_GPT_IDLE_AFTER);
}

let seraGptTyping = false;
let seraGptChatReady = false;

// ===== Matching v2: conservator, fără API și fără răspunsuri inventate =====
const SERA_STOP = new Set('cum pot sa de la in pe cu si sau un o ce care este sunt vreau fac faci face facem am ai are pentru despre unde cat cate mai imi mi te se eu tu rog va stiu afla obtin obtine obtii obtinem rost puncte punctele'.split(' '));
const SERA_ALIASES = {
    'rp': 'racepoints', 'racepoint': 'racepoints', 'racepoints': 'racepoints',
    'race': 'race', 'races': 'race', 'curse': 'curse', 'cursa': 'curse', 'curselor': 'curse',
    'puncte': 'puncte', 'punctele': 'puncte', 'punct': 'puncte'
};
function seraGptNormalize(text) {
    return String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function seraGptWords(s) { return seraGptNormalize(s).split(' ').filter(Boolean); }
function seraGptCanonical(w) { return SERA_ALIASES[w] || w; }
function seraGptDistance(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 3;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
        const curr = [i];
        for (let j = 1; j <= b.length; j++) curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = curr;
    }
    return prev[b.length];
}
function seraGptTokenMatch(a, b) {
    a = seraGptCanonical(a); b = seraGptCanonical(b);
    if (a === b) return 1;
    if (a.length >= 5 && b.length >= 5 && (a.startsWith(b) || b.startsWith(a)) && Math.abs(a.length - b.length) <= 3) return .88;
    if (a.length >= 5 && b.length >= 5 && seraGptDistance(a, b) <= 1) return .78;
    return 0;
}
function seraGptConcepts(s) {
    const words = seraGptWords(s);
    // "race points" și "racepoints" reprezintă aceeași expresie.
    const result = [];
    for (let i = 0; i < words.length; i++) {
        if ((words[i] === 'race' || words[i] === 'rac') && words[i + 1] === 'points') { result.push('racepoints'); i++; }
        else result.push(seraGptCanonical(words[i]));
    }
    return result.filter(w => !SERA_STOP.has(w));
}
// ===== Scoruri: fiecare concept se numără o singură dată =====
// Un match exact de frază are prioritate. Pentru restul, evaluăm acoperirea
// întrebării și a expresiei, fără să punctăm de două ori același cuvânt.
function seraGptOverlap(queryTokens, candidateTokens) {
    const used = new Set();
    let hits = 0;
    let quality = 0;
    for (const token of candidateTokens) {
        let bestIndex = -1;
        let bestScore = 0;
        for (let i = 0; i < queryTokens.length; i++) {
            if (used.has(i)) continue;
            const score = seraGptTokenMatch(queryTokens[i], token);
            if (score > bestScore) { bestScore = score; bestIndex = i; }
        }
        if (bestIndex !== -1 && bestScore >= SERA_GPT_TOKEN_MATCH_MIN) {
            used.add(bestIndex);
            hits++;
            quality += bestScore;
        }
    }
    return { hits, quality };
}
function seraGptScore(normQuery, entry) {
    const q = [...new Set(seraGptConcepts(normQuery))];
    if (!q.length) return 0;
    const phrases = (entry.phrases || []).concat([entry.title || '']);
    let best = 0;
    for (const phrase of phrases) {
        if (seraGptNormalize(phrase) === normQuery) return 100;
        const p = [...new Set(seraGptConcepts(phrase))];
        if (!p.length) continue;
        const { hits, quality } = seraGptOverlap(q, p);
        const coverage = hits / p.length;
        const precision = hits / q.length;
        if (hits && coverage >= SERA_GPT_PHRASE_MIN_COVERAGE && precision >= SERA_GPT_PHRASE_MIN_PRECISION) {
            const score = Math.round((SERA_GPT_PHRASE_COVERAGE_WEIGHT * coverage +
                SERA_GPT_PHRASE_PRECISION_WEIGHT * precision) * quality / hits);
            best = Math.max(best, score);
        }
    }
    const keywords = [...new Set((entry.keywords || []).flatMap(seraGptConcepts))];
    if (keywords.length) {
        const { hits, quality } = seraGptOverlap(q, keywords);
        if (hits) {
            const precision = hits / q.length;
            const kwScore = (hits >= 2 ? SERA_GPT_KEYWORD_MULTI_BASE : SERA_GPT_KEYWORD_SINGLE_BASE) +
                Math.round(SERA_GPT_KEYWORD_PRECISION_WEIGHT * precision * quality / hits);
            best = Math.max(best, kwScore);
            if (q.length === 1 && hits === 1 && keywords.length === 1 &&
                seraGptTokenMatch(q[0], keywords[0]) === 1) {
                best = Math.max(best, SERA_GPT_SINGLE_KEYWORD_EXACT_SCORE);
            }
        }
    }
    return Math.min(100, best);
}
function seraGptFindMatches(normQuery) {
    return SERA_GPT_CATALOG.map(entry => ({ entry, score: seraGptScore(normQuery, entry) }))
        .filter(m => m.score >= SERA_GPT_MATCH_MIN)
        .sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id));
}
// Small-talk: expresie exactă sau expresie completă la început, cu adaosuri
// scurte (ex. "salut bossule"). Nu tratăm "salut, cum dau rob" ca salut.
function seraGptMatchIntent(normQuery) {
    const qWords = seraGptWords(normQuery);
    for (const intent of SERA_GPT_INTENTS) {
        for (const rawPhrase of (intent.phrases || [])) {
            const phrase = seraGptNormalize(rawPhrase);
            if (phrase === normQuery) return intent;
            const words = seraGptWords(phrase);
            if (!words.length || qWords.length <= words.length ||
                qWords.length > words.length + SERA_GPT_INTENT_MAX_EXTRA_WORDS) continue;
            if (!words.every((w, i) => qWords[i] === w)) continue;
            const extras = qWords.slice(words.length);
            if (extras.every(w => SERA_GPT_INTENT_FILLER_WORDS.includes(w))) return intent;
        }
    }
    return null;
}
function seraGptRandom(list) { return list[Math.floor(Math.random() * list.length)]; }
// Reducem repetițiile exagerate doar pentru filtrul de limbaj, nu pentru
// matching-ul informațional. Păstrăm granițele de cuvinte pentru a evita
// false-positive în cuvinte nevinovate.
function seraGptLanguageTokens(normQuery) {
    return normQuery.split(' ').filter(Boolean).map(w => w.replace(/(.)\1{2,}/g, '$1$1'));
}
function seraGptMatchLanguage(normQuery) {
    const tokens = seraGptLanguageTokens(normQuery);
    const padded = ' ' + tokens.join(' ') + ' ';
    return SERA_GPT_BAD_WORDS.some(raw => {
        const word = seraGptNormalize(raw);
        return word && padded.includes(' ' + word + ' ');
    });
}
function seraGptLooksLikeSpam(normQuery) {
    const words = normQuery.split(' ').filter(Boolean);
    return words.some(function (word) {
        if (/^(.)\1{11,}$/.test(word) || /^(.{2,5})\1{3,}$/.test(word)) return true;
        if (word.length < SERA_GPT_SPAM_MIN_LENGTH || !/^[a-z]+$/.test(word)) return false;
        const vowels = (word.match(/[aeiou]/g) || []).length;
        const ratio = vowels / word.length;
        const longestConsonants = Math.max(0, ...(word.match(/[bcdfghjklmnpqrstvwxyz]+/g) || []).map(x => x.length));
        return (word.length >= SERA_GPT_SPAM_STRICT_LENGTH &&
            ratio < SERA_GPT_SPAM_MAX_VOWEL_RATIO &&
            longestConsonants >= SERA_GPT_SPAM_MIN_CONSONANT_RUN) ||
            (word.length >= SERA_GPT_SPAM_EXTREME_LENGTH &&
                ratio < SERA_GPT_SPAM_EXTREME_VOWEL_RATIO);
    });
}
function seraGptRespond(rawText) {
    const q = seraGptNormalize(rawText);
    if (!q) return { type: 'unknown' };
    if (seraGptLooksLikeSpam(q)) return { type: 'spam' };
    const matches = seraGptFindMatches(q);
    const top = matches[0];
    // O întrebare cu informație reală are prioritate față de limbajul colocvial.
    if (top && top.score >= SERA_GPT_ANSWER_MIN && (!matches[1] || top.score - matches[1].score >= SERA_GPT_ANSWER_MARGIN)) {
        return { type: 'answer', text: top.entry.answer, entryId: top.entry.id };
    }
    if (top && top.score >= SERA_GPT_MATCH_MIN) {
        return { type: 'suggest', entries: matches.slice(0, SERA_GPT_MAX_SUGGESTIONS).map(m => m.entry) };
    }
    const intent = seraGptMatchIntent(q);
    if (intent) return { type: 'answer', text: seraGptRandom(intent.replies) };
    if (seraGptMatchLanguage(q)) return { type: 'language' };
    return { type: 'unknown' };
}

// ===== Chat UI =====

function seraGptEl(tag, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
}

function seraGptScrollBottom() {
    seraGptBody.scrollTop = seraGptBody.scrollHeight;
}

function seraGptAppendRow(side) {
    const row = seraGptEl('div', 'chat-msg ' + side);
    seraGptBody.appendChild(row);
    return row;
}

function seraGptAppendUser(text) {
    const row = seraGptAppendRow('user');
    const bubble = seraGptEl('div', 'chat-bubble');
    bubble.textContent = text; // textContent = safe, fără HTML din input
    row.appendChild(bubble);
    seraGptLog.push({ role: 'user', text: text });
    seraGptSaveChat();
    seraGptScrollBottom();
    return row;
}


const SERA_GPT_VIEWS = {
    tickets: 'showTickets',
    coffers: 'showCoffers',
    pets: 'showPets',
    stunts: 'showStunts',
    modpacks: 'showModpacks',
    fixes: 'showFixes'
};

function seraGptAppendNavigationButton(bubble, entryId) {
    if (!entryId) return;

    const entry = seraGptFindEntryById(entryId);
    if (!entry || !entry.button) return;

    const button = entry.button;
    const functionName = SERA_GPT_VIEWS[button.view];

    if (!functionName || typeof window[functionName] !== 'function') return;

    const topics = seraGptEl('div', 'chat-topics');
    const btn = seraGptEl('button', 'chat-topic');

    btn.type = 'button';
    btn.textContent = button.text;
    btn.addEventListener('click', function () {
        window[functionName]();
    });

    topics.appendChild(btn);
    bubble.appendChild(topics);
}



function seraGptAppendBot(text, entryId = null) {
    const row = seraGptAppendRow('bot');
    const bubble = seraGptEl('div', 'chat-bubble');

    bubble.textContent = text;

    seraGptAppendNavigationButton(bubble, entryId);

    row.appendChild(bubble);

    const message = { role: 'bot', text: text };
    if (entryId) message.entryId = entryId;

    seraGptLog.push(message);
    seraGptSaveChat();
    seraGptScrollBottom();

    return row;
}


// Indicatorul "SeraNNo-GPT scrie..."
function seraGptShowTyping() {
    const row = seraGptAppendRow('bot');
    const bubble = seraGptEl('div', 'chat-bubble chat-typing');
    for (let i = 0; i < 3; i++) {
        bubble.appendChild(seraGptEl('span'));
    }
    row.appendChild(bubble);
    seraGptScrollBottom();
    return row;
}

// Botul "scrie" puțin, apoi trimite răspunsul
function seraGptBotSay(result) {
    seraGptTyping = true;

    const typingRow = seraGptShowTyping();
    const delay = SERA_GPT_TYPING_MIN + Math.random() * (SERA_GPT_TYPING_MAX - SERA_GPT_TYPING_MIN);

    setTimeout(function () {
        typingRow.remove();
        seraGptTyping = false;

        if (result.type === 'suggest') {
            seraGptAppendSuggestion(result.entries);
        } else if (result.type === 'answer') {
            seraGptAppendBot(result.text, result.entryId);
        } else if (result.type === 'spam') {
            seraGptAppendBot(seraGptRandom(SERA_GPT_SPAM_REPLIES));
        } else if (result.type === 'language') {
            seraGptAppendBot(seraGptRandom(SERA_GPT_LANGUAGE_REPLIES));
        } else {
            // Nicio potrivire în catalog -> un răspuns de "nu știu" din fallbacks
            seraGptAppendBot(seraGptRandom(SERA_GPT_FALLBACKS));
        }

        // Pop-ul se aude când mesajul chiar e trimis, nu la indicatorul de typing
        seraGptPlayPop();

        // Mesaj trimis -> statusul revine Online și repornește cronologia
        seraGptResetStatus();
    }, delay);
}

// Mesajul "Te referi la:" cu butoane clickabile
function seraGptAppendSuggestion(entries) {
    const row = seraGptAppendRow('bot');
    const bubble = seraGptEl('div', 'chat-bubble');
    bubble.appendChild(document.createTextNode('Te referi la:'));

    const topics = seraGptEl('div', 'chat-topics');
    entries.forEach(function (entry) {
        const btn = seraGptEl('button', 'chat-topic');
        btn.type = 'button';
        btn.textContent = entry.title;
        btn.addEventListener('click', function () {
            seraGptPickTopic(bubble, entry);
        });
        topics.appendChild(btn);
    });

    bubble.appendChild(topics);
    row.appendChild(bubble);

    // Se păstrează id-urile intrărilor, nu titlurile (titlurile pot schimba)
    seraGptLog.push({
        role: 'bot',
        suggest: entries.map(function (entry) {
            return entry.id;
        })
    });
    seraGptSaveChat();

    seraGptScrollBottom();
}

// Click pe un topic -> userul "pune" întrebarea, botul răspunde din catalog
function seraGptPickTopic(bubble, entry) {
    if (seraGptTyping) return;

    // Un singur răspuns per listă de butoane
    const buttons = bubble.querySelectorAll('.chat-topic');
    buttons.forEach(function (b) {
        b.disabled = true;
    });

    seraGptAppendUser(entry.title);
    seraGptBotSay({ type: 'answer', text: entry.answer, entryId: entry.id });
}

// ===== Conversație păstrată în localStorage =====
let seraGptLog = [];          // sursa de adevăr a conversației curente
let seraGptPersist = true;    // devine false dacă storage-ul e blocat/plin
let seraGptRestoring = false; // true în timpul redării istoricului (fără rescrieri)

function seraGptSaveChat() {
    if (!seraGptPersist || seraGptRestoring) return;

    try {
        const data = seraGptLog.slice(-SERA_GPT_MAX_STORED_MESSAGES);
        localStorage.setItem(SERA_GPT_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        // Storage indisponibil (mod privat / plin) -> merge doar în sesiune
        seraGptPersist = false;
    }
}

// Acceptăm numai structurile create de acest bot. Datele din localStorage
// pot fi modificate manual; nu le considerăm automat valide.
function seraGptLoadChat() {
    try {
        const raw = localStorage.getItem(SERA_GPT_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.slice(-SERA_GPT_MAX_STORED_MESSAGES).reduce(function (valid, item) {
            if (!item || typeof item !== 'object' || Array.isArray(item)) return valid;
            if ((item.role === 'user' || item.role === 'bot') &&
                typeof item.text === 'string' && item.text.trim()) {

                const message = {
                    role: item.role,
                    text: item.text.slice(0, SERA_GPT_MAX_RESTORED_TEXT_LENGTH)
                };

                if (
                    item.role === 'bot' &&
                    typeof item.entryId === 'string' &&
                    seraGptFindEntryById(item.entryId)
                ) {
                    message.entryId = item.entryId;
                }

                valid.push(message);

            } else if (item.role === 'bot' && Array.isArray(item.suggest)) {
                const ids = [...new Set(item.suggest.filter(id => typeof id === 'string'))]
                    .slice(0, SERA_GPT_MAX_SUGGESTIONS);
                if (ids.length) valid.push({ role: 'bot', suggest: ids });
            }
            return valid;
        }, []);
    } catch (e) {
        return [];
    }
}

function seraGptFindEntryById(id) {
    for (let i = 0; i < SERA_GPT_CATALOG.length; i++) {
        if (SERA_GPT_CATALOG[i].id === id) return SERA_GPT_CATALOG[i];
    }
    return null;
}

// Redă conversația salvată instant și fără sunete.
// Returnează false dacă nu e nimic de restaurat.
function seraGptRestoreChat() {
    const items = seraGptLoadChat();
    if (!items.length) return false;

    seraGptRestoring = true;
    seraGptLog = [];

    items.forEach(function (item) {
        if (!item || typeof item !== 'object') return;

        if (item.role === 'user' && typeof item.text === 'string' && item.text) {
            seraGptAppendUser(item.text);
        } else if (item.role === 'bot' && typeof item.text === 'string' && item.text) {
            seraGptAppendBot(item.text, item.entryId);
        } else if (item.role === 'bot' && Array.isArray(item.suggest)) {
            // Doar id-urile care mai există în catalog; restul se aruncă
            const entries = [];
            item.suggest.forEach(function (id) {
                const entry = seraGptFindEntryById(id);
                if (entry) entries.push(entry);
            });
            if (entries.length) seraGptAppendSuggestion(entries);
        }
    });

    seraGptRestoring = false;
    seraGptSaveChat(); // rescrie doar mesajele valide și id-urile încă existente
    seraGptScrollBottom();

    return seraGptLog.length > 0;
}

// ===== Fluxul principal =====

function seraGptHandleQuestion(rawText) {
    const text = String(rawText || '').trim();
    if (!text || seraGptTyping) return;

    seraGptAppendUser(text);
    seraGptBotSay(seraGptRespond(text));
}

function seraGptGreet() {
    seraGptBotSay({ type: 'answer', text: SERA_GPT_GREETING });
}

function seraGptClearChat() {
    if (seraGptTyping) return;
    seraGptBody.replaceChildren();

    // Șterge din memorie ȘI din localStorage (conversația nu mai revine)
    seraGptLog = [];
    try {
        localStorage.removeItem(SERA_GPT_STORAGE_KEY);
    } catch (e) {
        // ignorăm — storage-ul poate fi oricum blocat
    }

    seraGptGreet();
}

// Deschiderea secțiunii: restaurare din localStorage sau salut nou
function showSeraGPT() {
    showView(seraGptView);

    if (!seraGptChatReady) {
        seraGptChatReady = true;
        // așteaptă tranziția view-ului (300ms), apoi restaurare sau salut
        setTimeout(function () {
            if (!seraGptRestoreChat()) {
                seraGptGreet();
            }
            seraGptResetStatus();
        }, 400);
    } else {
        seraGptScrollBottom();
        seraGptResetStatus();
    }
}

// ===== Evenimente =====
seraGptForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Dacă botul "scrie", păstrează textul scris — îl trimitem la rândul lui
    if (seraGptTyping) return;
    seraGptHandleQuestion(seraGptInput.value);
    seraGptInput.value = '';
});

seraGptClearBtn.addEventListener('click', seraGptClearChat);

// Userul a început să scrie -> botul revine Online imediat
seraGptInput.addEventListener('input', seraGptResetStatus);

