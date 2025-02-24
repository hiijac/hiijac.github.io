function generatePesel(date, sex) {
    var birthDate = getBirthDateFields(date);
    var seriesFields = getSeriesFields()
    var sexField = getSexField(sex);
    var base = birthDate + seriesFields + sexField;
    var controlSumField = getControlSumField(base)
    return base + controlSumField;
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getBirthDateFields(date) {
    return extractYear(date) + extractMonth(date) + extractDay(date);
}

function extractYear(date) {
    var yearFields = date.getFullYear() % 100;
    if (yearFields < 10) {
        return "0" + yearFields;
    }
    return "" + yearFields;
}

function extractMonth(date) {
    var year = date.getFullYear();
    var monthFields = (date.getMonth() + 1);
    if (year >= 1800 && year <= 1899) {
        monthFields += 80;
    }
    if (year >= 2000 && year <= 2099) {
        monthFields += 20;
    }
    if (year >= 2100 && year <= 2199) {
        monthFields += 40;
    }
    if (year >= 2200 && year <= 2299) {
        monthFields += 60;
    }
    if (monthFields < 10) {
        monthFields = "0" + monthFields;
    }
    return "" + monthFields;
}

function extractDay(date) {
    var dayFields = date.getDate();
    if (dayFields < 10) {
        return "0" + dayFields;
    }
    return "" + dayFields;
}

function getSeriesFields() {
    var randomInt = getRandomInt(0, 999);
    return addLeadingZeros(randomInt, 3);
}

function getSexField(sex) {
    if (sex == "male") {
        return getRandomInt(0, 4) * 2 + 1;
    }
    if (sex == "female") {
        return getRandomInt(0, 4) * 2;
    }
    return getRandomInt(0, 9);
}

function getControlSumField(base) {
    var controlSum = 1 * base[0] + 3 * base[1] + 7 * base[2] + 9 * base[3] + 1 * base[4]
        + 3 * base[5] + 7 * base[6] + 9 * base[7] + 1 * base[8] + 3 * base[9];
    var controlSumLastDigit = controlSum % 10;
    var controlDigit = 10 - controlSumLastDigit;
    if (controlDigit == 10) {
        return "0";
    }
    return "" + controlDigit;
}
