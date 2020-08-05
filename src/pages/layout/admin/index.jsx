import React from 'react';
import NavLeft from './navLeft';
import styles from './index.module.less';

export default class Index extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <NavLeft />
        <div className={styles.main}>
          {children}
        </div>
      </div>
    );
  }
}
