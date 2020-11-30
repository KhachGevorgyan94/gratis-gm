import * as React from 'react';

import ClickOutside from '../../../click-outside';
import Settings from '../../../../platform/serivces/settings';

import './style.scss';
import {Component} from "react";


class MultiSelectTableList extends Component {

  state = {
    isOpen: false,
    value: [],
  }

  componentDidMount() {
    const {value, defaultValue} = this.props;
    value || defaultValue && this.setState({value: value || defaultValue});
  }

  toggleState = (isOpen) => this.setState({isOpen});

  toggleItem = (item) => {
    const {onChange} = this.props;

    item.isShow = !item.isShow

      onChange && onChange(this.props.options);
    // }
  }

  Options = () => {
    const {options, withNew, onNewClick, emptyText} = this.props;

    const value = this.getCurrentValue();

    return <ul className="I-select-body">
      {options.length ? options.map((item, index) => <li title={item.name}
              key={typeof item.value === 'number' ? item.value : index}
              onClick={() => this.toggleItem(item)}
              className={item.isShow ? 'I-chosen' : ''}
          >
              <span className={`I-item-checkbox ${item.isShow? 'I-checked':''}`} />
              { item.name}

      </li>) :
          <li className="I-select-empty-label">{Settings.translations.select}</li>}

    </ul>
  }

  getCurrentValue = () => {
    const {value} = this.props;
    return value ? [...value] : this.state.value;
  }


  render() {
    const {
      placeholderOpacity,
      className,
      clear,
    } = this.props;
    const {isOpen} = this.state;
    const value = this.getCurrentValue();

    return (
        <ClickOutside className={className} onClickOutside={() => this.toggleState(false)}>
          <div className="I-multi-select">
            <div className={`I-select-header  ${isOpen ? ' I-select-open' : ''}`}
                 onClick={() => this.toggleState(!isOpen)}>
              <span
                  className={`G-fs-18 ${placeholderOpacity ? 'I-select-placeholder' : ''}`}>{Settings.translations.loudspeakers}</span>
              {clear && value && value.length > 0 && <i className="clear-text" onClick={this.clearValue}/>}
              {value.length === 0 ? <i className={isOpen ? 'icon-ic_arrowup' : 'icon-ic_arrowdown'}/> : null}
            </div>
            {isOpen && <this.Options/>}
          </div>
        </ClickOutside>
    );
  }
}

export default MultiSelectTableList;
