import axios from 'axios';
import './CalculationForm.css';
import { Form, Input,Button,InputNumber, Select, Row, Card, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const CalculationFormNew = (props) => {   
  const source = axios.CancelToken.source();
  window.addEventListener("beforeunload", (ev) => 
{  
    ev.preventDefault();
    return ev.returnValue = 'Are you sure you want to close?';
});

  const abortZ = () => {
    source.cancel();
    console.log("Cancel");
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    props.startCalculation(values, source.token);
  };

        return <div >
            <Row type="flex" justify='center' align= 'middle' style={{minHeight: '89vh'}}>
          <Card className="form" >
          <h4 style={{textAlign: 'center'}}>Выполнить расчет</h4>
      <Form name="basic" labelCol={{span: 10}} wrapperCol={{span: 18,}} autoComplete="off" onFinish={onFinish} size = "default"
      initialValues={{
        name: '',
      }}>
      <Form.Item label="Название расчета" name="name" rules={[{
            required: true, message: 'Please input your password!',},]}>
        <Input />
      </Form.Item>
      <Form.Item label="Описание расчета" name="description">
        <TextArea autoSize={{maxRows: 3,}} maxLength={200}/>
      </Form.Item>
      <Form.Item label="Файл режима" name="rastrFile" rules={[{
            required: true, message: 'Please input your username!',},]}>
        <Select>
        {props.rastrFiles?.map((rastrFile) => (
          <Select.Option value={rastrFile.name}>{rastrFile.name} </Select.Option>
        ))}
        </Select>
      </Form.Item>
      <Form.Item label="Количество реализаций" name="countOfImplementations" rules={[{
            required: true, message: 'Please input your username!',},]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Случайное приращение нагрузок, %" name="percentForWorsening" rules={[{
            required: true, message: 'Please input your username!',},]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Начальное состояние нагрузок, %" name="percentLoad" rules={[{
            required: true, message: 'Please input your username!',},]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Контролируемое сечение" name="sechNumber" rules={[{
            required: true, message: 'Please input your username!',},]}>
        <Select>
          {props.rastrSchemeInfo.seches?.map((sech) => (
          <Select.Option value={sech.num}>{sech.sechName} </Select.Option>))}
        </Select>
      </Form.Item>

      <Form.Item label="Узлы для контроля напряжения" name='uNodes' >
                  <Select style={{width: 440,}} showSearch mode='multiple' >
                  {props.rastrSchemeInfo.districts?.map((district) => (
                    <Select.OptGroup label={district.name}>
                    {props.rastrSchemeInfo.nodes?.map((node) => {
                      if (node.district.name == district.name) return ( 
                        <Select.Option value={node.number}>{node.name} </Select.Option>)})}
                    </Select.OptGroup>))}

                    <Select.OptGroup label='Узлы без названия района'>
                    {props.rastrSchemeInfo.nodes?.map((node) => {
                      if (node.district.name == '') return ( 
                        <Select.Option value={node.number}>{node.name}</Select.Option>)})}
                    </Select.OptGroup>   
                  </Select>
                </Form.Item>

      <Form.Item label="Ветви для контроля тока" name='iBrunches' >
                  <Select style={{width: 440,}} showSearch mode='multiple' >
                    {props.rastrSchemeInfo.brunches?.map((brunch) => {
                      return ( 
                        <Select.Option value={brunch.name}>{brunch.name} </Select.Option>)})}
                  </Select>
                </Form.Item>

      
      <div style={{ overflowY: "scroll", maxHeight: "240px", boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.5)'}}>
      <Form.List label="Максимум" name="worseningSettings">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{display: 'flex'}} align="baseline" size = {100}>
                <Form.Item label="Узел" {...restField} name={[name, 'nodeNumber']} rules={[{
                      required: true, message: 'Missing first name',},]}>
                  <Select style={{width: 280,}} showSearch >
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
                <Form.Item {...restField} label="Максимум" name={[name, 'maxValue']}  rules={[{
                      required: false, message: 'Missing last name',},]}>
                  <InputNumber />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      </div>

      <Form.Item wrapperCol={{offset: 8, span: 16,}}>
        <Button type="primary" htmlType="submit">
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