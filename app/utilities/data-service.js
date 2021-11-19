class dataServiceClass {
    init = () => {
        
    }
    getAll = () => {
        return patientsData;
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
    getNewID = () => {
        let newId = patientsData[patientsData.length - 1].ID + 1;
        return newId;
    }
    deletePatientByID = (id) => {
        let index = this.getIndexByID(id);
        let patient = this.getPatientByID(id);
        patientsData.splice(index, 1);
        return patient;
    }
    updatePatient = (newPatientObj) => {
        let oldPatientObj = this.getPatientByID(newPatientObj.ID);
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
        let newId = this.getNewID();
        patientObj.ID = newId;
        patientObj.creationDate = moment();
        patientObj.CreatedBy = 1;
        patientsData.push(patientObj);
    }
}
let mydataServiceClass = new dataServiceClass();
