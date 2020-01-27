import React from "react";
import styled from 'styled-components';
import MenuBar from "../components/main/MenuBar";
import MainBottom from "../components/main/MainBottom";
import PostWrite from "../components/posts/PostWrite";

const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  padding-top: 10px;
  border-top: solid 1px darkgray;
  width: 100%;
  color: gray;
`;

const Home = () => {
  return (
    <>
    <MenuBar />
    <Content><PostWrite /></Content>
    <Footer><MainBottom /></Footer>
    </>
  );
};

export default Home;
