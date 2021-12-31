import React from "react";
import { Layout, Menu } from "antd";
import "./defaultlayout.less";
import { useNavigate, Outlet } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const DefaultLayout = (props) => {
  const navigate = useNavigate();
  const nav = (path) => {
    navigate(path);
  };
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item onClick={() => nav("/home")} key={1}>{`nav ${1}`}</Menu.Item>
          <Menu.Item key={2}>{`nav ${2}`}</Menu.Item>
          <Menu.Item key={3}>{`nav ${3}`}</Menu.Item>
          <Menu.Item key={4}>{`nav ${4}`}</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default DefaultLayout;