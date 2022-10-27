import { NavLink } from 'react-router-dom'
import  CalculationProgress  from './CalculationProgress';
import  CalculationItem  from './CalculationItem';
import { Tabs, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import s from './Calculations.module.css';


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
                    <div className={s.calculationsItems}>
                    <List bordered = {true} dataSource={calculationReady} itemLayout="horizontal" renderItem={(item) => (
                        <List.Item key={item.title} actions={[<DeleteOutlined style={{color: 'blue'}} onClick={() => deleteCalculationById(item.id)}>Удалить</DeleteOutlined>]}>
                            <List.Item.Meta
                                title={<CalculationItem calculations={item} getCalculationStatisticById={getCalculationStatisticById} deleteCalculationById={deleteCalculationById} />}
                                description={item.calculationEnd}
                            />
                            
                            {item.sechName != null ? (
                            <div className={s.sechName}>КС: {item.sechName}</div>): null}
                        </List.Item>
                    )}/>             
                    </div>
                </TabPane>
            <TabPane tab="В процессе" key="2">
                {
                    calculationProcess?.map((calculations) => 
                    (<CalculationProgress calculations={calculations} />)
                )}
            </TabPane>
                </Tabs>
            </div>           
        </div>; 
}
export default CalculationsUID;
