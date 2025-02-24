/**
 * Created by wujokrzysio on 12.09.15.
 */

function setGeneratedIban() {
    var prefix = getPrefix();
    var spaces = getSpaces();
    $("#ibanBox").text(generateIban(prefix, spaces));
}

function getPrefix() {
    return readBoolean(localStorage.getItem("pl-prefix"));
}

function getSpaces() {
    return readBoolean(localStorage.getItem("spaces"));
}

function getPrefixFromUI() {
    return $("#pl-prefix").is(':checked');
}

function getSpacesFromUI() {
    return $("#spaces").is(':checked');
}

function clearPrefix() {
    $("#pl-prefix").prop('checked', true);
}

function clearSpaces() {
    $("#spaces").prop('checked', false);
}


function clearIbanParameters() {
    clearPrefix();
    clearSpaces();
}

function saveIbanParameters() {
    localStorage.setItem("pl-prefix", getPrefixFromUI());
    localStorage.setItem("spaces", getSpacesFromUI());
    $('#ibanSettings').closeModal();
    setGeneratedIban();
    Materialize.toast('Dane zostały zapisane w pamięci przeglądarki', 2000);
}

function loadIbanParameters() {
    $("#pl-prefix").prop('checked', getPrefix());
    $("#spaces").prop('checked', getSpaces());
}