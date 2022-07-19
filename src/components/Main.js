import CalculationsUIDContainer from "./CalculationsUIDContainer";
import GraphicsContainer from "./GraphicsContainer";
import './Main.css';

const Main = (props) => { 

        return <div>
            <div className="calculations">
            <div>
                <CalculationsUIDContainer />
            </div>
            <div>
                <GraphicsContainer />
            </div>
        </div>
        </div>; 
}
export default Main;
