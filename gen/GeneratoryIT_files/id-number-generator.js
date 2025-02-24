var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
var letterValues = {
    "A": 10, "B": 11, "C": 12, "D": 13, "E": 14, "F": 15, "G": 16, "H": 17, "I": 18, "J": 19, "K": 20,
    "L": 21, "M": 22, "N": 23, "O": 24, "P": 25, "Q": 26, "R": 27, "S": 28, "T": 29, "U": 30, "V": 31,
    "W": 32, "X": 33, "Y": 34, "Z": 35}

function setGeneratedIdNumber() {
    $("#idNumberBox").text(generateIdNumber());
}

function generateIdNumber() {
    var lettersPart = getLettersPart();
    var digitsPart = getDigitsPart();
    var controlSum = getControlSum(lettersPart, digitsPart);
    return lettersPart + controlSum + digitsPart;
}

function getLettersPart() {
    var lettersPart = "";
    for (var i = 0; i < 3; i++) {
        var randomLetter = letters[getRandomInt(0, 25)];
        lettersPart = lettersPart + randomLetter;
    }
    return lettersPart;
}

function getDigitsPart() {
    var randomInt = getRandomInt(0, 99999);
    return "" + addLeadingZeros(randomInt, 5);
}

function getControlSum(lettersPart, digitsPart) {
    var controlSum =  7 * letterValues[lettersPart[0]] + 3 * letterValues[lettersPart[1]] + 1 * letterValues[lettersPart[2]] +
        7 * digitsPart[0] + 3 * digitsPart[1] + 1 * digitsPart[2] + 7 * digitsPart[3] + 3 * digitsPart[4];
    var controlSumLastDigit = controlSum % 10;
    return controlSumLastDigit;
}

