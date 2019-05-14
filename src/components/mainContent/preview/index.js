import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
// import pagemak from '../pagemake/index.js';
class Preview extends React.PureComponent {
  static propTypes = {
    unit: ImmutablePropTypes.list
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
    const { unit } = this.props;
    const units = unit.toJS();
    if (doc && doc.readyState === 'complete') {
      doc.open();
      // doc.write(pagemak(units, true));
      doc.close();
    } else {
      setTimeout(this.renderFrameContents, 0);
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
      <div className="m-preview">
        <div className="previewframe">
          <iframe id="preframe" className="iframe" frameBorder="0" />
        </div>
      </div>
    );
  }
}
export default connect(state => ({
  unit: state.get('Reducers')
}))(Preview);
