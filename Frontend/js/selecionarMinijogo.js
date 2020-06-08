//Onclick imagem minijogo
document.querySelectorAll('.imagem-minijogo').forEach(element => {
  element.onclick = function() {
    jogo.atualizarQuantidadeDeDicas(jogo.quantidadeDeDicas - 1)
  }
})