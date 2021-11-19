class templateEngineClass {
    init = () => {
    }
    renderTemplate = (str, patientDataObj) => {
        var placeHolder = str.match(/\{{.+?}\}/g);
        var token = str.match(/[^{\}]+(?=})/g);
        var strFormatter = [];
        for (let i = 0; i < token.length; i++) {
            if (token[i].indexOf("|") > -1) {
                strFormatter = token[i].match(/[^|\|]+(?=|)/gm);
                var patientData = patientDataObj[strFormatter[0]];
                switch (strFormatter[1]) {
                    case "gender": {
                        patientData = this.genderPipe(patientData);
                    }
                        break;
                    case "status": {
                        patientData = this.statusPipe(patientData);
                    }
                        break;
                    case "date": {
                        patientData = this.datePipe(patientData, strFormatter[2]);
                    }
                }
            }
            else {
                var patientData = patientDataObj[token[i]];
            }
            str = str.replace(placeHolder[i], patientData);
        }
        return str;
    }
    genderPipe = (num) => {
        if (num == 1) {
            return "male";
        }
        else
            return "female";
    }
    statusPipe = (bool) => {
        if (bool) {
            return "active";
        }
        else
            return "not active";
    }
    datePipe = (date, dateFormat) => {
        return moment(date).format(dateFormat);
    }
}
let myTemplateEngineClass = new templateEngineClass();