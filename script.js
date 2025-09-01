document.addEventListener('DOMContentLoaded', () => {
    // Seções da página
    const initialOptions = document.getElementById('initial-options');
    const loginFormSection = document.getElementById('login-form-section');

    // Botões de seleção
    const btnDocente = document.getElementById('btnDocente');
    const btnAluno = document.getElementById('btnAluno');

    // Elementos do formulário
    const formTitle = document.getElementById('form-title');
    const loginForm = document.getElementById('login-form');
    const btnVoltar = document.getElementById('btnVoltar');

    // Função para mostrar o formulário de login
    const showLoginForm = (userType) => {
        // Esconde as opções iniciais
        initialOptions.classList.add('hidden');
        
        // Define o título e mostra o formulário
        formTitle.textContent = `Login ${userType}`;
        loginFormSection.classList.remove('hidden');
    };

    // Evento de clique para o botão "Acesso Docente"
    btnDocente.addEventListener('click', () => {
        showLoginForm('Docente');
    });

    // Evento de clique para o botão "Acesso Aluno / Grêmio"
    btnAluno.addEventListener('click', () => {
        showLoginForm('Aluno / Grêmio');
    });

    // Evento de clique para o botão "Voltar"
    btnVoltar.addEventListener('click', () => {
        // Esconde o formulário
        loginFormSection.classList.add('hidden');
        
        // Mostra as opções iniciais novamente
        initialOptions.classList.remove('hidden');
    });

    // Evento ao submeter o formulário de login
    loginForm.addEventListener('submit', (event) => {
        // Impede o recarregamento padrão da página
        event.preventDefault(); 
        
        const username = event.target.username.value;
        alert(`Tentativa de login com o usuário: ${username}. O próximo passo é conectar isso ao back-end!`);
        
        // Aqui, futuramente, o código enviaria os dados para um servidor para validação.
    });
});