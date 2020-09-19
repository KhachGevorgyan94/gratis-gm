import React, { PureComponent } from 'react';

import './style.scss';

class PageLoader extends PureComponent {

    state = { show: false };

    componentDidMount() {
        this.props.active && this.setState({ show: true });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.active) this.setState({ show: true });
        else if (this.state.show) this.loadingTimeout = window.setTimeout(() => this.setState({ show: false }), 100);
    }

    componentWillUnmount() { this.loadingTimeout && clearTimeout(this.loadingTimeout); }

    render() {
        const { show } = this.state;

        return show ? (
            <div className="M-loader-wrapper">
                <div className="lds-roller">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        ) : null;
    }
}

export default PageLoader;
