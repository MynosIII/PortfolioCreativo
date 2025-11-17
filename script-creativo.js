document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE MODALES (ISLAS) ---
    const islas = document.querySelectorAll('.isla');
    const botonesCerrar = document.querySelectorAll('.modal-cerrar');

    islas.forEach(isla => {
        isla.addEventListener('click', () => {
            const modalId = isla.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('visible');
            }
        });
    });

    botonesCerrar.forEach(boton => {
        boton.addEventListener('click', () => {
            const modal = boton.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('visible');
            }
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('visible');
            }
        });
    });

    // --- LÓGICA NUEVA DEL MAPA (SIN GIFS) ---

    const mapaContainer = document.getElementById('mapa-scroll-container');
    const tooltip = document.getElementById('mapa-tooltip');
    
    // Zonas de click separadas
    const openZone = document.querySelector('.mapa-open-zone');
    const closeZones = document.querySelectorAll('.mapa-toggle-zone');
    
    let isMapOpen = false;
    let hasMapOpenedOnce = false; // Flag para el primer scroll

    // Función para abrir el mapa
    function openMap() {
        if (isMapOpen) return; // Ya está abierto
        mapaContainer.classList.add('is-open');
        isMapOpen = true;
    }

    // Función para cerrar el mapa
    function closeMap() {
        if (!isMapOpen) return; // Ya está cerrado
        mapaContainer.classList.remove('is-open');
        isMapOpen = false;
    }

    // 1. Zona de APERTURA (Centro)
    if (openZone) {
        openZone.addEventListener('click', openMap);
        
        openZone.addEventListener('mouseenter', () => {
            tooltip.textContent = 'Abrir mapa de contenidos';
            tooltip.style.display = 'block';
        });
        openZone.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    }

    // 2. Zonas de CIERRE (Costados)
    closeZones.forEach(zone => {
        zone.addEventListener('click', closeMap);

        zone.addEventListener('mouseenter', () => {
            tooltip.textContent = 'Cerrar mapa de contenidos';
            tooltip.style.display = 'block';
        });
        zone.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });

    // Mover el tooltip con el mouse
    window.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 15 + 'px';
        tooltip.style.top = e.pageY + 15 + 'px';
    });

    // 3. Abrir en el PRIMER SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasMapOpenedOnce && !isMapOpen) {
                openMap();
                hasMapOpenedOnce = true;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Se activa cuando el 50% del mapa está visible
    });

    if (mapaContainer) {
        observer.observe(mapaContainer);
    }

});

/* === CÓDIGO PARA MOCHILA INTERACTIVA === */
document.addEventListener('DOMContentLoaded', () => {
    
    // ... (Aquí puede ir el resto de tu código JS para los modales, etc.)

    const mochilaBtn = document.getElementById('mochila-toggle-btn');
    const stackItems = document.querySelectorAll('.stack-item');
    
    if (mochilaBtn && stackItems.length > 0) {
        let itemsVisible = true; // El estado inicial es visible
        
        mochilaBtn.style.cursor = 'pointer';
        mochilaBtn.setAttribute('title', 'Ocultar/Mostrar habilidades'); // Añade un tooltip
        
        mochilaBtn.addEventListener('click', () => {
            // Invierte el estado
            itemsVisible = !itemsVisible; 
            
            // Aplica el estilo a cada item
            stackItems.forEach(item => {
                if (itemsVisible) {
                    // Mostrar items
                    item.style.opacity = '1';
                    item.style.pointerEvents = 'auto';
                    // Restablece la transformación por si la usaste al ocultar
                    item.style.transform = item.style.originalTransform || ''; 
                } else {
                    // Ocultar items
                    // Guardar la transformación original si no se ha hecho
                    if (!item.style.originalTransform) {
                        item.style.originalTransform = window.getComputedStyle(item).transform;
                    }
                    item.style.opacity = '0';
                    item.style.pointerEvents = 'none';
                }
            });
        });
    }

});

