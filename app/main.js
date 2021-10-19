var formMode = "";
var statusArr = ["Draft", "Saved", "Deleted"];

appInit = () => {
    renderTable();
    $(".router-link").click(onRouterLinkClick);
    $(".edit-btn").click(onEditClick);
    $(".add-btn").click(onAddClick);
    $(".patient-save-btn").click(onSaveClick);
}

renderTable = () => {
    $("tbody tr").remove();
    var txt = $(".patient-list-template").html();
    for (let i = 0; i < patientsData.length; i++) {
        var tr = renderTemplate(txt, patientsData[i]);
        $("tbody").append(tr);
    }
}

renderTemplate = (str, patientDataObj) => {
    var placeHolder = str.match(/\{{.+?}\}/g);
    var token = str.match(/[^{\}]+(?=})/g);
    for (let i = 0; i < token.length; i++) {
        var patientData = patientDataObj[token[i]];
        str = str.replace(placeHolder[i], patientData);
    }
    return str;
}

onRouterLinkClick = (e) => {
    var desiredContent = $(e.target).data("target");
    navigate(desiredContent);
}

navigate = (desiredContent) => {
    hideAll();
    $(desiredContent).show();
}

hideAll = () => {
    $(".screen").hide();
}

onEditClick = (e) => {
    formMode = "edit";
    let trSelcted = $(e.target).closest('tr');
    let idSelected = trSelcted.data("id");
    $(".patients-edit .patient-id").text(idSelected);
    let selectedPatientObj = getPatientByID(idSelected);
    setPatientFormData(selectedPatientObj);
}

onAddClick = () => {
    formMode = "add";
    $(".patient-id").text("");
}

onSaveClick = () => {
    var patientFormObj = getPatientFormData();
    if (formMode == "edit") {
        patientFormObj.ID = $(".patient-id").text();
        updatePatient(patientFormObj);
    }
    if (formMode == "add") {
        addPatient(patientFormObj);
    }
    showListScreen();
    $(".edit-btn").click(onRouterLinkClick);
    $(".edit-btn").click(onEditClick);
    $('#patient-form')[0].reset();

}

getPatientFormData = () => {
    var patientFormObj = {};
    patientFormObj.fname = $("#first-name").val();
    patientFormObj.mname = $("#middle-name").val();
    patientFormObj.lname = $("#last-name").val();
    patientFormObj.DOB = moment($("#dof").val());
    patientFormObj.gender = $('input[name="gender"]:checked').val();
    patientFormObj.email = $("#email").val();
    patientFormObj.lastCheck = $("#last-check").val();
    patientFormObj.status = statusArr.indexOf($("#status").val());
    patientFormObj.Active = $("#active")[0].checked;
    return patientFormObj;
}
setPatientFormData = (patirntObj) => {
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
getPatientByID = (id) => {
    for (let i = 0; i < patientsData.length; i++) {
        if (id == patientsData[i].ID) {
            let patientObj = patientsData[i];
            return patientObj;
        }
    }
}
getIndexByID = (id) => {
    for (let i = 0; i < patientsData.length; i++) {
        if (id == patientsData[i].ID) {
            let index = i;
            return index;
        }
    }
}
updatePatient = (newPatientObj) => {
    let oldPatientObj = getPatientByID(newPatientObj.ID);
    oldPatientObj.fname = newPatientObj.fname;
    oldPatientObj.mname = newPatientObj.mname;
    oldPatientObj.lname = newPatientObj.lname;
    oldPatientObj.DOB = newPatientObj.DOB;
    oldPatientObj.gender = newPatientObj.gender;
    oldPatientObj.email = newPatientObj.email;
    oldPatientObj.lastCheck = newPatientObj.lastCheck;
    oldPatientObj.status = newPatientObj.status;
    oldPatientObj.Active = newPatientObj.Active;
}
addPatient = (patientObj) => {
    let newId = patientsData[patientsData.length - 1].ID + 1;
    patientObj.ID = newId;
    patientObj.creationDate = moment();
    patientObj.CreatedBy = 1;
    patientsData.push(patientObj);
}
showListScreen = () => {
    renderTable();
    navigate(".patients-list");
}
$(document).ready(appInit);

