const meuApelido = 'Pedro'

const dadosTabela = [
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    apelido: 'Pedro',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  }
]

const tabela = {
  CONTAINER_TABELA: document.querySelector('#tabela-ranque'),
  count: 0,
  construir() {
    this.CONTAINER_TABELA.innerHTML = ''
    
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

    dadosTabela.forEach(element => {
      const tr = document.createElement('tr')

      if (element.apelido === meuApelido)
        tr.classList.add('text-primary')

      tr.innerHTML = `

          <td>${element.posicao}</td>
          <td>${element.apelido}</td>
          <td>${element.acertos}</td>
          <td>${element.tempoGasto}</td>
      `
      tBody.appendChild(tr)

    })
  }
}