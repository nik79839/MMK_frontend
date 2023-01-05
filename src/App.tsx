import './App.css';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {Route, Routes,BrowserRouter} from "react-router-dom";
import CalculationFormContainer from "./components/CalculationForm/CalculationFormContainer";
import Main from './components/Main/Main';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import RastrFilesContainer from "./components/RastrFiles/RastrFilesContainer";
import { Navigate } from 'react-router-dom';
import AuthContainer from "./components/Auth/AuthContainer";
import UsersContainer from './components/Users/UsersContainer';
import NavMenuContainer from './components/NavMenu/NavMenuContainer';
import React from 'react';
const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
        <Layout className="layout">
          <Header style={{height:"7vh", width: '100%', position: 'sticky', top: 0, zIndex: 1}}>
            <NavMenuContainer/>
          </Header>
          <Content style={{height:"750px"}}>
            <Routes>
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path='/main' element={<RequireAuth><Main/></RequireAuth>}>
                  <Route path=':id' element={<RequireAuth><Main/></RequireAuth>}/>
                </Route>
                <Route path='/counter' element={<RequireAuth><CalculationFormContainer/></RequireAuth>} />
                <Route path='/rastrFiles' element={<RastrFilesContainer/>} />
                <Route path='/users' element={<UsersContainer/>} />
                <Route path='/auth' element={<AuthContainer/>} />
            </Routes>
            </Content>
        </Layout>
        </BrowserRouter>
      </Provider>
  );
}

const RequireAuth: any = ( {children}: any ) => {
  if (localStorage.getItem('user') == null) {
     return <AuthContainer />;
  }
  return children;
};

export default App;