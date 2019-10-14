function adicionarItem() {
  var tabela = document.getElementById("lista_tabela").getElementsByTagName('tbody')[0];
  var linha = tabela.insertRow(-1);
  linha.classList.add("nova-linha");

  var coluna_produto = linha.insertCell(0);
  var input_produto = document.createElement("input");
  input_produto.type = "text";
  input_produto.classList.add("form-control");
  coluna_produto.appendChild(input_produto);

  var coluna_quantidade = linha.insertCell(1);
  var div_input_group_quantidade = document.createElement("div");
  div_input_group_quantidade.classList.add("input-group");
  coluna_quantidade.appendChild(div_input_group_quantidade);
  var div_input_group_pre_quantidade = document.createElement("div");
  div_input_group_pre_quantidade.classList.add("input-group-prepend");
  div_input_group_pre_quantidade.classList.add("w-50");
  div_input_group_quantidade.appendChild(div_input_group_pre_quantidade);
  var input_quantidade = document.createElement("input");
  input_quantidade.type = "number";
  input_quantidade.classList.add("form-control");
  div_input_group_pre_quantidade.appendChild(input_quantidade);
  var input_udm = document.createElement("input");
  input_udm.type = "text";
  input_udm.classList.add("form-control");
  div_input_group_quantidade.appendChild(input_udm);
}

function limparLista() {
  var linhas = document.getElementsByClassName('nova-linha');
  while (linhas[0]) {
    linhas[0].parentNode.removeChild(linhas[0]);
  }

  var tabela = document.getElementById("lista_tabela").getElementsByTagName('tbody')[0];
  var l = 0;
  while (linha = tabela.rows[l++]) {
    linha.cells[1].getElementsByTagName("input")[0].value = null;
  }
}

function enviarLista() {
  var tabela = document.getElementById("lista_tabela").getElementsByTagName('tbody')[0];
  var preenchido = false;
  var texto = "";
  var itens = "";
  var l = 0;
  var num_itens = 0;

  texto = texto.concat("Lista de Compras *" + document.getElementById("nome_cliente").value + "*\n");
  texto = texto.concat("Enviado em " + (new Date()).toLocaleString() + "\n");


  while (linha = tabela.rows[l++]) {
    if (linha.cells[1].getElementsByTagName("input")[0].value.length > 0) {
      preenchido = true;
      num_itens++;
      if (linha.cells[0].innerText.length > 0) {
        itens = itens.concat(linha.cells[0].innerText + " - ");
      } else {
        itens = itens.concat(linha.cells[0].getElementsByTagName("input")[0].value + " - ");
      }
      itens = itens.concat(linha.cells[1].getElementsByTagName("input")[0].value + " ");

      if (linha.cells[1].getElementsByTagName("select")[0] != null) {
        var select = linha.cells[1].getElementsByTagName("select")[0];
        itens = itens.concat(select.options[select.selectedIndex].text);
      } else {
        itens = itens.concat(linha.cells[1].getElementsByTagName("input")[1].value);
      }

      if (linha.cells[1].getElementsByTagName("input")[0].value > 1) {
        if (!itens.endsWith("s")) {
          itens = itens.concat("s");
        }
      }
      itens = itens.concat("\n");
    }
  }

  texto = texto.concat("Total de " + num_itens + " itens\n");
  texto = texto.concat("-------------------------------------\n");
  texto = texto.concat(itens);
  texto = texto.concat("-------------------------------------\n");

  if (preenchido) {
    window.location.href = "https://api.whatsapp.com/send?phone=" + "5541992790911" + "&text=" + window.encodeURIComponent(texto);
  } else {
    window.alert("Lista vazia!");
  }
}
