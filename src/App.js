//import './App.css';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {Route, Routes, Router,BrowserRouter} from "react-router-dom";
import CalculationFormContainer from "./components/CalculationForm/CalculationFormContainer";
import NavMenu from "./components/NavMenu";
import Main from './components/Main';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import RastrFilesContainer from "./components/RastrFiles/RastrFilesContainer";
const { Header, Content } = Layout;

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
        <Layout className="layout">
        <Header>
            <div className="logo" />
            <NavMenu />
          </Header>
          <Content>
            <Routes>
                <Route exact path='/' element={<Main/>} />
                <Route exact path='/counter' element={<CalculationFormContainer/>} />
                <Route exact path='/rastrFiles' element={<RastrFilesContainer/>} />
            </Routes>
            </Content>
        </Layout>
        </BrowserRouter>
      </Provider>
  );
}

export default App;