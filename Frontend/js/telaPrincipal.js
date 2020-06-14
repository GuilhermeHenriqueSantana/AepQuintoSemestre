let apelido = undefined

//Onclick botão jogar
document.querySelector('#btn-jogar').onclick = function () {
  if (usuarioLogado === undefined) {
    document.querySelector('#icon-user-modal').click()
  }
  else {
    document.querySelector('#tela-principal').classList.add('d-none')
    document.querySelector('#tela-perguntas').classList.remove('d-none')
  
    getPerguntas()
  }

}

//Onclick botão ranque
document.querySelector('#btn-ranque').onclick = () => {
  if (usuarioLogado === undefined) {
    document.querySelector('#icon-user-modal').click()
  } else {
    getRanque()
  }
}

//Vincular apelido
document.querySelector('#btn-confirmar-apelido').onclick = () => {
  apelido = document.querySelector('#input-apelido').value
  postApelido()
}

//Desvincular apelido
document.querySelector('#btn-desvincular-apelido').onclick = () => {
  apelido = document.querySelector('#input-apelido').value = ''
  apelido = undefined
  usuarioLogado = undefined
}
