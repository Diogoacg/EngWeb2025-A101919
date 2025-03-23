document.addEventListener('DOMContentLoaded', function() {
    // Captura o pathname atual para destacar a navegação ativa
    const currentPath = window.location.pathname;
    
    // Adiciona classe active no item de navegação correspondente à página atual
    document.querySelectorAll('nav a').forEach(link => {
      if (link.getAttribute('href') === currentPath || 
          (link.getAttribute('href') !== '/' && currentPath.startsWith(link.getAttribute('href')))) {
        link.classList.add('active');
      }
    });
  
    // Validação de formulário
    const forms = document.querySelectorAll('.aluno-form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(event) {
        const idInput = form.querySelector('#id');
        
        // Validar formato do ID (se existir e puder ser modificado)
        if (idInput && !idInput.hasAttribute('disabled')) {
          const idValue = idInput.value.trim();
          const idPattern = /^A\d+$/;
          
          if (!idPattern.test(idValue)) {
            event.preventDefault();
            showNotification('O ID do aluno deve começar com "A" seguido por números.', 'error');
            idInput.focus();
          }
        }
        
        // Validar nome
        const nameInput = form.querySelector('#name');
        if (nameInput && nameInput.value.trim() === '') {
          event.preventDefault();
          showNotification('O nome do aluno é obrigatório.', 'error');
          nameInput.focus();
        }
        
        // Validar URL do Git (se preenchido)
        const gitInput = form.querySelector('#gitlink');
        if (gitInput && gitInput.value.trim() !== '') {
          try {
            new URL(gitInput.value);
          } catch (e) {
            event.preventDefault();
            showNotification('Por favor, forneça uma URL válida para o repositório Git.', 'error');
            gitInput.focus();
          }
        }
      });
    });
    
    // Confirmação de exclusão
    const deleteButtons = document.querySelectorAll('a.btn.delete');
    
    deleteButtons.forEach(button => {
      if (!button.closest('form')) {  // Não adicionar ao botão do formulário de confirmação
        button.addEventListener('click', function(event) {
          if (!confirm('Tem certeza de que deseja excluir este aluno?')) {
            event.preventDefault();
          }
        });
      }
    });
    
    // Pesquisa na tabela de alunos
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const table = document.getElementById('alunosTable');
        const rows = table.querySelectorAll('tbody tr');
        
        let visibleCount = 0;
        rows.forEach(row => {
          const id = row.querySelector('td:first-child').textContent.toLowerCase();
          const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
          
          if (id.includes(searchTerm) || name.includes(searchTerm)) {
            row.style.display = '';
            visibleCount++;
          } else {
            row.style.display = 'none';
          }
        });
        
        // Atualiza o contador
        const countElement = document.getElementById('currentCount');
        if (countElement) {
          countElement.textContent = visibleCount;
        }
      });
    }
    
    // Função para mostrar notificações
    function showNotification(message, type = 'info') {
      // Remover notificações anteriores
      const existingNotification = document.querySelector('.notification');
      if (existingNotification) {
        existingNotification.remove();
      }
      
      // Criar elemento de notificação
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      
      // Ícone baseado no tipo
      let icon = 'info-circle';
      if (type === 'success') icon = 'check-circle';
      if (type === 'error') icon = 'exclamation-circle';
      
      notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="close-btn"><i class="fas fa-times"></i></button>
      `;
      
      // Adicionar ao DOM
      document.body.appendChild(notification);
      
      // Mostrar com animação
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      // Configurar fechamento
      const closeBtn = notification.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 300);
      });
      
      // Auto-fechar após 5 segundos
      setTimeout(() => {
        if (document.body.contains(notification)) {
          notification.classList.remove('show');
          setTimeout(() => {
            if (document.body.contains(notification)) {
              notification.remove();
            }
          }, 300);
        }
      }, 5000);
    }
    
    // Adiciona CSS para notificações dinamicamente
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        background: white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        z-index: 1000;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 350px;
      }
      
      .notification.show {
        transform: translateX(0);
      }
      
      .notification i {
        margin-right: 10px;
        font-size: 1.2rem;
      }
      
      .notification.info i {
        color: #3498db;
      }
      
      .notification.success i {
        color: #2ecc71;
      }
      
      .notification.error i {
        color: #e74c3c;
      }
      
      .notification .close-btn {
        margin-left: 15px;
        background: none;
        border: none;
        cursor: pointer;
        color: #7f8c8d;
        padding: 5px;
      }
      
      .notification .close-btn:hover {
        color: #34495e;
      }
    `;
    document.head.appendChild(notificationStyle);
  });