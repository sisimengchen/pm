import React, { PureComponent, Fragment } from 'react';
// import { connect } from 'react-redux';
import CoreRouter from 'core/Router';

class App extends PureComponent {
  static defaultProps = {
    appInitComplete: false
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { appInitComplete } = this.props;
    return (
      <Fragment>
        {/* <Loading /> */}
        {/* <Launch appInitComplete={appInitComplete} /> */}
        <CoreRouter />
      </Fragment>
    );
  }
}

export default App;
