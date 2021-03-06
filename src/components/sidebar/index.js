import React, {Component} from 'react';

import './style.scss';
import './responsive.scss';
import {NavLink} from "react-router-dom";
import Settings from "../../platform/serivces/settings";
import RouteServices from "../../platform/serivces/route-services";
import logoIcon from '../../assets/images/logo.png'
import logoMiniIcon from '../../assets/images/logo-min.png'
import {ReactSVG} from "react-svg";
import menuBurger from '../../assets/images/svg/grid.svg'
import menuBurgerClose from '../../assets/images/svg/menu.svg'
import closeIcon from "../../assets/images/svg/close-icon.svg";


class Sidebar extends Component {

  state = {
    isOpenMenu: false,
    defaultLanguage: {
      name: '',
      value: ''
    },
    sideBarList: null
  }

  componentDidMount() {
    window.addEventListener('openMenu', this.openMenu);
    this.setState({
      sideBarList: RouteServices.getSideBarList()

    })

  }

  changeLanguage = async (language) => {
    Settings.language = language
  }

  openMenu = () => {
    this.setState({isOpenMenu: true})
  }
  closeMenu = () => {
    this.setState({isOpenMenu: false})

  }

  render() {
    const {sideBarList} = this.state

    return (
        <>
          <div onClick={this.closeMenu}
               className={`P-bg-vor-mobile ${this.state.isOpenMenu ? 'open-bg-mobile' : ''}`}/>

          <div
              className={`sidenav-block G-flex G-flex-column G-align-center G-text-right G-mb-6 ${this.state.isOpenMenu ? 'P-menu-open' : ''}`}>
            <div className="P-admin-logo G-image-contain" style={{backgroundImage: `url('${logoIcon}')`}}/>
            <div className="P-admin-logo-mini G-image-contain" style={{backgroundImage: `url('${logoMiniIcon}')`}}/>
            <span className="P-mini-menu-btn" onClick={this.props.onChange}>
                         <ReactSVG className="P-open-icon-menu" src={ menuBurger}/>
                         <ReactSVG className="P-close-icon-menu" src={ menuBurgerClose}/>
            </span>
            <div className="P-sidenav-list G-flex G-flex-column G-align-start G-justify-between">
              <div className="P-menu-list">
                {sideBarList && sideBarList.length ? sideBarList.map((item, index) => {
                  return <NavLink key={index} onClick={this.closeMenu} activeClassName="activeLink"
                                  to={item.path} className="P-menu-item G-flex G-align-center">
                    {item.icon ? <i className='P-menu-icon' style={{backgroundImage: `url('${item.icon}')`}}/> : null}
                    <p>{item.name}</p></NavLink>
                }) : null}
              </div>
            </div>
          </div>
        </>
    );
  }
}

export default Sidebar;


