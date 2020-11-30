import React, {Component} from 'react';
import './style.scss'
import Viewer from "react-viewer";
import FullScreenIcon from '../../../../../assets/images/full-screen.png'
import Modal from "../../../../../components/modal";
import ModalPhotoZoom from "../modal-zoom-image";

class DetailsSlider extends Component {

  state = {
    imageList: [],
    keyList: [],
    isOpenModalZoom: false,
    activeIndex: 0,
    activeImage: ''
  }

  viewerContainer = new React.createRef()

  componentDidMount() {

    const {imageList, keyList} = this.state
    if (this.props.sliderList) {
      for (const [key, value] of Object.entries(this.props.sliderList)) {
        imageList.push({src: value})
        keyList.push(key)
        this.setState(imageList)
      }
    }
  }

  openModalZoom = (image) => {
    this.setState({isOpenModalZoom: true, imagePath: image})
  }
  closeModalZoom = () => {
    this.setState({isOpenModalZoom: false})
  }


  render() {
    const {imageList} = this.state
    return (
        <>
          <div className="P-slider-details">
            <div className="P-slider-main">
            <span className="P-open-slider-modal" onClick={() => {
              this.openModalZoom(this.props.activeIndex)
            }}>
              <i style={{backgroundImage: `url('${FullScreenIcon}')`}}/>
            </span>
              <div className={"P-viewer-container"} ref={this.viewerContainer}/>
              <Viewer
                  visible={true}
                  loop={false}
                  activeIndex={this.props.activeIndex}
                  images={imageList}
                  defaultScale={1.5}
                  container={this.viewerContainer.current}
              />
            </div>
          </div>

          <Modal isOpen={this.state.isOpenModalZoom}
                 close={this.closeModalZoom}
                 changeClass='G-modal-zoom-images'>
            <ModalPhotoZoom imageList={imageList} activeIndex={this.props.activeIndex} isCurrent={true}
                            close={this.closeModalZoom}/>
          </Modal>
        </>

    );
  }
}

export default DetailsSlider;
