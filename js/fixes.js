// ===== FiveM Fixes =====
//
// Menu icons: img/fixes/<file>.png (see the "src" attributes below).
// If a file is missing, the emoji from "data-emoji" is shown instead.

const fixesContainer = document.getElementById('fixesContainer');
const fixDetailContainer = document.getElementById('fixDetailContainer');
const fixDetailTitle = document.getElementById('fixDetailTitle');

if (fixesContainer) {
    fixesContainer.innerHTML = `

        <!-- ==================== MENU ==================== -->

        <div class="fixes-menu" id="fixesMenu">

            <button
                class="fix-menu-card stagger-in"
                onclick="showFixCategory('crashFix')"
            >
                <span class="fix-menu-icon">
                    <img
                        src="img/fixes/crash-fix.png"
                        alt="Crash Fix"
                        data-emoji="💥"
                        onerror="fixIconFallback(this)"
                    >
                </span>

                <span class="fix-menu-content">
                    <span class="fix-menu-title">
                        Crash Fix
                    </span>

                    <span class="fix-menu-description">
                        Rezolvare crash-uri frecvente, cache și verificarea fișierelor.
                    </span>
                </span>
            </button>


            <button
                class="fix-menu-card stagger-in"
                style="animation-delay: 0.08s;"
                onclick="showFixCategory('performance')"
            >
                <span class="fix-menu-icon">
                    <img
                        src="img/fixes/performance.png"
                        alt="Performanță"
                        data-emoji="⚡"
                        onerror="fixIconFallback(this)"
                    >
                </span>

                <span class="fix-menu-content">
                    <span class="fix-menu-title">
                        Performanță
                    </span>

                    <span class="fix-menu-description">
                        Rezolvare FPS, stuttering, texturi și setări grafice pentru FiveM.
                    </span>
                </span>
            </button>


            <button
                class="fix-menu-card stagger-in"
                style="animation-delay: 0.16s;"
                onclick="showFixCategory('multiInstance')"
            >
                <span class="fix-menu-icon">
                    <img
                        src="img/fixes/multi-instance.png"
                        alt="Instanțe multiple FiveM"
                        data-emoji="🎮"
                        onerror="fixIconFallback(this)"
                    >
                </span>

                <span class="fix-menu-content">
                    <span class="fix-menu-title">
                        Instanțe multiple FiveM
                    </span>

                    <span class="fix-menu-description">
                        Află cum te poți conecta pe două conturi simultan de pe același PC.
                    </span>
                </span>
            </button>

        </div>

    `;
}


// ===== FiveM Fixes Categories (detail view) =====

