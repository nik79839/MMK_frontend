import axios from 'axios';
import './CalculationForm.css';
import { message, Form, Input,Button,InputNumber, Select } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";

const CalculationFormNew = (props) => {   
  const source = axios.CancelToken.source();
  window.addEventListener("beforeunload", (ev) => 
{  
    ev.preventDefault();
    return ev.returnValue = 'Are you sure you want to close?';
});

  const navigate = useNavigate();

  const abortZ = () => {
    source.cancel();
    console.log("Cancel");
  };
        return <div className="main">
            <h3>Выполнить расчет</h3>
      <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 8,}} autoComplete="off"
      initialValues={{
        name: '',
      }}>
      <Form.Item label="Название расчета" name="name" rules={[{
            required: true, message: 'Please input your password!',},]}>
        <Input />
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
      <Form.Item label="Процент увеличения нагрузки при утяжелении" name="percentForWorsening" rules={[{
            required: true, message: 'Please input your username!',},]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Процент начального случайного состояния нагрузок" name="percentLoad" rules={[{
            required: true, message: 'Please input your username!',},]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Контролируемое сечение" name="sechNumber" rules={[{
            required: true, message: 'Please input your username!',},]}>
        <Select>
          {props.seches?.map((sech) => (
          <Select.Option value={sech.num}>{sech.nameSech} </Select.Option>))}
        </Select>
      </Form.Item>
      <Form.Item label="Узлы для утяжеления" name="nodesForWorsening" rules={[{
            required: true, message: 'Please input your username!',},]}>
        <Select mode="multiple" showSearch >
          {props.districts?.map((district) => (
            <Select.OptGroup label={district.name}>
              {props.loadNodes?.map((loadNode) => {
                if (loadNode.district.name == district.name) return ( 
                  <Select.Option value={loadNode.name}>{loadNode.name} </Select.Option>)})}
           </Select.OptGroup>))}

            <Select.OptGroup label='Узлы без названия района'>
              {props.loadNodes?.map((loadNode) => {
                if (loadNode.district.name == '') return ( 
                  <Select.Option value={loadNode.name}>{loadNode.name} </Select.Option>)})}
           </Select.OptGroup>   
          
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{offset: 8, span: 16,}}>
        <Button type="primary" htmlType="submit">
          Начать расчет
        </Button>
      </Form.Item>
    </Form>

      <button onClick={abortZ}/>
        </div> 
}
export default CalculationFormNew;