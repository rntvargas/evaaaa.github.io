// Variables globales
let currentTheme = 'light';
let musicPlaying = false;
let particleSystem = null;
let customCursor = null;
let customCursorTrail = null;

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función principal de inicialización
function initializeApp() {
    // Inicializar componentes
    initCustomCursor();
    initThemeToggle();
    initMusicControl();
    initParticleSystem();
    initCountdown();
    initTypewriterEffect();
    initSurpriseButtons();
    initScrollEffects();
    initHoverEffects();
    
    // Crear efectos iniciales
    setTimeout(() => {
        createWelcomeAnimation();
    }, 1000);
    
    // Configurar eventos
    setupEventListeners();
    
    console.log('🎉 Página web para Eva inicializada correctamente!');
}

// Sistema de cursor personalizado
function initCustomCursor() {
    customCursor = document.querySelector('.custom-cursor');
    customCursorTrail = document.querySelector('.custom-cursor-trail');
    
    if (!customCursor || !customCursorTrail) return;
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        customCursor.style.left = mouseX + 'px';
        customCursor.style.top = mouseY + 'px';
    });
    
    // Animación suave para el trail
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        customCursorTrail.style.left = trailX + 'px';
        customCursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Efectos en hover
    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches('button, a, .memory-card, .wish-item')) {
            customCursor.style.transform = 'scale(1.5)';
        }
    });
    
    document.addEventListener('mouseleave', (e) => {
        if (e.target.matches('button, a, .memory-card, .wish-item')) {
            customCursor.style.transform = 'scale(1)';
        }
    });
}

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
    
    // Actualizar partículas según el tema
    if (particleSystem) {
        updateParticleColors();
    }
}

// Sistema de control de música
function initMusicControl() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (!musicToggle || !backgroundMusic) return;
    
    musicToggle.addEventListener('click', toggleMusic);
    
    // Configurar audio
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true;
}

function toggleMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicIcon = document.querySelector('#musicToggle i');
    
    if (!backgroundMusic || !musicIcon) return;
    
    if (musicPlaying) {
        backgroundMusic.pause();
        musicIcon.className = 'fas fa-music';
        musicPlaying = false;
    } else {
        // Crear un tono suave programáticamente
        playBackgroundTone();
        musicIcon.className = 'fas fa-pause';
        musicPlaying = true;
    }
}

function playBackgroundTone() {
    // Crear contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Crear osciladores para una melodía suave
    const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00]; // C, D, E, F, G
    let currentNote = 0;
    
    function playNote() {
        if (!musicPlaying) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequencies[currentNote], audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 2);
        
        currentNote = (currentNote + 1) % frequencies.length;
        
        setTimeout(playNote, 3000);
    }
    
    playNote();
}

// Sistema de partículas mejorado
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    particleSystem = {
        container: particlesContainer,
        particles: [],
        types: ['circle', 'heart', 'star'],
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FFD93D']
    };
    
    createParticles();
    animateParticles();
}

function createParticles() {
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    const type = particleSystem.types[Math.floor(Math.random() * particleSystem.types.length)];
    const color = particleSystem.colors[Math.floor(Math.random() * particleSystem.colors.length)];
    
    particle.className = `particle ${type}`;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    const size = Math.random() * 8 + 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = color;
    
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    
    particleSystem.container.appendChild(particle);
    particleSystem.particles.push(particle);
}

function animateParticles() {
    particleSystem.particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        if (rect.top > window.innerHeight + 100) {
            particle.style.top = '-100px';
            particle.style.left = Math.random() * 100 + '%';
        }
    });
    
    requestAnimationFrame(animateParticles);
}

function updateParticleColors() {
    const newColors = currentTheme === 'dark' 
        ? ['#ecf0f1', '#3498db', '#e74c3c', '#f39c12', '#2ecc71']
        : ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    
    particleSystem.particles.forEach((particle, index) => {
        const color = newColors[index % newColors.length];
        particle.style.background = color;
    });
}

// Contador regresivo
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let nextAugust = new Date(currentYear, 7, 1); // Agosto es mes 7 (0-indexado)
        
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
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Efecto de escritura
function initTypewriterEffect() {
    const textElement = document.getElementById('typewriterText');
    if (!textElement) return;
    
    const originalText = textElement.innerHTML;
    textElement.innerHTML = '';
    textElement.style.borderRight = '3px solid var(--accent-color)';
    
    let i = 0;
    const speed = 50;
    
    function typeWriter() {
        if (i < originalText.length) {
            // Manejar tags HTML
            if (originalText.charAt(i) === '<') {
                let tag = '';
                while (originalText.charAt(i) !== '>' && i < originalText.length) {
                    tag += originalText.charAt(i);
                    i++;
                }
                tag += originalText.charAt(i);
                textElement.innerHTML += tag;
                i++;
            } else {
                textElement.innerHTML += originalText.charAt(i);
                i++;
            }
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(() => {
                textElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    setTimeout(typeWriter, 2000);
}

// Botones de sorpresa
function initSurpriseButtons() {
    const surpriseButtons = document.querySelectorAll('.surprise-btn');
    
    surpriseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const surpriseType = button.getAttribute('data-surprise');
            triggerSurprise(surpriseType, e);
        });
    });
}

