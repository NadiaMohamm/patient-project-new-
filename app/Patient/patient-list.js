class patientListClass {
    init = () => {
        this.renderTable();
        $(".edit-btn").click(this.onEditClick);
        $(".add-btn").click(this.onAddClick);
        $(".delete-btn").click(this.deletePatinetFromListScreen);
        $(".modal-delete-yes-btn").click(this.confirmDeletion);
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
        this.open(patientID);
    }
    onAddClick = () => {
        $(".patient-id").text("");
        this.open();
    }
    open = (ID) => {
        patientID = ID;
        if ((patientID) == null) {
            formMode = "add";
            this.resetControls();
        }
        else {
            formMode = "edit";
            let selectedPatientObj = mydataServiceClass.getPatientByID(patientID);
            this.loadControlsData(selectedPatientObj);
        }
        myRouterEngineClass.navigate(".patients-edit");
    }
    deletePatinetFromListScreen = () => {
        if (formMode == "edit") {
            $("#ModelDeletePatient").modal();
        }
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
    confirmDeletion = () => {
        mydataServiceClass.deletePatientByID(patientID);
        myPatientListClass.renderTable();
        myRouterEngineClass.showListScreen();
    }
}
let myPatientListClass = new patientListClass();