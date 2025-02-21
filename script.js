//Logo-Animation
window.addEventListener('load', function() {
    const animatedLogo = document.getElementById('animated-logo');
    const logoOverlay = document.getElementById('logo-overlay');
    const headerLogo = document.querySelector('.logo-img');
    
    setTimeout(function() {
        animatedLogo.classList.add('final-position');
        logoOverlay.style.backgroundColor = 'transparent';
        
        setTimeout(function() {
            headerLogo.style.opacity = '1';
        }, 1500);
        
        animatedLogo.addEventListener('transitionend', function() {
            logoOverlay.style.display = 'none';
        });
    }, 1000);
    
    document.addEventListener('click', skipAnimation);
    
    function skipAnimation() {
        document.removeEventListener('click', skipAnimation);
        headerLogo.style.opacity = '1';
        logoOverlay.style.display = 'none';
    }
});

// Hamburger Menu
document.querySelector('.hamburger-button').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Header Scroll Animation
let lastScrollPosition = 0;
const header = document.querySelector('.main-header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    const scrollDifference = currentScrollPosition - lastScrollPosition;
    
    const currentTransform = header.style.transform 
        ? parseFloat(header.style.transform.replace('translateY(', '').replace('%)', '')) 
        : 0;
    
    let newPosition = currentTransform - (scrollDifference / 5);
    newPosition = Math.min(0, Math.max(-100, newPosition));
    
    header.style.transform = `translateY(${newPosition}%)`;
    
    lastScrollPosition = currentScrollPosition;
});

// Sortierung der Fahrzeuge
document.querySelectorAll('.sort-dropdown:first-child .slide li').forEach(item => {
    item.addEventListener('click', () => {
        const sortBy = item.dataset.sort;
        const order = item.dataset.order;
        
        const carsGrid = document.querySelector('.cars-grid');
        const cars = Array.from(carsGrid.getElementsByClassName('car-card'));
        
        cars.sort((a, b) => {
            const aValue = parseInt(a.dataset[sortBy]);
            const bValue = parseInt(b.dataset[sortBy]);
            return order === 'asc' ? aValue - bValue : bValue - aValue;
        });
        
        cars.forEach(car => carsGrid.appendChild(car));
        
        document.getElementById('touch').checked = false;
        
        const dropdownSpan = document.querySelector('.sort-dropdown:first-child span');
        dropdownSpan.textContent = item.textContent;
    });
});

// Markenfilterung
document.querySelectorAll('.sort-dropdown:nth-child(2) .slide li').forEach(item => {
    item.addEventListener('click', () => {
        const selectedBrand = item.dataset.brand;
        const carsGrid = document.querySelector('.cars-grid');
        const cars = Array.from(carsGrid.getElementsByClassName('car-card'));
        
        cars.forEach(car => {
            if (selectedBrand === 'all' || car.dataset.brand === selectedBrand) {
                car.style.display = 'block';
            } else {
                car.style.display = 'none';
            }
        });
        
        document.getElementById('touch2').checked = false;
        
        const dropdownSpan = document.querySelector('.sort-dropdown:nth-child(2) span');
        dropdownSpan.textContent = item.textContent;
    });
});

// Dynamische Höhe der Dropdowns, initiale Sortierung und Neuwagen-Anzeige
document.addEventListener('DOMContentLoaded', () => {
    const sortDropdown = document.querySelector('.sort-dropdown:first-child .slide');
    const brandDropdown = document.querySelector('.sort-dropdown:nth-child(2) .slide');
    
    if (sortDropdown && brandDropdown) {
        sortDropdown.style.setProperty('--item-count', sortDropdown.children.length);
        brandDropdown.style.setProperty('--item-count', brandDropdown.children.length);

        const carsGrid = document.querySelector('.cars-grid');
        if (carsGrid) {
            const cars = Array.from(carsGrid.getElementsByClassName('car-card'));
            
            // Initiale Sortierung nach Preis absteigend
            cars.sort((a, b) => {
                const aValue = parseInt(a.dataset.price);
                const bValue = parseInt(b.dataset.price);
                return bValue - aValue;
            });
            
            // Nur Neuwagen initial anzeigen
            cars.forEach(car => {
                if (car.dataset.condition === 'new') {
                    car.style.display = 'block';
                } else {
                    car.style.display = 'none';
                }
                carsGrid.appendChild(car);
            });
        }
    }
});

// Toggle für Gebraucht-/Neuwagen
document.getElementById('carCondition').addEventListener('change', function() {
    const isUsed = this.checked;
    const carsGrid = document.querySelector('.cars-grid');
    const cars = Array.from(carsGrid.getElementsByClassName('car-card'));
    
    cars.forEach(car => {
        const condition = car.dataset.condition;
        if ((isUsed && condition === 'new') || (!isUsed && condition === 'used')) {
            car.style.display = 'block';
        } else {
            car.style.display = 'none';
        }
    });
});

// Gallery Navigation
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.gallery-track');
    const images = track.querySelectorAll('.gallery-image');
    const prev = document.querySelector('.gallery-nav.prev');
    const next = document.querySelector('.gallery-nav.next');
    
    let currentIndex = 1;
    
    function updateGallery() {
        const offset = -(currentIndex * 35) + 33;
        track.style.transform = `translateX(${offset}%)`;
    }
    
    next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
    });
    
    prev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery();
    });
    
    updateGallery();
});
