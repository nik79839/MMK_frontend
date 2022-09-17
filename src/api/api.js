import * as axios from "axios";

export const mainAPI = {
    getCalculations() {
        return axios.get('https://localhost:7231/CalculationPowerFlows/GetCalculations'); //
    },
    getCalculationStatisticById(id) {
        return axios.get('https://localhost:7231/CalculationPowerFlows/GetCalculations/'+id); //
    },
    deleteCalculationById(id) {
        return axios.delete('https://localhost:7231/CalculationPowerFlows/DeleteCalculations/'+id); //
    },
}

export const calculationFormAPI = {
    getSeches() {
        return axios.get('https://localhost:7231/SchemeInfo/GetSech'); //
    },
    getDistricts() {
        return axios.get('https://localhost:7231/SchemeInfo/GetDistricts/'); //
    },
    getLoadNodes() {
        return axios.get('https://localhost:7231/SchemeInfo/GetLoadNodes/'); //
    },
    startCalculation(values, cancelToken) {
        return axios.post("https://localhost:7231/CalculationPowerFlows/PostCalculations",values, 
        {headers: { "Content-Type": "multipart/form-data"}, cancelToken: cancelToken});
    }
}

export const rastrFilesAPI = {
    getRastrFiles() {
        return axios.get('https://localhost:7231/RastrFiles/GetRastrFiles'); //
    },
    postRastrFiles(file) {
        debugger;
        return axios.post('https://localhost:7231/RastrFiles/PostRastrFiles',file); //
    }
}

