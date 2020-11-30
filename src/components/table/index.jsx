import React from 'react';
import './style.scss';
import {Link} from "react-router-dom";
import MultiSelectTableList from "./components/change-colum-count";
import FixedColumnsList from "./components/fixed-columns";
import Settings from "../../platform/serivces/settings";

class DataTable extends React.Component {
  // cell(row: Data, index: number): TableCellType;
  // wrapperClass?(row: Data, index?: number): string;
  // className?: string;
  // name?: string | number | HTMLElement | React.ReactNode;
  // isShow:boolean

  // style?: React.CSSProperties;
  // changeStyle?
  // isMultiSelect && multiSelectArray && selectItemType
  // getMultiSelectArray  get array list
  //isDragDrop boolean
  //isShowColumnList  for  sow  solums list
  //isFixedColumns  for  fixed  solums list


  scrollHeader = React.createRef();
  table = React.createRef();
  state = {
    multiSelectArray: [],
    selectedKay: null,
    columnConfig: [],
    activeColumn: false,
    lastFixedColumn: null,
  }

  componentDidMount() {
    this.getSelectedKey()
    // this.createResizableTable(this.table.current);
    this.setState({
      columnConfig: this.props.columnConfig
    })

  }

  getSelectedKey = () => {
    const {data} = this.props
    Object.keys(data[0]).map(key => {
      if (key === this.props.selectItemType) {
        this.setState({
          selectedKay: key
        })
      }
    });
  }

  onRowClick = (item) => {
    const {selectedKay} = this.state
    let valueKay = null
    for (const [key, value] of Object.entries(item)) {
      if (key === selectedKay) {
        valueKay = value
      }
    }

    if (this.props.isMultiSelect) {
      this.multiSelect(valueKay)
    } else {
      this.select(valueKay)
    }
  }

  select = (index) => {
    let list = this.state.multiSelectArray.slice();
    const itemIndex = list.indexOf(index);
    if (itemIndex >= 0) {
      list.splice(itemIndex, 1);
    } else {
      list = []
      list.push(index);

    }
    // this.props.multiSelectArray = list
    this.setState({multiSelectArray: list})
  }

  multiSelect = (index) => {
    const list = this.state.multiSelectArray.slice();
    const itemIndex = list.indexOf(index);
    if (itemIndex >= 0) {
      list.splice(itemIndex, 1);
    } else {
      list.push(index);
    }
    // this.props.multiSelectArray = list
    this.setState({multiSelectArray: list})
  }
  isSelectedRow = (item) => {
    const {selectedKay} = this.state
    let isActive = false
    let valueKay = null
    for (const [key, value] of Object.entries(item)) {
      if (key === selectedKay) {
        valueKay = value
        if (this.state.multiSelectArray.includes(value)) {
          isActive = true
        }
      }
    }
    return isActive
  }


  //  create resizable tabe
  createResizableTable = (table) => {
    const cols = table.querySelectorAll('th');
    [].forEach.call(cols, (col) => {
      // Add a resizer element to the column
      const resizer = document.createElement('div');
      resizer.classList.add('resizer');

      // Set the height
      resizer.style.height = `${col.offsetHeight}px`;

      col.appendChild(resizer);

      this.createResizableColumn(col, resizer);
    });
  };

