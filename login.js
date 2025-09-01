// Adiciona um "escutador" ao formulário; ele espera pelo evento de "submit" (envio)
document.getElementById('login-form').addEventListener('submit', async (event) => {
    // Impede o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();

    // Pega os valores digitados nos campos de usuário e senha
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
        // Envia os dados para o nosso servidor back-end usando a API Fetch
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST', // Método da requisição
            headers: {
                'Content-Type': 'application/json' // Informa que estamos enviando JSON
            },
            body: JSON.stringify({ username, password }) // Converte os dados para o formato JSON
        });

        const data = await response.json(); // Pega a resposta do servidor e converte para objeto

        // Exibe a mensagem de resposta do servidor
        alert(data.message);

        // Se o login for bem-sucedido, podemos redirecionar o usuário
        if (data.success) {
            // Futuramente, redirecionaremos para a página principal do sistema
            alert("Redirecionando para a página principal...");
            // window.location.href = '/dashboard.html'; 
        }

    } catch (error) {
        console.error('Ocorreu um erro:', error);
        alert('Não foi possível conectar ao servidor. Verifique o console.');
    }
});