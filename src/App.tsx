import './App.css';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {Route, Routes,BrowserRouter} from "react-router-dom";
import Main from './components/Main/Main';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { RastrFiles } from './components/RastrFiles/RastrFiles';
import {Users} from './components/Users/Users';
import Auth from './components/Auth/Auth';
import NavMenu from './components/NavMenu/NavMenu';
import { CalculationForm } from './components/CalculationForm/CalculationForm';
const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
        <Layout className="layout">
          <Header style={{height:"7vh", width: '100%', position: 'sticky', top: 0, zIndex: 1}}>
            <NavMenu/>
          </Header>
          <Content style={{height:"750px"}}>
            <Routes>
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path='/main' element={<RequireAuth><Main/></RequireAuth>}>
                  <Route path=':id' element={<RequireAuth><Main/></RequireAuth>}/>
                </Route>
                <Route path='/counter' element={<RequireAuth><CalculationForm/></RequireAuth>} />
                <Route path='/rastrFiles' element={<RastrFiles/>} />
                <Route path='/users' element={<Users/>} />
                <Route path='/auth' element={<Auth/>} />
            </Routes>
            </Content>
        </Layout>
        </BrowserRouter>
      </Provider>
  );
}

const RequireAuth: any = ( {children}: any ) => {
  if (localStorage.getItem('user') == null) {
     return <Auth />;
  }
  return children;
};

export default App;