  createResizableColumn = (col, resizer) => {
    let x = 0;
    let w = 0;

    const mouseDownHandler = (e) => {
      x = e.clientX;
      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      resizer.classList.add('resizing');
    };

    const mouseMoveHandler = (e) => {
      const dx = e.clientX - x;
      col.style.width = `${w + dx}px`;
    };

    const mouseUpHandler = () => {
      resizer.classList.remove('resizing');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
  };


  //   drag and  drop
  // const [cols, setCols] = useState(columns);
  // const [rows, setRows] = useState(data);
  // const [dragOver, setDragOver] = useState('');

  handleDragStart = (e, item) => {
    if (this.props.isDragDrop) {
      let idx = null;
      this.props.columnConfig.map((column, index) => {
        if (item.name === column.name) {
          idx = index
        }
      })
      e.dataTransfer.setData('colIdx', idx);
    }
  };

  handleDragOver = (e, item) => {
    if (this.props.isDragDrop) {
      e.target.classList.add('P-active-column')
    }
    e.preventDefault()
  };

  handleDragLeave = e => {
    if (this.props.isDragDrop) {
      e.target.classList.remove('P-active-column')
    }
  };

  handleOnDrop = (e, name, index) => {
    if (this.props.isDragDrop) {
      let droppedColIdx = index
      const draggedColIdx = +e.dataTransfer.getData('colIdx');
      e.target.classList.remove('P-active-column')
      const tempCols = [...this.props.columnConfig];
      tempCols[draggedColIdx] = this.props.columnConfig[droppedColIdx];
      tempCols[droppedColIdx] = this.props.columnConfig[draggedColIdx];
      this.setState({
        columnConfig: tempCols,
      })
    }
  };

  updateList = (options) => {
    this.setState({columnConfig: options})
  }
  updateFixedList = (options, itemId) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].isFixed) {
        let isFixed = 0;
        for (let j = 0; j < options.length; j++) {
          if (j < i) {
            if (options[j].isFixed) {
              isFixed += options[j].style.minWidth
            }
          }
        }
        options[i].style = {...options[i].style, ...{left: isFixed}}
      }
    }

    this.setState({columnConfig: options})

  }


  render() {
    const {data, redirectUrl, changeStyle, isDragDrop, isShowColumnList, isFixedColumns} = this.props;
    const Row = redirectUrl ? Link : 'ul';
    const {columnConfig} = this.state

    return (
        <>
          <div className="B-data-table-menu G-flex G-justify-end">
            {isShowColumnList || isFixedColumns ? <div className="B-data-table-list G-flex ">
              {isShowColumnList ? <div className="P-multi-select-input-box">
                <p>{Settings.translations.change_loudspeakers}</p>
                <MultiSelectTableList options={columnConfig} onChange={this.updateList}/>
              </div> : null}
              {isFixedColumns ? <div className="P-multi-select-input-box">
                <p>{Settings.translations.attach_left}</p>
                <FixedColumnsList options={columnConfig} onChange={this.updateFixedList}/>
              </div> : null}
            </div> : null}
          </div>
          <div className={`B-data-table ${changeStyle} ${isDragDrop ? 'B-dat-table-drag' : ''}`}>
            <div className="B-data-scroll">
              <ul className="B-data-table-header">
                {columnConfig.map((item, index) => {
                  if (item.isShow) {
                    return <li
                        id={item.name}
                        key={index}
                        className={`${item.className} ${item.activeClass ? 'P-active-column' : ''} ${item.isFixed ? 'P-fixed-columns' : 'P-disable-fixed'}`}
                        draggable={this.props.isDragDrop && !item.isFixed}
                        onDragLeave={this.handleDragLeave}
                        onDragStart={(e) => this.handleDragStart(e, item)}
                        onDragOver={(e) => this.handleDragOver(e, item)}
                        onDrop={(e) => this.handleOnDrop(e, item.name, index)}
                        style={item.style || {}}>
                      <div className="P-table-header">
                        {item.icon && <span className="P-table-header-icon" style={{backgroundImage: `url('${item.icon}')`}}/>}
                        <p>{item.name}</p>
                      </div>
                    </li>
                  }
                  return true
                })}
              </ul>
              {!!data.length && <div className="B-data-table-body">
                {data.map((item, rowIndex) =>
                    <Row to={redirectUrl ? redirectUrl(item, rowIndex) : ''}
                         key={rowIndex} className={`B-pointer`}>
                      {columnConfig.map((childItem, index) => {
                            if (childItem.isShow) {
                              return <li key={index}
                                         id={index}
                                         onDoubleClick={()=>this.props.onDoubleClick(item)}
                                         onClick={() => this.onRowClick(item)}
                                         style={childItem.style || {}}
                                         className={`${this.isSelectedRow(item) ? 'G-data-table-select' : ''}  ${childItem.isFixed ? 'P-fixed-columns' : 'P-disable-fixed'} `}
                              >
                                <div
                                    className={childItem.wrapperClass && childItem.wrapperClass(item)}>{childItem.cell(item, rowIndex)}</div>
                              </li>
                            }
                            return true
                          }
                      )}
                    </Row>)}
              </div>}
            </div>
          </div>
        </>
    )
  }
}

export default DataTable;
