function getValorDoBloco(element) {
  const linha = element.getAttribute('data-linha')
  const coluna = element.getAttribute('data-coluna')
  let value = tabuleiroCampoMinado.valoresBlocos[linha][coluna]
  return value
}

function alterarValorEstiloDoBloco(element) {
  const value = getValorDoBloco(element)
  element.parentElement.backgroundColor = 'transparent'
  if (value === "X") {
    element.innerHTML = `<img src="./img/bomba.png" width="20">`
  }
  else {
    element.innerText = value
  }
  element.parentElement.style.backgroundColor = 'transparent'
}

function revelarTudo() {
  document.querySelectorAll('#game .conteudo').forEach((element) => {
    alterarValorEstiloDoBloco(element)
  })
}
//Atribui no onclick dos elementos blocos
function revelar(element) {
  alterarValorEstiloDoBloco(element)

  tabuleiroCampoMinado.checarSePerdeuOuGanhou(getValorDoBloco(element))
}

function revelarConteudoDoBloco() {
  this.onclick = () => { }
  const conteudo = this.firstElementChild
  revelar(conteudo)
}

const tabuleiroCampoMinado = {
  CONTAIER_GAME: document.querySelector('#game'),
  QUANT_LINHAS_COLUNAS: 7,
  cliques: undefined,
  QUANT_CLIQUES_PARA_GANHAR: 10,
  QUANT_BOMBAS: 10,
  posicoesBombas: { linha: [], coluna: [] },
  valoresBlocos: [],

  iniciar() {
    this.cliques = 0
    this.posicoesBombas.linha = []
    this.posicoesBombas.coluna = []
    this.valoresBlocos = []

    this.construirTabuleiro()
  },

  embaralharArray(array) {
    var indice_atual = array.length, valor_temporario, indice_aleatorio;

    while (0 !== indice_atual) {

      indice_aleatorio = Math.floor(Math.random() * indice_atual);
      indice_atual -= 1;

      valor_temporario = array[indice_atual];
      array[indice_atual] = array[indice_aleatorio];
      array[indice_aleatorio] = valor_temporario;
    }

    return array;
  },

  construirTabuleiro() {
    this.definirValoresDosBlocos()

    //Cria enunciado
    const enunciado =
      `
      <h4 id="enunciado-campo-minado">
        Encontre mais 
          <span>${this.QUANT_CLIQUES_PARA_GANHAR - this.cliques} </span> 
        blocos sem bombas para revelar uma alternativa incorreta.
      </h4>

      <h5>Quantidade de bombas: ${this.QUANT_BOMBAS}</h5>
    `

    //Cria div class="tabuleiro"
    const elementoTabuleiro = document.createElement('div')
    elementoTabuleiro.classList.add('tabuleiro')

    this.CONTAIER_GAME.classList.remove('d-none')
    this.CONTAIER_GAME.innerHTML = enunciado

    this.CONTAIER_GAME.appendChild(elementoTabuleiro)


    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS; i++) {
      //Cria div class="linha"
      let linha = document.createElement('div')
      linha.classList.add('linha')

      for (let j = 0; j < this.QUANT_LINHAS_COLUNAS; j++) {
        //Cria div class="bloco"
        let novoBloco = document.createElement('div')
        novoBloco.classList.add('bloco')
        novoBloco.onclick = revelarConteudoDoBloco

        //Cria div class="conteudo"
        let conteudoBloco = document.createElement('span')
        conteudoBloco.classList.add('conteudo')
        conteudoBloco.setAttribute('data-linha', i)
        conteudoBloco.setAttribute('data-coluna', j)

        novoBloco.appendChild(conteudoBloco)
        linha.appendChild(novoBloco)
      }

      elementoTabuleiro.appendChild(linha)
    }
  },

  atualizarEnunciado() {
    if (this.cliques <= this.QUANT_CLIQUES_PARA_GANHAR) {
      this.CONTAIER_GAME.firstElementChild.firstElementChild.innerHTML = `${this.QUANT_CLIQUES_PARA_GANHAR - this.cliques}`
    }
  },

  definirBombas() {
    let arrayBombas = []

    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS * this.QUANT_LINHAS_COLUNAS; i++) {
      arrayBombas.push(false)
    }

    for (let i = 0; i < this.QUANT_BOMBAS; i++) {
      arrayBombas[i] = true
    }

    arrayBombas = this.embaralharArray(arrayBombas)
    let count = 0

    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS; i++) {
      for (let j = 0; j < this.QUANT_LINHAS_COLUNAS; j++) {
        if (arrayBombas[count] === true) {
          this.posicoesBombas.linha.push(i)
          this.posicoesBombas.coluna.push(j)
        }

        count++
      }
    }
  },

  possuiBombaNosIndices(linha, coluna) {
    for (let i = 0; i < this.QUANT_BOMBAS; i++) {
      if (this.posicoesBombas.linha[i] == linha && this.posicoesBombas.coluna[i] == coluna)
        return true
    }

    return false
  },

  definirValoresDosBlocos() {
    this.definirBombas()

    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS; i++) {
      this.valoresBlocos[i] = [this.QUANT_LINHAS_COLUNAS]
    }

    //Define as bombas
    let count = 0

    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS; i++) {
      for (let j = 0; j < this.QUANT_LINHAS_COLUNAS; j++) {
        if (this.possuiBombaNosIndices(i, j))
          this.valoresBlocos[i][j] = "X"
      }
    }

    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS; i++) {
      for (let j = 0; j < this.QUANT_LINHAS_COLUNAS; j++) {
        if (this.possuiBombaNosIndices(i, j))
          continue;

        let valor = 0;
        const linhaBomba = this.posicoesBombas.linha
        const colunaBomba = this.posicoesBombas.coluna
        //Superior esquerdo
        if (i == 0 && j == 0) {
          if (this.possuiBombaNosIndices(0, 1))
            valor++
          if (this.possuiBombaNosIndices(1, 0))
            valor++
          if (this.possuiBombaNosIndices(1, 1))
            valor++
        }
        else
          //Superior direito
          if (i == 0 && j == this.QUANT_LINHAS_COLUNAS - 1) {
            if (this.possuiBombaNosIndices(0, this.QUANT_LINHAS_COLUNAS - 1))
              valor++
            if (this.possuiBombaNosIndices(1, this.QUANT_LINHAS_COLUNAS - 2))
              valor++
            if (this.possuiBombaNosIndices(1, this.QUANT_LINHAS_COLUNAS - 1))
              valor++
          }
          else
            //inferior esquerdo
            if (i == this.QUANT_LINHAS_COLUNAS - 1 && j == 0) {
              if (this.possuiBombaNosIndices(this.QUANT_LINHAS_COLUNAS - 2, 0))
                valor++
              if (this.possuiBombaNosIndices(this.QUANT_LINHAS_COLUNAS - 2, 1))
                valor++
              if (this.possuiBombaNosIndices(this.QUANT_LINHAS_COLUNAS - 1, 1))
                valor++
            }

            else
              //inferior direito
              if (i == this.QUANT_LINHAS_COLUNAS - 1 && j == this.QUANT_LINHAS_COLUNAS - 1) {
                if (this.possuiBombaNosIndices(this.QUANT_LINHAS_COLUNAS - 2, this.QUANT_LINHAS_COLUNAS - 1))
                  valor++
                if (this.possuiBombaNosIndices(this.QUANT_LINHAS_COLUNAS - 2, this.QUANT_LINHAS_COLUNAS - 2))
                  valor++
                if (this.possuiBombaNosIndices(this.QUANT_LINHAS_COLUNAS - 1, this.QUANT_LINHAS_COLUNAS - 1))
                  valor++
              }

              else {
                if (this.possuiBombaNosIndices(i - 1, j - 1))
                  valor++
                if (this.possuiBombaNosIndices(i - 1, j))
                  valor++
                if (this.possuiBombaNosIndices(i - 1, j + 1))
                  valor++
                if (this.possuiBombaNosIndices(i, j - 1))
                  valor++
                if (this.possuiBombaNosIndices(i, j + 1))
                  valor++
                if (this.possuiBombaNosIndices(i + 1, j - 1))
                  valor++
                if (this.possuiBombaNosIndices(i + 1, j))
                  valor++
                if (this.possuiBombaNosIndices(i + 1, j + 1))
                  valor++
              }

        this.valoresBlocos[i][j] = valor
      }
    }
  },

  checarSePerdeuOuGanhou(value) {
    this.cliques++
    this.atualizarEnunciado()

    if (value === 'X') {
      revelarTudo()
      this.finalizar('perdeu')
    }
    else if (this.cliques === this.QUANT_CLIQUES_PARA_GANHAR) {
      this.finalizar('ganhou')
    }
  },

  desabilitarCliquesDeTodosOsBlocos() {
    document.querySelectorAll('.bloco').forEach(element => {
      element.onclick = () => { }
    })
  }
  ,

  finalizar(resultado) {
    this.desabilitarCliquesDeTodosOsBlocos()
    setTimeout(() => { gameFinalizado(resultado) }, 2000)
  }
}