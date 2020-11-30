import * as React from 'react';

import ClickOutside from '../click-outside';
import Settings from '../../platform/serivces/settings';

import './style.scss';
import {Component} from "react";

// interface IState<Value> {
//   isOpen: boolean;
//   value: Value[];
// };
//
// interface IProps<Value> {
//   placeholderOpacity?: boolean;
//   changable?: boolean;
//   placeholder?: React.ReactChild | string;
//   onNewClick?(e: React.MouseEvent<HTMLLIElement>): void;
//   className?: string;
//   emptyText?: string;
//   onChange?(value: Value[]): void;
//   withNew?: boolean;
//   defaultValue?: Value[];
//   value?: Value[] | null;
//   options: Array<IDropdownOption<Value>>;
//   clear?: boolean;
// };

class MultiSelect extends Component {

  state = {
    isOpen: false,
    value: [],
    valueName: ''
  }

  // public static defaultProps = {
  //   placeholder: 'Select...',
  //   className: '',
  //   onChange: null,
  //   onNewClick: null,
  //   withNew: false,
  //   changable: true,
  //   value: null,
  //   options: [],
  // }

  componentDidMount() {
    const {value, defaultValue} = this.props;
    value || defaultValue && this.setState({value: value || defaultValue});
  }

  toggleState = (isOpen) => this.setState({isOpen});

  toggleItem = (item) => {
    const {changable, onChange} = this.props;
    this.selectedName(item)
    if (changable) {
      const value = this.getCurrentValue();
      const index = value.indexOf(item.value);
      if (index === -1) {
        value.push(item.value)
      } else {
        value.splice(index, 1);
      }

      this.setState({value});
      onChange && onChange(value);
      this.isSelectAll()
    }
  }

  clearValue = (e) => {
    e.stopPropagation();
    const {onChange} = this.props;
    this.setState({value: [], isOpen: false});
    onChange && onChange([]);
  }

  Options = () => {
    const {options, withNew, onNewClick, emptyText} = this.props;
    const value = this.getCurrentValue();

    return <ul className="I-select-body">
      {this.props.isSelectAll ?
          <li onClick={this.selectAll} className={`${this.isSelectAll() ? 'I-chosen' : ''}`}><span
              className={`I-item-checkbox`}/> {Settings.translations.all_text}

          </li> : null}
      {options.length ? options.map((item, index) => <li
              key={typeof item.value === 'number' ? item.value : index}
              onClick={() => this.toggleItem(item)}

              className={value.includes(item.value) ? 'I-chosen' : ''}
          ><span className={`I-item-checkbox `}/>
            {typeof item.name === 'function' ? item.name : item.name}</li>) :
          <li className="I-select-empty-label">{Settings.translations.select}</li>}

      {withNew &&
      <li className="I-select-new-label" onClick={onNewClick && onNewClick}>{Settings.translations.new}</li>}
    </ul>
  }

  getCurrentValue = () => {
    const {value} = this.props;
    return value ? [...value] : this.state.value;
  }
  isSelectAll = () => {
    const val = this.getCurrentValue()
    if(this.props.options){
      return val.length === this.props.options.length
    }

  }

  selectAll = () => {
    const {value} = this.state
    const {onChange} = this.props
    if (this.isSelectAll()) {
      this.setState({
        value: []
      }, () => {
        onChange && onChange(this.state.value);

      })
    } else {
      if (this.props.options.filter(x => !this.state.value.includes(x.value)).length) {
        this.props.options.filter(x => !this.state.value.includes(x.value)).map(item => {
          value.push(item.value)
        })
      }
      this.setState({value}, () => {
        onChange && onChange(value);

      })
    }

  }
  selectedName = (item) => {
    this.setState({
      valueName: item.name
    })
  }

  render() {
    const {
      placeholderOpacity,
      changable,
      placeholder,
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
                  className={`G-fs-18 ${placeholderOpacity ? 'I-select-placeholder' : ''}`}>{value && value.length && changable ? `${value.length === 1 ? this.state.valueName : value.length} ${value.length !== 1 ? Settings.translations.selected : ''}` : placeholder}</span>
              {clear && value && value.length > 0 && <i className="clear-text" onClick={this.clearValue}/>}
              {value.length === 0 ? <i className={isOpen ? 'icon-ic_arrowup' : 'icon-ic_arrowdown'}/> : null}
            </div>
            {isOpen && <this.Options/>}
          </div>
        </ClickOutside>
    );
  }
}

export default MultiSelect;
