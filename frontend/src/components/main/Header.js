import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button, Input, Icon } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import { loginRequestAction, logoutRequestAction } from "../../reducers/user";
import Login from "../signUp/Login";

const isBrowser = typeof window !== "undefined";
// const isLogin = false; // 로그인 됐는지 나중에 리덕스에서 가져올 예정
const Header = () => {
  const dispatch = useDispatch();
  const divRef = useRef();

  const { userId } = useSelector(state => state.user);
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);
  const [tryLogin, setTryLogin] = useState(false);
  const [selected, setSelected] = useState("/"); // 선택 된 메뉴가 무엇인지.
  const [isClickMy, setIsClickMy] = useState(false);

  const clickMenuIcon = useCallback(() => {
    divRef.current.classList.toggle("active");
  }, []);
  const clickLogout = useCallback(() => {
    dispatch(logoutRequestAction());
    alert("로그아웃 되었습니다.");
  }, []);

  const clickLogin = useCallback(() => {
    setTryLogin(prev => !prev);
  }, []);

  const clickMy = useCallback(() => {
    setSelected("userpage");
    setIsClickMy(prev => !prev);
  }, []);
  const clickSignUp = useCallback(() => setSelected("signup"), []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (width > 768) {
      divRef.current.classList.remove("active");
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <Menubar selected={selected}>
      <sapn className="menuToggle">
        <Icon
          type="menu"
          onClick={clickMenuIcon}
          style={{ color: "#FF4300" }}
        />
      </sapn>
      <div className="menuLeft">
        <Link href="/">
          <a onClick={useCallback(() => setSelected("/"), [])}>
            <img width="150px" src="/images/logo.svg" alt="다빈로고" />
          </a>
        </Link>
        <Input.Search
          placeholder="어떤 도움을 찾으시나요?"
          style={{ marginLeft: 10 }}
        />
      </div>
      <div className="menuRight" ref={divRef}>
        <ul>
          <li>
            <Link href="/[postmain]" as="/errand">
              <a
                name="errand"
                onClick={useCallback(() => setSelected("errand"), [])}
              >
                심부름
              </a>
            </Link>
          </li>
          <li>
            <Link href="/[postmain]" as="/rental">
              <a
                name="rental"
                onClick={useCallback(() => setSelected("rental"), [])}
              >
                대여
              </a>
            </Link>
          </li>
          <li>
            <Link href="/[postmain]" as="/chores">
              <a
                name="chores"
                onClick={useCallback(() => setSelected("chores"), [])}
              >
                잡일
              </a>
            </Link>
          </li>
        </ul>
        <div className="loginBox">
          {userId ? (
            <>
              <div className="userPageBox">
                {/* <Link href="/mypage"> */}
                <a
                  name="userpage"
                  onClick={clickMy}
                >
                  <b>MY</b>
                </a>
                {isClickMy ? (
                  <div className="userPageList">
                    <ul>
                      <li>
                        <Icon type="dollar-circle" theme="filled" />
                        &nbsp;
                        <span>25000</span>원
                      </li>
                      <li><Link href="/basketmain"><a>장바구니</a></Link></li>
                      <hr />
                      <li><Link href="/userpage/[userid]/[pagename]"  as={`/userpage/ansrjsdn/userinfo`}><a>마이페이지</a></Link></li>
                      <li><Link href="/chat"><a>채팅하기</a></Link></li>
                      <hr />
                      <li><Link href="/userpage/[userid]/[pagename]" as={`/userpage/ansrjsdn/service`}><a>고객센터</a></Link></li>
                    </ul>
                  </div>
                ) : null}
                {/* </Link> */}
              </div>
              <div>
                <a onClick={clickLogout}>로그아웃</a>
              </div>
            </>
          ) : (
            <>
              <div>
                <a onClick={clickLogin}>로그인</a>
              </div>
              <div>
                <Link href="/terms">
                  <a
                    name="signup"
                    onClick={clickSignUp}
                  >
                    회원가입
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {tryLogin && <Login clickLogin={clickLogin} />}
    </Menubar>
  );
};

const Menubar = styled.nav`
  position: fixed;
  height : 10vh;
  min-height : 50px;
  top: 0;
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  text-align: center;
  border-bottom: 1px solid #BFC7CE;
  color: black;
  z-index: 1;
  opacity : 0.9;
  & .menuToggle {
    position: absolute;
    top: 13px;
    right: 24px;
    cursor: pointer;
    color: black;
    font-size: 24px;
  }
  & .menuLeft {
    display: flex;
    width: 60vw;
    & span .ant-input {
      & :hover,
      :focus {
        border: 1px solid #ff4300;
        box-shadow: none;
      }
    }
  }
  & .menuRight {
    display: none;
  }
  & .ant-input-search {
    & span i {
      color : black;
      font-size: 18px;
    }
  }
  & .active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 17px;
    top: 62px;
    right: 5px;
    background: rgba(255, 99, 71, 0.9);
    border-radius: 5px;
    & a {
      color: white;
    }
    & ul {
      display: flex;
      margin: 0;
      padding: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      list-style: none;
    & ::before {
      content: "";
      width: 10px;
      height: 10px;
      position: absolute;
      background: rgba(255, 99, 71);
      top: -5px;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
    }
  }
}

  @media screen and (min-width: 768px) {
    & .menuToggle {
      display: none;
    }
    & .menuLeft {
      display: flex;
      width: 40vw;
    }
    & .menuRight {
      display: flex;
      width: 60vw;
      justify-content: space-around;
      & a {
        color: black;
      }
      & a.click{
          color : #ff4300;
        }
    }
    & .menuRight ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 40vw;
      list-style: none;
      font-size: 22px;
      margin: 0;
      }
      & a[name=${props => props.selected}]{
      color : #ff4300;
      }
    & .loginBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 18vw;
     & .userPageBox {
       position: relative;
       & .userPageList {
        position : absolute;
        width : 100px;
        top : 35px;
        left : -42px;
        z-index : 1;
        background : white;
        border-radius : 5px;
        border : 1px solid darkgrey;
        & ul {
          width : 100%;
          font-size: 14px;
          margin :0;
          padding : 0;
          display: flex;
          color : #ff4300;
          flex-direction : column;
          & i, span {
          color : #ff4300;
          }
          & li {
            color : black;
          }
          & hr {
          width : 80%;
          }
        }
        
        &::before {
          content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        background: white;
        border-top: 1px solid darkgrey;
        border-left: 1px solid darkgrey;
        top: -5px;
        left: 50%;
        transform: translate(-50%) rotate(45deg);
        }
    }
     }
      
    }
  }
`;

export default Header;
