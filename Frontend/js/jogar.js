document.querySelector('#btn-jogar').onclick = function() {
  document.querySelector('#tela-principal').classList.add('d-none')
  document.querySelector('#tela-perguntas').classList.remove('d-none')
}

document.querySelector('#icone-return').onclick = function() {
  document.querySelector('#tela-perguntas').classList.add('d-none')
  document.querySelector('#tela-principal').classList.remove('d-none')
}