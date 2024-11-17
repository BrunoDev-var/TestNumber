document.addEventListener('DOMContentLoaded', () => {
    const buttonsContainer = document.getElementById('buttons-container');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const passwordSection = document.getElementById('password-section');
    const messageSection = document.getElementById('message-section');
    const passwordInput = document.getElementById('password-input');
    const submitPassword = document.getElementById('submit-password');
    const copyButton = document.getElementById('copy-button');
    const timer = document.getElementById('timer');
    const closeBtn = document.querySelector('.close-btn');
    const errorMsg = document.getElementById('error-msg');

    const CORRECT_PASSWORD = 'pas.antiYutaCiber';
    const MESSAGE_TEXT = `
    
    🌿 Guía para Crear un Invernadero de Marihuana en Casa 🌿

━━━━━━━━━━━━━━━
🌱 Paso 1: Selección del Lugar
➤ Ubicación: Busca un espacio oscuro y discreto. Un cuarto cerrado es ideal para mayor privacidad y control.

☀️ Paso 2: Luz Natural y Artificial
➤ Luz Solar: La planta necesita al menos 12 horas de luz diaria, así que asegúrate de que haya una ventana que reciba suficiente luz.
➤ Luces de Crecimiento: Instala luces LED o fluorescentes de crecimiento. Asegúrate de que se puedan ajustar en intensidad y horario para adaptarse a las etapas de crecimiento.

💨 Paso 3: Ventilación y Humedad
➤ Sistema de Ventilación: Asegura una buena circulación de aire para evitar el exceso de humedad y controlar el olor.

🌿 Paso 4: Preparación del Sustrato
➤ Sustrato de Calidad: Utiliza un buen sustrato enraizante para estimular el crecimiento saludable de las raíces.

🌱 Paso 5: Selección de Semillas
➤ Variedades: Opta por semillas de variedades aptas para interior, como las sativas e híbridas-sativas.

🪴 Paso 6: Elección de Contenedores
➤ Contenedores: Escoge macetas, bolsas de cultivo o tubos de crecimiento según el espacio y la preferencia.

💧 Paso 7: Riego y Fertilización
➤ Nutrición: Riega con un sustrato nutritivo y evita el exceso de fertilizante, ya que puede dañar la planta.

🌿 Paso 8: Mantenimiento de la Planta
➤ Cuidados: Retira las hojas muertas, controla la humedad y riega cuando sea necesario para mantener un ambiente saludable.

🌼 Paso 9: Cosecha
➤ Florecimiento: Espera pacientemente a que florezcan y cosecha cuando las plantas estén listas para obtener los mejores resultados.`;
    
    let button29Unlocked = false;
    let countdownInterval;

    // Crear y mezclar botones
    const numbers = Array.from({length: 50}, (_, i) => i + 1);
    shuffleArray(numbers);

    numbers.forEach(num => {
        const button = document.createElement('button');
        button.textContent = num;
        button.className = 'game-button';
        button.id = `btn-${num}`;
        
        if (num === 47) {
            button.classList.add('disabled');
        }
        
        button.addEventListener('click', () => handleButtonClick(num));
        buttonsContainer.appendChild(button);
    });

    function handleButtonClick(num) {
        if (num === 29) {
            showPasswordModal();
        } else if (num === 47 && button29Unlocked) {
            showMessageModal();
        }
    }

    function showPasswordModal() {
        modalTitle.textContent = "Introduce la contraseña";
        passwordSection.style.display = 'block';
        messageSection.style.display = 'none';
        modal.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
    }

    function showMessageModal() {
        modalTitle.textContent = "Mensaje Secreto";
        passwordSection.style.display = 'none';
        messageSection.style.display = 'block';
        modalText.textContent = MESSAGE_TEXT;
        modal.style.display = 'block';
        startTimer(30);
    }

    function validatePassword() {
        if (passwordInput.value === CORRECT_PASSWORD) {
            button29Unlocked = true;
            const button47 = document.getElementById('btn-47');
            button47.classList.remove('disabled');
            closeModal();
            showSuccessMessage();
        } else {
            errorMsg.textContent = 'Contraseña incorrecta';
            errorMsg.style.opacity = '1';
            passwordInput.value = '';
        }
    }

    function showSuccessMessage() {
        modalTitle.textContent = "¡Éxito!";
        passwordSection.style.display = 'none';
        messageSection.style.display = 'block';
        modalText.textContent = "¡Contraseña correcta! El botón 47 ha sido desbloqueado.";
        modal.style.display = 'block';
        setTimeout(closeModal, 2000);
    }

    function startTimer(seconds) {
        let timeLeft = seconds;
        updateTimer(timeLeft);
        
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        countdownInterval = setInterval(() => {
            timeLeft--;
            updateTimer(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                closeModal();
            }
        }, 1000);
    }

    function updateTimer(seconds) {
        timer.textContent = `Este mensaje se cerrará en ${seconds} segundos`;
    }

    function closeModal() {
        modal.style.display = 'none';
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Event Listeners
    submitPassword.addEventListener('click', validatePassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') validatePassword();
    });

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(MESSAGE_TEXT)
            .then(() => {
                copyButton.textContent = '¡Copiado!';
                setTimeout(() => {
                    copyButton.textContent = 'Copiar Texto';
                }, 2000);
            });
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});