
function addInput() {
    var div = document.getElementsByClassName('inputs')[0];
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'input';
    input.onchange = przelicz;
    div.appendChild(input);
}

function addDeleteButton() {
  var div = document.getElementsByClassName('inputs')[0];
  var button = document.createElement('button');
  button.innerHTML = 'Usuń';
  button.onclick = function() {
    div.removeChild(this.previousSibling);
    div.removeChild(this);
    przelicz();
  };
  div.appendChild(button);
}

function addInputs() {
    var div = document.getElementsByClassName('inputs')[0];
    for (var i = 0; i < 4; i++) {
      var input = document.createElement('input');
        input.type = 'text';
        input.className = 'input';
        input.onchange = przelicz;
        div.appendChild(input);
        addDeleteButton();
    }
}

function przelicz() {
    var pola = document.querySelectorAll('input[type="text"]');
    var suma = 0;
    var min = Infinity;
    var max = -Infinity;

    pola.forEach(function(pole) {
      var wartosc = parseFloat(pole.value);
      if (!isNaN(wartosc)) {
        suma += wartosc;
        if (wartosc < min) min = wartosc;
        if (wartosc > max) max = wartosc;
      }
    });

    var srednia = suma / pola.length;

    document.getElementById('results').innerHTML = "Sum: " + suma.toFixed(2) + "<br>" +
                                                   "Avg: " + srednia.toFixed(2) + "<br>" +
                                                   "Min: " + (min === Infinity ? "Brak danych" : min.toFixed(2)) + "<br>" +
                                                   "Max: " + (max === -Infinity ? "Brak danych" : max.toFixed(2));
}

function main() {
  addInputs();
  document.getElementById('calculate').addEventListener('click', przelicz);
  document.getElementById('add-item').addEventListener('click', addInput);

}

document.addEventListener("DOMContentLoaded", main);

