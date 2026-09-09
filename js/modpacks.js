// ===== Modpacks Data =====
// To add a new modpack, simply add a new object to the MODPACKS array below.
// Each modpack needs:
//   id:        unique identifier (used for the detail view)
//   title:     the name shown on the card
//   category:      category the modpack belongs to
//   icon:      image shown on the card (optional - falls back to a default)
//   images:    array of image paths shown in the detail view
//   description: text shown in the detail view (can include <br> for line breaks)
//   downloadUrl: the link the download button goes to
//   downloadLabel: text on the download button (optional, defaults to "Descarcă")
const MODPACK_CATEGORY_INFO = {
    RAGEMP: {
        description: 'INCOMPATIBILE CU FIVEM'
    },

    FiveM: {
        description: ''
    }
};
const MODPACKS = [
    {
        id: 'modpack-6',
        title: '☁️ NEBULA SKY ☁️',
        category: 'FiveM',
        icon: 'img/icons/icon8.png',
        images: [
            'img/modpacks/f1/image%20(1).webp',
            'img/modpacks/f1/image%20(2).webp',
            'img/modpacks/f1/image%20(3).webp',
            'img/modpacks/f1/image%20(4).webp',
        ],
        description: `✨ Descriere:
☁️ Nebula Sky este un mod de cer creat pentru a oferi un aspect mai plăcut și mai realist atmosferei din FiveM, fără să afecteze performanța jocului.

🚀 OPTIMIZAT PENTRU FPS
Modul este foarte bine optimizat, astfel încât să nu provoace scăderi de FPS sau probleme de performanță în timpul jocului.

📖 Instalare:
🛠️ 1. Descărcați și deschideți arhiva Nebula Sky.
📂 2. Extrageți conținutul arhivei (din folder-ul Nebula Sky) în folderul:

» C:\\Users\\NUMELE-TAU\\AppData\\Local\\FiveM\\FiveM Application Data
📌 „NUMELE-TAU” reprezintă username-ul contului vostru de Windows.

Exemplu:
» C:\\Users\\Bogdan\\AppData\\Local\\FiveM\\FiveM Application Data

📌 Dacă Windows vă cere să înlocuiți anumite fișiere, selectați „Replace / Înlocuiește”.

⚠️ Notă:
✅ Mod testat și folosit personal înainte de publicare.
Dacă aveți deja alte moduri de cer instalate, este recomandat să le eliminați înainte pentru a evita eventualele conflicte.`,
        downloadUrl: 'https://drive.google.com/drive/folders/164olIfBJ5wDxvBHys55NJt-7fZCcG9fZ?usp=drive_link',
        downloadLabel: 'Descarcă Aici'
    },
    {
        id: 'modpack-7',
        title: '🏔️ MOUNTAIN & SKY ☁️',
        category: 'FiveM',
        icon: 'img/icons/icon8.png',
        images: [
            'img/modpacks/f2/image%20(1).webp',
            'img/modpacks/f2/image%20(2).webp',
            'img/modpacks/f2/image%20(3).webp',
            'img/modpacks/f2/image%20(4).webp',
        ],
        description: `✨ Descriere:
🏔️ Mountain & Sky este un mod de cer creat pentru a schimba atmosfera vizuală din FiveM, oferind un aspect mai plăcut și mai spectaculos cerului.

🚀 OPTIMIZAT PENTRU FPS
Modul este foarte bine optimizat, astfel încât să nu provoace scăderi semnificative de FPS și să păstreze o experiență smooth în timpul jocului.

📖 Instalare:
🛠️ 1. Descărcați și deschideți arhiva Sky Mountain.
📂 2. Extrageți conținutul arhivei (din folder-ul Sky Mountain) în folderul:

» C:\\Users\\NUMELE-TAU\\AppData\\Local\\FiveM\\FiveM Application Data
📌 „NUMELE-TAU” reprezintă username-ul contului vostru de Windows.

Exemplu:
» C:\\Users\\Bogdan\\AppData\\Local\\FiveM\\FiveM Application Data

📌 Dacă Windows vă cere să înlocuiți anumite fișiere, selectați „Replace / Înlocuiește”.

⚠️ Notă:
✅ Mod testat și folosit personal înainte de publicare.
Dacă aveți deja alte moduri de cer instalate, este recomandat să le eliminați înainte pentru a evita eventualele conflicte.`,
        downloadUrl: 'https://drive.google.com/drive/folders/1fBqmNPNGwjHWdRklhzevBO-gkHVHb2VX?usp=drive_link',
        downloadLabel: 'Descarcă Aici'
    },
    {
        id: 'modpack-8',
        title: '🌌 NORTHERN LIGHT GREEN 🌌',
        category: 'FiveM',
        icon: 'img/icons/icon8.png',
        images: [
            'img/modpacks/f3/image%20(1).webp',
            'img/modpacks/f3/image%20(2).webp',
            'img/modpacks/f3/image%20(3).webp',
            'img/modpacks/f3/image%20(4).webp',
            'img/modpacks/f3/image%20(5).webp',
        ],
        youtubeId: 'p16dPK7MV_U',
        description: `✨ Descriere:
🌌 Northern Light Green este un mod de cer creat pentru a oferi FiveM-ului o atmosferă mai spectaculoasă, cu un cer inspirat de aurora boreală în nuanțe de verde. 💚

🚀 OPTIMIZAT PENTRU FPS
Modul este foarte bine optimizat, astfel încât să nu provoace scăderi semnificative de FPS și să păstreze o experiență smooth în timpul jocului.

📖 Instalare:
🛠️ 1. Descărcați și deschideți arhiva Northern Light.
📂 2. Extrageți conținutul arhivei (din folder-ul Northern Light) în folderul:

» C:\\Users\\NUMELE-TAU\\AppData\\Local\\FiveM\\FiveM Application Data
📌 „NUMELE-TAU” reprezintă username-ul contului vostru de Windows.

Exemplu:
» C:\\Users\\Bogdan\\AppData\\Local\\FiveM\\FiveM Application Data

📌 Dacă Windows vă cere să înlocuiți anumite fișiere, selectați „Replace / Înlocuiește”.

⚠️ Notă:
✅ Mod testat și folosit personal înainte de publicare.
Dacă aveți deja alte moduri de cer instalate, este recomandat să le eliminați înainte pentru a evita eventualele conflicte.`,
        downloadUrl: 'https://drive.google.com/drive/folders/1P3Tis_hOVD9TO2Gk8FGAblyF9Dxm3eXp?usp=drive_link',
        downloadLabel: 'Descarcă Aici'
    },
    {
        id: 'modpack-9',
        title: '🖤 MAFIA MODPACK 🖤',
        category: 'FiveM',
        icon: 'img/icons/icon8.png',
        images: [
            'img/modpacks/f4/image%20(1).webp',
            'img/modpacks/f4/image%20(2).webp',
            'img/modpacks/f4/image%20(3).webp',
            'img/modpacks/f4/image%20(4).webp',
            'img/modpacks/f4/image%20(5).webp',
        ],
        youtubeId: 'vjV0iZVqMRU',
        description: `✨ Descriere:
🖤 Mafia Modpack este un modpack creat pentru a oferi vizibilitate maximă și claritate în FiveM, fără să sacrifice prea mult din aspectul grafic original al jocului. 🖤

Modpack-ul este gândit pentru cei care vor să vadă cât mai clar și cât mai bine în timpul jocului, păstrând în același timp un aspect plăcut și apropiat de grafica originală.

🚀 OPTIMIZAT PENTRU PERFORMANȚĂ
Modpack-ul nu necesită resurse suplimentare semnificative. În funcție de PC și de setările folosite, acesta poate oferi chiar și un mic boost de FPS.

🎯 VIZIBILITATE MAXIMĂ
✅ Claritate îmbunătățită
✅ Vizibilitate cât mai bună
✅ Pierdere minimă din grafica originală
✅ Consum redus de resurse
✅ Posibil mic boost de FPS

📖 Instalare:
🛠️ 1. Descărcați și deschideți arhiva Mafia Modpack.
📂 2. Copiați tot conținutul arhivei.
📁 3. Accesați următoarea locație:

» C:\\Users\\NUMELE-TAU\\AppData\\Local\\FiveM\\FiveM Application Data

📌 „NUMELE-TAU” reprezintă username-ul contului vostru de Windows.

Exemplu:
» C:\\Users\\Bogdan\\AppData\\Local\\FiveM\\FiveM Application Data

📥 4. În folderul FiveM Application Data, lipiți tot conținutul arhivei.

📌 Dacă Windows vă cere să înlocuiți anumite fișiere, selectați „Replace / Înlocuiește”.

⚠️ Notă:
✅ Modpack testat și folosit personal înainte de publicare.
🎮 După instalare, porniți FiveM și vă puteți bucura de Mafia Modpack.`,
        downloadUrl: 'https://drive.google.com/drive/folders/1RWe7oJrSutcJPhZzQVwOW-e115RkxHdU?usp=drive_link',
        downloadLabel: 'Descarcă Aici'
    },
    {
        id: 'modpack-1',
        title: '🔥 VISION CORE 🔥',
        category: 'RAGEMP',
        icon: 'img/icons/icon8.png',
        images: [
            'img/modpacks/m1/image%20(1).webp',
            'img/modpacks/m1/image%20(2).webp',
            'img/modpacks/m1/image%20(3).webp',
            'img/modpacks/m1/image%20(4).webp',
            'img/modpacks/m1/image%20(5).webp',
            'img/modpacks/m1/image%20(6).webp',
        ],
        description: `📖 Instrucțiuni:
🛠️ 1. Copiați conținutul folderului "ENB" în folderul RAGE:MP, apoi, din "Vision Core", copiați folderul "user_resource" în folderul RAGE:MP.

Pentru a modifica setarile ENB-ului, folositi combinatia de taste "Shift+F10" in joc.

⚠️ Notă:
✅ Modpack testat și verificat înainte de publicare.`,
        downloadUrl: 'https://drive.google.com/file/d/1X8ZmyBFexxaIONI-H6-iFjz2bcHUsjR7/view?usp=drive_link',
        downloadLabel: 'Descarcă Aici'
    },
    {
        id: 'modpack-2',
        title: '💎 MODPACK HIGH PC by Anduku 💎',
        category: 'RAGEMP',
        icon: 'img/icons/icon8.png',
        images: [
            'img/modpacks/m2/image%20(1).webp',
            'img/modpacks/m2/image%20(2).webp',
            'img/modpacks/m2/image%20(3).webp',
            'img/modpacks/m2/image%20(4).webp',
            'img/modpacks/m2/image%20(5).webp',
            'img/modpacks/m2/image%20(6).webp',
        ],
        description: `✨ Ce oferă?
🎨 Grafică îmbunătățită
🌅 Iluminare și culori mai realiste
⚡ Efecte vizuale optimizate
🚀 Performanță excelentă pentru PC-uri High-End

📖 Instalare:
📂 Extrageți conținutul arhivei în folderul RAGE.

⚠️ Informații:
✅ Modpack testat și folosit personal înainte de publicare.
💻 Recomandat pentru PC-uri High-End, pentru cea mai bună experiență de joc.`,
        downloadUrl: 'https://drive.google.com/file/d/1447-KJ9VdmOYz-vL7R9fK44HHHvZJ5wF/view',
        downloadLabel: 'Descarcă Aici'
    },
    {
        id: 'modpack-3',
        title: '⚡ MODPACK MEDIUM PC – Calin Blackout ⚡',
        category: 'RAGEMP',
        icon: 'img/icons/icon8.png',
        images: [
            'img/modpacks/m3/image%20(1).webp',
            'img/modpacks/m3/image%20(2).webp',
            'img/modpacks/m3/image%20(3).webp',
            'img/modpacks/m3/image%20(4).webp',
        ],
        description: `✨ Ce oferă?
🖥️ Optimizat pentru PC-uri Medium-End
🎨 Grafică echilibrată și efecte vizuale plăcute
⚡ Performanță stabilă, fără a sacrifica prea multe detalii
🎯 Ideal pentru un gameplay fluid și o experiență vizuală îmbunătățită

📖 Instalare:
🛠️ Rulați installer-ul, apoi apăsați Next până la final.
📂 Installer-ul va detecta automat folderul RAGE, astfel că nu este nevoie să selectați manual locația.

⚠️ Informații:
✅ Modpack testat și folosit personal înainte de publicare.
💻 Recomandat pentru PC-uri Medium-End.`,
        downloadUrl: 'https://drive.google.com/file/d/12n2MGo6xaWdZX_9bBsQtbK_IuY-FxE_G/view?usp=drive_link',
        downloadLabel: 'Descarcă Aici'
    },
    {
        id: 'modpack-4',
        title: '🌌 CONSTELLATION SKY 🌌',
        category: 'RAGEMP',
        icon: 'img/icons/icon8.png',
        images: [
            'img/modpacks/m4/image%20(1).webp',
            'img/modpacks/m4/image%20(2).webp',
            'img/modpacks/m4/image%20(3).webp',
        ],
        description: `✨ Ce oferă?
🌌 Un cer complet nou, cu un aspect mult mai realist și detaliat.
⭐ Stele mai clare și o atmosferă vizuală îmbunătățită.
🎮 Perfect pentru un plus de imersiune în joc.

📖 Instalare:
📂 Copiați folderul „user_resource” din arhivă în folderul RAGE.

⚠️ Informații:
✅ Mod testat și folosit personal înainte de publicare.
🌙 Compatibil cu majoritatea modpack-urilor și ideal pentru o experiență vizuală mai plăcută.`,
        downloadUrl: 'https://drive.google.com/file/d/1Af8Leynl6TXSJUVmOI0jdZE_ZdukNYf4/view?usp=drive_link',
        downloadLabel: 'Descarcă Aici'
    },
    {
        id: 'modpack-5',
        title: '🔥 REALISTIC6 2.0 🔥',
        category: 'RAGEMP',
        icon: 'img/icons/icon8.png',
        images: [
            'img/modpacks/m5/image%20(1).webp',
            'img/modpacks/m5/image%20(2).webp',
            'img/modpacks/m5/image%20(3).webp',
            'img/modpacks/m5/image%20(4).webp',
            'img/modpacks/m5/image%20(5).webp',
            'img/modpacks/m5/image%20(6).webp',
            'img/modpacks/m5/image%20(7).webp',
        ],
        description: `✨ Ce oferă?
🌆 Grafică mai realistă și atmosferă îmbunătățită
🎨 Efecte vizuale și iluminare optimizate
🚀 Experiență de joc mai immersivă
💻 Potrivit pentru o experiență vizuală de calitate

📖 Instalare:
🛠️ Pasul 1: Copiați conținutul folderului „core mod” în folderul RAGE.

🌌 Pasul 2: Copiați conținutul folderului „ENB” în folderul RAGE.

🧪 Testare:
✅ Modpack-ul a fost testat și probat înainte de publicare, pentru a mă asigura că funcționează corespunzător și oferă o experiență cât mai bună.`,
        downloadUrl: 'https://drive.google.com/file/d/1VF8iZTzivNgBoiGyf08YdOv3E7h5zBDr/view?usp=drive_link',
        downloadLabel: 'Descarcă Aici'
    }
];