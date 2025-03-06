var minhasTarefas = [];
var meusLembretes = [];

function desabilitarDescricao() {
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao')
    
    if(tipo.value == 'Lembrete') {
        descricao.style.display = 'none';
    }
    else{
        descricao.style.display = 'block';
    }
}

function salvar() {
    let tipo = document.getElementById('tipo').value;
    switch(tipo){
        case 'Tarefa':
            salvarTarefa();
            break;
        case 'Lembrete':
            salvarLembrete();
            break;
        default:
            alert('Seleção inválida.')
    }
}

function salvarTarefa(){
    let nome = document.getElementById('nome').value;
    let descricao = document.getElementById('descricao').value

    const dados = {
        id: Date.now(),
        nome: nome,
        descricao: descricao,
        status: 'Aberta'
    }

    minhasTarefas.push(dados);

    listarTarefas();
}

function listarTarefas(){
    let conteudo = '';
    minhasTarefas.map(tarefa => {
        conteudo += `
            <li
                id="${tarefa.id}" onclick="marcarTarefa(${tarefa.id})"
                ${tarefa.status ==  'Fechada'? 'style="text-decoration: line-through;"' : '' }
            >
                <p>${tarefa.nome}</p>
                <p>${tarefa.descricao}</p>
            </li>

            `
    })
    document.getElementById('tarefas').innerHTML = conteudo;
}

function marcarTarefa(tarefaId) {
    let buscar = minhasTarefas.find(tarefa => tarefa.id === tarefaId);
    buscar.status = 'Fechada';
    listarTarefas();
}

function deletarTarefasConcluidas() {
    minhasTarefas = minhasTarefas.filter(tarefa => tarefa.status !== 'Fechada');
    listarTarefas();
}


function salvarLembrete() {
    let nome = document.getElementById('nome').value;

    const lembrete = {
        id: Date.now(), // Adiciona um ID único para cada lembrete
        nome: nome,
        selecionado: false // Adiciona um campo para controlar se o lembrete está selecionado
    };

    meusLembretes.push(lembrete);

    listarLembretes();
}

function listarLembretes() {
    let conteudo = '';
    meusLembretes.forEach((lembrete, index) => {
        conteudo += `
            <li>
                <input
                    type="checkbox"
                    id="lembrete-${lembrete.id}"
                    onchange="marcarLembrete(${index})"
                    ${lembrete.selecionado ? 'checked' : ''}
                >
                <label for="lembrete-${lembrete.id}">${lembrete.nome}</label>
            </li>
        `;
    });

    document.getElementById('lembretes').innerHTML = conteudo;
}

function marcarLembrete(index) {
    // Alterna o estado de seleção do lembrete
    meusLembretes[index].selecionado = !meusLembretes[index].selecionado;
}

function deletarLembretesSelecionados() {
    // Filtra apenas os lembretes que NÃO estão selecionados
    meusLembretes = meusLembretes.filter(lembrete => !lembrete.selecionado);
    
    // Atualiza a lista de lembretes na tela
    listarLembretes();
}