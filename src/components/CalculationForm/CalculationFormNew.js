import axios from 'axios';
import './CalculationForm.css';
import { Form, Input,Button,InputNumber, Select, Row, Card, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom"
const { TextArea } = Input;

const CalculationFormNew = (props) => {   
  const source = axios.CancelToken.source();
  window.addEventListener("beforeunload", (ev) => 
{  
    ev.preventDefault();
    return ev.returnValue = 'Are you sure you want to close?';
});

let navigate = useNavigate();

  const abortZ = () => {
    source.cancel();
    console.log("Cancel");
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    props.startCalculation(values, source.token);
    message.loading('Расчет начат');
    navigate("/");
  };

        return <div >
            <Row type="flex" justify='center' align= 'middle' style={{minHeight: '89vh'}}>
          <Card className="form" >
          <h4 style={{textAlign: 'center'}}>Выполнить расчет</h4>
      <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 18}} autoComplete="off" onFinish={onFinish} size = "default"
      initialValues={{
        name: '',
      }}>
      <Form.Item label="Название расчета" name="name" rules={[{
            required: true, message: 'Введите название расчета!',},]}>
        <Input />
      </Form.Item>
      <Form.Item label="Описание расчета" name="description">
        <TextArea autoSize={{maxRows: 3,}} maxLength={200}/>
      </Form.Item>
      <Form.Item label="Файл режима" name="rastrFile" rules={[{
            required: true, message: 'Выберите файл режима!',},]}>
        <Select>
        {props.rastrFiles?.map((rastrFile) => (
          <Select.Option value={rastrFile.name}>{rastrFile.name} </Select.Option>
        ))}
        </Select>
      </Form.Item>
      <Form.Item label="Количество реализаций" name="countOfImplementations" rules={[{
            required: true, message: 'Введите количество реализаций!',},]}>
        <InputNumber min={1} max={1000} />
      </Form.Item>
      <Form.Item label="Случайное приращение нагрузок" name="percentForWorsening" rules={[{
            required: true, message: 'Введите значение!',},]}>
        <InputNumber min={1} max={100} formatter={(value) => `${value}%`} parser={(value) => value.replace('%', '')} />
      </Form.Item>
      <Form.Item label="Начальное состояние нагрузок" name="percentLoad" rules={[{
            required: true, message: 'Введите значение!',},]}>
        <InputNumber min={0} max={200} formatter={(value) => `${value}%`} parser={(value) => value.replace('%', '')}/>
      </Form.Item>
      <Form.Item label="Контролируемое сечение" name="sechNumber" rules={[{
            required: true, message: 'Выберите сечение!',},]}>
        <Select>
          {props.rastrSchemeInfo.seches?.map((sech) => (
          <Select.Option value={sech.num}>{sech.sechName} </Select.Option>))}
        </Select>
      </Form.Item>

      <Form.Item label="Узлы для контроля напряжения" name='uNodes' >
                  <Select style={{width: 500,}} showSearch mode='multiple' >
                  {props.rastrSchemeInfo.districts?.map((district) => (
                    <Select.OptGroup label={district.name}>
                    {props.rastrSchemeInfo.nodes?.map((node) => {
                      if (node.district.name == district.name) return ( 
                        <Select.Option value={node.number} >{node.name} </Select.Option>)})}
                    </Select.OptGroup>))}

                    <Select.OptGroup label='Узлы без названия района'>
                    {props.rastrSchemeInfo.nodes?.map((node) => {
                      if (node.district.name == '') return ( 
                        <Select.Option value={node.number}>{node.name}</Select.Option>)})}
                    </Select.OptGroup>   
                  </Select>
                </Form.Item>

      <Form.Item label="Ветви для контроля тока" name='iBrunches' >
                  <Select style={{width: 500,}} showSearch mode='multiple' >
                    {props.rastrSchemeInfo.brunches?.map((brunch) => {
                      return ( 
                        <Select.Option value={brunch.name}>{brunch.name} </Select.Option>)})}
                  </Select>
                </Form.Item>

      
      <div style={{ overflowY: "scroll", maxHeight: "700px", boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.5)'}}>
        <label style = {{marginInlineStart: '15px', marginTop: '10px', marginBottom: '5px'}}>Параметры утяжеления:</label>
      <Form.List label="Максsdsимум" name="worseningSettings">
        {(fields, { add, remove }) => (
          <>
          <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style ={{marginLeft: '80px'}}>
                Добавить узел
              </Button>
            </Form.Item>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{display: 'flex'}} align="baseline" size = {0}>
                <Form.Item label="Узел" {...restField} name={[name, 'nodeNumber']} style={{width: 450,}} rules={[{
                      required: true, message: 'Missing first name',},]}>
                  <Select style={{width: 290,}} showSearch >
                  {props.rastrSchemeInfo.districts?.map((district) => (
                    <Select.OptGroup label={district.name}>
                    {props.rastrSchemeInfo.loadNodes?.map((loadNode) => {
                      if (loadNode.district.name == district.name) return ( 
                        <Select.Option value={loadNode.number}>{loadNode.name} </Select.Option>)})}
                    </Select.OptGroup>))}

                    <Select.OptGroup label='Узлы без названия района'>
                    {props.rastrSchemeInfo.loadNodes?.map((loadNode) => {
                      if (loadNode.district.name == '') return ( 
                        <Select.Option value={loadNode.number}>{loadNode.name} </Select.Option>)})}
                    </Select.OptGroup>   
                  </Select>
                </Form.Item>
                <Form.Item {...restField} label="Максимум" name={[name, 'maxValue']} style={{width: 230,}}>
                  <InputNumber min={0} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            
          </>
        )}
      </Form.List>
      </div>

      <Form.Item wrapperCol={{offset: 8, span: 16,}}>
        <Button type="primary" htmlType="submit" style ={{marginTop: '20px'}}>
          Начать расчет
        </Button>
      </Form.Item>
      
    </Form>
    </Card>
        </Row>
      <button onClick={abortZ}/>
        </div> 
}
export default CalculationFormNew;