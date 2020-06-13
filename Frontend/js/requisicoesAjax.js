let usuarioLogado = undefined

function postApelido() {
  $.ajax({
    url: "http://localhost:8080/usuarios/",
    dataType: "json",
    type: "POST",
    contentType: 'application/json',
    data: JSON.stringify({ "nome": apelido })
  })
    .done((data) => {
      usuarioLogado = data
    });
}

function getPerguntas() {
  $.ajax({
    url: "http://localhost:8080/pergunta/",
    dataType: "json",
    type: "GET",
    contentType: 'application/json',
  }).done((data) => {
    perguntas = data
    jogo.iniciar()
  })
}
