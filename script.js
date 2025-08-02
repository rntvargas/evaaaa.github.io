// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas de fondo
    createParticles();
    
    // Crear efectos de brillo
    createSparkles();
    
    // Añadir efectos de hover a elementos
    addHoverEffects();
    
    // Animación de escritura para el título
    typeWriterEffect();
});

// Función para crear partículas flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Duración de animación aleatoria
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        particlesContainer.appendChild(particle);
    }
}

// Función para crear efectos de brillo
function createSparkles() {
    const sparkleCount = 20;
    const body = document.body;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Posición aleatoria
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            
            body.appendChild(sparkle);
            
            // Remover después de la animación
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 200);
    }
    
    // Repetir cada 10 segundos
    setTimeout(createSparkles, 10000);
}

// Función para añadir efectos de hover
function addHoverEffects() {
    const messageCard = document.querySelector('.message-card');
    const tiktokWrapper = document.querySelector('.tiktok-wrapper');
    
    // Efecto de inclinación para la tarjeta de mensaje
    if (messageCard) {
        messageCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        messageCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    }
    
    // Efecto de pulsación para el wrapper del video
    if (tiktokWrapper) {
        tiktokWrapper.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s ease-in-out infinite';
        });
        
        tiktokWrapper.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }
}

// Función de efecto de escritura para el título
function typeWriterEffect() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    title.style.borderRight = '3px solid #fff';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Remover el cursor después de un tiempo
            setTimeout(() => {
                title.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Función para crear confeti
function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FFD93D'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        // Animación de caída
        const fallDuration = Math.random() * 3000 + 2000;
        const rotation = Math.random() * 360;
        
        confetti.animate([
            {
                transform: `translateY(-10px) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight + 10}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ], {
            duration: fallDuration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            confetti.remove();
        };
    }
}

// Crear confeti al cargar la página
setTimeout(createConfetti, 2000);

// Añadir CSS para la animación de pulso
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .message-card {
        transition: transform 0.1s ease;
    }
`;
document.head.appendChild(style);

// Función para detectar cuando el usuario hace scroll y añadir efectos
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.header');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Añadir efecto de clic en cualquier parte de la página
document.addEventListener('click', function(e) {
    // Crear un pequeño efecto de ondas en el punto de clic
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
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
});

