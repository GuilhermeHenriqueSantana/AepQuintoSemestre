function obterMeuRanque() {
  //Lógica para obter o meu ranque

  return (
    {
      posicao: 1,
      apelido: 'Thiago',
      acertos: 5,
      tempoGasto: 20000 //Milisegundos 
    }
  )
}

const meuRanque = obterMeuRanque()

const dadosTabela = [
  {
    posicao: 1,
    apelido: 'Apelido',
    acertos: 5,
    tempoGasto: 20000 //Milisegundos
  },
  {
    posicao: 14,
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

    let estaNoTop10 = false
    dadosTabela.forEach(element => {
      const tr = document.createElement('tr')

      if (element.apelido === meuRanque.apelido) {
        tr.classList.add('text-primary')
        estaNoTop10 = true
      }

      tr.innerHTML = `
          <td>${element.posicao}</td>
          <td>${element.apelido}</td>
          <td>${element.acertos}</td>
          <td>${element.tempoGasto}</td>
      `
      tBody.appendChild(tr)
    })

    if (!estaNoTop10) {
      const tr = document.createElement('tr')
      tr.classList.add('text-primary')
      tr.classList.add('container-minha-posicao')

      tr.innerHTML = `
          <td>${meuRanque.posicao}</td>
          <td>${meuRanque.apelido}</td>
          <td>${meuRanque.acertos}</td>
          <td>${meuRanque.tempoGasto}</td>
      `
      tBody.appendChild(tr)
    }
  }
}