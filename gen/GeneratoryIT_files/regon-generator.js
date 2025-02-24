/**
 * Created by wujokrzysio on 12.09.15.
 */

function setGeneratedRegon() {
    $("#regonBox").text(generateRegon());
}

function generateRegon() {
    var provinceCode = getRandomProvinceCode();
    var randomPart = getRegonRandomPart();
    var base = "" + provinceCode + randomPart;
    var controlSum = getRegonControlSumField(base);
    return base + controlSum;
}

function getRandomProvinceCode() {
    var random = getRandomInt(0, 48);
    var provinceCode = 2 * random + 1;
    return addLeadingZeros(provinceCode, 2);
}

function getRegonRandomPart() {
    var randomInt = getRandomInt(0, 999999);
    return addLeadingZeros(randomInt, 6);
}

function getRegonControlSumField(base) {
    var controlSum = 8 * base[0] + 9 * base[1] + 2 * base[2] + 3 * base[3] + 4 * base[4]
        + 5 * base[5] + 6 * base[6] + 7 * base[7];
    var controlSumRest = controlSum % 11;
    if (controlSumRest == 10) {
        return 0;
    }
    return controlSumRest;
}


