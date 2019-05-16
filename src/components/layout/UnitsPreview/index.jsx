import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Icon, Menu, Row, Col } from 'antd';
import { connect } from 'react-redux';
// import pagemak from '../../mainContent/pagemake';
import './index.less';

class UnitsPreview extends PureComponent {
  static defaultProps = {
    units: []
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
    this.renderFrameContents();
  }

  renderFrameContents() {
    if (!this._isMounted) {
      return;
    }
    const doc = this.getDoc();
    const units = this.props.units.toJS();
    if (doc && doc.readyState === 'complete') {
      doc.open();
      // doc.write(pagemak(units, true));
      doc.write(JSON.stringify(units));
      doc.close();
    } else {
      window.setTimeout(() => {
        this.renderFrameContents();
      }, 0);
    }
  }

  getDoc() {
    const root = ReactDOM.findDOMNode(this);
    const frame = root.querySelector('#preframe');
    return frame.contentDocument;
  }

  componentDidUpdate() {
    this.renderFrameContents();
  }

  render() {
    return (
      <div className="components-layout-unitpreview">
        <div className="previewframe">
          <iframe id="preframe" className="iframe" frameBorder="0" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ units }) => ({
  units: units
});

export default connect(mapStateToProps)(UnitsPreview);
