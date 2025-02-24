/**
 * Created by wujokrzysio on 12.09.15.
 */
var officeCodes = [
    "107", "108", "109", "111", "112", "113", "114", "115", "116", "117", "118", "119", "121", "122", "123", "124",
    "125", "154", "156", "157", "158", "337", "338", "339", "341", "342", "355", "356", "375", "376", "377", "378",
    "379", "381", "389", "392", "393", "394", "416", "417", "496", "497", "509", "511", "512", "519", "521", "522",
    "523", "524", "525", "526", "527", "528", "529", "531", "532", "533", "534", "535", "536", "566", "567", "568",
    "569", "572", "601", "701", "757", "758", "759", "761", "762", "774", "776", "796", "797", "798", "799", "811",
    "812", "821", "822", "823", "826", "837", "838", "931", "932", "948", "951", "952", "965", "971", "978"
];

function setGeneratedNip() {
    $("#nipBox").text(generateNip());
}

function generateNip() {
    do {
        var officeCode = getRandomOfficeCode();
        var randomPart = getRandomPart();
        var base = "" + officeCode + randomPart;
        var controlSum = getNipControlSumField(base);
    }
    while (controlSum > 9);
    return base + controlSum;
}

function getRandomOfficeCode() {
    var index = getRandomInt(0, officeCodes.length-1);
    return officeCodes[index];
}

function getRandomPart() {
    var randomInt = getRandomInt(0, 999999);
    return addLeadingZeros(randomInt, 6);
}

function getNipControlSumField(base) {
    var controlSum = 6 * base[0] + 5 * base[1] + 7 * base[2] + 2 * base[3] + 3 * base[4]
        + 4 * base[5] + 5 * base[6] + 6* base[7] + 7 * base[8];
    var controlSumLastDigit = controlSum % 11;
    return controlSumLastDigit;
}


