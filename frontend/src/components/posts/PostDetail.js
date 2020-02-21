import React, { useCallback, useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import { Button, Icon, Input, TimePicker, DatePicker, Popconfirm, Row, Col } from 'antd';
import CheckDabeener from './CheckDabeener';
import MyLocation from '../map/MyLocation';
import inputChangeHook from '../../hooks/inputChangeHook';
import moment from 'moment';
import SearchJuso from '../map/SearchJuso';

// 내가 쓴 글 / 아닌 글 구분해야함
const PostDetail = ({setVisible, data}) => {

    //임시로 내가 쓴 글이라고 설정
    const [click, setClick] = useState(false);
    const [edit, setEdit] = useState(false);    //Edit 버튼 눌렀을 때 편집 모드로 바뀜
    const [editTitle, setEditTitle] = inputChangeHook(data.helpTitle);
    const [editPostNum, setEditPostNum] = inputChangeHook(data.postNum);
    const [editHelpDeadLine, setEditHelpDeadLine] = useState(data.helpDeadLine);
    const [editPost_type, setEditPost_type] = useState('');
    const [editPrice, setEditPrice] = inputChangeHook(data.price);
    const [editExecLoc, setEditExecLoc] = useState(data.execLoc);
    const [editContent, setEditContent] = inputChangeHook(data.content);
    const dateFormat = 'YYYY-MM-DD';

    //신청 다비너 창 여닫을떄
    const onModal = useCallback(() => {
        setClick(prev => !prev);
    }, []);

    const onConfirm = useCallback(() => {
        //dispatch 수정 정보들
        setEdit(prev => !prev);
    }, []);


    const deletePost = useCallback(() => {
        //dispatch
    }, []);

    return (
        <Modal>
            <ContentForm>
                <Content>     
                    <Icons>
                        {edit&&
                        <>
                        <Popconfirm placement="bottom" title="수정을 그만두시겠습니까?" onConfirm={useCallback(()=>{setEdit(prev => !prev)}, [])} onCancel={edit} okText="네" cancelText="아니요">
                        <Icon type="rollback" style={{marginRight: 10, color: "#7A7A7A"}}/>
                        </Popconfirm>
                        <Icon type="delete" style={{marginRight: 10}} onClick={deletePost}/>
                        </>
                        }
                        <Popconfirm placement="bottom" title="정말 삭제하시겠습니까?" onConfirm={deletePost} onCancel={edit} okText="네" cancelText="아니요">
                        <Icon onClick={setVisible} type="close"/>
                        </Popconfirm>
                    </Icons>
                    <Title>
                        {
                        !edit ? 
                        <div className="postTitle">
                            <div>{data.helpTitle}</div>
                            {
                                data.isHelpApprove ? 
                                <ApplyCheck apply>마감</ApplyCheck>:
                                <ApplyCheck>신청 중</ApplyCheck>     
                            }
                        </div>
                        : 
                        <EditTitle value={editTitle} onChange={setEditTitle}/>
                        }
                        <div className="titleDetail">
                            <div>작성일 : {data.helpPostDate}</div>
                            <div>작성자 : {data.id}</div>  
                            {
                                !edit ? <Edit onClick={useCallback(() => {setEdit(prev => !prev)}, [])}>Edit</Edit>
                                : 
                                <Popconfirm placement="topLeft" title="수정하시겠습니까?" onConfirm={onConfirm} onCancel={edit} okText="네" cancelText="아니요">
                                    <Edit>완료</Edit>
                                </Popconfirm>
                            }         
                        </div>
                    </Title>
                    <Image>근데 여기에 무슨 사진을 넣나요</Image>
                    <ApplicationInfo>
                        <Row>
                            <Col span={18}>
                                <ApplicationInfoBox>
                                <div className="applicationInfoBoxTitle">신청인원</div>
                                { !edit ?
                                    <>
                                    <div style={{display: "flex"}} className="applicationInfoBoxDetail"><div><span>0</span>/{data.postNum}</div><button onClick={onModal}>신청 확인</button></div>      
                                    {click &&<CheckDabeener click ={click} onModal ={onModal} needPersonnel={data.postNum} applyCheck={data.isHelpApprove}/>}
                                    </>
                                    :
                                    <div style ={{display:"flex"}}><div><span>0</span>/<input className ="needPersonnel" value={editPostNum} onChange={setEditPostNum}/></div></div>
                                }
                                </ApplicationInfoBox>
                                <ApplicationInfoBox>
                                <div className="applicationInfoBoxTitle">신청 마감 일시</div>
                                {
                                    !edit ?
                                    <div className="applicationInfoBoxDetail">{data.HelpDeadLine}</div>
                                    : 
                                    <DatePicker defaultValue ={moment(data.HelpDeadLine, dateFormat)}/>
                                }
                                </ApplicationInfoBox>
                                <ApplicationInfoBox>
                                <div className="applicationInfoBoxTitle">수행 일시</div>
                                {
                                    !edit ?
                                    <div className="applicationInfoBoxDetail">{data.helpExecDate}, PM 06:19</div>
                                    :
                                    <DatePicker defaultValue ={moment(data.helpExecDate ,dateFormat)}/>
                                }
                                </ApplicationInfoBox>
                            </Col>
                            <Col span={6}>
                                <div className="applicationMoney">
                                    {
                                        !edit ?
                                        <>
                                        <div>{data.price}원</div>
                                        {
                                            data.isHelpApprove ?
                                            <DeadlineButton apply>마감 완료</DeadlineButton>:
                                            <DeadlineButton>마감</DeadlineButton> 
                                        }
                                        </>
                                        :  
                                        <>      
                                        <div style ={{color:"#424242", fontSize:"20px"}}>금액 수정 </div>
                                        <div><input value ={editPrice} onChange ={setEditPrice}/></div>
                                        </>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </ApplicationInfo>
                    <ContentItem>
                        <div>
                            <div className="contentTitle">위치</div>
                        </div>
                        {
                            !edit ?
                            <div className="map">
                                <div>{data.execLoc}</div>
                                <MyLocation myLocation={data.execLoc}/>        
                            </div>
                            :
                            <SearchJuso location={editExecLoc} getLocation={setEditExecLoc}/>
                        }
                    </ContentItem>
                    <ContentItem>
                        <div className="contentTitle">도움정보</div>
                        {
                            !edit ?       
                            <p>
                            {data.content}
                            </p>
                            :
                            <textarea required value={editContent} onChange={setEditContent}/>
                        }
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
    width: 590px;
    height: 87vh;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    /* ::-webkit-scrollbar{display:none;}  스크롤바 안보이게 */
`;

const Icons = styled.div`
    text-align: right;
    font-size: 25px;
    color: #BFC7CE;
`;

const Content = styled.div`
    width: 550px;
    height: 85vh;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    width: 550px;
    font-size: 40px;

    & > .postTitle {
        display: flex;
        align-items:flex-end;
    }
    & > .titleDetail{
        display: flex;
        justify-content: space-between;
        width: 400px;
        font-size: 15px;
        margin-top: 5px;
    }
`;

const ApplyCheck = styled.div`
    min-width: 60px;
    height: 25px;
    padding: 2px;
    border-radius: 10px;
    margin: 10px 10px 2px 10px;

    font-size: 14px;
    text-align: center;

    color: ${props => (props.apply ? "#7A7A7A" : "white")};
    background: ${props => (props.apply ? "#F0F0F0" : "#FF4300")};
`;

const EditTitle = styled.input`
    border: none;
    color: #7a7a7a;
    font-size: 40px;
    width: 400px;
    
    :focus{
        outline: none;  
    }
`;

const Edit = styled.button`
    background: #F0F0F0;  
    border: 1px solid #F0F0F0;
    border-radius: 7px;
    color: #7A7A7A;
    min-width: 60px;
    height: 25px;  
    font-size: 14px;
    cursor: pointer;

    :focus{
        outline: none;
    }

    :hover{
        opacity: 0.7;
    }
`;

const Image = styled.div`
    width: 550px;
    height: 300px;
    background: #BFC7CE;
    margin-top: 10px;
`;

const ApplicationInfoBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 90%;

    & button{
        border: none;
        background: none;
        color: #7A7A7A;
        cursor: pointer;

        :focus{
            outline: none;
        }
    }
    
    & span{
        color: #FF4300;
        font-size: 18px;
    }

    & .applicationInfoBoxTitle {
        width: 200px;
        padding-left: 10px;
    }
    & .applicationInfoBoxDetail{
        width: 170px;
        font-size: 15px;
        padding-left: 10px;
    }  
`;

const ApplicationInfo = styled.div`
    width: 550px;
    height: 150px;
    margin-top: 20px;
    
    & .applicationMoney{
        display: flex;
        flex-direction: column;
        justify-content:flex-end;
        color: #FF4300;
        font-size: 20px;

        & input{
            border: none;
            width: 120px;
            font-size: 16px;
        }
    }

    & .needPersonnel {
        font-size: 16px;
        border: none;
        width: 50px;
    }

    & .ant-calendar-picker {
        width: 150px;

        & .ant-calendar-picker-icon {
            display: none;
        }
    }
`;

const DeadlineButton = styled.button`
    background: ${props => (props.apply ? "#F0F0F0" : "#FF4300")};
    border: ${props => (props.apply ? "#F0F0F0":"#FF4300")};
    color: ${props => (props.apply ? "#7A7A7A" : "white")};
    font-size: 15px;
    border-radius: 5px;
    box-shadow: 2px 3px 5px #BFC7CE;
    width: 120px;
    height: 30px;

    :hover {
        opacity: 0.9;
        background: ${props => (props.apply ? "#F0F0F0" : "#FF4300")};
        border: ${props => (props.apply ? "#F0F0F0":"#FF4300")};
        color: ${props => (props.apply ? "#7A7A7A" : "white")};
        cursor: pointer;
    }
    
    :focus{
        outline: none;
    }
`;

const ContentItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 25px;
    margin-top: 20px;
    width: 550px;

    & > p{
        margin-top: 10px;
        font-size: 18px;
        width: 550px;
        height: 200px;
    }

    & .map{
        width: 550px;
        height: 200px;
    }

    & > textarea {
        width: 550px;
        height: 200px;
        resize: none;
        color: #7a7a7a;
        border-color: #d9d9d9;
        ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/

        ::placeholder{
            color: #BFC7CE;
        }
    }
`;

export default PostDetail;