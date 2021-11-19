var formMode = "";
var statusArr = ["Draft", "Saved", "Deleted"];
var patientID;
appInit = () => {
    mydataServiceClass.init();
    myRouterEngineClass.init();
    myTemplateEngineClass.init();
    renderTable();
    $(".router-link").click(myRouterEngineClass.onRouterLinkClick);
    $(".edit-btn").click(onEditClick);
    $(".add-btn").click(onAddClick);
    $(".patient-save-btn").click(onSaveClick);
    $(".delete-btn").click(deletePatinetFromListScreen);
    $(".delete-btn-table").click(deletePatinetFromEditScreen);
    $(".modal-delete-yes-btn").click(confirmDeletion);
}

renderTable = () => {
    $("tbody tr").remove();
    var txt = $(".patient-list-template").html();
    for (let i = 0; i < mydataServiceClass.getAll().length; i++) {
        var tr = myTemplateEngineClass.renderTemplate(txt, mydataServiceClass.getAll()[i]);
        $("tbody").append(tr);
    }
}
onEditClick = (e) => {
    let trSelcted = $(e.target).closest('tr');
    patientID = trSelcted.data("id");
    $(".patients-edit .patient-id").text(patientID);
    open(patientID);
}

onAddClick = () => {
    $(".patient-id").text("");
    open();
}

open = (ID) => {
    patientID = ID;
    if ((patientID) == null) {
        formMode = "add";
        resetControls();
    }
    else {
        formMode = "edit";
        let selectedPatientObj = mydataServiceClass.getPatientByID(patientID);
        loadControlsData(selectedPatientObj);
    }
    myRouterEngineClass.navigate(".patients-edit");
}

onSaveClick = () => {
    var patientFormObj = getControlsData();
    if (formMode == "edit") {
        patientFormObj.ID = patientID;
        mydataServiceClass.updatePatient(patientFormObj);
    }
    if (formMode == "add") {
        mydataServiceClass.addPatient(patientFormObj);
    }
    renderTable();
    myRouterEngineClass.showListScreen();
}

getControlsData = () => {
    var patientFormObj = {};
    patientFormObj.fname = $("#first-name").val();
    patientFormObj.mname = $("#middle-name").val();
    patientFormObj.lname = $("#last-name").val();
    patientFormObj.DOB = moment($("#dof").val());
    patientFormObj.gender = $('input[name="gender"]:checked').val();
    patientFormObj.email = $("#email").val();
    patientFormObj.lastCheck = $("#last-check").val();
    patientFormObj.status = statusArr.indexOf($("#status").val());
    debugger
    patientFormObj.Active = $("#active")[0].checked;
    return patientFormObj;
}
loadControlsData = (patirntObj) => {
    $("#first-name").val(patirntObj.fname);
    $("#middle-name").val(patirntObj.mname);
    $("#last-name").val(patirntObj.lname);
    $("#email").val(patirntObj.email);
    $("#active").prop('checked', patirntObj.Active);
    if (patirntObj.gender == 1) {
        $("#male").prop('checked', true);
        $("#female").prop('checked', false);
    }
    else {
        $("#male").prop('checked', false);
        $("#female").prop('checked', true);
    }
    $("#status").val(statusArr[patirntObj.status]);
    $("#dof").val(moment(patirntObj.DOB).format('YYYY-MM-DD'));
    $("#last-check").val(moment(patirntObj.lastCheck).format('YYYY-MM-DD'));
}

resetControls = () => {
    $('#patient-form')[0].reset();
}
deletePatinetFromListScreen = () => {
    if (formMode == "edit") {
        $("#ModelDeletePatient").modal();
    }
}
deletePatinetFromEditScreen = (e) => {
    patientID = $(e.target).closest('tr').data("id");
    $("#ModelDeletePatient").modal();
}
confirmDeletion = () => {
    mydataServiceClass.deletePatientByID(patientID);
    renderTable();
    myRouterEngineClass.showListScreen();
}

$(document).ready(appInit);

