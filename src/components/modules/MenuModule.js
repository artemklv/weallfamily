import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

class MenuModule extends  Component {
  static PropTypes = {
    menu: PropTypes.array.isRequired
  }

  render() {
    let { menu } = this.props;
    return (
      <ul className="menu">
        {menu.map( item => <li key={`menu${item.index}`}  className="menu-item">
          <Link to={item.url} className="menu-item" activeClassName="_active">{item.title}</Link>
        </li>)}
      </ul>
    )
  }

}

export default MenuModule