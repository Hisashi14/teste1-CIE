document.addEventListener('DOMContentLoaded', () => {
    
    const postsContainer = document.getElementById('posts-container');
    const postForm = document.getElementById('post-form');
    const btnLogout = document.getElementById('btnLogout');
    const API_URL = 'http://localhost:3000';

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/posts`);
            const posts = await response.json();
            postsContainer.innerHTML = ''; 

            if (posts.length === 0) {
                postsContainer.innerHTML = '<p>Nenhum aviso publicado ainda.</p>';
            } else {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    // ADICIONAMOS O BOTÃO DE WHATSAPP AQUI
                    postElement.innerHTML = `
                        <h4>${post.title}</h4>
                        <p>${post.content}</p>
                        <div class="post-actions">
                            <button class="btn-whatsapp" data-id="${post.id}">
                                Enviar via WhatsApp
                            </button>
                        </div>
                    `;
                    postsContainer.appendChild(postElement);
                });
            }
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
            postsContainer.innerHTML = '<p>Não foi possível carregar os avisos.</p>';
        }
    };

    // ... (o código do postForm.addEventListener continua o mesmo) ...
     postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        try {
            await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content })
            });
            postForm.reset();
            fetchPosts();
        } catch (error) {
            console.error('Erro ao criar post:', error);
            alert('Falha ao criar o aviso.');
        }
    });


    // NOVO: Evento para lidar com o clique no botão de enviar
    postsContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-whatsapp')) {
            const postId = event.target.dataset.id;
            
            try {
                const response = await fetch(`${API_URL}/posts/${postId}/send`, {
                    method: 'POST'
                });
                const result = await response.json();

                alert(result.message); // Exibe a confirmação para o usuário

            } catch (error) {
                console.error('Erro ao enviar para o WhatsApp:', error);
                alert('Falha ao tentar enviar o aviso.');
            }
        }
    });

    btnLogout.addEventListener('click', () => {
        alert('Você foi desconectado.');
        window.location.href = 'index.html';
    });

    fetchPosts();
});