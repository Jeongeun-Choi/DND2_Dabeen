import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import LiveHelpRequest from './LiveHelpRequest';
import MainDaBeenerProfile from './MainDaBeenerProfile';

const Main = () => {
    return (
        <MainForm>
            <div className = "mainImage"> {/* 다빈 소개글 적는 부분 */}
                <div style={{fontSize:"40px"}}>DaBeen</div>
                <p>
                    대충 우리 사이트 설명 어쩌고 저쩌고 다빈이라는 이름 예쁘다
                    나는 딸 가지면 이름을 아영이로 짓고싶다 ^^!
                    <br />
                    배경은 사진 넣으면됩니당.
                </p>
            </div>
            <LiveHelpRequestMenuBar>
                <div className="title">실시간 도움 요청</div>
                <div className="liveHelpRequestForm">
                    <div className="liveHelpRequest">심부름</div>
                    <div className="liveHelpRequest">대여</div>
                    <div className="liveHelpRequest">잡일</div>
                </div>
            </LiveHelpRequestMenuBar>
            <LiveHelpRequest />
            <div className="title">내 주변의 높은 평점을 가진 DaBeener를 확인하세요!</div>
            <MainDaBeenerProfile />
        </MainForm>
    );
};

const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width : 100%;

    & > .mainImage {
        border: solid 1px gray;
        width: 90%;
        height: 30vh;
        margin-top: 30px;
        text-align: center;
    }

    & .title {
        color: #424242;
        font-size: 48px;

        @media only screen and (max-width: 1024px){
            font-size: 36px;
        }

        @media only screen and (max-width: 768px){
            font-size: 28px;
        }

        @media only screen and (max-width: 425px){
            font-size: 20px;
        }
    }
`;

const LiveHelpRequestMenuBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100vw;
    margin-top: 5vh;

    & .liveHelpRequestForm {
        display: flex;
        justify-content: space-around;
        width: 20vw;

        @media only screen and (max-width: 425px){
            margin-left: 1vw;
        }
    }

    & .liveHelpRequest {
        /*선택시 색상 변경되게*/
        font-size: 30px;
        cursor: pointer;
        
        :hover{
            color: #FF4300;
        }

        @media only screen and (max-width: 1024px){
            font-size: 20px;
        }

        @media only screen and (max-width: 768px){
            font-size: 18px;
        }

        @media only screen and (max-width: 425px){
            font-size: 12px;
        }
    }
`;

export default Main;