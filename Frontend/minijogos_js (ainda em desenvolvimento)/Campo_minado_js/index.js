function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

//Atribui no onclick dos elementos blocos
function revelar(element) {
  const linha = element.getAttribute('data-linha')
  const coluna = element.getAttribute('data-coluna')
  let value = tabuleiro.valoresBlocos[linha][coluna]
  element.innerText = value
  element.style.color = value == "X"? "black" : "white"
}

function revelarConteudoDoBloco() {
  const conteudo = this.firstElementChild
  revelar(conteudo)
}

// Para facilitar testes
function revelarTudo() {
  document.querySelectorAll('.conteudo').forEach((element) => {
    revelar(element)
  })
}

const tabuleiro = {
  QUANT_LINHAS_COLUNAS: 7,
  posicoesBombas: {linha: [], coluna: []},
  valoresBlocos: [this.QUANT_LINHAS_COLUNAS],

  construirTabuleiro() {
    this.definirValoresDosBlocos()
    
    //Cria div class="tabuleiro"
    let elementoTabuleiro = document.createElement('div')
    elementoTabuleiro.classList.add('tabuleiro')
    document.querySelector('.game').appendChild(elementoTabuleiro)
  

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

  definirBombas() {
    console.log(this.QUANT_LINHAS_COLUNAS)
    let index = 0;
    do {
      const posicaoLinha = randomInt(0, this.QUANT_LINHAS_COLUNAS - 1)
      const posicaoColuna = randomInt(0, this.QUANT_LINHAS_COLUNAS - 1)

      if (!(this.posicoesBombas.linha.includes(posicaoLinha) && this.posicoesBombas.coluna.includes(posicaoColuna))) {
        index++
        this.posicoesBombas.linha.push(posicaoLinha)
        this.posicoesBombas.coluna.push(posicaoColuna)
      }
     
    } while (index < this.QUANT_LINHAS_COLUNAS)
  },

  possuiBombaNosIndices(linha, coluna) {
    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS; i++) {
      if (this.posicoesBombas.linha[i] == linha && this.posicoesBombas.coluna[i] == coluna)
        return true
    }

    return false
  },

  definirValoresDosBlocos() {
    this.definirBombas()
  
    //Consertar - Remover for e definir os números com base nas bombas
    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS; i++) {
      this.valoresBlocos[i] = [this.QUANT_LINHAS_COLUNAS]
      for (let j = 0; j < this.QUANT_LINHAS_COLUNAS; j++) {
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
  
    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS; i++) {
      this.valoresBlocos[this.posicoesBombas.linha[i]][this.posicoesBombas.coluna[i]] = "X"  
    }
  }

}

tabuleiro.construirTabuleiro()

