const character = document.getElementById('character');
const spriteSize = 48;
let isMoving = false;
let currentFrame = 0;
let direction = 'down'; // Inicialmente mirando hacia abajo

// Función para actualizar la posición del sprite dependiendo de la dirección y el frame actual
function updateSprite() {
    let xOffset = currentFrame * spriteSize;
    let yOffset;
    switch (direction) {
        case 'down': yOffset = 0; break; // Primera fila
        case 'left': yOffset = spriteSize; break; // Segunda fila
        case 'right': yOffset = spriteSize * 2; break; // Tercera fila
        case 'up': yOffset = spriteSize * 3; break; // Última fila
    }
    character.style.backgroundPosition = `-${xOffset}px -${yOffset}px`;
}

// Función para mantener al personaje dentro de los límites de la pantalla
function clampPosition(x, y) {
    const maxX = gameArea.clientWidth - spriteSize;
    const maxY = gameArea.clientHeight - spriteSize;

    // Limitar la posición dentro de los bordes del área de juego
    const clampedX = Math.max(0, Math.min(x, maxX));
    const clampedY = Math.max(0, Math.min(y, maxY));

    return { x: clampedX, y: clampedY };
}

// Función para mover el personaje hacia la posición del clic
function moveCharacter(targetX, targetY) {
    if (isMoving) return; // Evitar movimientos múltiples simultáneamente
    isMoving = true;

    const characterX = character.offsetLeft;
    const characterY = character.offsetTop;

    const deltaX = targetX - characterX;
    const deltaY = targetY - characterY;

    // Calcular dirección
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
    } else {
        direction = deltaY > 0 ? 'down' : 'up';
    }

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = distance / 0.10; // Ajusta la velocidad según tu preferencia

    // Animación del personaje con intervalos de frames
    const steps = Math.floor(duration / 100);
    let currentStep = 1;

    const interval = setInterval(() => {
        if (currentStep >= steps) {
            clearInterval(interval);
            isMoving = false;
            return;
        }

        currentFrame = (currentFrame + 1) % 3; // Cambia entre 0, 1 y 2
        updateSprite();

        const progress = currentStep / steps;
        const newX = characterX + progress * deltaX;
        const newY = characterY + progress * deltaY;
        character.style.left = `${newX}px`;
        character.style.top = `${newY}px`;

        currentStep++;
    }, 100);
}

// Capturar clic o toque en la pantalla
document.getElementById('game-area').addEventListener('click', (event) => {
    const rect = event.target.getBoundingClientRect();
    const targetX = event.clientX - rect.left - spriteSize / 2;
    const targetY = event.clientY - rect.top - spriteSize / 2;

    moveCharacter(targetX, targetY);
});


/// mensajes
function mensajes(){
    alert('Se ha encontrado un archivo potencialmente no deseado.');
    alert('Bromita, tkm');
};