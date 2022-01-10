var formMode = "";
var statusArr = ["Draft", "Saved", "Deleted"];
var patientID;
var checkVarablie = false;
appInit = () => {
    myPatientListClass.init();
    myPatientEditClass.init();
    mydataServiceClass.init();
    myRouterEngineClass.init();
    myTemplateEngineClass.init();
}
$(document).ready(appInit);

