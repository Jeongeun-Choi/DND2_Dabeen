import React, { useCallback, useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import CheckDabeener from './CheckDabeener';
import MyLocation from '../map/MyLocation';

// 내가 쓴 글 / 아닌 글 구분해야함
const PostDetail = ({setVisible}) => {
    
    //임시로 내가 쓴 글이라고 설정
    const [myPost, setMyPost] = useState(true);
    const [click, setClick] = useState(false);
    const {helpPosts} = useSelector(state => state.posts);

    const onModal = useCallback(() => {
        setClick(!click);
    }, [click]);

    console.log(helpPosts[0].exec_loc);
    return (
        <Modal>
            <ContentForm>
                <Content>     
                    <DeleteIcon>
                        <Icon onClick={setVisible} type="close"/>
                    </DeleteIcon>
                    <Title>
                        <div>제목</div>
                        <div className="titleDetail">
                            <div>작성일 : 2020.02.10</div>
                            <div>작성자 : ysje</div>            
                            <Edit>Edit</Edit>
                        </div>
                    </Title>
                    <Image>근데 여기에 무슨 사진을 넣나요</Image>
                    <ApplicationInfo>
                        <div className="applicationInfoText">
                            <div className="applicationInfoTextTitle">
                                <div>신청인원</div>
                                <div>신청 마감 일시</div>
                                <div>수행 일시</div>
                            </div>
                            <div className="applicationInfoTextDetail">
                                {
                                    myPost ? 
                                    <div style={{display: "flex"}}><div>0/1</div><Button type="link" style={{color: "#7A7A7A"}} size="small" onClick={onModal}>신청 확인</Button></div>
                                    :   
                                    <div>0/1</div>  /**여기서 0은 강조색으로하기 */
                                }
                                {click&&<CheckDabeener click={click} onModal={onModal}/>}
                                <div>2020-03-08</div>
                                <div>2020-03-08, PM 06:19</div>
                            </div>
                        </div>
                        <div className="applicationMoney">
                            <div>3000원</div>
                            {
                                myPost ? 
                                <ClickButton apply>마감</ClickButton> :
                                <ClickButton apply>신청</ClickButton>
                            }
                        </div>
                    </ApplicationInfo>
                    <ContentItem>
                        <div style={{fontSize: 22}}>위치</div>
                        <MyLocation myLocation={helpPosts[0].exec_loc}/>
                    </ContentItem>
                    <ContentItem>
                        <div style={{fontSize: 22}}>도움정보</div>
                        <p>
                            못 잘 박을 수 있는 망치가 필요합니다.<br/>
                            거기에다가 빌려주시는 분이 망치질을 잘 하셨으면 좋겠습니다.
                        </p>
                    </ContentItem>
                </Content>
            </ContentForm>
        </Modal>
    );
};

const Modal = styled.div`
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const ContentForm = styled.div`
    font-size: 20px;
    color: #424242;
    background: white;
    padding: 1rem;
    width: 25vw;
    height: 80vh;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/

`;

const DeleteIcon = styled.div`
    text-align: right;
    margin-top: 1vh;
    font-size: 25px;
    color: #BFC7CE;
`;

const Content = styled.div`
    width: 21vw;
    height: 78vh;
    display: flex;
    flex-direction: column;

`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 21vw;
    font-size: 40px;

    & > .titleDetail{
        display: flex;
        justify-content: space-around;
        width: 15vw;
        font-size: 0.7vw;
    }
`;

const Image = styled.div`
    width: 21vw;
    height: 20vh;
    background: #BFC7CE;
`;

const ApplicationInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 21vw;
    margin-top: 20px;

    & .applicationInfoText {
        display: flex;
        justify-content: space-between;
        border-right: 1px solid #BFC7CE;
        width: 14vw;
    }

    & .applicationInfoTextTitle {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 8vw;
        font-size: 18px;

    }

    & .applicationInfoTextDetail {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 9vw;
        font-size: 14px;

    }

    & .applicationMoney{
        display: flex;
        flex-direction: column;
        width: 6vw;
        justify-content:flex-end;
        color: #FF4300;
        font-size: 25px;

    }
`;

const ClickButton = styled(Button)`
    background: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
    border: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
    color: ${props => (props.apply ? "#FFFFFF" : "#7A7A7A")};
    font-size: 20px;
    box-shadow: 2px 3px 5px #BFC7CE;
    width: 5vw;

    :hover {
        opacity: 0.9;
        background: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
        border: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
        color: ${props => (props.apply ? "#FFFFFF" : "#7A7A7A")};
    }

    :focus{
        background: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
        border: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
        color: ${props => (props.apply ? "#FFFFFF" : "#7A7A7A")};
    }
`;

const ContentItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 20px;
    margin-top: 30px;
    width: 21vw;

    & > p{
        margin-top: 10px;
        font-size: 18px;
    }
`;

const Edit = styled(Button)`
    background: #F0F0F0;
    border: 1px solid #F0F0F0;
    border-radius: 7px;
    color: #7A7A7A;
    width: 2.7vw;
    height: 1.8vh;
    font-size: 0.7vw;
`;
export default PostDetail;