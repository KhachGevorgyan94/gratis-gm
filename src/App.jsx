import React, {Component} from 'react';
import {createBrowserHistory} from 'history';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import Sidebar from "./components/sidebar";
import './assets/styles/index.scss';
import {ToastContainer} from 'react-toastify';
import RouteServices from './platform/serivces/route-services'
import {LanguageEnum} from "./platform/serivces/settings";

//
class App extends Component {

  state = {
    initialStorageFetched: false,
    routerList: null
  };

  componentDidMount() {
    if(!localStorage.getItem('Language')){
      localStorage.setItem('Language', LanguageEnum.Russian)
    }

    window.routerHistory = createBrowserHistory();
    window.routerHistory.listen(() => window.scrollTo(0, 0));

    this.setState({
      initialStorageFetched: true,
      routerList: RouteServices.getRoleRouter()
    })

  }


  render() {
    const {routerList, initialStorageFetched} = this.state
    return initialStorageFetched &&(

        <div className="G-flex G-justify-between">
          <BrowserRouter >
            {RouteServices.getSideBarList() && RouteServices.isRole()  ? <Sidebar/> : null}

            <Switch>
              {RouteServices.getRoleRouter().pages.map((item) => {
                return <Route key={item.path} path={item.path} component={item.component} exact/>
              })}
              <Redirect to={routerList.pages[0].path} exact={true}/>
            </Switch>
          </BrowserRouter>
          <ToastContainer autoClose={8000}/>
        </div>


    )
  }
}

export default App;
