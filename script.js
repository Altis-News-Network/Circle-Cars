// Logo-Animation
window.addEventListener('load', function() {
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' || 
                       window.location.href.endsWith('index.html');
    
    const logoOverlay = document.getElementById('logo-overlay');
    const animatedLogo = document.getElementById('animated-logo');
    const headerLogo = document.querySelector('.logo-img');
    
    if (isHomePage && logoOverlay && animatedLogo && headerLogo) {
        logoOverlay.style.display = 'flex';
        
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
    } else {
        if (logoOverlay) logoOverlay.style.display = 'none';
        if (headerLogo) headerLogo.style.opacity = '1';
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
document.addEventListener('DOMContentLoaded', function() {
    const isCarsPage = window.location.pathname === '/cars' || 
                       window.location.pathname === '/cars.html' || 
                       window.location.href.endsWith('cars.html');
    
    const carConditionToggle = document.getElementById('carCondition');
    
    if (isCarsPage && carConditionToggle) {
        carConditionToggle.addEventListener('change', function() {
            const isUsed = this.checked;
            const carsGrid = document.querySelector('.cars-grid');
            
            if (carsGrid) {
                const cars = Array.from(carsGrid.getElementsByClassName('car-card'));
                
                cars.forEach(car => {
                    const condition = car.dataset.condition;
                    if ((isUsed && condition === 'new') || (!isUsed && condition === 'used')) {
                        car.style.display = 'block';
                    } else {
                        car.style.display = 'none';
                    }
                });
            }
        });
    }
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

// Interaktive Karte
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('interactive-map');
    const mapImage = document.getElementById('map-image');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetBtn = document.getElementById('reset-map');
    
    if (!mapContainer || !mapImage) return;

    // Anti-Drag-and-Drop für das Bild
    mapImage.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
        
    // Verhindert das Kontextmenü (rechte Maustaste)
    mapImage.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX, startY;
    let lastTranslateX = 0;
    let lastTranslateY = 0;
    
    // Zoom-Grenzen
    const minScale = 1;
    const maxScale = 4;
    const scaleStep = 0.5;
    
    // Zoom-Funktionen
    function updateMapTransform() {
        // Begrenzung der Verschiebung
        const containerRect = mapContainer.getBoundingClientRect();
        const imageRect = mapImage.getBoundingClientRect();
        
        // Berechne die maximalen Verschiebungsgrenzen
        const maxTranslateX = Math.max(0, (imageRect.width * scale - containerRect.width) / 2);
        const maxTranslateY = Math.max(0, (imageRect.height * scale - containerRect.height) / 2);
        
        // Begrenze die Verschiebung
        translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
        translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
        
        mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    function zoomIn() {
        if (scale < maxScale) {
            scale += scaleStep;
            updateMapTransform();
        }
    }
    
    function zoomOut() {
        if (scale > minScale) {
            scale -= scaleStep;
            
            if (scale <= minScale) {
                scale = minScale;
                translateX = 0;
                translateY = 0;
            }
            
            updateMapTransform();
        }
    }
    
    function resetMap() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateMapTransform();
    }
    
    // Event-Listener für Zoom-Buttons
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetBtn.addEventListener('click', resetMap);
    
    mapContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        lastTranslateX = translateX;
        lastTranslateY = translateY;
        mapContainer.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        translateX = lastTranslateX + dx;
        translateY = lastTranslateY + dy;
        updateMapTransform();
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        mapContainer.style.cursor = 'grab';
    });
    
    // Touch-Unterstützung für mobile Geräte
    mapContainer.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            lastTranslateX = translateX;
            lastTranslateY = translateY;
            e.preventDefault();
        }
    });
    
    mapContainer.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        
        translateX = lastTranslateX + dx;
        translateY = lastTranslateY + dy;
        updateMapTransform();
        e.preventDefault();
    });
    
    mapContainer.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Mausrad-Zoom
    mapContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        if (e.deltaY < 0 && scale < maxScale) {
            // Zoom in
            scale += scaleStep;
        } else if (e.deltaY > 0 && scale > minScale) {
            // Zoom out
            scale -= scaleStep;
            
            if (scale <= minScale) {
                scale = minScale;
                translateX = 0;
                translateY = 0;
                updateMapTransform();
                return;
            }
        }
        
        updateMapTransform();
    });
    
    resetMap();
});

// Drehende Visitenkarten
document.addEventListener('DOMContentLoaded', function() {
    // Nur für Touch-Geräte, um Tippen zu ermöglichen
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.toggle('touch-flip');
            });
        });
        
        // Zusätzliche CSS-Klasse für Touch-Geräte
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .card.touch-flip {
                    transform: rotateY(180deg);
                }
            </style>
        `);
    }
});