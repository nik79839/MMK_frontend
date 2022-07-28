import { NavLink } from 'react-router-dom'
import  CalculationProgress  from './CalculationProgress';
import  CalculationItem  from './CalculationItem';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../Main.css';


const { TabPane } = Tabs;

const CalculationsUID = (props) => { 
        
    const getCalculationStatisticById = (id) => {
        props.getCalculationStatisticById(id);
       } 

        return <div>
            <h2>Список расчетов</h2>
            <div>
            <Tabs defaultActiveKey="1">
            <TabPane tab="Выполнено" key="1">
                <div className="calculationsItems">
                {
                    props.calculations?.map((calculations) => 
                        {if (calculations.calculationEnd != null) return (
                        <CalculationItem calculations={calculations} getCalculationStatisticById={getCalculationStatisticById} />)}
                    )
                }              
                </div>
            </TabPane>
            <TabPane tab="В процессе" key="2">
                {
                    props.calculations?.map((calculations) => 
                    {if (calculations.calculationEnd == null) return (
                    <CalculationProgress calculations={calculations} getCalculationStatisticById={getCalculationStatisticById} />)}
                )
                }
            </TabPane>
                </Tabs>
            </div>           
        </div>; 
}
export default CalculationsUID;