if (fixDetailContainer) {
    fixDetailContainer.innerHTML = `

        <!-- ==================== CRASH FIX ==================== -->

        <div
            class="fixes-section"
            id="crashFix"
            data-title="Crash Fix"
        >


            <div class="fixes-intro">

                <span class="fixes-warning-icon">⚠️</span>

                <div>

                    <strong style="
                        color: #ff4444;
                        font-weight: 700;
                        text-shadow: 0 0 12px rgba(255, 68, 68, 0.8);
                    ">
                        Important:
                    </strong>

                    Aceste metode

                    <strong style="
                        color: #ff4444;
                        font-weight: 700;
                        text-shadow: 0 0 12px rgba(255, 68, 68, 0.8);
                    ">
                        NU
                    </strong>

                    garantează eliminarea completă a crash-urilor,
                    dar pot reduce frecvența acestora.

                </div>

            </div>


            <!-- CACHE -->

            <div class="fix-card">

                <div class="fix-card-header">

                    <span class="fix-card-icon">🧹</span>

                    <div>

                        <h3>Crash-uri frecvente</h3>

                        <p>
                            » În cazul în care luați crash-uri căcălău,
                            încercați să ștergeți resursele și cache-ul din FiveM:
                        </p>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">1</div>

                    <div class="fix-step-content">

                        <h4>Deschideți folderul Local AppData:</h4>

                        <p>
                            Apăsați <strong>Win + R</strong> și introduceți:
                        </p>

                        <div class="fix-code">
                            %localappdata%
                        </div>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">2</div>

                    <div class="fix-step-content">

                        <h4>Accesați folderul FiveM:</h4>

                        <div class="fix-path">
                            FiveM
                            <span>→</span>
                            FiveM Application Data
                            <span>→</span>
                            data
                        </div>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">3</div>

                    <div class="fix-step-content">

                        <h4>Ștergeți următoarele foldere:</h4>

                        <div class="fix-folder-list">
                            <code>cache</code>
                            <code>server-cache</code>
                            <code>server-cache-priv</code>
                        </div>

                    </div>

                </div>


                <div class="fix-alternative">

                    <strong>📂 Alternativ, locația completă este:</strong>

                    <div class="fix-code">
                        C:\\Users\\NUME-USER\\AppData\\Local\\FiveM\\FiveM.app\\data
                    </div>

                    <p>
                        📌 <strong>NUME-USER</strong> reprezintă username-ul
                        contului vostru de Windows.
                    </p>

                </div>

            </div>


            <!-- BUILD -->

            <div class="fix-card">

                <div class="fix-card-header">

                    <span class="fix-card-icon">🎮</span>

                    <div>

                        <h3>Schimbați build-ul FiveM</h3>

                        <p>
                            » Din <strong>FiveM Launcher</strong>, mergeți la:
                        </p>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">1</div>

                    <div class="fix-step-content">

                        <div class="fix-path">
                            Settings
                            <span>→</span>
                            Game
                            <span>→</span>
                            Selectați Latest (Unstable)
                        </div>

                    </div>

                </div>


                <div class="fix-alternative">

                    <strong>💡 Dacă folosiți deja Latest (Unstable):</strong>

                    <p>
                        Schimbați pe <strong>Release</strong> sau
                        <strong>Beta</strong>.
                    </p>

                </div>

            </div>


            <!-- VERIFY -->

            <div class="fix-card">

                <div class="fix-card-header">

                    <span class="fix-card-icon">🛠️</span>

                    <div>

                        <h3>Verificați integritatea fișierelor jocului</h3>

                        <p>
                            » Dacă problemele persistă, puteți verifica integritatea
                            fișierelor jocului pentru a vă asigura că nu există
                            fișiere corupte sau lipsă.
                        </p>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">1</div>

                    <div class="fix-step-content">

                        <h4>Pentru varianta Epic Games:</h4>

                        <div class="fix-path">
                            Intrați în Epic
                            <span>→</span>
                            Library
                            <span>→</span>
                            Grand Theft Auto V
                            <span>→</span>
                            apăsați pe ⋯
                            <span>→</span>
                            Manage
                            <span>→</span>
                            Verify Files
                        </div>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">2</div>

                    <div class="fix-step-content">

                        <h4>Pentru varianta Steam:</h4>

                        <div class="fix-path">
                            Intrați în Steam
                            <span>→</span>
                            Library
                            <span>→</span>
                            Click dreapta pe Grand Theft Auto V
                            <span>→</span>
                            Properties
                            <span>→</span>
                            Installed Files
                            <span>→</span>
                            Verify integrity of game files
                        </div>

                    </div>

                </div>


                <p style="margin-top: 14px;">

                    » Dacă problemele tot persistă, reveniți la începutul paginii
                    și citiți din nou ce scrie acolo la

                    <strong style="
                        color: #ff4444;
                        font-weight: 700;
                        text-shadow: 0 0 12px rgba(255, 68, 68, 0.8);
                    ">
                        "Important"
                    </strong>!

                </p>

            </div>

        </div>


        <!-- ==================== PERFORMANCE ==================== -->

        <div
            class="fixes-section"
            id="performance"
            data-title="Performanță"
        >


            <!-- FPS / TEXTURES -->

            <div class="fix-card">

                <div class="fix-card-header">

                    <span class="fix-card-icon">🎮</span>

                    <div>

                        <h3>FPS scăzut, stuttering sau texturi care dispar</h3>

                        <p>
                            » Dacă aveți probleme cu performanța pe joc
                            (gen FPS-uri mici și stuttering) sau vă dispar texturile
                            și așa mai departe:
                        </p>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">1</div>

                    <div class="fix-step-content">

                        <h4>Schimbați build-ul FiveM:</h4>

                        <p>
                            Din <strong>FiveM Launcher</strong>, mergeți la:
                        </p>

                        <div class="fix-path">
                            Settings
                            <span>→</span>
                            Game
                            <span>→</span>
                            Selectați Latest (Unstable)
                        </div>


                        <div class="fix-alternative">

                            <strong>💡 Dacă folosiți deja Latest (Unstable):</strong>

                            <p>
                                Schimbați pe <strong>Release</strong> sau
                                <strong>Beta</strong>.
                            </p>

                        </div>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">2</div>

                    <div class="fix-step-content">

                        <h4>Schimbați astea în joc:</h4>

                        <div class="fix-setting">
                            <strong>Extended Texture Budget</strong>
                            <span>
                                Îl setați la jumate sau la maxim.
                            </span>
                        </div>

                        <div class="fix-setting">
                            <strong>Texture Quality</strong>
                            <span>
                                Dați-l pe Normal dacă nu îl aveți deja așa.
                            </span>
                        </div>

                    </div>

                </div>

            </div>


            <!-- SETTINGS -->

            <div class="fix-card">

                <div class="fix-card-header">

                    <span class="fix-card-icon">⚙️</span>

                    <div>

                        <h3>Setări In-Game pentru TEST</h3>

                        <p>
                            » Dacă nu știți exact de unde să începeți cu setările grafice,
                            puteți testa astea de mai jos și să ajustați ulterior
                            în funcție de ce PC/Laptop aveți.
                        </p>

                    </div>

                </div>


                <div class="fix-rig">

                    <div class="fix-rig-title">
                        💻 Configurația pe care sunt folosite aceste setări:
                    </div>

                    <div class="fix-rig-details">
                        <span>RTX 4050 Laptop GPU — 6 GB VRAM</span>
                        <span>Ryzen 7 7435HS 8/16 3.1 GHz Up to 4.5 GHz</span>
                        <span>24 GB RAM 4800MHz</span>
                        <span>≈ 100–140 FPS</span>
                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">1</div>

                    <div class="fix-step-content">

                        <h4>Graphics:</h4>

                        <div class="fix-settings-list">

                            <div class="fix-settings-row">
                                <span>DirectX Version</span>
                                <strong>DirectX 11</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>FXAA</span>
                                <strong>Off</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>MSAA</span>
                                <strong>x4</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>NVIDIA TXAA</span>
                                <strong>On</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>VSync</span>
                                <strong>On</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Population Density</span>
                                <strong>Minim</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Population Variety</span>
                                <strong>Minim</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Distance Scaling</span>
                                <strong>Minim</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Extended Texture Budget</span>
                                <strong>Maxim</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Texture Quality</span>
                                <strong>Normal</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Shader Quality</span>
                                <strong>High</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Shadow Quality</span>
                                <strong>Normal</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Reflection Quality</span>
                                <strong>High</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Reflection MSAA</span>
                                <strong>x8</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Water Quality</span>
                                <strong>High</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Particles Quality</span>
                                <strong>High</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Grass Quality</span>
                                <strong>Normal</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Soft Shadows</span>
                                <strong>Softest</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Post FX</span>
                                <strong>High</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Motion Blur Strength</span>
                                <strong>Minim</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Anisotropic Filtering</span>
                                <strong>x16</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Ambient Occlusion</span>
                                <strong>High</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Tessellation</span>
                                <strong>Off</strong>
                            </div>

                        </div>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">2</div>

                    <div class="fix-step-content">

                        <h4>Advanced Graphics:</h4>

                        <div class="fix-settings-list">

                            <div class="fix-settings-row">
                                <span>Long Shadows</span>
                                <strong>Off</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>High Resolution Shadows</span>
                                <strong>Off</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>High Detail Streaming While Flying</span>
                                <strong>Off</strong>
                            </div>

                            <div class="fix-settings-row">
                                <span>Extended Distance Scaling</span>
                                <strong>Minim</strong>
                            </div>

                        </div>

                    </div>

                </div>


                <p style="margin-top: 14px;">

                    📌 <strong>Notă:</strong>
                    Aceste setări sunt oferite ca punct de plecare.
                    FPS-urile pot varia în funcție de configurație,
                    zona de pe server, numărul de jucători etc.

                </p>

            </div>

        </div>


        <!-- ==================== MULTIPLE INSTANCES ==================== -->

        <div
            class="fixes-section"
            id="multiInstance"
            data-title="Instanțe multiple FiveM"
        >


            <div class="fix-alternative">
                <p>
                    <strong>📌 Notă:</strong> Este recomandat să aveți un PC suficient de performant
                    pentru a rula două instanțe FiveM simultan. A doua instanță
                    va rula întotdeauna la performanțe semnificativ mai scăzute
                    față de prima, iar în funcție de configurația PC-ului,
                    puteți întâmpina <strong>FPS scăzut, stuttering</strong>
                    sau chiar <strong>lag</strong>.
                </p>

            </div>


            <div class="fix-card">

                <div class="fix-card-header">

                    <span class="fix-card-icon">🔩</span>

                    <div>

                        <h3>Urmați pașii cu atenție:</h3>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">1</div>

                    <div class="fix-step-content">

                        <h4>Faceți o copie a scurtăturii FiveM</h4>

                        <p>
                            Dacă aveți deja o scurtătură <strong>FiveM</strong> pe Desktop:
                        </p>

                        <div class="fix-code">
                            click dreapta pe ea
                            <span>→</span>
                            apăsați Copy
                            <span>→</span>
                            click dreapta pe Desktop
                            <span>→</span>
                            apăsați Paste
                        </div>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">2</div>

                    <div class="fix-step-content">

                        <h4>Dacă nu aveți o scurtătură pe Desktop</h4>

                        <p>
                            Puteți găsi aplicația <strong>FiveM.exe</strong> aici:
                        </p>

                        <div class="fix-code">
                            C:\\Users\\NumeleTau\\AppData\\Local\\FiveM\\FiveM.exe
                        </div>

                        <p>
                            iar apoi:
                        </p>

                        <div class="fix-code">
                            click dreapta pe FiveM.exe
                            <span>→</span>
                            Copy
                            <span>→</span>
                            click dreapta pe Desktop
                            <span>→</span>
                            apăsați Paste shortcut
                        </div>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">3</div>

                    <div class="fix-step-content">

                        <h4>Redenumiți noua scurtătură</h4>

                        <p>
                            Puteți redenumi scurtătura în <strong>"FiveM 2"</strong>
                            sau puteți alege orice alt nume doriți.
                        </p>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">4</div>

                    <div class="fix-step-content">

                        <h4>Adăugați parametrul -cl2</h4>

                        <p>
                            Apăsați click dreapta pe noua scurtătură, apoi intrați în
                            <strong>Properties</strong>.
                        </p>

                        <p>
                            La câmpul <strong>Target</strong>, mergeți la finalul
                            liniei și adăugați un spațiu, urmat de:
                        </p>

                        <div class="fix-code">
                            -cl2
                        </div>

                        <p>
                            Linia trebuie să arate astfel:
                        </p>

                        <div class="fix-code">
                            C:\\Users\\NUMELE-TAU\\AppData\\Local\\FiveM\\FiveM.exe -cl2
                        </div>

                        <p>
                            Apăsați <strong>Apply</strong>, iar apoi apăsați
                            <strong>OK</strong>.
                        </p>

                    </div>

                </div>


                <div class="fix-step">

                    <div class="fix-step-number">5</div>

                    <div class="fix-step-content">

                        <h4>Porniți cele două instanțe</h4>

                        <p>
                            Deschideți <strong>FiveM</strong> cum îl deschideți normal,
                            din scurtătura voastră originală, și conectați-vă pe cont.
                        </p>

                        <p>
                            Pentru al doilea cont pe care vreți să vă conectați,
                            deschideți scurtătura pe care ați făcut-o mai devreme
                            (cea cu <strong>-cl2</strong>).
                        </p>

                    </div>

                </div>

            </div>

        </div>

    `;
}


function showFixCategory(category) {

    document
        .querySelectorAll('.fixes-section')
        .forEach(section => {
            section.classList.remove('active');
        });

    const target = document.getElementById(category);

    if (!target) return;

    target.classList.add('active');

    // The detail view header shows the title stored on the section itself (data-title)
    if (fixDetailTitle && target.dataset.title) {
        fixDetailTitle.textContent = target.dataset.title;
    }

    showView(fixDetailView);

}


function showFixes() {

    showView(fixesView);

}


// ===== Fix menu icons =====

// Renders the emoji from "data-emoji" when the PNG from img/fixes is missing.

function fixIconFallback(img) {

    const icon = img.parentElement;

    if (!icon) return;

    icon.textContent = img.dataset.emoji || '';

}
