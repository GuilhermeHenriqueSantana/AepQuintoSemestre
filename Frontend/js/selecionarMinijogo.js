//Onclick imagem minijogo
document.querySelectorAll('.imagem-minijogo').forEach(element => {
  element.onclick = function() {
    alert()
    jogo.atualizarQuantidadeDeDicas(jogo.quantidadeDeDicas - 1)
  }
})

document.querySelector('#container-campo-minado').onclick = () => {
  if (jogo.quantidadeDeDicas > 0) {
    document.querySelector('#tela-perguntas').classList.add('d-none')
  
    document.querySelector('#game').classList.remove('d-none')
    jogo.pausarTemporizador()
    jogo.atualizarQuantidadeDeDicas(jogo.quantidadeDeDicas - 1)
  
    tabuleiroCampoMinado.iniciar()
  }
}

function campoMinadoFinalizado(resultado) {
    const cor = resultado === 'perdeu' ? 'rgb(217,83,79)' : 'rgb(92,184,92)'

    document.querySelector('#game').innerHTML += 
    `
      <div class="container-resultado" style="border-color: ${cor}">
        <h2 class="text-center" style="color: ${cor}">Você ${resultado}</h2>
      </div>
    `

    setTimeout(() => {
      document.querySelector('#game').classList.add('d-none')
      document.querySelector('#tela-perguntas').classList.remove('d-none')
      revelarUmaAlternativaIncorretaAleatoria()
      jogo.despausarTemporizador()
    }, 1700)
}

function revelarUmaAlternativaIncorretaAleatoria() {
  console.log('Lógica para revelar uma alternativa incorreta')
}

document.querySelector('#container-memoria').onclick = () => {alert('memória')}