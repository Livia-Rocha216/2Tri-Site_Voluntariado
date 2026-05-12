// ===== VALIDAÇÃO DE FORMULÁRIO =====
const form = document.getElementById('form-inscricao');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpar mensagens anteriores
    successMessage.textContent = '';
    clearErrorMessages();

    // Validar campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const interesses = document.querySelectorAll('input[name="interesse"]:checked');

    let isValid = true;

    // Validação de nome
    if (!nome) {
        showError('nome', 'Nome é obrigatório');
        isValid = false;
    } else if (nome.length < 3) {
        showError('nome', 'Nome deve ter pelo menos 3 caracteres');
        isValid = false;
    }

    // Validação de email
    if (!email) {
        showError('email', 'Email é obrigatório');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Email inválido');
        isValid = false;
    }

    // Validação de interesses
    if (interesses.length === 0) {
        showError('interesse', 'Selecione pelo menos uma área de interesse');
        isValid = false;
    }

    // Se tudo válido, mostrar mensagem de sucesso
    if (isValid) {
        showSuccessMessage(nome);
        form.reset();
        scrollToElement('success-message');
    }
});

// Função para validar email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para mostrar erro
function showError(fieldId, message) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    if (errorElement) {
        errorElement.textContent = '⚠️ ' + message;
    }
}

// Função para limpar erros
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach((el) => {
        el.textContent = '';
    });
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage(nome) {
    const message = `✅ Obrigado, ${nome}! Sua inscrição foi recebida com sucesso. Em breve entraremos em contato!`;
    successMessage.textContent = message;
    successMessage.style.animation = 'fadeInUp 0.5s ease-out';
}

// ===== SCROLL SUAVE ENTRE SEÇÕES =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            scrollToElement(href.substring(1));
        }
    });
});

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== ANIMAÇÃO DE CARDS AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards
document.querySelectorAll('.card').forEach((card) => {
    observer.observe(card);
});

// Observar stats
document.querySelectorAll('.stat').forEach((stat) => {
    observer.observe(stat);
});

// ===== EFEITOS DE HOVER EM INPUTS =====
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// ===== INICIALIZAÇÃO =====
console.log('🤝 Site de Voluntariado carregado com sucesso!');
