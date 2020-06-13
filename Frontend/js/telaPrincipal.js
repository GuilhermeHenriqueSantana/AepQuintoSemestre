let apelido = undefined

//Vincular apelido
document.querySelector('#btn-confirmar-apelido').onclick = () => {
  apelido = document.querySelector('#input-apelido').value
  postApelido()
}

//Desvincular apelido
document.querySelector('#btn-desvincular-apelido').onclick = () => {
  apelido = document.querySelector('#input-apelido').value = ''
  apelido = undefined
}
