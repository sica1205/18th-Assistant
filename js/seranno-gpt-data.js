// ===== SeraNNo-GPT — Knowledge Catalog =====
//
// Structura unei intrări:
//   id       – identificator unic (folosit și la restaurarea sugestiilor)
//   title    – titlul topicului (apare pe butoanele "Te referi la:")
//   phrases  – formulări uzuale; potrivire exactă sau pe concepte/tokenuri.
//   keywords – termeni reprezentativi; comparați cu toleranță limitată
//              la prefixe și greșeli de o literă (pentru cuvinte lungi).
//   answer   – răspunsul afișat în chat (\n = linie nouă)
//

const SERA_GPT_GREETING = 'Bine ai venit! Pune o întrebare sau introdu un cuvânt-cheie, iar bot-ul va încerca să-ți ofere informația de care ai nevoie.';

// ===== Matching: toate pragurile sunt folosite efectiv de motor =====
const SERA_GPT_MATCH_MIN = 38;           // sub acest scor nu sugerăm topicul
const SERA_GPT_ANSWER_MIN = 68;          // prag pentru răspuns direct
const SERA_GPT_ANSWER_MARGIN = 15;       // diferență minimă față de locul 2
const SERA_GPT_MAX_SUGGESTIONS = 5;      // maxim butoane "Te referi la:"
const SERA_GPT_TOKEN_MATCH_MIN = 0.78;   // similaritate minimă între cuvinte
const SERA_GPT_PHRASE_MIN_COVERAGE = 0.6;
const SERA_GPT_PHRASE_MIN_PRECISION = 0.5;
const SERA_GPT_PHRASE_COVERAGE_WEIGHT = 35;
const SERA_GPT_PHRASE_PRECISION_WEIGHT = 45;
const SERA_GPT_KEYWORD_MULTI_BASE = 42;
const SERA_GPT_KEYWORD_SINGLE_BASE = 20;
const SERA_GPT_KEYWORD_PRECISION_WEIGHT = 28;
const SERA_GPT_SINGLE_KEYWORD_EXACT_SCORE = 92;
const SERA_GPT_INTENT_MAX_EXTRA_WORDS = 2;
const SERA_GPT_INTENT_FILLER_WORDS = ['boss', 'bossule', 'frate', 'vere', 'bro', 'prietene', 'sef', 'sefule', 'ba', 'ma', 'botule'];

const SERA_GPT_TYPING_MIN = 550;         // durata minimă a animației (ms)
const SERA_GPT_TYPING_MAX = 1050;        // durata maximă a animației (ms)

// Small-talk recunoscut înainte de fallback
const SERA_GPT_INTENTS = [
    {
        id: 'greet',
        phrases: ['salut', 'salutare', 'buna', 'buna ziua', 'buna seara', 'hey', 'hi', 'hello', 'ce faci', 'howdy', 'hai noroc', 'noroc', 'noroi'],
        replies: [
            'Salut! Cu ce te pot ajuta?',
            'Noroc! Cu ce te pot ajuta?',
            'Hai bună ziua! Cu ce te pot ajuta?',
        ]
    },
    {
        id: 'thanks',
        phrases: ['multumesc', 'mersi', 'thanks', 'thx', 'appreciez', 'fangs'],
        replies: [
            'Să crești mare!',
            'Mă bucur că te-am putut ajuta!'
        ]
    },
    {
        id: 'identity',
        phrases: [
            'cine esti',
            'ce esti tu',
            'cine te a facut',
            'cine te a programat',
            'esti un bot',
            'cat de destept esti',
            'ce stii sa faci'
        ],
        replies: [
            'Sunt SeraNNo-GPT, un bot asistent dedicat clanului 18th Street Gang. Rolul meu este să ofer rapid informații utile despre joc, fără să fie nevoie să te chinui să găsești ceea ce cauți.',
            'Sunt asistentul virtual al clanului 18th Street Gang. Te pot ajuta cu informații despre joc. Doar pune-mi o întrebare și voi încerca pe cât de mult posibil să te ajut!'
        ]
    }
];

// Răspunsurile pentru "nu am habar" — variate
const SERA_GPT_FALLBACKS = [
    'Din păcate, momentan nu dețin informații despre acest subiect. Încearcă să reformulezi întrebarea.',
    'Nu am găsit informații relevante pentru întrebarea ta. Încearcă să fii mai specific sau să formulezi întrebarea diferit.',
    'Momentan nu îți pot oferi un răspuns la această întrebare, însă baza mea de informații este actualizată periodic.'
];

// ===== Filtru de limbaj =====
const SERA_GPT_BAD_WORDS = [
    'muie',
    'mui',
    'muist',
    'muistule',
    'sclav',
    'sclavule',
    'sclavet',
    'sclavetule',
    'jeg',
    'jegule',
    'jegos',
    'jegosule',
    'sugi',
    'milsugi',
    'suge',
    'mi-l bei',
    'mi-l sugi',
    'mi-l belesti',
    'mi-o sugi',
    'mi-o bei',
    'pula',
    'pule',
    'puli',
    'nigger',
    'niggers',
    'nigga',
    'niggas',
    'fut',
    'futa',
    'futi',
    'fute',
    'prost',
    'prostule',
    'retard',
    'retardat',
    'retardule',
    'retardatule',
    'ratat',
    'ratatule',
    'cretin',
    'cretinule',
    'idiot',
    'idiotule',
    'pizda',
    'pizde',
    'pripas',
    'pripasule',
];

// Răspunsurile botului când userul folosește cuvinte din listă
const SERA_GPT_LANGUAGE_REPLIES = [
    'Băi puștiule!!!',
    'Dacă întrebi ceva Fară să înjuri, te pot ajuta.',
    'Încearcă din nou, mai elegant dacă se poate.',
    'Să te duci acolo unde a dus mutul iapa.',
    'Băi mânca-mi-ai..',
    'Cântă la altă masă.',
    'De ce ești prost?'
];

