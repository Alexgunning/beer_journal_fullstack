import React from 'react'
import BeerForm from './beerForm'

import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import { Row, Col } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

const headerStyle = {
  background: "#fafafa",
  height: "70px",
  borderBottom: "2px solid #d9d9d9",
}

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Profile</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Logout</a>
    </Menu.Item>
  </Menu>
);


const titleStyle = {
  fontSize: "3vw",
}

const parent =  {
  "display": "flex"
}
const beerIcon = {
  width: "58px",
}
const title = {
  flex: 1,
  fontSize: "3vw",
}
const titleText = {
  color: "#40A9FF",
}
const userImage = {
    width: "58px",
    marginRight: "20px"
}

const userText = {
  fontSize: "1vw",
  width: "180px",
  textAlign: "right",
  marginTop: "23px",
  marginRight: "5px"
}

const img = {
  marginTop:"7px",
  marginBottom:"7px"
}

//
const NavigationBar = ({name}) => (
  <div style={headerStyle}>
    <div style={parent}>
      <div style={beerIcon}>
        <img style={img} src={"./beerblue2.png"} />
      </div>

      <div style={title}><strong><p style={titleText}>Beer Journal</p></strong></div>

      <div style={userText}>{name}</div>
      <div style={userImage}>
        <Dropdown overlay={menu}>
          <img style={img} src={"./userblue2.png"} />
        </Dropdown>
      </div>
    </div>
  </div>
)

export default NavigationBar
