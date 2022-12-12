import * as axios from "axios";

export const mainAPI = {
    getCalculations() {
        return axios.get('https://localhost:5001/api/CalculationPowerFlows/GetCalculations'); //
    },
    getCalculationStatisticById(id) {
        return axios.get('https://localhost:5001/api/CalculationPowerFlows/GetCalculations/'+id); //
    },
    deleteCalculationById(id) {
        return axios.delete('https://localhost:5001/api/CalculationPowerFlows/DeleteCalculations/'+id); //
    },
}

export const calculationFormAPI = {
    getRastrSchemeInfo() {
        return axios.get('https://localhost:5001/api/RastrSchemeInfo/GetRastrSchemeInfo'); //
    },
    startCalculation(values, cancelToken) {
        return axios.post("https://localhost:5001/api/CalculationPowerFlows/PostCalculations",values, 
        {headers: { "Content-Type": "application/json"}, cancelToken: cancelToken});
    }
}

export const rastrFilesAPI = {
    getRastrFiles() {
        return axios.get('https://localhost:5001/api/RastrFiles/GetRastrFiles'); //
    },
    postRastrFiles(file) {
        return axios.post('https://localhost:5001/api/RastrFiles/PostRastrFiles',file); //
    }
}

export const authAPI = {
    auth(values) {
        return axios.post('https://localhost:5001/api/auth',values,{headers: {"Content-Type": "multipart/form-data"}}); //
    },
    whoAmI() {
        return axios.get('https://localhost:5001/api/whoAmI',{headers: authHeader()});
    }
}

export const authHeader = () => {
    const token = localStorage.getItem('token');
    //if (token) {
    return {Authorization: 'Bearer ' + token};
}

