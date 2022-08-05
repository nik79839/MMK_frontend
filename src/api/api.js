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
}

