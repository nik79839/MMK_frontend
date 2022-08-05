import { NavLink } from 'react-router-dom'
import  CalculationProgress  from './CalculationProgress';
import  CalculationItem  from './CalculationItem';
import { Tabs, List } from 'antd';
import 'antd/dist/antd.css';
import '../Main.css';


const { TabPane } = Tabs;

const CalculationsUID = (props) => { 
        
    const calculationReady =[];
    const calculationProcess =[];
    
    for (let i = 0; i<props.calculations?.length; i++) {
        if (props.calculations[i].calculationEnd != null)  {
            calculationReady.push(props.calculations[i]);
        }
        else{
            calculationProcess.push(props.calculations[i]);
        }
    }
    
    const getCalculationStatisticById = (id) => {
        props.getCalculationStatisticById(id);
       }
    const deleteCalculationById = (id) => {
        props.deleteCalculationById(id);
       } 

        return <div>
            <h2>Список расчетов</h2>
            <div>
            <Tabs defaultActiveKey="1">
            <TabPane tab="Выполнено" key="1">
                <div className="calculationsItems">
                <List dataSource={calculationReady} itemLayout="horizontal" renderItem={(item) => (
                    <List.Item actions={[<a key="list-loadmore-edit" onClick={() => deleteCalculationById(item.calculationId)}>Удалить</a>]}>
                        <List.Item.Meta
                            title={<CalculationItem calculations={item} getCalculationStatisticById={getCalculationStatisticById} deleteCalculationById={deleteCalculationById} />}
                            description={item.calculationEnd}
                        />
                        {item.nameOfSech != null ? (
                        <div>КС: {item.nameOfSech}</div>): null}
                    </List.Item>
                )}/>             
                </div>
            </TabPane>
            <TabPane tab="В процессе" key="2">
                {
                    calculationProcess?.map((calculations) => 
                    (<CalculationProgress calculations={calculations} getCalculationStatisticById={getCalculationStatisticById} />)
                )}
            </TabPane>
                </Tabs>
            </div>           
        </div>; 
}
export default CalculationsUID;