// ===== Filtru de spam =====
// Dacă mesajul arată a pulă bătută peste tastatură (ex: asdkjbasdhjasdbasjhdasvbdahs),
// botul nu se mai chinuie să caute în catalog.
const SERA_GPT_SPAM_MIN_LENGTH = 14;        // lungimea minimă a unui cuvânt suspect
const SERA_GPT_SPAM_MAX_VOWEL_RATIO = 0.32; // prag pentru cuvinte lungi suspecte
const SERA_GPT_SPAM_MIN_CONSONANT_RUN = 6;
const SERA_GPT_SPAM_STRICT_LENGTH = 18;
const SERA_GPT_SPAM_EXTREME_LENGTH = 24;
const SERA_GPT_SPAM_EXTREME_VOWEL_RATIO = 0.25;

const SERA_GPT_SPAM_REPLIES = [
    'Băi pustiule, ce tot spamezi atât?',
    'Am înțeles că ai taste și le-ai descoperit, bravo ție.',
    'Asta pare scris cu p*la. Ce vrei să zici mai exact?',
    'Ai dat în căcat cu mâna? Sau de ce scrii așa?',
    'Ești bine vere?'
];

// ===== Status indicator (Online / Idle / Offline) =====
const SERA_GPT_IDLE_AFTER = 1 * 60 * 1000;     //
const SERA_GPT_OFFLINE_AFTER = 1 * 60 * 1000;  // 

const SERA_GPT_STATUS_TEXT = {
    online: 'Online',
    idle: 'Idle...',
    offline: 'Offline'
};

// ===== Conversație păstrată în localStorage =====
const SERA_GPT_STORAGE_KEY = '18th-sera-chat';
const SERA_GPT_MAX_STORED_MESSAGES = 100; // se păstrează doar ultimele N mesaje
const SERA_GPT_MAX_RESTORED_TEXT_LENGTH = 4000; // protecție la istorice modificate

