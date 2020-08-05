import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import MenuConfig from '../../../../config/menuConfig';
import styles from './index.module.less';

const { SubMenu } = Menu;

class NavLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuTreeNode: [],
      currentUrl: '',
    };
  }

  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    const currentUrl = window.location.hash.replace(/#|\?.*$/g, '');
    this.setState({
      menuTreeNode,
      currentUrl,
    });
  }

  // 菜单渲染
  renderMenu(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.url}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.url}>
          <NavLink to={item.url}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  }

  handleClick(menuItem) {
    this.setState({
      currentUrl: menuItem.key,
    });
  }

  render() {
    const { currentUrl, menuTreeNode } = this.state;
    return (
      <div className={styles.navLeftContent}>
        <div className={styles.logo}>
          <h1>React UI</h1>
        </div>
        <Menu
          mode="inline"
          onClick={(menuItem) => this.handleClick(menuItem)}
          selectedKeys={[currentUrl]}
          theme="dark"
        >
          { menuTreeNode }
        </Menu>
      </div>
    );
  }
}

export default NavLeft;
