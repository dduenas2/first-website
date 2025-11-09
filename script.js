// ============================================
// NAVEGACIÓN Y SCROLL SUAVE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Botón CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.querySelector('#proyectos').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ============================================
// ANIMACIÓN AL HACER SCROLL
// ============================================

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

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(section);
});

// ============================================
// FORMULARIO DE CONTACTO
// ============================================

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Elementos del formulario
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Mensajes de error
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const subjectError = document.getElementById('subject-error');
const messageError = document.getElementById('message-error');

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

function validateName(name) {
    if (name.trim() === '') {
        return 'El nombre es obligatorio';
    }
    if (name.trim().length < 3) {
        return 'El nombre debe tener al menos 3 caracteres';
    }
    if (!/^[a-záéíóúñ\s]+$/i.test(name)) {
        return 'El nombre solo puede contener letras';
    }
    return '';
}

function validateEmail(email) {
    if (email.trim() === '') {
        return 'El email es obligatorio';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Ingresa un email válido';
    }
    return '';
}

function validateSubject(subject) {
    if (subject === '') {
        return 'Selecciona un asunto';
    }
    return '';
}

function validateMessage(message) {
    if (message.trim() === '') {
        return 'El mensaje es obligatorio';
    }
    if (message.trim().length < 10) {
        return 'El mensaje debe tener al menos 10 caracteres';
    }
    if (message.trim().length > 500) {
        return 'El mensaje no puede exceder 500 caracteres';
    }
    return '';
}

// ============================================
// MOSTRAR/OCULTAR ERRORES
// ============================================

function showError(input, errorElement, message) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    errorElement.textContent = message;
}

function showSuccess(input, errorElement) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    errorElement.textContent = '';
}

// ============================================
// VALIDACIÓN EN TIEMPO REAL
// ============================================

nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    if (error) {
        showError(nameInput, nameError, error);
    } else {
        showSuccess(nameInput, nameError);
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        showError(emailInput, emailError, error);
    } else {
        showSuccess(emailInput, emailError);
    }
});

subjectInput.addEventListener('change', () => {
    const error = validateSubject(subjectInput.value);
    if (error) {
        showError(subjectInput, subjectError, error);
    } else {
        showSuccess(subjectInput, subjectError);
    }
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    if (error) {
        showError(messageInput, messageError, error);
    } else {
        showSuccess(messageInput, messageError);
    }
});

// Contador de caracteres para el mensaje
messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    if (length > 0) {
        messageError.textContent = `${length}/500 caracteres`;
        messageError.style.color = length > 500 ? '#dc2626' : '#6b7280';
    }
});

// ============================================
// ENVÍO DEL FORMULARIO
// ============================================

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validar todos los campos
    const nameErr = validateName(nameInput.value);
    const emailErr = validateEmail(emailInput.value);
    const subjectErr = validateSubject(subjectInput.value);
    const messageErr = validateMessage(messageInput.value);
    
    // Mostrar errores si existen
    if (nameErr) showError(nameInput, nameError, nameErr);
    if (emailErr) showError(emailInput, emailError, emailErr);
    if (subjectErr) showError(subjectInput, subjectError, subjectErr);
    if (messageErr) showError(messageInput, messageError, messageErr);
    
    // Si hay errores, no continuar
    if (nameErr || emailErr || subjectErr || messageErr) {
        formStatus.className = 'form-status error';
        formStatus.textContent = '❌ Por favor corrige los errores antes de enviar';
        return;
    }
    
    // Simular envío (aquí irá la integración con backend más adelante)
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // Simular delay de envío
    setTimeout(() => {
        // Éxito
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
            ✅ ¡Mensaje enviado exitosamente!<br>
            <small>Te responderé pronto a ${emailInput.value}</small>
        `;
        
        // Resetear formulario
        contactForm.reset();
        
        // Limpiar clases de validación
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error', 'success');
        });
        
        // Restaurar botón
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
        
        // Log en consola (para desarrollo)
        console.log('📧 Formulario enviado:', {
            nombre: nameInput.value,
            email: emailInput.value,
            asunto: subjectInput.value,
            mensaje: messageInput.value,
            fecha: new Date().toLocaleString()
        });
        
    }, 2000); // 2 segundos de simulación
});

// ============================================
// MENSAJE DE BIENVENIDA EN CONSOLA
// ============================================

console.log('%c¡Página cargada correctamente! 🚀', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cBienvenido a mi portafolio en desarrollo', 'color: #6b7280; font-size: 12px;');
console.log('%cSi encuentras algún bug, ¡házmelo saber! 🐛', 'color: #f97316; font-size: 12px;');