// ===== Catalogul propriu-zis ====================================================================================================
//=================================================================================================================================
//=================================================================================================================================
//=================================================================================================================================
const SERA_GPT_CATALOG = [
    //===================================== INTREBARI PENTRU QUESTURILE SPECIALE =======================================================
    //=================================================================================================================================

    {
        id: 'cihlimbar',
        title: 'De unde poți obține Cihlimbar?',
        phrases: [
            'de unde poti face rost de cihlimbar',
            'cum obtin cihlimbar',
            'cum fac cihlimbar',
            'de unde iau cihlimbar',
            'unde gasesc cihlimbar',
            'cum castig cihlimbar',
            'din ce activitati primesc cihlimbar',
            'cum se farmeaza cihlimbar',
            'unde pot farma cihlimbar',
            'ce trebuie sa fac pentru cihlimbar'
        ],
        keywords: [
            'cihlimbar',
            'cihlimbar farm',
            'obtin cihlimbar'
        ],
        answer: 'Cihlimbarul se poate obține din următoarele activități: Zacusca Bunicii, Bijuterii printre Frunze, Vinul Toamnei, Operațiunea Monstrul, Marea Migrație, Time Trials, Blood & Gold, Repo Work, Drift Zone, Rob-uri.'
    },

    {
        id: 'sezon-toamna',
        title: 'Ce este Sezonul de Toamnă?',
        phrases: [
            'ce este sezonul de toamna',
            'ce inseamna sezonul de toamna',
            'ce e sezonul de toamna',
            'ce reprezinta sezonul de toamna',
            'ce poti face in sezonul de toamna',
            'ce activitati sunt in sezonul de toamna',
            'ce activitati are sezonul de toamna',
            'din ce este compus sezonul de toamna',
            'ce contine sezonul de toamna',
            'cum functioneaza sezonul de toamna',
            'ce este eventul de toamna',
            'ce activitati sunt la eventul de toamna'
        ],
        keywords: [
            'sezonul de toamna',
            'sezon toamna',
            'event toamna',
            'activitati toamna'
        ],
        answer: 'Sezonul de Toamnă este un eveniment compus din mai multe activități pe care le poți desfășura pe server. Acestea sunt: Zacusca Bunicii, Bijuterii printre Frunze, Vinul Toamnei, Operațiunea Monstrul, Marea Migrație și Time Trials.'
    },

    {
        id: 'zacusca-bunicii',
        title: 'Ce este Zacusca Bunicii și cum se face?',
        phrases: [
            'ce este zacusca bunicii',
            'ce e zacusca bunicii',
            'cum fac zacusca bunicii',
            'cum se face zacusca bunicii',
            'cum functioneaza zacusca bunicii',
            'ce trebuie sa fac la zacusca bunicii',
            'cum ajut bunica sa faca zacusca',
            'de unde iau ingredientele pentru zacusca',
            'unde gasesc fermierul pentru zacusca',
            'ce faci la activitatea zacusca bunicii'
        ],
        keywords: [
            'zacusca bunicii',
            'zacusca',
            'ingrediente zacusca'
        ],
        answer: 'Zacusca Bunicii este o activitate din Sezonul de Toamnă în care o ajuți pe bunica să prepare faimoasa ei zacuscă. Mai întâi, trebuie să vorbești cu fermierul pentru a primi ingredientele necesare, apoi te ocupi de prepararea acesteia.'
    },

    {
        id: 'bijuterii-printre-frunze',
        title: 'Ce este Bijuterii printre Frunze și cum se face?',
        phrases: [
            'ce este bijuterii printre frunze',
            'ce e bijuterii printre frunze',
            'cum fac bijuterii printre frunze',
            'cum se face bijuterii printre frunze',
            'cum functioneaza bijuterii printre frunze',
            'cum gasesc bijuteriile pierdute',
            'cum caut bijuteriile in frunze',
            'la ce foloseste suflanta de frunze',
            'ce faci la bijuterii printre frunze',
            'cum ajut vecinul sa gaseasca bijuteriile'
        ],
        keywords: [
            'bijuterii printre frunze',
            'bijuterii pierdute',
            'suflanta frunze'
        ],
        answer: 'Bijuterii printre Frunze este o activitate din Sezonul de Toamnă în care trebuie să îți ajuți vecinul zilei, care și-a pierdut bijuteriile printre frunzele căzute ale copacilor. Trebuie să cauți bijuteriile prin mormanele de frunze, folosind o suflantă pentru a le îndepărta.'
    },

    {
        id: 'vinul-toamnei',
        title: 'Ce este Vinul Toamnei și cum se face?',
        phrases: [
            'ce este vinul toamnei',
            'ce e vinul toamnei',
            'cum fac vinul toamnei',
            'cum se face vinul toamnei',
            'cum functioneaza vinul toamnei',
            'ce faci la vinul toamnei',
            'cum culeg strugurii',
            'cum prepar vinul',
            'cum imbuteliez vinul',
            'cum livrez vinul',
            'cate lazi trebuie sa incarc la vinul toamnei',
            'cum functioneaza minijocurile de la crama'
        ],
        keywords: [
            'vinul toamnei',
            'cules struguri',
            'preparare vin',
            'livrare vin'
        ],
        answer: 'Vinul Toamnei este o activitate din Sezonul de Toamnă în care îl ajuți pe nea Costel să producă și să livreze vin. Mai întâi, trebuie să culegi strugurii și să îi duci la cramă, unde vei trece prin 3 stații cu minijocuri care influențează calitatea vinului. După preparare, vinul trebuie îmbuteliat și încărcat în dubă, în lăzi de câte 6 până la 8 per transport, urmând să fie livrat către clienți în diferite locații.'
    },

    {
        id: 'operatiunea-monstrul',
        title: 'Ce este Operațiunea Monstrul și cum se face?',
        phrases: [
            'ce este operatiunea monstrul',
            'ce e operatiunea monstrul',
            'cum fac operatiunea monstrul',
            'cum se face operatiunea monstrul',
            'cum functioneaza operatiunea monstrul',
            'cati jucatori trebuie la operatiunea monstrul',
            'cum prind somnul',
            'cum gasesc somnul cu sonarul',
            'ce se intampla daca se rupe firul',
            'cum obtin captura curata',
            'unde duc somnul la cantarire',
            'cine conduce barca la operatiunea monstrul',
            'cine foloseste mulineta la operatiunea monstrul'
        ],
        keywords: [
            'operatiunea monstrul',
            'prindere somn',
            'captura curata',
            'sonar somn'
        ],
        answer: 'Operațiunea Monstrul este o activitate din Sezonul de Toamnă care se desfășoară obligatoriu în 2 jucători. Un jucător îl invită pe celălalt: cel care invită conduce barca, iar cel invitat folosește mulineta. Echipa utilizează barca și sonarul pentru a găsi somnul într-una dintre cele 6 gropi. Prima rupere a firului este iertată, dar se pierde bonusul de captură curată. După prindere, somnul este scos cu minciogul și transportat la debarcader pentru cântărire. Ambii jucători primesc recompensa.'
    },

    {
        id: 'marea-migratie',
        title: 'Ce este Marea Migrație și cum se face?',
        phrases: [
            'ce este marea migratie',
            'ce e marea migratie',
            'cum fac marea migratie',
            'cum se face marea migratie',
            'cum functioneaza marea migratie',
            'ce faci la marea migratie',
            'de unde cumpar plase si capcane',
            'cum pun plasele in apa',
            'cum colectez capcanele',
            'unde vand captura',
            'cine este fane braconierul',
            'cum functioneaza activitatea pasiva cu plase'
        ],
        keywords: [
            'marea migratie',
            'fane braconierul',
            'plase capcane',
            'captura plase'
        ],
        answer: 'Marea Migrație este o activitate pasivă din Sezonul de Toamnă. Trebuie să mergi la Fane Braconierul, de unde poți cumpăra plase și capcane. Le plasezi în apă și aștepți să se umple. După aceea, le colectezi, primești captura și o vinzi înapoi lui Fane Braconierul.'
    },

    {
        id: 'time-trials-toamna',
        title: 'Ce este Time Trials și cum se face?',
        phrases: [
            'ce este time trials',
            'ce e time trials',
            'cum fac time trials',
            'cum se face time trials',
            'cum functioneaza time trials',
            'ce faci la time trials',
            'ce este cursa off road',
            'cum completez traseul off road',
            'ce trebuie sa fac la time trials',
            'cum termin traseul contra timp'
        ],
        keywords: [
            'time trials',
            'traseu off road',
            'cursa contra timp'
        ],
        answer: 'Time Trials este o activitate în care trebuie să parcurgi și să finalizezi un traseu Off-Road contra timp. Apare și în meniul Sezonului de Toamnă.'
    },
    //=================================================================================================================================
    //=================================================================================================================================
    //=================================================================================================================================
    {
        id: 'race-points',
        title: 'Cum obții Race Points?',
        phrases: [
            'cum obtii race points?',
            'cum faci race points',
            'cum fac racepoints',
            'de unde fac racepoints',
            'cum obtin racepoints',
            'cum fac race points',
            'cum castig puncte la curse',
            'de unde iau rp',
            'cum obtin rp',
            'cum iau race points'
        ],
        keywords: ['racepoints', 'rp'],
        answer: 'Este simplu, boss. Race Points se pot obține din: Race Arena, Crates, Stunts, Repo Work, Giftbox, Illegal Race și Drift Zone.'
    },
    {
        id: 'atm-rob',
        title: 'Cum dai rob la ATM?',
        phrases: [
            'cum dai rob la atm',
            'cum dau rob atm',
            'cum fac atm rob',
            'cum jefuiesc un atm',
            'cum sparg un bancomat',
            'cum dau rob la bancomat',
            'cum fac rob la bancomat',
            'ce imi trebuie pentru atm rob',
            'ce iteme trebuie pentru atm rob',
            'ce am nevoie pentru rob atm',
            'ce level trebuie pentru atm rob',
            'cate rob points trebuie pentru atm',
            'cum pot jefui un atm',
            'cum se face atm rob',
            'cum incep un atm rob',
            'ce conditii trebuie pentru atm rob'
        ],
        keywords: ['atmrob', 'atm', 'bancomat'],
        answer: 'Pentru a da rob la un ATM, ai nevoie de minim Level 3, 25 Rob Points și următoarele iteme: 1x Hacking Tablet, 1x Drill și 1x Dynamite.'
    },
    {
        id: 'museum-rob',
        title: 'Cum dai rob la Museum?',
        phrases: [
            'cum dai rob la museum',
            'cum dau rob museum',
            'cum fac museum rob',
            'cum jefuiesc muzeul',
            'cum sparg muzeul',
            'cum dau rob la muzeu',
            'cum fac rob la muzeu',
            'ce imi trebuie pentru museum rob',
            'ce iteme trebuie pentru museum rob',
            'ce am nevoie pentru rob museum',
            'ce level trebuie pentru museum rob',
            'cate rob points trebuie pentru museum',
            'cum pot jefui muzeul',
            'cum se face museum rob',
            'cum incep un museum rob',
            'cate persoane trebuie pentru museum rob',
            'pot face museum rob singur',
            'cum invit pe cineva la museum rob',
            'unde gasesc lester pentru museum rob',
            'unde este lester'
        ],
        keywords: ['museumrob', 'museum', 'muzeu', 'lester'],
        answer: 'Pentru a da rob la Muzeu, ai nevoie de minim Level 3, 50 Rob Points, 1x Laptop și 1x Glass Cutter. Jaful poate fi efectuat doar în 2 persoane. Pentru a începe, mergi la Lester (îl găsești folosind /gps → Lester), selectează Rob Museum și invită persoana cu care dorești să faci jaful.'
    },
    {
        id: 'obd-adaptor',
        title: 'Ce este adaptorul OBD și de unde îl obții?',
        phrases: [
            'ce este adaptorul obd',
            'ce e adaptorul obd',
            'ce este un obd adaptor',
            'ce inseamna obd',
            'la ce foloseste adaptorul obd',
            'pentru ce este adaptorul obd',
            'de unde iau adaptor obd',
            'de unde fac rost de adaptor obd',
            'unde gasesc adaptor obd',
            'cum obtin adaptorul obd',
            'cum fac rost de obd',
            'de unde cumpar obd',
            'unde pot cumpara adaptor obd',
            'cum intru la tuning ilegal',
            'ce imi trebuie pentru tuning ilegal',
            'cum intru in tuning ilegal',
            'de unde iau obd pentru tuning ilegal',
            'pot lua obd din shop',
            'pot obtine obd din crate',
            'din ce crate pica adaptorul obd',
            'ce este golden harvest crate'
        ],
        keywords: ['obd', 'adaptor', 'adapter', 'tuning ilegal', 'golden harvest'],
        answer: 'OBD Adaptor este un item folosit pentru a intra în Tuning Ilegal și poate fi obținut din /shop sau din Golden Harvest Crate.'
    },
    {
        id: 'ecu',
        title: 'Ce este ECU?',
        phrases: [
            'ce este ecu',
            'ce face ecu',
            'ce functionalitate are ecu',
            'la ce foloseste ecu',
            'cum functioneaza ecu',
            'ce este ecu la masina',
            'ce face ecu la masina',
            'ce beneficii ofera ecu',
            'ce efecte deblocheaza ecu',
            'cum pot imbunatati masina cu ecu',
            'ecu creste viteza masinii',
            'ecu creste puterea masinii',
            'ce efecte are ecu pe masina',
            'ce modificari aduce ecu'
        ],
        keywords: ['ecu', 'masina', 'putere', 'viteza', 'efecte'],
        answer: 'ECU este un sistem ce poate fi echipat pe vehicule dintr-un Ilegal Tuning. Crește puterea și viteza maximă a mașinii și deblochează efecte precum: pocnituri, flăcări, anti-lag, drift, sunet de turbo, fum diesel, jocuri de lumini și măsurători reale (dyno, Dragy).'
    },
    {
        id: 'exchange-crate',
        title: 'Ce este Exchange Crate?',
        phrases: [
            'ce se poate face la exchange crate',
            'ce este exchange crate',
            'ce faci la exchange crate',
            'cum functioneaza exchange crate',
            'la ce foloseste exchange crate',
            'ce pot schimba la exchange crate',
            'ce pot transforma la exchange crate',
            'cum transform moonlight crate',
            'cum fac moonlight crate v2',
            'cum obtin moonlight crate v2',
            'unde schimb moonlight crate',
            'unde transform moonlight crate',
            'cate moonlight crate trebuie pentru v2',
            'pot schimba moonlight crate in v2'
        ],
        keywords: ['exchangecrate', 'exchange', 'moonlight', 'crate', 'moonlightcrate'],
        answer: 'La Exchange Crate poți transforma 2 Moonlight Crates într-un Moonlight Crate V2.'
    },
    {
        id: 'dead-fish',
        title: 'Ce este Dead Fish?',
        phrases: [
            'ce pot face cu dead fish',
            'ce se poate face cu dead fish',
            'la ce foloseste dead fish',
            'ce este dead fish',
            'cum obtin dead fish',
            'de unde iau dead fish',
            'cum fac rost de dead fish',
            'unde vand dead fish',
            'pot vinde dead fish',
            'cat dead fish trebuie pentru coffer',
            'cum transform dead fish',
            'cum fac fishermans coffer',
            'cum obtin fishermans coffer',
            'unde fac fishermans coffer',
            'ce fac cu pestii de la fish',
            'ce primesc daca deschid pestii',
            'primesc dead fish la fishbot',
            'unde convertesc dead fish'
        ],
        keywords: ['deadfish', 'fish', 'fishbot', 'fisherman', 'coffer', 'pesti'],
        answer: 'Dead Fish se obțin atunci când deschizi peștii prinși la Fish sau Fishbot. Îi poți vinde la un business de tip 24/7 sau poți transforma 5.000 Dead Fish într-un Fisherman’s Coffer la NPC-ul jobului Fisherman.'
    },
    //=================================================================================================================================
    //===================================PACHET SANATOS PENTRU SECTIUNI, SERANNO GPT 2=================================================
    //=================================================================================================================================
    {
        id: 'skin-tickets-info',
        title: 'Beneficii Skin Tickets?',
        phrases: [
            // Întrebări generale
            'ce face skin ticket',
            'ce ofera skin ticket',
            'ce ofera skin tickets',
            'ce fac skin tickets',
            'ce beneficii au skin tickets',
            'ce beneficii ofera skin tickets',
            'ce primesc din skin tickets',
            'unde vad skin tickets',
            'unde gasesc informatii despre skin tickets',
            'lista skin tickets',

            // Rare Ticket
            'ce face rare ticket',
            'ce ofera rare ticket',
            'ce primesc din rare ticket',
            'ce beneficii are rare ticket',

            // Epic Ticket
            'ce face epic ticket',
            'ce ofera epic ticket',
            'ce primesc din epic ticket',
            'ce beneficii are epic ticket',

            // Legendary Ticket
            'ce face legendary ticket',
            'ce ofera legendary ticket',
            'ce primesc din legendary ticket',
            'ce beneficii are legendary ticket',

            // 7th Anniversary Ticket
            'ce face 7th anniversary ticket',
            'ce ofera 7th anniversary ticket',
            'ce primesc din 7th anniversary ticket',
            'ce beneficii are 7th anniversary ticket',

            // Autumn Ticket
            'ce face autumn ticket',
            'ce ofera autumn ticket',
            'ce primesc din autumn ticket',
            'ce beneficii are autumn ticket',

            // Autumn V2 Ticket
            'ce face autumn v2 ticket',
            'ce ofera autumn v2 ticket',
            'ce primesc din autumn v2 ticket',
            'ce beneficii are autumn v2 ticket',

            // Cupidon Ticket
            'ce face cupidon ticket',
            'ce ofera cupidon ticket',
            'ce primesc din cupidon ticket',
            'ce beneficii are cupidon ticket',

            // Cupidon V2 Ticket
            'ce face cupidon v2 ticket',
            'ce ofera cupidon v2 ticket',
            'ce primesc din cupidon v2 ticket',
            'ce beneficii are cupidon v2 ticket',

            // Cupidon V3 Ticket
            'ce face cupidon v3 ticket',
            'ce ofera cupidon v3 ticket',
            'ce primesc din cupidon v3 ticket',
            'ce beneficii are cupidon v3 ticket',

            // Easter Ticket
            'ce face easter ticket',
            'ce ofera easter ticket',
            'ce primesc din easter ticket',
            'ce beneficii are easter ticket',

            // Easter V3 Ticket
            'ce face easter v3 ticket',
            'ce ofera easter v3 ticket',
            'ce primesc din easter v3 ticket',
            'ce beneficii are easter v3 ticket',

            // Halloween Ticket
            'ce face halloween ticket',
            'ce ofera halloween ticket',
            'ce primesc din halloween ticket',
            'ce beneficii are halloween ticket',

            // Spring Ticket
            'ce face spring ticket',
            'ce ofera spring ticket',
            'ce primesc din spring ticket',
            'ce beneficii are spring ticket',

            // Spring V2 Ticket
            'ce face spring v2 ticket',
            'ce ofera spring v2 ticket',
            'ce primesc din spring v2 ticket',
            'ce beneficii are spring v2 ticket',

            // Summer Fest Ticket
            'ce face summer fest ticket',
            'ce ofera summer fest ticket',
            'ce primesc din summer fest ticket',
            'ce beneficii are summer fest ticket',

            // Summer Ticket
            'ce face summer ticket',
            'ce ofera summer ticket',
            'ce primesc din summer ticket',
            'ce beneficii are summer ticket',

            // Winter Ticket
            'ce face winter ticket',
            'ce ofera winter ticket',
            'ce primesc din winter ticket',
            'ce beneficii are winter ticket',

            // Winter V2 Ticket
            'ce face winter v2 ticket',
            'ce ofera winter v2 ticket',
            'ce primesc din winter v2 ticket',
            'ce beneficii are winter v2 ticket',

            // Winter V3 Ticket
            'ce face winter v3 ticket',
            'ce ofera winter v3 ticket',
            'ce primesc din winter v3 ticket',
            'ce beneficii are winter v3 ticket',

            // Worker Ticket
            'ce face worker ticket',
            'ce ofera worker ticket',
            'ce primesc din worker ticket',
            'ce beneficii are worker ticket',

            // xMas Ticket
            'ce face xmas ticket',
            'ce ofera xmas ticket',
            'ce primesc din xmas ticket',
            'ce beneficii are xmas ticket',

            // Backpack Ticket
            'ce face backpack ticket',
            'ce ofera backpack ticket',
            'ce primesc din backpack ticket',
            'ce beneficii are backpack ticket',

            // Groparul Ticket
            'ce face groparul ticket',
            'ce ofera groparul ticket',
            'ce primesc din groparul ticket',
            'ce beneficii are groparul ticket'
        ],
        keywords: [
            'skin', 'ticket', 'tickets',
            'rare', 'epic', 'legendary',
            'anniversary', 'autumn', 'cupidon',
            'easter', 'halloween', 'spring',
            'summer', 'winter', 'worker',
            'xmas', 'backpack', 'groparul'
        ],
        answer: 'E simplu, boss! Poți vedea beneficiile fiecărui Skin Ticket accesând secțiunea de informații din meniul principal sau apăsând direct butonul de mai jos. Odată ajuns acolo, selectezi ticketul care te interesează și BAM, ai toate informațiile despre beneficiile lui!',
        button: {
            text: 'Vezi Skin Tickets',
            view: 'tickets'
        }
    },

    {
        id: 'coffers-info',
        title: 'Hunter’s / Fisherman’s Coffer?',
        phrases: [
            // Întrebări generale
            'ce este coffer',
            'ce este un coffer',
            'ce sunt cofferele',
            'ce ofera coffer',
            'ce ofera cofferele',
            'ce poti primi din coffer',
            'ce primesc din coffer',
            'ce premii sunt in coffer',
            'ce recompense sunt in coffer',
            'ce contine un coffer',
            'ce contine cofferul',
            'unde vad premiile din coffere',
            'unde gasesc informatii despre coffere',
            'lista premii coffere',

            // Fisherman's Coffer
            'ce ofera fishermans coffer',
            'ce ofera fisherman coffer',
            'ce primesc din fishermans coffer',
            'ce primesc din fisherman coffer',
            'ce poti primi din fishermans coffer',
            'ce contine fishermans coffer',
            'ce premii are fishermans coffer',
            'ce recompense are fishermans coffer',
            'ce da fishermans coffer',
            'ce pica din fishermans coffer',
            'ce dropuri are fishermans coffer',
            'ce este fishermans coffer',
            'unde vad premiile din fishermans coffer',
            'ce ofera cofferul de pescar',
            'ce primesc din cofferul de pescar',
            'ce premii are cofferul de pescar',

            // Hunter's Coffer
            'ce ofera hunters coffer',
            'ce ofera hunter coffer',
            'ce primesc din hunters coffer',
            'ce primesc din hunter coffer',
            'ce poti primi din hunters coffer',
            'ce contine hunters coffer',
            'ce premii are hunters coffer',
            'ce recompense are hunters coffer',
            'ce da hunters coffer',
            'ce pica din hunters coffer',
            'ce dropuri are hunters coffer',
            'ce este hunters coffer',
            'unde vad premiile din hunters coffer',
            'ce ofera cofferul de vanator',
            'ce primesc din cofferul de vanator',
            'ce premii are cofferul de vanator',

            // Alte formulări
            'ce pot castiga din coffer',
            'ce iteme pica din coffer',
            'ce iteme sunt in coffer',
            'ce loot are cofferul',
            'unde gasesc lista de premii pentru coffer',
            'care sunt premiile din fishermans coffer',
            'care sunt premiile din hunters coffer',
            'ce pot castiga din fishermans coffer',
            'ce pot castiga din hunters coffer'
        ],
        keywords: [
            'coffer', 'coffere', 'coffers',
            'fisherman', 'fishermans',
            'hunter', 'hunters',
            'premii', 'recompense'
        ],
        answer: 'E simplu, boss! Poți vedea toate premiile disponibile în Hunter’s Coffer și Fisherman’s Coffer accesând secțiunea Informații Coffers etc din meniul principal sau apăsând direct butonul de mai jos. Odată ajuns acolo, selectezi cofferul care te interesează și BAM, ai lista completă cu premiile pe care le poți obține!',
        button: {
            text: 'Vezi Coffers',
            view: 'coffers'
        }
    },

{
    id: 'pets-info',
    title: 'Beneficii Pets?',
    phrases: [
        // Întrebări generale
        'ce sunt pets',
        'ce este un pet',
        'ce face un pet',
        'ce fac pets',
        'ce ofera pets',
        'ce ofera un pet',
        'ce beneficii au pets',
        'ce beneficii ofera pets',
        'ce beneficii are un pet',
        'ce bonusuri ofera pets',
        'ce bonusuri are un pet',
        'ce avantaje ofera pets',
        'la ce ajuta pets',
        'la ce folosesc pets',
        'la ce foloseste un pet',
        'pentru ce sunt pets',
        'ce primesc de la pets',
        'ce castig daca am un pet',

        // Informații despre pet-uri
        'unde vad pets',
        'unde gasesc informatii despre pets',
        'unde pot vedea beneficiile peturilor',
        'unde gasesc lista de pets',
        'lista pets',
        'lista de peturi',
        'ce peturi exista',
        'ce pets exista',
        'cate pets exista',
        'care sunt peturile disponibile',
        'care sunt pets disponibile',
        'ce tipuri de pets sunt',
        'ce tipuri de peturi exista',

        // Beneficii și efecte
        'ce efecte au pets',
        'ce efect are un pet',
        'ce abilitati au pets',
        'ce abilitati are un pet',
        'ce skilluri au pets',
        'ce perkuri au pets',
        'ce boosturi ofera pets',
        'ce boosturi are un pet',
        'ce bonus imi da petul',
        'ce bonusuri imi da petul',
        'ce beneficii imi da petul',
        'ce avantaje imi da petul',
        'ce face petul meu',
        'cu ce ma ajuta petul',
        'cu ce ma ajuta un pet',

        // Comparații și alegerea petului
        'care pet este mai bun',
        'care este cel mai bun pet',
        'ce pet sa aleg',
        'ce pet merita',
        'care pet ofera cele mai bune beneficii',
        'ce diferente sunt intre pets',
        'care sunt diferentele dintre peturi',
        'cum compar beneficiile peturilor',
        'unde pot compara pets',
        'unde vad bonusurile fiecarui pet',

        // Formulări alternative
        'ce face petul',
        'ce ofera petul',
        'ce beneficii are petul',
        'ce bonusuri are petul',
        'ce fac peturile',
        'ce ofera peturile',
        'ce beneficii au peturile',
        'ce bonusuri au peturile',
        'informatii pets',
        'informatii peturi',
        'beneficii pets',
        'beneficii peturi'
    ],
    keywords: [
        'pet', 'pets', 'petul', 'peturi', 'peturile',
        'beneficii', 'bonusuri', 'abilitati'
    ],
    answer: 'E simplu, boss! Poți vedea fiecare pet disponibil și beneficiile acestuia accesând secțiunea Informații Pets din meniul principal sau apăsând direct butonul de mai jos. Odată ajuns acolo, poți verifica ce oferă fiecare pet și care ți se potrivește cel mai bine!',
    button: {
        text: 'Vezi Pets',
        view: 'pets'
    }
},


{
    id: 'fivem-mods-info',
    title: 'Moduri FiveM?',
    phrases: [
        // Întrebări generale
        'unde gasesc moduri fivem',
        'unde gasesc moduri pentru fivem',
        'unde pot descarca moduri fivem',
        'unde descarc moduri pentru fivem',
        'aveti moduri pentru fivem',
        'aveti modpackuri',
        'ce moduri aveti',
        'ce modpackuri aveti',
        'ce moduri sunt disponibile',
        'ce modpackuri sunt disponibile',
        'unde gasesc modpackurile',
        'unde sunt modurile',
        'unde sunt modpackurile',
        'lista moduri fivem',
        'lista modpackuri fivem',
        'moduri fivem',
        'modpackuri fivem',
        'informatii moduri fivem',

        // Instalare și descărcare
        'de unde iau moduri fivem',
        'de unde iau modpackuri',
        'cum descarc modurile',
        'cum descarc un modpack',
        'cum instalez moduri fivem',
        'cum instalez un modpack',
        'unde gasesc linkurile de download',
        'unde gasesc linkurile pentru moduri',
        'unde gasesc linkurile pentru modpackuri',
        'cum pun moduri pe fivem',
        'cum bag moduri in fivem',
        'vreau sa instalez moduri pe fivem',

        // Performanță și FPS
        'aveti moduri pentru fps',
        'aveti modpackuri pentru fps',
        'ce moduri cresc fps',
        'ce modpackuri cresc fps',
        'moduri pentru fps boost',
        'modpack fps boost',
        'moduri pentru performanta fivem',
        'modpackuri pentru performanta',
        'moduri pentru pc slab',
        'modpackuri pentru pc slab',
        'moduri pentru low end pc',
        'modpackuri low end',
        'moduri pentru pc mediu',
        'modpackuri mid end',
        'moduri pentru pc performant',
        'modpackuri high end',
        'ce modpack sa folosesc pentru fps',

        // Grafică și aspect vizual
        'aveti moduri grafice',
        'aveti modpackuri grafice',
        'unde gasesc moduri grafice',
        'moduri pentru grafica fivem',
        'modpackuri pentru grafica',
        'cum imbunatatesc grafica in fivem',
        'cum fac fivem sa arate mai bine',
        'moduri pentru grafica mai buna',
        'modpack pentru grafica mai buna',
        'moduri vizuale fivem',
        'modpackuri vizuale fivem',
        'ce modpack grafic recomandati',

        // SeraNNo's Workplace
        'ce este serannos workplace',
        'unde gasesc serannos workplace',
        'ce moduri are seranno',
        'ce modpackuri are seranno',
        'unde gasesc modurile lui seranno',
        'unde gasesc modpackurile lui seranno',
        'ce moduri foloseste seranno',
        'ce modpackuri foloseste seranno',
        'moduri testate de seranno',
        'modpackuri testate de seranno',

        // Formulări alternative
        'vreau moduri pentru fivem',
        'vreau un modpack pentru fivem',
        'caut moduri pentru fivem',
        'caut modpackuri pentru fivem',
        'ce modpack imi recomandati',
        'ce moduri imi recomandati',
        'unde vad toate modurile',
        'unde vad toate modpackurile',
        'cum accesez sectiunea de moduri',
        'unde este sectiunea de moduri'
    ],
    keywords: [
        'moduri', 'modpack', 'modpackuri',
        'fivem', 'grafica', 'fpsboost',
        'lowend', 'midend', 'highend',
        'serannosworkplace'
    ],
    answer: 'Poți găsi o selecție de moduri pentru FiveM, potrivite pentru diferite configurații de PC, accesând secțiunea Moduri FiveM din meniul principal sau apăsând direct butonul de mai jos. Odată ajuns acolo, alegi categoria care te interesează și verifici modurile disponibile. Spor la joacă șefule!',
    button: {
        text: 'Vezi Moduri FiveM',
        view: 'modpacks'
    }
},
{
    id: 'stunts-speed-info',
    title: 'Viteze Stunts?',
    phrases: [
        // Întrebări generale
        'ce viteza trebuie pentru stunts',
        'ce viteze trebuie pentru stunts',
        'ce viteza imi trebuie pentru stunt',
        'ce viteza trebuie la stunt',
        'ce viteza trebuie pentru un stunt',
        'cu ce viteza fac un stunt',
        'cu cat trebuie sa merg la stunt',
        'cum fac un stunt',
        'cum fac stunts',
        'unde gasesc vitezele pentru stunts',
        'unde vad vitezele pentru stunts',
        'unde gasesc lista de stunts',
        'unde gasesc lista de viteze',
        'lista viteze stunts',
        'viteze stunts',
        'viteze pentru stunturi',
        'viteze pentru stunt-uri',
        'informatii stunts',
        'ce viteze au stunturile',
        'care sunt vitezele pentru stunts',

        // Întrebări despre un stunt anume
        ...Array.from({ length: 57 }, (_, i) => i + 1)
            .filter(num => num !== 40)
            .flatMap(num => [
                `ce viteza trebuie pentru stunt ${num}`,
                `ce viteza imi trebuie pentru stunt ${num}`,
                `ce viteza trebuie la stunt ${num}`,
                `cu ce viteza fac stunt ${num}`,
                `cu cat trebuie sa merg la stunt ${num}`,
                `cum fac stunt ${num}`,
                `cum se face stunt ${num}`,
                `ce viteza are stunt ${num}`,
                `viteza stunt ${num}`,
                `stunt ${num}`
            ]),

        // Alte formulări
        'cum aflu viteza unui stunt',
        'cum verific viteza unui stunt',
        'unde vad viteza pentru un stunt',
        'ce viteza folosesc la stunts',
        'ce viteza este buna pentru stunts',
        'ce viteza trebuie sa am la stunt',
        'unde sunt vitezele actualizate',
        'sunt actualizate vitezele pentru stunts',
        'care stunts au vitezele actualizate',
        'ce stunturi sunt dificile',
        'care stunturi sunt problematice'
    ],
    keywords: [
        'stunt', 'stunts', 'stunturi', 'stunturile',
        'viteza', 'viteze', 'saritura', 'jump'
    ],
    answer: 'Poți verifica vitezele necesare pentru fiecare stunt accesând secțiunea Viteze Stunts din meniul principal sau apăsând direct butonul de mai jos. Odată ajuns acolo, cauți numărul stunt-ului care te interesează și verifici viteza afișată. Ai grijă, totuși: valorile marcate cu gri nu sunt actualizate, iar stunt-urile marcate cu 🔻 pot fi mai dificile. Dacă nu îți iese din prima, mai încearcă!',
    button: {
        text: 'Vezi Viteze Stunts',
        view: 'stunts'
    }
},

{
    id: 'fivem-fixes-info',
    title: 'Rezolvări Crash-uri & Performanță etc?',
    phrases: [
        // Întrebări generale
        'unde gasesc rezolvari fivem',
        'unde gasesc fixuri fivem',
        'unde gasesc ghiduri fivem',
        'aveti rezolvari pentru fivem',
        'aveti fixuri pentru fivem',
        'cum rezolv problemele din fivem',
        'am probleme cu fivem',
        'nu imi merge fivem',
        'fivem nu functioneaza',
        'cum repar fivem',
        'cum fac fivem sa mearga',
        'unde gasesc rezolvari crashuri si performanta',

        // Crash-uri
        'cum rezolv crashurile din fivem',
        'cum scap de crashuri',
        'cum scap de crash in fivem',
        'cum fac sa nu mai iau crash',
        'cum fac sa nu mai iau crash pe fivem',
        'de ce iau crash',
        'de ce iau crash pe fivem',
        'iau crash mereu',
        'iau crash pe fivem',
        'fivem imi da crash',
        'fivem tot da crash',
        'fivem se inchide singur',
        'fivem se inchide brusc',
        'fivem crapa',
        'jocul imi da crash',
        'jocul se inchide singur',
        'cum repar crashurile',
        'ce fac daca iau crash',
        'ce fac daca fivem da crash',
        'cum rezolv erorile fivem',
        'am eroare pe fivem',
        'fivem crash fix',
        'fivem crash solution',
        'fivem nu porneste',
        'fivem se blocheaza la pornire',
        'nu pot intra pe fivem',
        'ce plm fac sa nu mai iau crash',
        'ba ce fac ca tot iau crash',
        'coaie iar mi a dat crash',

        // Performanță și lag
        'cum imbunatatesc performanta in fivem',
        'cum optimizez fivem',
        'cum fac fivem sa mearga mai bine',
        'cum fac jocul sa nu mai mearga in lag',
        'cum scap de lag pe fivem',
        'de ce am lag pe fivem',
        'am lag pe fivem',
        'fivem merge in lag',
        'fivem merge greu',
        'fivem se misca greu',
        'fivem se misca prost',
        'fivem sacadeaza',
        'jocul sacadeaza',
        'am stuttering pe fivem',
        'cum scap de stuttering',
        'cum reduc sacadarile',
        'cum optimizez jocul',
        'cum fac sa mearga mai fluent',
        'cum cresc performanta jocului',
        'ce setari folosesc pentru performanta',
        'cum scap de freezeuri',
        'fivem imi da freeze',
        'jocul se blocheaza cateva secunde',
        'de ce imi ingheata jocul',
        'ba cum fac sa nu mai am lag',
        'cum cacat fac sa nu mai mearga jocul in lag',

        // FPS mic
        'cum cresc fps in fivem',
        'cum fac mai multe fps',
        'cum obtin mai multe fps',
        'cum maresc fps',
        'cum imbunatatesc fps',
        'cum fac fps boost',
        'am fps mic',
        'am fps putine',
        'am fps mic pe fivem',
        'de ce am fps mic',
        'de ce am fps putine',
        'de ce imi scade fps',
        'am fps drops',
        'am fps dropuri',
        'cum scap de fps drops',
        'cum rezolv fps dropurile',
        'fivem merge cu fps putine',
        'jocul merge cu fps mic',
        'cum fac fivem sa ruleze mai bine',
        'ce fac daca am fps mic',
        'ce setari cresc fps',
        'cum optimizez fps',
        'fps boost fivem',
        'fivem low fps fix',
        'coaie am fps mic',
        'ba de ce am asa putine fps',

        // Instanțe multiple FiveM
        'cum deschid doua instante fivem',
        'cum deschid mai multe instante fivem',
        'cum rulez doua instante fivem',
        'cum rulez mai multe instante fivem',
        'cum pornesc fivem de doua ori',
        'cum deschid fivem de doua ori',
        'cum intru pe doua conturi fivem',
        'cum intru pe 2 conturi fivem',
        'cum joc pe doua conturi simultan',
        'cum joc pe 2 conturi deodata',
        'cum folosesc doua conturi fivem',
        'cum folosesc 2 conturi fivem',
        'cum fac multi instance fivem',
        'cum fac multi instancing fivem',
        'cum fac multiclient fivem',
        'cum folosesc multiclient',
        'cum deschid doua fivem',
        'cum deschid 2 fivem',
        'cum tin doua fivem deschise',
        'cum rulez fivem simultan',
        'cum deschid fivem pe doua conturi',
        'cum folosesc instante multiple',
        'instante multiple fivem',
        'multiple instances fivem',
        'fivem multi instance',
        'fivem multiclient',
        'cum fac dual client fivem',
        'cum deschid coaie fivem pe 2 conturi deodata',
        'cum intru pe doua conturi in acelasi timp',

        // Navigare către secțiune
        'unde gasesc sectiunea de fixes',
        'unde gasesc rezolvari crashuri',
        'unde gasesc ghiduri de performanta',
        'unde gasesc ghidul pentru instante multiple',
        'unde gasesc fixurile de pe site',
        'unde sunt rezolvarile pentru fivem',
        'unde vad ghidurile pentru fivem'
    ],
    keywords: [
        'crash', 'crashuri', 'crashurile',
        'eroare', 'erori', 'fix', 'fixuri',
        'lag', 'performanta', 'optimizare',
        'fps', 'fpsboost', 'fpsdrops',
        'stuttering', 'sacadari', 'freeze',
        'instante', 'multiclient', 'multiinstance',
        'dualclient'
    ],
    answer: 'Te rezolvă fratele! Dacă ai probleme cu crash-urile, FPS-ul, performanța jocului sau vrei să afli cum poți deschide mai multe instanțe FiveM, accesează secțiunea de rezolvări din meniul principal sau apasă direct butonul de mai jos. Acolo găsești ghidurile disponibile pentru fiecare problemă. Alegi ce te interesează și urmezi pașii prezentați!',
    button: {
        text: 'Vezi Rezolvări Crash-uri & Performanță',
        view: 'fixes'
    }
},


];
