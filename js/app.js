
/*==================================
             STICKY MENU
===================================*/
const stickyHeader = document.getElementById('sticky-header');


window.addEventListener('scroll', function() {
    const stickyHeader = document.getElementById('sticky-header');
    const mainHeader = document.getElementById('main-header');

    if (sideMenu.classList.contains('open')) return;
    if (window.scrollY > 65) {
        stickyHeader.classList.add('is-sticky');
        mainHeader.classList.add('header-hidden'); // Nasconde l'header grande
    } else {
        stickyHeader.classList.remove('is-sticky');
        mainHeader.classList.remove ('header-hidden'); // Mostra l'header grande
    }
});

/*==================================
             SIDEBAR
===================================*/

// Selezioniamo gli elementi
const sideMenu = document.querySelector('.wrapper.pushnav-left');
const overlay = document.getElementById('side-menu-overlay');
const body = document.body;
// Selezioniamo TUTTI i tasti "All Sections" (sia Main che Sticky)
// Assicurati che i tuoi tasti abbiano una classe comune, ad esempio .btn-section
const sectionButtons = document.querySelectorAll('.btn-section, .icon-hamburger');

function toggleMenu() {
    const isOpen = sideMenu.classList.contains('open');

    if (isOpen) {
        // CHIUDI
        sideMenu.classList.remove('open');
        sideMenu.style.left = "-300px"; // O il valore della larghezza del tuo menu
        overlay.style.display = "none";
        body.classList.remove('menu-open');
        aggiornaSticky();

    } else {
        // APRI
        sideMenu.classList.add('open');
        sideMenu.style.left = "0";
        overlay.style.display = "block";
        body.classList.add('menu-open');
        aggiornaSticky();
    }
}

// Colleghiamo la funzione a tutti i tasti Section
sectionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Impedisce scatti della pagina
        toggleMenu();
    });
});

// Chiudi il menu se l'utente clicca fuori (sull'overlay)
overlay.addEventListener('click', toggleMenu);

function aggiornaSticky() {
    const stickyHeader = document.getElementById('sticky-header');

    // Se il menu è aperto, lo sticky DEVE essere visibile
    if (sideMenu.classList.contains('open')) {
        stickyHeader.style.display = 'flex';
        return;
    }

    // Se il menu è chiuso, decidiamo in base allo scroll
    if (window.scrollY > 60) {
        stickyHeader.style.display = 'flex';
    } else {
        stickyHeader.style.display = 'none';
    }
}

window.addEventListener('scroll', aggiornaSticky);