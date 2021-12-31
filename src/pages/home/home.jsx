import React from "react";
import {LMap} from '../../components/map';
import { useNavigate, Outlet } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();

  const nav = (path) => {
    navigate(path);
  };
  const test = () => {
    console.log("点击了按钮")
  };
  return (
    <React.Fragment>
      <div>
        <p>主页</p>
        {/* <button onClick={() => nav("/")}>Home</button> */}
        <button onClick={test}>测试websocket</button>
        <LMap/>
        <Outlet />
      </div>
    </React.Fragment>
  );
  
};

export default Home;
