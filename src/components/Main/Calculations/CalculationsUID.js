import  CalculationProgress  from './CalculationProgress';
import  CalculationItem  from './CalculationItem';
import { Tabs, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import s from './Calculations.module.css';
import VirtualList from 'rc-virtual-list';


const { TabPane } = Tabs;

const CalculationsUID = (props) => { 
        
    const calculationReady =[];
    const calculationProcess =[];
    
    for (let i = 0; i<props.calculations?.calculations?.length; i++) {
        if (props.calculations.calculations[i].calculationEnd != null)  {
            calculationReady.push(props.calculations.calculations[i]);
        }
        else{
            calculationProcess.push(props.calculations.calculations[i]);
        }
    }
    var readyTabText = 'Завершенные расчеты (' + calculationReady.length.toString() + ')';

    var inProgressTabText = 'В процессе (' + calculationProcess.length.toString() + ')';

    const deleteCalculationById = (id) => {
        props.deleteCalculationById(id);
       }
       
        return <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab={readyTabText} key="1">
                    <List split = {true} bordered = {true} itemLayout="horizontal" dataSource={calculationReady} renderItem={(item) => (
                        <List.Item className={s.calculationsItems} key={item.title} actions={[<DeleteOutlined style={{color: 'blue'}} onClick={() => deleteCalculationById(item.id)}>Удалить</DeleteOutlined>]}>
                            <List.Item.Meta
                                title={<CalculationItem calculations={item} deleteCalculationById={deleteCalculationById} />}
                                description={item.calculationEnd}
                            />
                            <div className={s.sechName}>КС: {item.sechName}</div>
                        </List.Item>)} 
                    />             
                </TabPane>
            <TabPane tab={inProgressTabText} key="2">
                {
                    calculationProcess?.map((calculations) => 
                    (<CalculationProgress calculations={calculations} />)
                )}
            </TabPane>
                </Tabs>           
        </div>; 
}
export default CalculationsUID;
