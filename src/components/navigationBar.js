import React from 'react'
import BeerForm from './beerForm'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Row, Col } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

const headerStyle = {
  background: "#fafafa",
  height: "70px",
  borderBottom: "2px solid #d9d9d9",
}

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
const userImage = {
  width: "100px",
}
const img = {
    marginTop:"7px",
    marginBottom:"7px"
}

//
const NavigationBar = () => (
  <div style={headerStyle}>
    <div style={parent}>
      <div style={beerIcon}>
        <img style={img} src={"./beer2.png"} />
      </div>

      <div style={title}><strong>Beer Journal</strong></div>

      <div style={userImage}>
        <img style={img} src={"./user2.png"} />
      </div>
    </div>
  </div>
)

export default NavigationBar
