function obterMeuRanque(dados) {
  dados.forEach((element, index) => {
    if (usuarioLogado.nome === element.nomeUsuario) {
      meuRanque = {
        posicao: index + 1,
        nomeUsuario: element.nomeUsuario,
        quantidadeAcertos: element.quantidadeAcertos,
        tempoGasto: element.quantidadeAcertos //Milisegundos 
      }     
      return
    }
  })
}

function atualizarDadosDaTabela(dados) {
  dadosTabela = []
  document.querySelector('#btn-modal-ranque').click()

  for (let i = 0; i < dados.length && i < 10; i++) {
    dadosTabela.push({
      posicao: i + 1,
      nomeUsuario: dados[i].nomeUsuario,
      quantidadeAcertos: dados[i].quantidadeAcertos,
      tempoGasto: dados[i].tempoGasto
    })
  } 

  obterMeuRanque(dados)

  tabela.construir()
}

let meuRanque = undefined

let dadosTabela = [
  {
    posicao: 1,
    nomeUsuario: 'nomeUsuario',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 14,
    nomeUsuario: 'Pedro',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    nomeUsuario: 'nomeUsuario',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    nomeUsuario: 'nomeUsuario',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    nomeUsuario: 'nomeUsuario',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    nomeUsuario: 'nomeUsuario',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    nomeUsuario: 'nomeUsuario',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    nomeUsuario: 'nomeUsuario',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    nomeUsuario: 'nomeUsuario',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    nomeUsuario: 'nomeUsuario',
    quantidadeAcertos: 5,
    tempoGasto: 20000 //Milisegundos
  }
]

const tabela = {
  CONTAINER_TABELA: document.querySelector('#tabela-ranque'),
  construir() {
    this.CONTAINER_TABELA.innerHTML = ''

    if (dadosTabela[0] === undefined) {
      this.CONTAINER_TABELA.innerHTML += 
      `
        <h5 class="text-center mt-2">Sem dados cadastrados</h5>
      `
      return
    }

    const tabela = document.createElement('table')
    tabela.classList.add('table')
    this.CONTAINER_TABELA.appendChild(tabela)

    const tHead = `
    <thead>
      <tr>
        <th>Posição</th>
        <th>Jogador</th>
        <th>N° acertos</th>
        <th>Tempo gasto</th>
      </tr>
    </thead>
    `
    tabela.innerHTML += tHead

    const tBody = document.createElement('tbody')
    tabela.appendChild(tBody)
    
    let estaNoTop10 = false
    dadosTabela.forEach(element => {
      const tr = document.createElement('tr')

      if (meuRanque !== undefined)
        if (element.nomeUsuario === meuRanque.nomeUsuario) {
          tr.classList.add('text-primary')
          estaNoTop10 = true
        }

      tr.innerHTML = `
          <td>${element.posicao}</td>
          <td>${element.nomeUsuario}</td>
          <td>${element.quantidadeAcertos}</td>
          <td>${element.tempoGasto / 1000}s</td>
      `
      tBody.appendChild(tr)
    })

    if (!estaNoTop10 && meuRanque !== undefined) {
      const tr = document.createElement('tr')
      tr.classList.add('text-primary')
      tr.classList.add('container-minha-posicao')

      tr.innerHTML = `
          <td>${meuRanque.posicao}</td>
          <td>${meuRanque.nomeUsuario}</td>
          <td>${meuRanque.quantidadeAcertos}</td>
          <td>${meuRanque.tempoGasto}</td>
      `
      tBody.appendChild(tr)
    }
  }
}