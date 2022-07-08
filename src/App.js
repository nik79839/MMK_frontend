import './App.css';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {Layout} from "./components/Layout";
import {Route, Routes, Router,BrowserRouter} from "react-router-dom";
import CalculationForm from "./components/CalculationForm";
import Main from './components/Main';

function App() {
  return (
      <Provider store={store}>
      <BrowserRouter>
        <Layout>
            <Routes>
                <Route exact path='/' element={<CalculationForm/>} />
                <Route exact path='/counter' element={<Main/>} />
            </Routes>
        </Layout>
        </BrowserRouter>
      </Provider>
  );
}

export default App;