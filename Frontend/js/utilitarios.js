function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

function embaralharArray(array) {
  var indice_atual = array.length, valor_temporario, indice_aleatorio;

  while (0 !== indice_atual) {

    indice_aleatorio = Math.floor(Math.random() * indice_atual);
    indice_atual -= 1;

    valor_temporario = array[indice_atual];
    array[indice_atual] = array[indice_aleatorio];
    array[indice_aleatorio] = valor_temporario;
  }

  return array;
}