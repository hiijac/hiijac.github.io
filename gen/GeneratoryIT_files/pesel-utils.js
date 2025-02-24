/**
 * Created by wujokrzysio on 12.09.15.
 */

function setGeneratedPesel() {
    var date = getBirthDate();
    if (date == null) {
        date = getDateOrRandom();
    }
    var sex = getSex();
    if (sex == null) {
        sex = getSexOrRandom();
    }
    $("#peselBox").text(generatePesel(date, sex));
}

function getDateOrRandom() {
    if (getAgeFromUI()) {
        setBirthDateForAge();
    }
    var dateText = getPicker().get('select');
    if (dateText != null && dateText != "") {
        return dateText.obj;
    }
    else {
        return randomDate(new Date(1900, 0, 1), new Date());
    }
}

function getSexOrRandom() {
    var sex = getSexFromUI();
    if (!sex) {
        var sexes = ["both", "male", "female"];
        sex = sexes[getRandomInt(0, 2)];
    }
    return sex;
}

function setBirthDateForAge() {
    var age = $("#age").val();
    if (age) {
        var now = new Date();
        var additionalDays = getRandomInt(0, 365);
        var birthDate =  new Date(now.getFullYear() - age, now.getMonth(), now.getDate());
        birthDate.setDate(birthDate.getDate() - additionalDays);
        getPicker().set('select', birthDate);
    }
}

function getDateFromUI() {
    return getPicker().get('select');
}

function getSexFromUI() {
    return $('input[name=sex]:checked').val();
}

function getAgeFromUI() {
    return $("#age").val();
}

function getPicker() {
    return $.inputs.date.pickadate('picker');
}

function clearBirthDate() {
    getPicker().set('select', null);
}

function clearAge() {
    $("#age").val(null);
}

function clearSex() {
    $('input[name=sex]').attr('checked', false);
}

function clearPeselParameters() {
    clearBirthDate();
    clearAge();
    clearSex();
}

function savePeselParameters() {
    var serializedDate = serializeDate(getDateFromUI())
    saveToStorage("birthDate", serializedDate);
    saveToStorage("age", getAgeFromUI());
    saveToStorage("sex", getSexFromUI());
    $('#peselSettings').closeModal();
    setGeneratedPesel();
    Materialize.toast('Dane zostały zapisane w pamięci przeglądarki', 2000);
}

function saveToStorage(key, value) {
    if (value != null) {
        localStorage.setItem(key, value);
    }
    else {
        localStorage.removeItem(key);
    }
}

function loadPeselParameters() {
    getPicker().set('select', getBirthDate());
    $("#age").val(getAge());
    setSexUIValue(getSex());
}

function serializeDate(date) {
    if (date == null) {
        return null;
    }
    return date.year+ "." + date.month+ "." + date.date;
}

function deserializeDate(date) {
    var splitted = date.split(".");
    return new Date(splitted[0], splitted[1], splitted[2]);
}

function setSexUIValue(value) {
    var $radios = $('input:radio[name=sex]');
    if($radios.is(':checked') === false) {
        $radios.filter('[value=' + value + ']').prop('checked', true);
    }
};

function getBirthDate() {
    var date = localStorage.getItem("birthDate");
    if (date != null) {
        return deserializeDate(date);
    }
    return null;
}

function getSex() {
    return localStorage.getItem("sex");
}

function getAge() {
    return localStorage.getItem("age")
}
