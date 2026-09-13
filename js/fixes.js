// ===== FiveM Fixes =====

const fixesContainer = document.getElementById('fixesContainer');

if (fixesContainer) {
    fixesContainer.innerHTML = `
        <div class="fixes-intro stagger-in">
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

                garantează eliminarea completă a crash-urilor
                sau a problemelor de performanță, dar pot reduce frecvența acestora.

                <span style="display: block; margin-top: 8px;">
                    Până la urmă, vorbim de
                    <span style="
                        color: #42ff6b;
                        font-weight: 800;
                        text-shadow:
                            0 0 6px rgba(66, 255, 107, 0.75),
                            0 0 14px rgba(66, 255, 107, 0.45),
                            0 0 24px rgba(66, 255, 107, 0.20);
                    ">BUG-HOOD</span>
                    — server-ul unde sistemele noi făcute cu AI sunt mai importante decât rezolvarea problemelor vechi. 💀
                </span>
            </div>
        </div>

        <div class="fix-card stagger-in" style="animation-delay: 0.08s;">
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
                </div>
            </div>

            <div class="fix-step">
                <div class="fix-step-number">2</div>

                <div class="fix-step-content">
                    <h4>Schimbați astea în joc:</h4>

                    <div class="fix-setting">
                        <strong>Extended Texture Budget</strong>
                        <span>Îl setați la jumate sau la maxim.</span>
                    </div>

                    <div class="fix-setting">
                        <strong>Texture Quality</strong>
                        <span>Dați-l pe Normal dacă nu îl aveți deja așa.</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="fix-card stagger-in" style="animation-delay: 0.16s;">
            <div class="fix-card-header">
                <span class="fix-card-icon">🧹</span>

                <div>
                    <h3>Crash-uri frecvente</h3>

                    <p>
                        » Iar în cazul în care luați crash-uri căcălău,
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
                    📌 <strong>NUME-USER</strong> reprezintă username-ul contului vostru de Windows.
                </p>
            </div>
        </div>

        <div class="fix-card stagger-in" style="animation-delay: 0.24s;">
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

        <div class="fix-card stagger-in" style="animation-delay: 0.32s;">
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
                zona de pe server, numărul de jucători etc
            </p>
        </div>
    `;
}

function showFixes() {
    showView(fixesView);
}