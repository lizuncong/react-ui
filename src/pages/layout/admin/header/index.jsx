import React from 'react';
import styles from './index.module.less';
import './header.less';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { menuName } = this.props;
    return (
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.breadcrumb}>{menuName}</div>
        </div>
      </div>
    );
  }
}

export default Header;
