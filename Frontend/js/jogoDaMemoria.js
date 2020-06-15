const tabuleiroMemoria = {
  GAME_CONTAINER: document.querySelector('#game'),
  // Precisa ser par
  QUANT_CARD: 12,
  //Precisa ser divisível pela quantidade de cards
  QUANT_LINHA: 3,
  cards: [],
  elementosExpostosNaVez: [],
  acertos: [],
  countClickBloco: undefined,
  countErros: undefined,
  errosPermitidos: undefined,

  iniciar() {
    this.GAME_CONTAINER.innerHTML = ''
    this.countClickBloco = 0
    this.countErros = 0
    this.elementosExpostosNaVez = []
    this.cards = []
    this.acertos = []
    this.errosPermitidos = 20

    this.construir()
  },

  construirHeader() {
    this.GAME_CONTAINER.innerHTML =
      `
      <h3>Erros permitidos: <span>${this.errosPermitidos}</span></h3>
    `
  },

  construir() {
    this.construirHeader()


    if (this.QUANT_CARD % 2 == 1)
      this.QUANT_CARD++

    this.definirPosicoesDosCards()

    const novoTabuleiro = document.createElement('div')
    novoTabuleiro.classList.add('tabuleiro-memoria')

    this.GAME_CONTAINER.appendChild(novoTabuleiro)

    let index = 0
    for (let i = 0; i < this.QUANT_LINHA; i++) {
      const novaLinha = document.createElement('div')
      novaLinha.classList.add('linha-card')

      novoTabuleiro.appendChild(novaLinha)
      for (let j = 0; j < this.QUANT_CARD / this.QUANT_LINHA; j++) {

        const novoCard = document.createElement('div')
        novoCard.classList.add('card-memoria')
        novoCard.setAttribute('data-linha', this.cards[index].linha)
        novoCard.setAttribute('data-coluna', this.cards[index].coluna)
        novoCard.onclick = this.revelarConteudoDoCard

        const novoConteudoCard = document.createElement('span')
        novoConteudoCard.classList.add('conteudo-card')

        novoCard.appendChild(novoConteudoCard)
        novaLinha.appendChild(novoCard)

        index++
      }
    }
  },

  atualizarHeader() {
    if (this.errosPermitidos - this.countErros >= 0) {
      this.GAME_CONTAINER.firstElementChild.firstElementChild.innerText = this.errosPermitidos - this.countErros
    }
  },

  revelarConteudoDoCard() {
    const element = this

    if (tabuleiroMemoria.countClickBloco > 2)
      return

    const linha = element.getAttribute('data-linha')
    const coluna = element.getAttribute('data-coluna')

    const card = tabuleiroMemoria.obterCardPorLinhaColuna(linha, coluna)

    switch (card.conteudo) {
      case 0:
        element.firstElementChild.innerHTML = `<img src="./img/ubuntu.png" width="80">`
        break
      case 1:
        element.firstElementChild.innerHTML = `<img src="./img/node.png" width="183 ">`
        break
      case 2:
        element.firstElementChild.innerHTML = `<img src="./img/reactjs.png" width="73">`
        break
      case 3:
        element.firstElementChild.innerHTML = `<img src="./img/git.png" width="72">`
        break
      case 4:
        element.firstElementChild.innerHTML = `<img src="./img/github.png" width="72">`
        break
      case 5:
        element.firstElementChild.innerHTML = `<img src="./img/python.png" width="72">`
        break;
    }

    tabuleiroMemoria.elementosExpostosNaVez[tabuleiroMemoria.countClickBloco] = card

    tabuleiroMemoria.countClickBloco++

    if (tabuleiroMemoria.countClickBloco === 2) {
      tabuleiroMemoria.verificarSeAcertouOuErrouPar()
      tabuleiroMemoria.verificarSeEscondeOPar(linha, coluna)
    }

    tabuleiroMemoria.verificarSeOJogoAcabou()
  },

  verificarSeAcertouOuErrouPar() {
    if (tabuleiroMemoria.elementosExpostosNaVez[0].conteudo == tabuleiroMemoria.elementosExpostosNaVez[1].conteudo) {
      tabuleiroMemoria.desabilitarCliqueDoElemento(tabuleiroMemoria.elementosExpostosNaVez[0].linha, tabuleiroMemoria.elementosExpostosNaVez[0].coluna)
      tabuleiroMemoria.desabilitarCliqueDoElemento(tabuleiroMemoria.elementosExpostosNaVez[1].linha, tabuleiroMemoria.elementosExpostosNaVez[1].coluna)
      tabuleiroMemoria.acertos.push(tabuleiroMemoria.elementosExpostosNaVez[0])
      tabuleiroMemoria.acertos.push(tabuleiroMemoria.elementosExpostosNaVez[1])

      return true
    }
    //Errou
    tabuleiroMemoria.countErros++

    tabuleiroMemoria.atualizarHeader()
    return false
  },

  verificarSeEscondeOPar(linha, coluna) {
    if (!tabuleiroMemoria.acertos.includes(linha, coluna)) {
      const mili = 180
      setTimeout(() => {
        tabuleiroMemoria.esconder(tabuleiroMemoria.elementosExpostosNaVez[0].linha, tabuleiroMemoria.elementosExpostosNaVez[0].coluna)
        tabuleiroMemoria.esconder(tabuleiroMemoria.elementosExpostosNaVez[1].linha, tabuleiroMemoria.elementosExpostosNaVez[1].coluna)
        tabuleiroMemoria.countClickBloco = 0
      }, mili)
    }
  },

  desabilitarCliqueDoElemento(linha, coluna) {
    document.querySelectorAll('.card-memoria').forEach((element) => {
      const linhaElemento = element.getAttribute('data-linha')
      const colunaElemento = element.getAttribute('data-coluna')

      if (linha == linhaElemento && coluna == colunaElemento)
        element.onclick = () => { }
    })
  },

  //Atribui no onclick dos elementos blocos
  esconder(linha, coluna) {
    const conteudoCards = document.querySelectorAll('.card-memoria')

    for (let i = 0; i < conteudoCards.length; i++) {
      const linhaElemento = conteudoCards[i].getAttribute('data-linha')
      const colunaElemento = conteudoCards[i].getAttribute('data-coluna')

      if (tabuleiroMemoria.acertos.includes(tabuleiroMemoria.obterCardPorLinhaColuna(linha, coluna)))
        return

      if (linhaElemento == linha && colunaElemento == coluna) {
        conteudoCards[i].firstElementChild.innerText = ''
        return
      }
    }
  },

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
  },

  verificarSeOJogoAcabou() {
    if (tabuleiroMemoria.countErros >= tabuleiroMemoria.errosPermitidos) {
      tabuleiroMemoria.finalizar('perdeu')
    }
    else if (tabuleiroMemoria.acertos.length === this.QUANT_CARD) {
      tabuleiroMemoria.finalizar('ganhou')
    }
  },

  finalizar(resultado) {
    setTimeout(() => { gameFinalizado(resultado) }, 2000)
  }
}