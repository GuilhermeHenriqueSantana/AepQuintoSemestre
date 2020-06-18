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
    setPerguntas(data)
  })
}

function postPontuacao(acertos, tempoGasto) {
  $.ajax({
    url: "http://localhost:8080/pontuacao/",
    dataType: "json",
    type: "POST",
    contentType: 'application/json',
    data: JSON.stringify({ "quantidadeAcertos": acertos, "tempoGasto": tempoGasto, "idUsuario": usuarioLogado.id})
  })
}

function getRanque() {
  $.ajax({
    url: "http://localhost:8080/pontuacao/",
    dataType: "json",
    type: "GET",
    contentType: 'application/json'
  }).done((data) => {
    atualizarDadosDaTabela(data)
  })
}