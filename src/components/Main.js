import CalculationsUIDContainer from "./Calculations/CalculationsUIDContainer";
import GraphicsContainer from "./Graphics/GraphicsContainer";
import './Main.css';
import { mainAPI } from "../api/api";

const Main = (props) => { 

    const getStatus = async() => {
        let response = await mainAPI.getCalculationStatus();
        alert(response.data);
       }

        return <div>
            <div className="calculations">
            <div>
                <CalculationsUIDContainer />
            </div>
            <div className="graphics">
                <GraphicsContainer />
            </div>
            <div>
                <button onClick={getStatus} >Статус</button>
            </div>
        </div>
        </div>; 
}
export default Main;
