import { NavLink } from 'react-router-dom'
import  CalculationProgress  from './CalculationProgress';
import  CalculationItem  from './CalculationItem';
import { Tabs, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
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
            <h4>Список расчетов</h4>
            <div>
            <Tabs defaultActiveKey="1">
            <TabPane tab="Выполнено" key="1">
                <div className="calculationsItems">
                <List dataSource={calculationReady} itemLayout="horizontal" renderItem={(item) => (
                    <List.Item actions={[<DeleteOutlined style={{color: 'blue'}} onClick={() => deleteCalculationById(item.calculationId)}>Удалить</DeleteOutlined>]}>
                        <List.Item.Meta
                            title={<CalculationItem calculations={item} getCalculationStatisticById={getCalculationStatisticById} deleteCalculationById={deleteCalculationById} />}
                            description={item.calculationEnd}
                        />
                        {item.nameOfSech != null ? (
                        <div className='sechName'>КС: {item.nameOfSech}</div>): null}
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
