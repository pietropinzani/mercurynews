
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

/*==================================
             NEW PHOTOS
===================================*/

document.addEventListener('DOMContentLoaded', function() {
    // Usiamo l'ID specifico
    const btn = document.getElementById('load-more-photos');
    const targetList = document.querySelector('.media-more');

    if(btn) { // Controllo di sicurezza: esegui solo se il tasto esiste nella pagina
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // Mostra la griglia
            targetList.classList.add('is-visible');

            // Nasconde tutto il contenitore del tasto (linea e triangolo inclusi)
            this.closest('.show-more-wrapper').style.display = 'none';
        });
    }
});

/*==================================
             SLIDESHOW
===================================*/

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.events-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        // Calcoliamo quanto scorrere: la larghezza di una card + il gap
        // Usiamo una funzione per ricalcolarlo se la finestra viene ridimensionata
        const getScrollAmount = () => {
            const card = track.querySelector('.event-card');
            const style = window.getComputedStyle(track);
            const gap = parseInt(style.columnGap) || 15;
            return card ? card.offsetWidth + gap : 200;
        };

        // Bottone Avanti
        nextBtn.addEventListener('click', () => {
            track.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Bottone Indietro
        prevBtn.addEventListener('click', () => {
            track.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Opzionale: Nascondere le frecce se non c'è più nulla da scorrere
        track.addEventListener('scroll', () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;

            // Nascondi "indietro" se siamo all'inizio
            prevBtn.style.opacity = track.scrollLeft <= 0 ? "0.3" : "1";
            prevBtn.style.pointerEvents = track.scrollLeft <= 0 ? "none" : "auto";

            // Nascondi "avanti" se siamo alla fine
            nextBtn.style.opacity = track.scrollLeft >= maxScrollLeft - 1 ? "0.3" : "1";
            nextBtn.style.pointerEvents = track.scrollLeft >= maxScrollLeft - 1 ? "none" : "auto";
        });

        // Eseguiamo il controllo iniziale per la freccia "prev"
        track.dispatchEvent(new Event('scroll'));
    }
});