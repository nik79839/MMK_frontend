//import './App.css';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {Route, Routes,BrowserRouter} from "react-router-dom";
import CalculationFormContainer from "./components/CalculationForm/CalculationFormContainer";
import NavMenu from "./components/NavMenu";
import Main from './components/Main/Main';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import RastrFilesContainer from "./components/RastrFiles/RastrFilesContainer";
import { Navigate } from 'react-router-dom';
const { Header, Content } = Layout;

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
        <Layout className="layout">
          <Header style={{height:"7vh"}}>
            <div className="logo" />
            <NavMenu/>
          </Header>
          <Content>
            <Routes>
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path='/main' element={<Main/>}>
                  <Route path=':id' element={<Main/>}/>
                </Route>
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