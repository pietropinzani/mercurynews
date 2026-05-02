
const body = document.body;
const overlay = document.getElementById('side-menu-overlay');
const stickyHeader = document.getElementById('sticky-header');
const mainHeader = document.getElementById('main-header');
const accountMenu = document.getElementById('account-menu');
const loginBtn = document.querySelector('.login-button');


function chiudiTutto() {
    
    if (sideMenu) {
        sideMenu.classList.remove('open');
        sideMenu.style.left = "-300px";
    }

    
    if (searchBar) {
        searchBar.classList.remove('show');
    }

    
    if (accountMenu) {
        accountMenu.classList.remove('open');
    }

    
    overlay.style.display = "none";
    body.classList.remove('menu-open');

    
    aggiornaSticky();
}


overlay.addEventListener('click', chiudiTutto);


document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") chiudiTutto();
});

function aggiornaSticky() {
    
    if (sideMenu.classList.contains('open') || searchBar.classList.contains('show')) {
        stickyHeader.classList.add('is-sticky');
        stickyHeader.style.display = 'flex';
        mainHeader.classList.add('header-hidden');
        return;
    }

    if (window.scrollY > 65) {
        stickyHeader.classList.add('is-sticky');
        stickyHeader.style.display = 'flex';
        mainHeader.classList.add('header-hidden');
    } else {
        stickyHeader.classList.remove('is-sticky');
        stickyHeader.style.display = 'none';
        mainHeader.classList.remove('header-hidden');
    }
}

window.addEventListener('scroll', aggiornaSticky);

const sideMenu = document.querySelector('.wrapper.pushnav-left');
const sectionButtons = document.querySelectorAll('.btn-section, .icon-hamburger');

function toggleMenu() {
    const isOpen = sideMenu.classList.contains('open');

    if (isOpen) {
        chiudiTutto();
    } else {
        
        chiudiTutto();

        
        sideMenu.classList.add('open');
        sideMenu.style.left = "0";
        overlay.style.display = "block";
        body.classList.add('menu-open');
        aggiornaSticky();
    }
}

sectionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });
});


const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const searchButtons = document.querySelectorAll('.search-button');
searchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        if (searchBar.classList.contains('show')) {
            chiudiTutto();
        } else {
            
            chiudiTutto();
            searchBar.classList.add('show');
            overlay.style.display = "block";
            body.classList.add('menu-open');
            aggiornaSticky();
            setTimeout(() => document.getElementById('search-input').focus(), 100);
        }
    });
});

searchBar.addEventListener('click', (e) => {
    e.stopPropagation();
});



if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const isOpen = accountMenu.classList.contains('open');

        if (isOpen) {
            chiudiTutto();
        } else {
            
            chiudiTutto();

            accountMenu.classList.add('open');
            overlay.style.display = "block";
            body.classList.add('menu-open');
            aggiornaSticky();
        }
    });
}




document.addEventListener('DOMContentLoaded', function() {
    
    const btn = document.getElementById('load-more-photos');
    const targetList = document.querySelector('.media-more');

    if(btn) { 
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            
            targetList.classList.add('is-visible');

            
            this.closest('.show-more-wrapper').style.display = 'none';
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.events-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        
        
        const getScrollAmount = () => {
            const card = track.querySelector('.event-card');
            const style = window.getComputedStyle(track);
            const gap = parseInt(style.columnGap) || 15;
            return card ? card.offsetWidth + gap : 200;
        };

        
        nextBtn.addEventListener('click', () => {
            track.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        
        prevBtn.addEventListener('click', () => {
            track.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        
        track.addEventListener('scroll', () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;

            
            prevBtn.style.opacity = track.scrollLeft <= 0 ? "0.7" : "1";
            prevBtn.style.pointerEvents = track.scrollLeft <= 0 ? "none" : "auto";

            
            nextBtn.style.opacity = track.scrollLeft >= maxScrollLeft - 1 ? "0.7" : "1";
            nextBtn.style.pointerEvents = track.scrollLeft >= maxScrollLeft - 1 ? "none" : "auto";
        });

        
        track.dispatchEvent(new Event('scroll'));
    }
});

