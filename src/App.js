//import './App.css';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {Layout} from "./components/Layout";
import {Route, Routes, Router,BrowserRouter} from "react-router-dom";
import CalculationFormContainer from "./components/CalculationForm/CalculationFormContainer";
import Main from './components/Main';

function App() {
  return (
      <Provider store={store}>
      <BrowserRouter>
        <Layout>
            <Routes>
                <Route exact path='/' element={<CalculationFormContainer/>} />
                <Route exact path='/counter' element={<Main/>} />
            </Routes>
        </Layout>
        </BrowserRouter>
      </Provider>
  );
}

export default App;