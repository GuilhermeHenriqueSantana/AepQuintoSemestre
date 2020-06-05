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
  QUANT_BOMBAS: 2,
  posicoesBombas: {linha: [], coluna: []},
  valoresBlocos: [this.QUANT_LINHAS_COLUNAS],

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
    let arrayBombas = []

    for (let i = 0; i < this.QUANT_LINHAS_COLUNAS * this.QUANT_LINHAS_COLUNAS; i++) {
      arrayBombas.push(false)
    }

    for (let i = 0; i < this.QUANT_BOMBAS; i++) {
      arrayBombas[i] = true
    }

    arrayBombas = this.embaralharArray(arrayBombas)

    console.log(arrayBombas)

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

    console.log(this.posicoesBombas)
    
    
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
  }

}

tabuleiro.construirTabuleiro()

