var patientSaveFor = "";
var id = " ";
var trselcted = null;
var statusArr = ["Draft", "Saved", "Deleted"];
var oldPatientObj = null;
var index;
appInit = () => {
    renderTable();
    $(".router-link").click(onRouterLinkClick);
    $(".edit-btn").click(onEditClick);
    $(".add-btn").click(onAddClick);
    $(".patient-save-btn").click(onSaveClick);
}

renderTable = () => {
    var txt = $(".template-elm").html();
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
    patientSaveFor = "edit";
    trselcted = $(e.target).closest('tr');
    id = trselcted.data("id");
    $(".user-id").text(" User ID: " + id);
    for (let i = 0; i < patientsData.length; i++) {
        if (id == patientsData[i].ID) {
            oldPatientObj = patientsData[i];
            index = i;
        }
    }
    setPatientFormData();
}

onAddClick = () => {
    patientSaveFor = "add";
    $(".user-id").text("");
    id = $("table.patients-table tr:last").data("id") + 1;
}

onSaveClick = () => {
    var patientFormObj = getPatientFormData();
    patientFormObj.ID = id;
    var txt = $(".template-elm").html();
    if (patientSaveFor == "edit") {
        patientFormObj.CreatedBy = oldPatientObj.CreatedBy;
        patientFormObj.creationDate = oldPatientObj.creationDate;
        patientsData[index] = patientFormObj;
        var tr = renderTemplate(txt, patientFormObj);
        var newTr = $(tr).replaceAll(trselcted);
        $(newTr).find(".edit-btn").click(onRouterLinkClick);
        $(newTr).find(".edit-btn").click(onEditClick);
    }
    if (patientSaveFor == "add") {
        patientFormObj.creationDate = moment();
        patientFormObj.CreatedBy = 1;
        patientsData.push(patientFormObj);
        var tr = renderTemplate(txt, patientsData[patientsData.length - 1]);
        $("tbody").append(tr);
        var addedBtn = $("table.patients-table tr:last").children().children().filter(".edit-btn");
        $(addedBtn).click(onRouterLinkClick);
        $(addedBtn).click(onEditClick);
    }
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
setPatientFormData = () => {
    $("#first-name").val(oldPatientObj.fname);
    $("#middle-name").val(oldPatientObj.mname);
    $("#last-name").val(oldPatientObj.lname);
    $("#email").val(oldPatientObj.email);
    $("#active").prop('checked', oldPatientObj.Active);
    if (oldPatientObj.gender == 1) {
        $("#male").prop('checked', true);
        $("#female").prop('checked', false);
    }
    else {
        $("#male").prop('checked', false);
        $("#female").prop('checked', true);
    }
    $("#status").val(statusArr[oldPatientObj.status]);
    $("#dof").val(moment(oldPatientObj.DOB).format('YYYY-MM-DD'));
    $("#last-check").val(moment(oldPatientObj.lastCheck).format('YYYY-MM-DD'));
}
$(document).ready(appInit);

