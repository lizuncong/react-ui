import React, { PureComponent } from 'react';
import './index.less';

class Uploader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="grid"
      >
        <div>1</div>
        <div id="header">2</div>
      </div>
    );
  }
}

export default Uploader;
