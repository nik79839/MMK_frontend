import * as axios from "axios";

export const mainAPI = {
    getCalculations() {
        return axios.get('https://localhost:7231/CalculationPowerFlows'); //
    },
}

