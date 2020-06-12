//Onclick imagem minijogo
document.querySelectorAll('.imagem-minijogo').forEach(element => {
  element.onclick = function() {
    jogo.atualizarQuantidadeDeDicas(jogo.quantidadeDeDicas - 1)
  }
})

function iniciarUmMinijogo() {
  document.querySelector('#tela-perguntas').classList.add('d-none')
  
  document.querySelector('#game').classList.remove('d-none')
  jogo.atualizarQuantidadeDeDicas(jogo.quantidadeDeDicas - 1)
}

document.querySelector('#container-memoria').onclick = () => {
  if (jogo.quantidadeDeDicas > 0) {
    iniciarUmMinijogo()
    tabuleiroMemoria.iniciar()
  }
}

document.querySelector('#container-campo-minado').onclick = () => {
  if (jogo.quantidadeDeDicas > 0) {
    iniciarUmMinijogo()  
    tabuleiroCampoMinado.iniciar()
  }
}

function gameFinalizado(resultado) {
  if (resultado === 'perdeu') {
    cor = 'rgb(217,83,79)'
  } else {
    cor = 'rgb(92,184,92)'
    jogo.revelarUmaAlternativaIncorretaAleatoriamente()
  }

  document.querySelector('#game').innerHTML += 
  `
    <div class="container-resultado" style="border-color: ${cor}">
      <h2 class="text-center" style="color: ${cor}">Você ${resultado}</h2>
    </div>
  `

  setTimeout(() => {
    document.querySelector('#game').classList.add('d-none')
    document.querySelector('#tela-perguntas').classList.remove('d-none')
    jogo.despausarTemporizador()
  }, 1700)
}
