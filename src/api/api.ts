import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:5001/api'
})

export const mainAPI = {
    getCalculations() {
        return instance.get('Calculations/GetCalculations'); //
    },
    getCalculationStatisticById(id: string) {
        return instance.get('Calculations/GetCalculations/'+id); //
    },
    deleteCalculationById(id: string) {
        return instance.delete('Calculations/DeleteCalculations/'+id); //
    },
}

export const calculationFormAPI = {
    getRastrSchemeInfo() {
        return instance.get('RastrSchemeInfo/GetRastrSchemeInfo'); //
    },
    startCalculation(values: any, cancelToken: any) {
        return instance.post("Calculations/PostCalculations",values, 
        {headers: { "Content-Type": "application/json"}, cancelToken: cancelToken});
    }
}

export const rastrFilesAPI = {
    getRastrFiles() {
        return instance.get('RastrFiles/GetRastrFiles'); //
    },
    postRastrFiles(file: any) {
        return instance.post('RastrFiles/PostRastrFiles',file); //
    }
}

export const authAPI = {
    auth(values: any) {
        return instance.post('Auth/auth',values); //
    },
    getUsers() {
        return instance.get('Auth/GetUsers'); //
    },
    createUser(values: any) {
        return instance.post('Auth/CreateUser',values); //
    },
}

export const authHeader = () => {
    const token = localStorage.getItem('token');
    //if (token) {
    return {Authorization: 'Bearer ' + token};
}

