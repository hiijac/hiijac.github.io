$.inputs = {};

$(document).ready(function() {
    $('.modal-trigger').leanModal();

    $.inputs.test = 'sss';
    $.inputs.date = $('#birthDate').pickadate({
        container: '.container',
        selectMonths: true,
        selectYears: 100,
        closeOnSelect: true,
        closeOnClear: true,
        labelMonthNext: 'Następny miesiąc',
        labelMonthPrev: 'Poprzedni miesiąc',
        labelMonthSelect: 'Wybierz miesiąc',
        labelYearSelect: 'Wybierz rok',
        monthsFull: [ 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień' ],
        monthsShort: [ 'Sty', 'Lu', 'Mar', 'Kwi', 'May', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru' ],
        weekdaysFull: [ 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota' ],
        weekdaysShort: [ 'Nie', 'Pon', 'Wt', 'Sr', 'Czw', 'Pt', 'Sob' ],
        weekdaysLetter: [ 'Nie', 'Pon', 'Wt', 'Sr', 'Czw', 'Pt', 'Sob' ],
        today: 'Dziś',
        clear: 'Wyczyść',
        close: 'Zamknij'
    });
    $("#birthDate").blur(clearAge);
    $("#age").change(setBirthDateForAge);

    $("#peselSaveButton").click(savePeselParameters);
    $("#peselClearButton").click(clearPeselParameters);
    $("#ibanSaveButton").click(saveIbanParameters);
    $("#ibanClearButton").click(clearIbanParameters);

    setGeneratedPesel();
    setGeneratedNip();
    setGeneratedRegon();
    setGeneratedIban();
    setGeneratedIdNumber();

    loadPeselParameters();
    loadIbanParameters();
});





function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addLeadingZeros(number, length) {
    number = "" + number;
    var zerosNumber = length - number.length;

    for (i = 0; i < zerosNumber; i++) {
        number = "0" + number;
    }
    return number;
}

function readBoolean(string) {
    if (string == 'true') {
        return true;
    }
    else if (string == 'false') {
        return false;
    }
    return null;
}

function copyToClipboard (containerid) {
  var textarea = document.createElement('textarea')
  textarea.id = 'temp_element'
  textarea.style.height = 0
  document.body.appendChild(textarea)
  textarea.value = document.getElementById(containerid).innerText
  var selector = document.querySelector('#temp_element')
  selector.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  Materialize.toast('Skopiowano do schowka', 1000);
}

