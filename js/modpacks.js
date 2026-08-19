// ===== Modpacks Data =====
// To add a new modpack, simply add a new object to the MODPACKS array below.
// Each modpack needs:
//   id:        unique identifier (used for the detail view)
//   title:     the name shown on the card
//   icon:      image shown on the card (optional - falls back to a default)
//   images:    array of image paths shown in the detail view
//   description: text shown in the detail view (can include <br> for line breaks)
//   downloadUrl: the link the download button goes to
//   downloadLabel: text on the download button (optional, defaults to "Descarcă")

const MODPACKS = [
    {
        id: 'modpack-1',
        title: '🔥 VISION CORE 🔥',
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