import { Formik, Field, Form,Checkbox } from "formik";
import axios from 'axios';
import './CalculationForm.css';
import { message } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";

const CalculationForm = (props) => {   
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
            <h1>Выполнить расчет</h1>
      <Formik
        initialValues={{ CountOfImplementations: "",name: "", percentLoad: "", percentForWorsening: "",isAllNodesInitial: true,
        loadNodes123: "" ,sechNumber:""}}
        onSubmit={(values) => {
          props.startCalculation(values, source.token);
          message.info('Начало выполнения расчета');
          //navigate('/counter');
        }}
      >
        {({ values }) => (
        <Form>
        <div className="calc">
          <Field name="CountOfImplementations" type="text" placeholder="Количество реализаций" className='form-control' />
          <Field name="name" type="text" placeholder="Название расчета" className='form-control' />          
          <Field name="percentForWorsening" type="text" placeholder="Процент увеличения нагрузки при утяжелении" className='form-control'/>
          <Field name="sechNumber" as="select" className='form-select' placeholder="safsf">
          <option value="" >Выберите сечение </option>
          {props.seches?.map((sech) => (
          <option value={sech.num}>{sech.nameSech} </option>
        ))}
            </Field>      
          </div>       
        <div className="calc">
          <label>Выберите узлы, имеющие случайное начальное состояние</label>
          <Field name="percentLoad" type="text" placeholder="Процент начального состояния нагрузки" className='form-control'/>
          <Field name="isAllNodesInitial" type="checkbox" className="form-check-input"/> Все узлы
          {!values.isAllNodesInitial ? (
            <Field type="text" name="loadNodes123" placeholder="Перечислите узлы чере запятую" className='form-control' />):null}
        </div>
        <button type="submit" className="btn btn-primary mr-2">Submit</button>
        </Form>)}
      </Formik>
      <button onClick={abortZ}/>
        </div> 
}
export default CalculationForm;