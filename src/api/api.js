import * as axios from "axios";

export const mainAPI = {
    getCalculations() {
        return axios.get('https://localhost:5001/api/Calculations/GetCalculations'); //
    },
    getCalculationStatisticById(id) {
        return axios.get('https://localhost:5001/api/Calculations/GetCalculations/'+id); //
    },
    deleteCalculationById(id) {
        return axios.delete('https://localhost:5001/api/Calculations/DeleteCalculations/'+id); //
    },
}

export const calculationFormAPI = {
    getRastrSchemeInfo() {
        return axios.get('https://localhost:5001/api/RastrSchemeInfo/GetRastrSchemeInfo'); //
    },
    startCalculation(values, cancelToken) {
        return axios.post("https://localhost:5001/api/Calculations/PostCalculations",values, 
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
        return axios.post('https://localhost:5001/api/Auth/auth',values); //
    },
    whoAmI() {
        return axios.get('https://localhost:5001/api/Auth/whoAmI',{headers: authHeader()});
    },
    getUsers() {
        return axios.get('https://localhost:5001/api/Auth/GetUsers'); //
    },
    createUser(values) {
        return axios.post('https://localhost:5001/api/Auth/CreateUser',values); //
    },
}

export const authHeader = () => {
    const token = localStorage.getItem('token');
    //if (token) {
    return {Authorization: 'Bearer ' + token};
}

