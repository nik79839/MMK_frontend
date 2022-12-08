import CalculationsUIDContainer from "./Calculations/CalculationsUIDContainer";
import GraphicsContainer from "./Graphics/GraphicsContainer";
import './Main.css';
import {useParams } from 'react-router-dom';
import { Divider } from 'antd';


const Main = (props) => { 

    const params = useParams();
    const calculationId = params.id;

        return <div className="main">
            <div className="calculations">
                <div>
                    <CalculationsUIDContainer />
                </div>
                {calculationId != null ? (
                <div className="graphics">
                    <GraphicsContainer />
                </div>): null}
            </div>
        </div>; 
}
export default Main;
