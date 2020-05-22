function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

let acertos = []

//Atribui no onclick dos elementos blocos
let countClickBloco = 0
let elementosExpostosNoVez = [2]

function esconder(linha, coluna) {
  const conteudoCards = document.querySelectorAll('.card')

  for (let i = 0; i < conteudoCards.length; i++) {
    const linhaElemento = conteudoCards[i].getAttribute('data-linha')
    const colunaElemento = conteudoCards[i].getAttribute('data-coluna')

    if (acertos.includes(tabuleiroMemoria.obterCardPorLinhaColuna(linha, coluna)))
      return

    if (linhaElemento == linha && colunaElemento == coluna) {
      conteudoCards[i].firstElementChild.innerText = ''
      return
    }
  }
}

function desabilitarCliqueElemento(linha, coluna) {
  document.querySelectorAll('.card').forEach((element) => {
    const linhaElemento = element.getAttribute('data-linha')
    const colunaElemento = element.getAttribute('data-coluna')

    if (linha == linhaElemento && coluna == colunaElemento) 
      element.onclick = () => {}
  })
}

function revelar(element) {
  if (countClickBloco > 2)
    return

  const linha = element.getAttribute('data-linha')
  const coluna = element.getAttribute('data-coluna')

  const card = tabuleiroMemoria.obterCardPorLinhaColuna(linha, coluna)

  element.firstElementChild.innerText = card.conteudo

  elementosExpostosNoVez[countClickBloco] = card
  
  countClickBloco++

  if (countClickBloco == 2){
    if (elementosExpostosNoVez[0].conteudo == elementosExpostosNoVez[1].conteudo) {
      desabilitarCliqueElemento(elementosExpostosNoVez[0].linha, elementosExpostosNoVez[0].coluna)
      desabilitarCliqueElemento(elementosExpostosNoVez[1].linha, elementosExpostosNoVez[1].coluna)
      acertos.push(elementosExpostosNoVez[0])
      acertos.push(elementosExpostosNoVez[1])
    }

    if (!acertos.includes(linha, coluna)) {
      const mili = 500
      setTimeout(() => {
        esconder(elementosExpostosNoVez[0].linha, elementosExpostosNoVez[0].coluna)
        esconder(elementosExpostosNoVez[1].linha, elementosExpostosNoVez[1].coluna)
        countClickBloco = 0
  
      }, mili)
    }
  }
    
}

function revelarConteudoDoBloco() {
  revelar(this)
}

// Para facilitar testes
function revelarTudo() {
  document.querySelectorAll('.card').forEach((element) => {
    const linha = element.getAttribute('data-linha')
    const coluna = element.getAttribute('data-coluna')
    const card = tabuleiroMemoria.obterCardPorLinhaColuna(linha, coluna)

    element.firstElementChild.innerText = card.conteudo

    acertos.push(element)
    desabilitarCliqueElemento(linha, coluna)
  })
}

const tabuleiroMemoria = {
  // Precisa ser par
  QUANT_CARD: 12,
  //Precisa ser divisível pela quantidade de cards
  QUANT_LINHA: 3,
  cards: [],

  obterCardPorLinhaColuna(linha, coluna) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].linha == linha && this.cards[i].coluna == coluna)
        return this.cards[i]
    }

    return undefined
  },

  embaralharCards(array) {
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

  definirPosicoesDosCards() {
    for (let i = 0; i < this.QUANT_CARD / 2; i++) {

      this.cards.push({
        conteudo: i,
        linha: '',
        coluna: ''
      })

      this.cards.push({
        conteudo: i,
        linha: '',
        coluna: ''
      })
    }

    this.cards = this.embaralharCards(this.cards)

    let index = 0
    for (let i = 0; i < this.QUANT_LINHA; i++) {
      for (let j = 0; j < this.QUANT_CARD / this.QUANT_LINHA; j++) {
        this.cards[index].linha = i;
        this.cards[index].coluna = j;

        index++
      }
    }
    console.log(this.cards)
  },

  construir() {
    if (this.QUANT_CARD % 2 == 1)
      this.QUANT_CARD++
    
    this.definirPosicoesDosCards()

    const novoTabuleiro = document.createElement('div')
    novoTabuleiro.classList.add('tabuleiro-memoria')

    document.querySelector('.game').appendChild(novoTabuleiro)

    let index = 0
    for (let i = 0; i < this.QUANT_LINHA; i++) {
      const novaLinha = document.createElement('div')
      novaLinha.classList.add('linha-card')

      novoTabuleiro.appendChild(novaLinha)
      for (let j = 0; j < this.QUANT_CARD / this.QUANT_LINHA; j++) {

        const novoCard = document.createElement('div')
        novoCard.classList.add('card')
        novoCard.setAttribute('data-linha', this.cards[index].linha)
        novoCard.setAttribute('data-coluna', this.cards[index].coluna)
        novoCard.onclick = revelarConteudoDoBloco

        const novoConteudoCard = document.createElement('span')
        novoConteudoCard.classList.add('conteudo-card')

        novoCard.appendChild(novoConteudoCard)
        novaLinha.appendChild(novoCard)

        index++
      }
    }
  }
}

tabuleiroMemoria.construir()