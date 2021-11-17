$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
  let corpoTabela = $(".placar").find("tbody");
  let usuario = $("#usuarios").val();
  let numPalavras = $("#contador-palavras").text();

  let linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);
  $(".placar").slideDown(500);
  scrollPlacar();
}

function scrollPlacar() {
  let posicaoPlacar = $(".placar").offset().top;
  $("html, body").animate(
    {
      scrollTop: `${posicaoPlacar}px`,
    },
    500
  );
}

function novaLinha(usuario, palavras) {
  let linha = $("<tr>");
  let colunaUsuario = $("<td>").text(usuario);
  let colunaPalavras = $("<td>").text(palavras);
  let colunaRemover = $("<td>");
  const link = $("<a>").addClass("botao-remover").attr("href", "#");
  const icone = $("<i>")
    .addClass("small")
    .addClass("material-icons")
    .text("delete");

  link.append(icone);
  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha() {
  $(".botao-remover").click(function (event) {
    event.preventDefault();
    let linha = $(event.currentTarget).parent().parent();
    linha.fadeOut(500);
    setTimeout(() => {
      linha.remove();
    }, 500);
  });
}

function mostraPlacar() {
  $(".placar").stop().slideToggle(500);
}

function sincronizaPlacar() {
  let placar = [];
  let linhas = $("tbody>tr");

  linhas.each(function () {
    let usuario = $(this).find("td:nth-child(1)").text();
    let palavras = $(this).find("td:nth-child(2)").text();

    let score = {
      usuario: usuario,
      pontos: palavras,
    };

    placar.push(score);
  });

  let dados = {
    placar: placar,
  };
  $.post("http://localhost:3000/placar", dados, function () {
    $(".tooltip-click")
      .tooltipster("open")
      .tooltipster("content", "Sincronizado com sucesso");
  })
    .fail(function () {
      $(".tooltip-click")
        .tooltipster("open")
        .tooltipster("content", "Falha ao sincronizar");
    })
    .always(function () {
      setTimeout(function () {
        $(".tooltip-click")
          .tooltipster("close")
          .tooltipster("content", "Sincronizar");
      }, 2000);
    });
}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar", function (data) {
    $(data).each(function () {
      let linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
    });
  });
}