function triggerSurprise(type, event) {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    switch (type) {
        case 'confetti':
            createConfetti(x, y);
            break;
        case 'hearts':
            createHearts(x, y);
            break;
        case 'stars':
            createStars(x, y);
            break;
        case 'fireworks':
            createFireworks(x, y);
            break;
    }
    
    // Vibración en dispositivos móviles
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

function createConfetti(x, y) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FFD93D'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.position = 'fixed';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 100;
        const gravity = 500;
        
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let currentX = x;
        let currentY = y;
        let currentVy = vy;
        
        const startTime = Date.now();
        
        function animateConfetti() {
            const elapsed = (Date.now() - startTime) / 1000;
            
            currentX += vx * 0.016;
            currentVy += gravity * 0.016;
            currentY += currentVy * 0.016;
            
            confetti.style.left = currentX + 'px';
            confetti.style.top = currentY + 'px';
            confetti.style.transform = `rotate(${elapsed * 360}deg)`;
            confetti.style.opacity = Math.max(0, 1 - elapsed / 3);
            
            if (elapsed < 3 && currentY < window.innerHeight + 100) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }
        
        requestAnimationFrame(animateConfetti);
    }
}

function createHearts(x, y) {
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + 50;
        const duration = Math.random() * 2000 + 1000;
        
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance - 100;
        
        heart.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${targetX - x}px, ${targetY - y}px) scale(1)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            heart.remove();
        };
    }
}

function createStars(x, y) {
    const starCount = 15;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.position = 'fixed';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.fontSize = Math.random() * 25 + 20 + 'px';
        star.style.zIndex = '1000';
        star.style.pointerEvents = 'none';
        
        document.body.appendChild(star);
        
        const angle = (Math.PI * 2 * i) / starCount;
        const distance = Math.random() * 150 + 100;
        const duration = Math.random() * 1500 + 1000;
        
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;
        
        star.animate([
            { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${targetX - x}px, ${targetY - y}px) scale(1) rotate(360deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            star.remove();
        };
    }
}

function createFireworks(x, y) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D', '#FF8C42'];
    const fireworkCount = 3;
    
    for (let f = 0; f < fireworkCount; f++) {
        setTimeout(() => {
            const sparkCount = 30;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            for (let i = 0; i < sparkCount; i++) {
                const spark = document.createElement('div');
                spark.className = 'firework';
                spark.style.left = x + 'px';
                spark.style.top = y + 'px';
                spark.style.backgroundColor = color;
                spark.style.boxShadow = `0 0 10px ${color}`;
                
                document.body.appendChild(spark);
                
                const angle = (Math.PI * 2 * i) / sparkCount;
                const velocity = Math.random() * 200 + 100;
                const duration = Math.random() * 1000 + 1500;
                
                const targetX = x + Math.cos(angle) * velocity;
                const targetY = y + Math.sin(angle) * velocity;
                
                spark.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${targetX - x}px, ${targetY - y}px) scale(0)`, opacity: 0 }
                ], {
                    duration: duration,
                    easing: 'ease-out'
                }).onfinish = () => {
                    spark.remove();
                };
            }
        }, f * 200);
    }
}

// Efectos de scroll
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Efectos de hover mejorados
function initHoverEffects() {
    const cards = document.querySelectorAll('.memory-card, .wish-item, .message-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            createHoverSparkles(e.target);
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            e.target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

function createHoverSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 5;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        sparkle.style.fontSize = '12px';
        sparkle.style.zIndex = '1000';
        sparkle.style.pointerEvents = 'none';
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'scale(1) rotate(180deg)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

// Animación de bienvenida
function createWelcomeAnimation() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    // Crear burst de partículas
    const rect = title.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    createConfetti(centerX, centerY);
    
    // Efecto de pulso en el título
    title.style.animation = 'pulse 0.5s ease-in-out 3';
}

// Configurar event listeners adicionales
function setupEventListeners() {
    // Efecto de clic en cualquier parte
    document.addEventListener('click', (e) => {
        createClickRipple(e.clientX, e.clientY);
    });
    
    // Efectos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            createRandomSurprise();
        }
    });
    
    // Redimensionar ventana
    window.addEventListener('resize', () => {
        // Recrear partículas si es necesario
        if (window.innerWidth < 768 && particleSystem.particles.length > 30) {
            // Remover partículas extra en móviles
            const excess = particleSystem.particles.length - 30;
            for (let i = 0; i < excess; i++) {
                const particle = particleSystem.particles.pop();
                particle.remove();
            }
        }
    });
}

function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 107, 107, 0.6)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    
    document.body.appendChild(ripple);
    
    ripple.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(4)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => {
        ripple.remove();
    };
}

function createRandomSurprise() {
    const surprises = ['confetti', 'hearts', 'stars', 'fireworks'];
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    triggerSurprise(randomSurprise, { target: { getBoundingClientRect: () => ({ left: x, top: y, width: 0, height: 0 }) } });
}

// Función para compartir la página
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: '¡Feliz 1 de Agosto, Eva!',
            text: 'Una página especial creada con amor para Eva',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback: copiar URL al portapapeles
        navigator.clipboard.writeText(window.location.href).then(() => {
            // Mostrar notificación
            showNotification('¡URL copiada al portapapeles!');
        }).catch(() => {
            // Fallback del fallback
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('¡URL copiada al portapapeles!');
        });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = 'var(--accent-color)';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '25px';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = '600';
    notification.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.3)';
    
    document.body.appendChild(notification);
    
    notification.animate([
        { transform: 'translateX(-50%) translateY(-100%)', opacity: 0 },
        { transform: 'translateX(-50%) translateY(0)', opacity: 1 }
    ], {
        duration: 300,
        easing: 'ease-out'
    });
    
    setTimeout(() => {
        notification.animate([
            { transform: 'translateX(-50%) translateY(0)', opacity: 1 },
            { transform: 'translateX(-50%) translateY(-100%)', opacity: 0 }
        ], {
            duration: 300,
            easing: 'ease-in'
        }).onfinish = () => {
            notification.remove();
        };
    }, 3000);
}

// Exportar funciones para uso global
window.shareWebsite = shareWebsite;
window.triggerSurprise = triggerSurprise;

console.log('🎨 Sistema de efectos especiales cargado correctamente!');

