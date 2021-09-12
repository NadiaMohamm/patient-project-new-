appInit = () => {
    renderTable();
    $(".router-link").click(onRouterLinkClick);
    $(".edit-btn").click(onEditClick);
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
    var desiredContent = $(e.target).data().target;
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
    var userID = $(e.target).closest('tr').data().id;
    $(".user-id").text(userID);
}

$(document).ready(appInit);

