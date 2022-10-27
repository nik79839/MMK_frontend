import CalculationsUIDContainer from "./Calculations/CalculationsUIDContainer";
import GraphicsContainer from "./Graphics/GraphicsContainer";
import './Main.css';
import { mainAPI } from "../../api/api";
import {useParams } from 'react-router-dom';

const Main = (props) => { 

    const params = useParams();
    const calculationId = params.id;
    const getStatus = async() => {
        let response = await mainAPI.getCalculationStatus();
        alert(response.data);
       }

        return <div>
            <div className="calculations">
            <div>
                <CalculationsUIDContainer />
            </div>
            {calculationId != null ? (
            <div className="graphics">
                <GraphicsContainer />
            </div>): null}
            <div>
                <button onClick={getStatus} >Статус</button>
            </div>
        </div>
        </div>; 
}
export default Main;
