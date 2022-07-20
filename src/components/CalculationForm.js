import { Formik, Field, Form } from "formik";
import axios from 'axios';

const CalculationForm = (props) => { 

        return <div>
            <h1>Выполнить расчет</h1>
      <Formik
        initialValues={{ CountOfImplementations: "",name: "", percentLoad: "", percentForWorsening: "" }}
        onSubmit={(values) => {
          axios({method:'post', url: "https://localhost:7231/CalculationPowerFlows/PostCalculations",data: values, 
          headers: { "Content-Type": "multipart/form-data"}
        })}}
      >
        <Form>
          <Field name="CountOfImplementations" type="text" placeholder="Количество реализаций" />
          <Field name="name" type="text" placeholder="Название" />
          <Field name="percentLoad" type="text" placeholder="Процент начального состояния нагрузки" />
          <Field name="percentForWorsening" type="text" placeholder="Процент увеличения нагрузки при утяжелении" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
        </div>; 
}
export default CalculationForm;