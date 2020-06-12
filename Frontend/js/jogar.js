//Onclick botão jogar
document.querySelector('#btn-jogar').onclick = function() {
  document.querySelector('#tela-principal').classList.add('d-none')
  document.querySelector('#tela-perguntas').classList.remove('d-none')

  $.get("http://localhost:8080/pergunta", function(resultado){
    perguntas = resultado
    jogo.iniciar()
  })
}

//Onclick botão retornar
document.querySelector('#icone-return').onclick = function() {
  document.querySelector('#tela-perguntas').classList.add('d-none')
  document.querySelector('#tela-principal').classList.remove('d-none')
}


let perguntas

const jogo = {
  contadorDoTempoFoiIniciado: false,
  quantidadeDeDicas: undefined,
  perguntaAtual: undefined,
  tempoGastoMS: undefined,
  estaPausado: undefined,
  acertos: undefined,
  foiCorrigida: undefined,
  CONTAINER_PERGUNTA: document.querySelector('#container-pergunta'),

  iniciar() {
    this.quantidadeDeDicas = 2
    this.perguntaAtual = 0
    this.tempoGastoMS = 0
    this.estaPausado = false
    this.acertos = 0
    this.foiCorrigida = false

    this.construir()
  },

  construir() {
    this.CONTAINER_PERGUNTA.innerHTML = ''
    this.atualizarHeader()
    this.construirEnunciado()
    this.construirAlternativas()
    this.construirBotaoDeProxima()
  },

  atualizarQuantidadeDeDicas(quantidade) {
    if (quantidade >= 0) {
      this.quantidadeDeDicas = quantidade
      document.querySelector('.quantidade-de-dicas').innerText = quantidade
    }
  },

  atualizarHeader() {
    this.atualizarQuantidadeDeDicas(this.quantidadeDeDicas)
    document.querySelector('#numero-questao-atual').innerHTML = this.perguntaAtual + 1
    document.querySelector('#numero-quantidade-questoes').innerHTML = perguntas.length
    
    if (!this.contadorDoTempoFoiIniciado) {
      this.contadorDoTempoFoiIniciado = true
      //Atualizar contador
      setInterval(() => {
        if (!this.estaPausado) {
          this.tempoGastoMS += 1000
          const elemento = document.querySelector('#tempo-gasto')
    
          elemento.innerText = `${this.tempoGastoMS / 1000}s`
        }
      }, 1000)
    }
  },

  pausarTemporizador() {
    this.estaPausado = true
  },

  despausarTemporizador() {
    this.estaPausado = false
  },

  construirEnunciado() {
    const enunciado = 
    `
      <section id="enunciado">
        <p>
          ${perguntas[this.perguntaAtual].enunciado}
        </p>
      </section>
    `
    this.CONTAINER_PERGUNTA.innerHTML += enunciado
  },

  construirAlternativas() {
    const containerAlternativa = document.createElement('section')
    containerAlternativa.id = 'container-alternativas'

    this.CONTAINER_PERGUNTA.appendChild(containerAlternativa)
    
    perguntas[this.perguntaAtual].alternativas.forEach((alternativa, index) => {
      let checked = ''
      if (index === 0)
        checked = `checked="checked"`  
      const divAlternativa = 
      `
        <div class="container-alternativa">
          <div class="texto-alternativa">
            <div class="div-checkbox">
              <label class="label-checkbox">
                <input type="radio" ${checked} name="alternatina">
                <span class="checkmark"></span>
              </label>
            </div>
            
            <p class="text-center">${alternativa.enunciado}</p>
          </div>
        </div>
      `

      containerAlternativa.innerHTML += divAlternativa
    })
  },

  construirBotaoDeProxima() {
    this.CONTAINER_PERGUNTA.innerHTML += 
    `
      <footer class="d-flex justify-content-end mt-3">
        <button class="btn btn-outline-success" onclick="jogo.corrigir()">
          Próxima
        </button>
      </footer>
    `
  },

  construirJustificativa() {
    const containersAlternativa = document.querySelectorAll('.container-alternativa')

    perguntas[this.perguntaAtual].alternativas.forEach((alternativa, index) => {
      if (alternativa.justificativa !== '') {
        const containerIconeJustificativa = document.createElement('div')
        containerIconeJustificativa.classList.add('align-self-end')
        containerIconeJustificativa.classList.add('text-primary')

        const iconeJustificativa = document.createElement('i')
        iconeJustificativa.classList.add('material-icons')
        iconeJustificativa.classList.add('icone-justificativa')
        iconeJustificativa.innerHTML = 'remove_red_eye'

        iconeJustificativa.onclick = function() {
          this.parentNode.parentNode.lastElementChild.classList.toggle('d-none')
        }

        containerIconeJustificativa.appendChild(iconeJustificativa)

        containersAlternativa[index].appendChild(containerIconeJustificativa)

        //Construir texto justificativa
        const containerJustificativa = document.createElement('div')
        containerJustificativa.innerHTML = '<h4>Justificativa</h4>'
        containerJustificativa.classList.add('container-justificativa')
        containerJustificativa.classList.add('d-none')

        if (alternativa.verdadeira)
          containerJustificativa.classList.add('alternativa-correta')
        else  
          containerJustificativa.classList.add('alternativa-incorreta')

        const textoJustificativa = document.createElement('p')
        textoJustificativa.innerHTML = `${alternativa.justificativa}`

        containerJustificativa.appendChild(textoJustificativa)

        containersAlternativa[index].appendChild(containerJustificativa)
      }
    })
  },

  revelarUmaAlternativaIncorretaAleatoriamente() {
    const pergunta = perguntas[this.perguntaAtual]
    let foiRevelada = false
    do {
      const indiceAlternativa = randomInt(0, pergunta.alternativas.length - 1)

      if (!pergunta.alternativas[indiceAlternativa].verdadeira) {
        document.querySelectorAll('.container-alternativa')[indiceAlternativa].classList.add('alternativa-incorreta')
        foiRevelada = true
      }

    } while (!foiRevelada)
  },

  corrigir() {
    const radios = document.querySelectorAll('input[type="radio"]')

    //Definir cor dar bordas das alternativas (vermelho ou verde)
    radios.forEach((element, index) => {
      if (perguntas[this.perguntaAtual].alternativas[index].verdadeira) {
        if (element.checked && !this.foiCorrigida)
          this.acertos++
        radios[index].parentNode.parentNode.parentNode.parentNode.classList.add('alternativa-correta')
      }
      else {
        radios[index].parentNode.parentNode.parentNode.parentNode.classList.add('alternativa-incorreta')
      }
    })

    this.construirJustificativa()

    if (!this.foiCorrigida)
      this.foiCorrigida = true
    else {
      this.foiCorrigida = false
      this.proxima()
    }
  },

  proxima() {
    this.perguntaAtual++

    if (this.perguntaAtual < perguntas.length) {
      this.construir()
    } else {
      this.finalizar()
    }
  },

  finalizar() {
    document.querySelector('#tela-perguntas').classList.add('d-none')
    document.querySelector('#tela-principal').classList.remove('d-none')

   console.log(`Total de acertos = ${this.acertos} de ${perguntas.length}. Tempo gasto = ${this.tempoGastoMS / 1000}s`)
  }
}
