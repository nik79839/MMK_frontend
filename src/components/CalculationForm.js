import { Formik, Field, Form,Checkbox } from "formik";
import axios from 'axios';
import './CalculationForm.css';

const CalculationForm = (props) => { 

        return <div className="main">
            <h1>Выполнить расчет</h1>
      <Formik
        initialValues={{ CountOfImplementations: "",name: "", percentLoad: "", percentForWorsening: "",isAllNodesInitial: true,
        loadNodes: "" }}
        onSubmit={(values) => {
          axios({method:'post', url: "https://localhost:7231/CalculationPowerFlows/PostCalculations",data: values, 
          headers: { "Content-Type": "multipart/form-data"}
        })}}
      >
        {({ values }) => (
        <Form>
        <div className="calc">
          <Field name="CountOfImplementations" type="text" placeholder="Количество реализаций" className='form-control' />
          <Field name="name" type="text" placeholder="Название расчета" className='form-control' />          
          <Field name="percentForWorsening" type="text" placeholder="Процент увеличения нагрузки при утяжелении" className='form-control'/>      
          </div>       
        <div className="calc">
          <label>Выберите узлы, имеющие случайное начальное состояние</label>
          <Field name="percentLoad" type="text" placeholder="Процент начального состояния нагрузки" className='form-control'/>
          <Field name="isAllNodesInitial" type="checkbox" className="form-check-input"/> Все узлы
          {!values.isAllNodesInitial ? (
            <Field type="text" name="loadNodes" placeholder="Перечислите узлы чере запятую" className='form-control' />):null}
        </div>
        <button type="submit" className="btn btn-primary mr-2">Submit</button>
        </Form>)}
      </Formik>
        </div> 
}
export default CalculationForm;