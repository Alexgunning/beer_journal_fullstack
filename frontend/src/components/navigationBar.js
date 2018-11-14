import React from 'react'

import { Menu, Dropdown } from 'antd';

const headerStyle = {
  background: "#fafafa",
  height: "70px",
  borderBottom: "2px solid #d9d9d9",
}

const menu = ({ logout, viewProfile }) => (
  <Menu
    onClick={({ key }) => {
      if (key === "logout")
        logout()
      else if (key === "profile")
        viewProfile()
  }} >
    <Menu.Item key="profile">
       <div>Profile</div>
    </Menu.Item>
    <Menu.Item key="logout">
      <div>Logout</div>
    </Menu.Item>
  </Menu>
);

const parent =  {
  "display": "flex"
}

const beerIcon = {
  width: "58px",
}

const title = {
  flex: 1,
  fontSize: "55px",
}

const titleText = {
  color: "#40A9FF",
}

const userImage = {
  width: "58px",
  marginRight: "20px"
}

const userText = {
  fontSize: "20px",
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
const NavigationBar = ({name, logout, viewProfile}) => (
  <div style={headerStyle}>
    <div style={parent}>
      <div style={beerIcon}>
        <img alt="beer icon" style={img} src={"/beerblue2.png"} />
      </div>

      <div style={title}><strong><p style={titleText}>Beer Journal</p></strong></div>

      <div style={userText}>{name}</div>
      <div style={userImage}>
        <Dropdown overlay={menu({logout, viewProfile})} >
          <img alt="user icon" style={img} src={"/userblue2.png"} />
        </Dropdown>
      </div>
    </div>
  </div>
)

export default NavigationBar
