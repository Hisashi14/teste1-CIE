document.addEventListener('DOMContentLoaded', () => {
    
    const contactForm = document.getElementById('contact-form');
    const tableBody = document.getElementById('contacts-table-body');
    const API_URL = 'http://localhost:3000';
    let currentEditingId = null; // Variável para controlar qual contato estamos editando

    // Função para buscar e renderizar os contatos na tabela
    const fetchContacts = async () => {
        try {
            const response = await fetch(`${API_URL}/contacts`);
            const contacts = await response.json();
            
            tableBody.innerHTML = ''; 

            if (contacts.length > 0) {
                contacts.forEach(contact => {
                    const row = `
                        <tr>
                            <td>${contact.name}</td>
                            <td>${contact.course}</td>
                            <td>${contact.year}</td>
                            <td>${contact.phone}</td>
                            <td class="actions">
                                <button class="btn-edit" data-id="${contact.id}">Editar</button>
                                <button class="btn-delete" data-id="${contact.id}">Excluir</button>
                            </td>
                        </tr>
                    `;
                    tableBody.innerHTML += row;
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="5">Nenhum contato cadastrado.</td></tr>';
            }
        } catch (error) {
            console.error('Erro ao buscar contatos:', error);
            tableBody.innerHTML = '<tr><td colspan="5">Erro ao carregar contatos.</td></tr>';
        }
    };

    // Evento de envio do formulário (agora serve para ADICIONAR e ATUALIZAR)
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const contact = {
            name: document.getElementById('student-name').value,
            course: document.getElementById('student-course').value,
            year: document.getElementById('student-year').value,
            phone: document.getElementById('student-phone').value
        };

        try {
            if (currentEditingId) {
                // Se estamos editando, usamos o método PUT
                await fetch(`${API_URL}/contacts/${currentEditingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contact)
                });
                currentEditingId = null; // Limpa o ID de edição
            } else {
                // Se não, usamos o método POST para criar um novo
                await fetch(`${API_URL}/contacts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contact)
                });
            }
            
            contactForm.reset(); // Limpa o formulário
            document.querySelector('.contact-form-section h3').textContent = 'Adicionar Novo Aluno'; // Restaura o título
            document.querySelector('#contact-form button').textContent = 'Adicionar Contato'; // Restaura o texto do botão
            fetchContacts(); // Atualiza a tabela

        } catch (error) {
            console.error('Erro ao salvar contato:', error);
            alert('Falha ao salvar o contato.');
        }
    });

    // Evento para os cliques nos botões da tabela (Editar e Excluir)
    tableBody.addEventListener('click', async (event) => {
        const target = event.target;
        const id = target.dataset.id;

        // Ação de EXCLUIR
        if (target.classList.contains('btn-delete')) {
            if (confirm('Tem certeza que deseja excluir este contato?')) {
                try {
                    await fetch(`${API_URL}/contacts/${id}`, { method: 'DELETE' });
                    fetchContacts(); // Atualiza a tabela
                } catch (error) {
                    console.error('Erro ao excluir:', error);
                    alert('Falha ao excluir o contato.');
                }
            }
        }

        // Ação de EDITAR
        if (target.classList.contains('btn-edit')) {
            try {
                const response = await fetch(`${API_URL}/contacts`);
                const contacts = await response.json();
                const contactToEdit = contacts.find(c => c.id == id);
                
                if (contactToEdit) {
                    // Preenche o formulário com os dados do contato
                    document.getElementById('student-name').value = contactToEdit.name;
                    document.getElementById('student-course').value = contactToEdit.course;
                    document.getElementById('student-year').value = contactToEdit.year;
                    document.getElementById('student-phone').value = contactToEdit.phone;

                    // Muda o estado do formulário para "edição"
                    document.querySelector('.contact-form-section h3').textContent = 'Editando Aluno';
                    document.querySelector('#contact-form button').textContent = 'Atualizar Contato';
                    currentEditingId = id;
                    window.scrollTo(0, 0); // Rola a página para o topo para ver o formulário
                }
            } catch (error) {
                console.error('Erro ao preparar edição:', error);
            }
        }
    });

    fetchContacts();
});