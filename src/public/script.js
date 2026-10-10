const API_URL = 'http://localhost:3000/funcionarios';

async function carregarFuncionarios() {
   
    const response = await fetch(API_URL);
    const funcionarios = await response.json();
    
    const tabela = document.getElementById('tabela-funcionarios');
    tabela.innerHTML = '';

    funcionarios.forEach(funcionario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${funcionario.id}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cargo}</td>
            <td>${parseFloat(funcionario.salario).toFixed(2)}</td>
            <td>
                <button onclick="editarFuncionario(${funcionario.id}, '${funcionario.nome}', 
                '${funcionario.cargo}', ${parseFloat(funcionario.salario).toFixed(2)})">Editar</button>

                <button onclick="excluirFuncionario(${funcionario.id})">Excluir</button>    
            </td>

        `;
        tabela.appendChild(row);
    });
 
}

document.getElementById('form-funcionario').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('funcionario-id').value;
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    const funcionario = { nome, cargo, salario };
    if (id) {
        // Atualizar funcionário existente
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(funcionario)
        });
    } else {
        // Criar novo funcionário
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(funcionario)
        });
    }
    event.target.reset(); 
    document.getElementById('funcionario-id').value = '';
    carregarFuncionarios();  
}); 

function editarFuncionario(id, nome, cargo, salario) {
    document.getElementById('funcionario-id').value = id;
    document.getElementById('funcionario-nome').value = nome;
    document.getElementById('funcionario-cargo').value = cargo;
    document.getElementById('funcionario-salario').value = salario;
}

async function excluirFuncionario(id) {
    if (!confirm('Tem certeza que deseja excluir este funcionário?')) {
        return;
    }
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    carregarFuncionarios();
}

carregarFuncionarios();
