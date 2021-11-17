$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
  $("#spinner").show();

  $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(() => {
      $("#erro").show();
      setTimeout(() => {
        $("#erro").hide();
      }, 2000);
    })
    .always(() => {
      $("#spinner").hide();
    });
}

function trocaFraseAleatoria(data) {
  let frase = $(".frase");
  let numeroAleatorio = Math.floor(Math.random() * data.length);
  frase.text(data[numeroAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(id) {
  $("#spinner").show();

  const fraseId = $("#frase-id").val();
  const dados = { id: fraseId };

  $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(() => {
      $("#erro").show();
      setTimeout(() => {
        $("#erro").hide();
      }, 2000);
    })
    .always(() => {
      $("#spinner").hide();
    });
}

function trocaFrase(data) {
  let frase = $(".frase");
  frase.text(data.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo);
}
