import * as axios from "axios";

export const mainAPI = {
    getCalculations() {
        return axios.get('https://localhost:7231/CalculationPowerFlows/GetCalculations'); //
    },
    getCalculationStatisticById(id) {
        return axios.get('https://localhost:7231/CalculationPowerFlows/GetCalculations/'+id); //
    },
    getCalculationStatus() {
        return axios.get('https://localhost:7231/CalculationPowerFlows/GetCalculations/status'); //
    },
}

