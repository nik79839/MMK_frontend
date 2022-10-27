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
    getRastrSchemeInfo() {
        return axios.get('https://localhost:7231/RastrSchemeInfo/GetRastrSchemeInfo'); //
    },
    startCalculation(values, cancelToken) {
        return axios.post("https://localhost:7231/CalculationPowerFlows/PostCalculations",values, 
        {headers: { "Content-Type": "application/json"}, cancelToken: cancelToken});
    }
}

export const rastrFilesAPI = {
    getRastrFiles() {
        return axios.get('https://localhost:7231/RastrFiles/GetRastrFiles'); //
    },
    postRastrFiles(file) {
        return axios.post('https://localhost:7231/RastrFiles/PostRastrFiles',file); //
    }
}

