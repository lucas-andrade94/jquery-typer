let tempoInicial = $("#tempo-digitacao").text();
const campo = $(".campo-digitacao");

$(() => {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  atualizaPlacar();
  $("#botao-reiniciar").click(reiniciaJogo);
  campo.val("");
  $("#usuarios").selectize({
    create: true,
    sortField: "text",
  });
  $(".tooltip").tooltipster();
  $(".tooltip-click").tooltipster({
    trigger: "custom",
  })
});

function atualizaTamanhoFrase() {
  const frase = $(".frase").text();
  const numPalavras = frase.split(" ").length;
  $("#tamanho-frase").text(numPalavras);
}

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
}

function inicializaContadores() {
  campo.on("input", () => {
    const conteudo = campo.val();

    const quantidadePalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(quantidadePalavras);

    const quantidadeCaracteres = conteudo.length;
    $("#contador-caracteres").text(quantidadeCaracteres);
  });
}

function inicializaCronometro() {
  campo.one("focus", () => {
    let tempoRestante = $("#tempo-digitacao").text();
    $("#botao-reiniciar").attr("disabled", true);
    let cronometro = setInterval(() => {
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1) {
        clearInterval(cronometro);
        finalizaJogo();
      }
    }, 1000);
  });
}

function finalizaJogo() {
  campo.attr("disabled", true);
  campo.addClass("campo-desativado");
  $("#botao-reiniciar").attr("disabled", false);
  inserePlacar();
}

function inicializaMarcadores() {
  campo.on("input", () => {
    let frase = $(".frase").text();
    let digitado = campo.val();
    let comparavel = frase.substr(0, digitado.length);

    if (digitado === comparavel) {
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else {
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
}

function reiniciaJogo() {
  campo.attr("disabled", false);
  campo.val("");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  inicializaCronometro();
  campo.removeClass("campo-desativado");
  campo.removeClass("borda-verde");
  campo.removeClass("borda-vermelha");
}
