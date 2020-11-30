import React, {Component} from 'react';

import ClickOutside from '../click-outside';

import './select.scss';
import Settings from "../../platform/serivces/settings";


// interface IState<Value> {
//   isOpen: boolean;
//   value: IDropdownOption<Value> | null;
// };

// interface IProps<Value> {
//   placeholderOpacity?: boolean;
//   changable?: boolean;
//   placeholder?: React.ReactChild | string;
//   onNewClick?(e: React.MouseEvent<HTMLLIElement>): void;
//   className?: string;
//   emptyText?: string;
//   onChange?(value: IDropdownOption<Value> | null): void;
//   withNew?: boolean;
//   defaultValue?: Value;
//   useValue?: boolean;
//   value?: Value | null;
//   options: Array<IDropdownOption<Value>>;
//   clear?: boolean;
//   isAllList?:boolean;
//   isAnimation?:boolean;
//   isPhoneNumber?:boolean;
// };

class Select extends Component {

  // public state: IState<Value> = {
  //   isOpen: false,
  //   value: null,
  // }

  state = {
    isOpen: false,
    value: null,
  }

// public static defaultProps = {
//   placeholder: 'Select...',
//   className: '',
//   onChange: null,
//   onNewClick: null,
//   withNew: false,
//   changable: true,
//   useValue: false,
//   value: null,
//   options: [],
// }

  componentDidMount() {
    let value = null;
     this.props.options.map(item => {
       if(this.props.listKey==='value'){
         if (!value && item.value === this.props.defaultValue) {
           value = item;
         }
       }else{
         if (!value && item.name === this.props.defaultValue) {
           value = item.name;
         }
       }

       return true;
     });

    if (value) this.setState({value});
  }

  toggleState = (isOpen) => {
    if(!this.props.disabled){
      this.setState({isOpen})
    }
  };

  chooseItem = (item) => {
    const {onChange, changable} = this.props;
    this.setState({value: !changable ? item : null, isOpen: false});
    onChange && onChange(item || null);
  }

  clearValue = (e) => {
    e.stopPropagation();
    const {onChange} = this.props;
    this.setState({value: null, isOpen: false});
    onChange && onChange(null);
  }

  Options = () => {
    const {options, emptyText} = this.props;
    const option = this.getCurrentValue();

    const showingOptions = options.filter(item => option ? item.value !== option.value : item.value !== '//cr');

    console.log(option)
    console.log(options, 'options')
    if (this.props.isAllList) {
      return <ul className={`E-select-content ${this.state.isOpen? 'show':''}`}>
        {options.length ? options.map((item, index) => <li
                key={typeof item.value === 'number' ? item.value : index}
                onClick={() => this.chooseItem(item)}
                className={`${option && option.value === item.value ? 'selected_option' : ''}`}

            >{typeof item.name === 'function' ? item.name  : item.name}</li>) :
            <li className="I-select-empty-label">{emptyText || Settings.translations.no_options}</li>}

      </ul>
    } else {
      return <ul className={`E-select-content ${this.state.isOpen? 'show':''}`}>
        {showingOptions.length ? showingOptions.map((item, index) => <li
                key={typeof item.value === 'number' ? item.value : index}
                onClick={() => this.chooseItem(item)}

            >{typeof item.name === 'function' ? item.name  : item.name}</li>) :
            <li className="I-select-empty-label">{emptyText || Settings.translations.no_options}</li>}

      </ul>
    }
  }

  getCurrentValue = () => {
    const {useValue, options} = this.props;
    return useValue ? options.find(item => item.value === this.props.value) : this.state.value;
  }

  render() {
    const {
      placeholderOpacity,

      placeholder,
      className,
      clear,
      isAnimation,
      isPhoneNumber,
      disabled
    } = this.props;
    const {isOpen} = this.state;
    const value = this.getCurrentValue();

    return (
        <ClickOutside className={className} onClickOutside={() => this.toggleState(false)}>
          <div className={`E-select-component ${disabled? "E-disable-select":''}`}>
            <div className={`E-select-header  ${isOpen ? ' I-select-open' : ''}`}
                 onClick={() => this.toggleState(!isOpen)}>
              <span
                  className={`G-fs-18 ${!value && placeholderOpacity ? 'I-select-placeholder' : ''}`}>{value  ? isPhoneNumber ? value.value : value.name : placeholder}</span>
              {clear && value && <i className="icon-ic_close" onClick={this.clearValue}/>}
              <i className={isOpen ? 'icon-ic_arrowup' : 'icon-ic_arrowdown'}/>
            </div>
            {isAnimation ? <this.Options/> : isOpen && <this.Options/>}

          </div>
        </ClickOutside>
    );
  }
}

export default Select;
