import React, {Component} from 'react';

import './style.scss'
import Viewer from 'react-viewer';
class ModalPhotoZoom extends Component {
  mounted = false
  state = {
    isLoading: false
  }

  componentDidMount() {
    this.renderImage()
  }

  renderImage = () => {
    this.mounted = true;
    const buffer = new Image(); // Here is the secret! :)
    buffer.onload = () => this.mounted && this.setState({isLoading: true});
    buffer.src = this.props.image? this.props.image: this.props.imageList[0].src;
  }

  componentWillUnmount() {
    // this.mounted = false;
  }

  viewerContainer = new React.createRef()
  render() {
    const {image, close, isCurrent, imageList} = this.props
    return (
        <div className="P-modal-zoom-container">
          <div className={`P-modal-zoom-block ${isCurrent? "P-show-images":''}`}>
            <div className={"P-viewer-container"} ref={this.viewerContainer}/>
            <Viewer
                visible={true}
                defaultScale={1}
                activeIndex={this.props.activeIndex}
                onClose={() => { close() } }
                images={ isCurrent ? imageList:  [{src: image, alt: 'png'}]}
                container={this.viewerContainer.current}
            />
          </div>
          { !this.state.isLoading ? <div className="lds-roller L-for-zoom-loader">
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
          </div> : false}
        </div>
    );
  }
}

export default ModalPhotoZoom;
