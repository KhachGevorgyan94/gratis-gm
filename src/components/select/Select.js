import React from 'react';

import ClickOutside from '../click-outside';
import './select.scss'
// import arrowImg from '../../assets/images/download.png'

export default class Select extends React.Component {

  state = {
    isOpen    : false,
    isSelected: false,
    height    : 0,
    list      : [],
    active    : { name: '' }
  }


  componentDidMount() {
    this.setState({
      list      : this.props.list,
      height    : (this.props.list.length * 40) + 1,
      active    : { name: this.props.defaultValue || this.props.placeholder || 'Choose' },
      isSelected: this.props.defaultValue ? true : false
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.list) !== JSON.stringify(this.state.list)) {
      this.setState({
        list      : nextProps.list,
        height    : (nextProps.list.length * 40) + 1,
        active    : { name: this.props.defaultValue || this.props.placeholder || 'Choose' },
        isSelected: this.props.defaultValue ? true : false
      });
    }
  }

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  select = item => {
    if (item[this.props.listKey] !== this.state.active[this.props.listKey]) {
      this.setState({
        active    : item,
        isSelected: true,
        isOpen    : false
      }, () => this.props.output(item[this.props.listKey]));
    } else if (!this.props.required) {
      this.setState({
        active    : { name : this.props.placeholder || 'Choose' },
        isSelected: false,
        isOpen    : false
      }, () => this.props.output(null));
    } else this.setState({ isOpen: false });
  }


  render() {
    const { list, active, isOpen, isSelected, height } = this.state;
    return (
      <ClickOutside onClickOutside={this.close}>
        <div className="E-select-component">
          <div className="E-select-header" onClick={this.toggle}>
            <p className={!isSelected ? 'placeholder' : ''}>{active.name}</p>
            <span className={`E-drop-down-icon ${isOpen ? 'show' : ''} `}/>
          </div>
          <div className={`E-select-content ${isOpen ? 'show' : ''}`} style={{ height: `${isOpen ? height : 0}px` }}>
            {list.map((item, index) =>
              <h4 className={(item[this.props.listKey] === active[this.props.listKey]) || (item.name === active.name) ? 'active' : ''}
                key={index} onClick={() => this.select(item)}>
                {item.name}
              </h4>
            )}
          </div>
        </div>
      </ClickOutside>
    );
  }
}
