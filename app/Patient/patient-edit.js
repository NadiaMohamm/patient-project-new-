class patientEditClass {
    init = () => {
        $(".patient-save-btn").click(this.onSaveClick);
        $(".delete-btn-table").click(this.deletePatinetFromEditScreen);
        $(".error-message").hide();
    }
    onSaveClick = () => {
        $("#patient-form input").removeClass("red-border");
        $(".error-message").hide();
        this.checkValidation();
        if (checkVarablie) {
            return;
        }
        var patientFormObj = this.getControlsData();
        if (formMode == "edit") {
            patientFormObj.ID = patientID;
            mydataServiceClass.updatePatient(patientFormObj);
        }
        if (formMode == "add") {
            mydataServiceClass.addPatient(patientFormObj);
        }
        myPatientListClass.renderTable();
        myRouterEngineClass.showListScreen();
    }
    deletePatinetFromEditScreen = (e) => {
        patientID = $(e.target).closest('tr').data("id");
        $("#ModelDeletePatient").modal();
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
        patientFormObj.Active = $("#active")[0].checked;
        return patientFormObj;
    }
    checkValidation = () => {
        const patientForm = $("#patient-form")
        if (!patientForm[0].checkValidity() || isNaN($("#age").val()) || $("#age").val() < 0) {
            checkVarablie = true;
            if (!($("#first-name")[0].checkValidity())) {
                $("#first-name").addClass("red-border");
                $(".error-message.first-name").show();
            }
            if (!($("#middle-name")[0].checkValidity())) {
                $("#middle-name").addClass("red-border");
                $(".error-message.middle-name").show();
            }
            if (!($("#dof")[0].checkValidity())) {
                $("#dof").addClass("red-border");
                $(".error-message.dof").show();
            }
            if (!($("#last-name")[0].checkValidity())) {
                $("#last-name").addClass("red-border");
                $(".error-message.last-name").show();
            }
            if (!($("#last-check")[0].checkValidity()) || !moment($("#last-check").val()).isValid()) {
                $("#last-check").addClass("red-border");
                $(".error-message.last-check").show();
            }
            if (!($("#age")[0].checkValidity()) || isNaN($("#age").val()) || $("#age").val() < 0) {
                $("#age").addClass("red-border");
                $(".error-message.age").show();
            }
            if (!($("#email")[0].checkValidity())) {
                $("#email").addClass("red-border");
                $(".error-message.email").show();
            }
            return;
        }
        checkVarablie = false;
    }
}
let myPatientEditClass = new patientEditClass();