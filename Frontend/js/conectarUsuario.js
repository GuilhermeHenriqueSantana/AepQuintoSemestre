const elementoIconeUsuario = document.querySelector('#icon-user')

elementoIconeUsuario.onclick = () => {
  document.querySelector('container-logar').classList.toggle('d-none')
}
