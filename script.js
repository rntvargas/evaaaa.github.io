// Variables globales
let currentTheme = 'light';
let musicPlaying = false;

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Inicializando página para Eva...');
    
    // Inicializar componentes básicos
    initThemeToggle();
    initMusicControl();
    initParticles();
    initCountdown();
    initHoverEffects();
    
    // Crear efectos iniciales
    setTimeout(() => {
        createWelcomeAnimation();
    }, 1000);
    
    console.log('✅ Página inicializada correctamente!');
});

// Sistema de toggle de tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('eva-theme') || 'light';
    setTheme(savedTheme);
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eva-theme', theme);
    
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Sistema de control de música
function initMusicControl() {
    const musicToggle = document.getElementById('musicToggle');
    if (!musicToggle) return;
    
    musicToggle.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    const musicIcon = document.querySelector('#musicToggle i');
    if (!musicIcon) return;
    
    if (musicPlaying) {
        musicIcon.className = 'fas fa-music';
        musicPlaying = false;
        showNotification('Música pausada');
    } else {
        musicIcon.className = 'fas fa-pause';
        musicPlaying = true;
        showNotification('Música activada');
        playSimpleBeep();
    }
}

function playSimpleBeep() {
    if (!musicPlaying) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Nota A
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        
        // Repetir cada 3 segundos
        setTimeout(playSimpleBeep, 3000);
    } catch (error) {
        console.log('Audio no disponible');
    }
}

// Sistema de partículas simplificado
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        createSimpleParticle(particlesContainer);
    }
}

function createSimpleParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Tamaño aleatorio
    const size = Math.random() * 6 + 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.borderRadius = '50%';
    
    // Color aleatorio
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Animación
    particle.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    
    container.appendChild(particle);
}

// Contador regresivo
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextAugust = new Date(currentYear, 7, 1); // Agosto es mes 7
    
    // Si ya pasó el 1 de agosto de este año, usar el del próximo año
    if (now > nextAugust) {
        nextAugust = new Date(currentYear + 1, 7, 1);
    }
    
    const timeDiff = nextAugust - now;
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    countdownElement.innerHTML = `
        <div class="countdown-item">
            <span class="countdown-number">${days}</span>
            <span class="countdown-label-small">Días</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-number">${hours}</span>
            <span class="countdown-label-small">Horas</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-number">${minutes}</span>
            <span class="countdown-label-small">Min</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-number">${seconds}</span>
            <span class="countdown-label-small">Seg</span>
        </div>
    `;
}

// Efectos de hover
function initHoverEffects() {
    const cards = document.querySelectorAll('.memory-card, .wish-item, .message-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Efectos especiales simplificados
function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = Math.random() * 8 + 4 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        // Animación simple
        let pos = -10;
        const speed = Math.random() * 3 + 2;
        
        const fall = setInterval(() => {
            pos += speed;
            confetti.style.top = pos + 'px';
            confetti.style.transform = `rotate(${pos * 2}deg)`;
            
            if (pos > window.innerHeight + 50) {
                clearInterval(fall);
                confetti.remove();
            }
        }, 16);
    }
    
    showNotification('¡Confeti! 🎉');
}

function createHearts() {
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = Math.random() * 15 + 15 + 'px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);
        
        // Animación hacia arriba
        let pos = window.innerHeight;
        const speed = Math.random() * 2 + 1;
        
        const rise = setInterval(() => {
            pos -= speed;
            heart.style.top = pos + 'px';
            heart.style.opacity = Math.max(0, pos / window.innerHeight);
            
            if (pos < -50) {
                clearInterval(rise);
                heart.remove();
            }
        }, 16);
    }
    
    showNotification('¡Corazones! ❤️');
}

function createStars() {
    const starCount = 12;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.position = 'fixed';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';
        star.style.fontSize = Math.random() * 20 + 15 + 'px';
        star.style.zIndex = '1000';
        star.style.pointerEvents = 'none';
        
        document.body.appendChild(star);
        
        // Animación de brillo
        let opacity = 1;
        let growing = false;
        
        const twinkle = setInterval(() => {
            if (growing) {
                opacity += 0.05;
                if (opacity >= 1) growing = false;
            } else {
                opacity -= 0.05;
                if (opacity <= 0.3) growing = true;
            }
            
            star.style.opacity = opacity;
            star.style.transform = `scale(${opacity}) rotate(${Date.now() * 0.01}deg)`;
        }, 50);
        
        setTimeout(() => {
            clearInterval(twinkle);
            star.remove();
        }, 3000);
    }
    
    showNotification('¡Estrellas! ⭐');
}

function createFireworks() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D'];
    
    for (let f = 0; f < 3; f++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * (window.innerHeight / 2) + 100;
            
            for (let i = 0; i < 20; i++) {
                const spark = document.createElement('div');
                spark.style.position = 'fixed';
                spark.style.left = centerX + 'px';
                spark.style.top = centerY + 'px';
                spark.style.width = '4px';
                spark.style.height = '4px';
                spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                spark.style.borderRadius = '50%';
                spark.style.zIndex = '1000';
                spark.style.pointerEvents = 'none';
                
                document.body.appendChild(spark);
                
                const angle = (Math.PI * 2 * i) / 20;
                const velocity = Math.random() * 100 + 50;
                
                let x = centerX;
                let y = centerY;
                let vx = Math.cos(angle) * velocity * 0.01;
                let vy = Math.sin(angle) * velocity * 0.01;
                
                const animate = setInterval(() => {
                    x += vx;
                    y += vy;
                    vy += 0.2; // gravedad
                    
                    spark.style.left = x + 'px';
                    spark.style.top = y + 'px';
                    spark.style.opacity = Math.max(0, spark.style.opacity - 0.02);
                    
                    if (y > window.innerHeight + 50 || spark.style.opacity <= 0) {
                        clearInterval(animate);
                        spark.remove();
                    }
                }, 16);
            }
        }, f * 500);
    }
    
    showNotification('¡Fuegos artificiales! 🎆');
}

// Animación de bienvenida
function createWelcomeAnimation() {
    const title = document.querySelector('.main-title');
    if (title) {
        title.style.animation = 'pulse 0.5s ease-in-out 3';
    }
    
    showNotification('¡Bienvenida Eva! 🎉');
}

// Función para compartir
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: '¡Feliz 1 de Agosto, Eva!',
            text: 'Una página especial creada con amor para Eva',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Copiar URL al portapapeles
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification('¡URL copiada al portapapeles!');
            });
        } else {
            showNotification('URL: ' + url);
        }
    }
}

// Mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = '#FF6B6B';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '25px';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = '600';
    notification.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.3)';
    notification.style.fontSize = '14px';
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-50%) translateY(-20px)';
    
    setTimeout(() => {
        notification.style.transition = 'all 0.3s ease';
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Efectos de clic
document.addEventListener('click', (e) => {
    // Crear pequeño efecto de ondas
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 107, 107, 0.6)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    
    document.body.appendChild(ripple);
    
    // Animación
    let scale = 0;
    const animate = setInterval(() => {
        scale += 0.2;
        ripple.style.transform = `translate(-50%, -50%) scale(${scale})`;
        ripple.style.opacity = Math.max(0, 1 - scale / 4);
        
        if (scale >= 4) {
            clearInterval(animate);
            ripple.remove();
        }
    }, 16);
});

console.log('🎨 JavaScript cargado correctamente!');

