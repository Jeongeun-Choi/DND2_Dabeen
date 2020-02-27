import React, { useCallback, useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Icon, TimePicker, DatePicker, Popconfirm, Row, Col } from 'antd';
import CheckDabeener from './CheckDabeener';
import MyLocation from '../map/MyLocation';
import inputChangeHook from '../../hooks/inputChangeHook';
import moment from 'moment';
import SearchJuso from '../map/SearchJuso';
import {Modal, Icons, Content, Title, ApplyCheck, EditTitle, Edit, Image, ApplicationInfo, DeadlineButton, ContentItem, ApplicationInfoBox} from './PostDetail.style';

// 내가 쓴 글 / 아닌 글 구분해야함
const PostDetail = ({setVisible, data}) => {
    //수행일시랑 마감일시 날짜랑 시간 잘라야함
    //임시로 내가 쓴 글이라고 설정
    const helpExec = data.helpExec.split('T');     // helpExec[0]=날짜 / helpExec[1]=시간
    const helpDeadline = data.helpDeadline.split('T');  // helpDeadline[0]=날짜 / helpDeadline[1]=시간
    const [click, setClick] = useState(false);
    const [edit, setEdit] = useState(false);    //Edit 버튼 눌렀을 때 편집 모드로 바뀜
    const [editTitle, setEditTitle] = inputChangeHook(data.postName);
    const [editHelpExecDate, setEditHelpExecDate] = useState(helpExec[0]);
    const [editHelpExecTime, setEditHelpExecTime] = useState(helpExec[1]);
    const [editHelpDeadLineDate, setEditHelpDeadLineDate] = useState(helpDeadline[0]);
    const [editHelpDeadLineTime, setEditHelpDeadLineTime] = useState(helpDeadline[1]);
    const [editNeedPersonnel, setEditNeedPersonnel] = useState('');
    const [editPrice, setEditPrice] = inputChangeHook(data.price);
    const [editExecLoc, setEditExecLoc] = useState(data.execLoc);
    const [editContent, setEditContent] = inputChangeHook(data.content);
    const dateFormat = 'YYYY-MM-DD';
    const timeFormat = 'hh:mm'

    //신청 다비너 창 여닫을떄
    const onModal = useCallback(() => {
        setClick(prev => !prev);
    }, []);

    //수정 완료 버튼 눌렀을 때
    const onConfirm = useCallback(() => {
        //dispatch 수정 정보들
        setEdit(prev => !prev);
    }, []);

    //Picker들 수정할 때 
    const onChangeHelpPicker = setStateFunc =>
    useCallback((moment, string) => {
      setStateFunc(string);
    }, []);

    //게시글 삭제 버튼 눌렀을 때
    const deletePost = useCallback((id) => () => {
        dispatch(removeHelpPostRequestAction(id));
    }, []);

    return (
        <Modal>
            <div>
            <Content>
                <Title>
                    <div className="TitleWrapper">
                        {
                        !edit ? 
                        <div className="postTitle">
                            <div>{data.postName}</div>
                            {
                                data.isHelpApprove ? 
                                <ApplyCheck apply>마감</ApplyCheck>:
                                <ApplyCheck>신청 중</ApplyCheck>     
                            }
                        </div>
                        : 
                        <EditTitle value={editTitle} onChange={setEditTitle}/>
                        }
                        <Icons>
                            {edit&&
                            <>
                            <Popconfirm placement="bottom" title="수정을 그만두시겠습니까?" onConfirm={useCallback(()=>{setEdit(prev => !prev)}, [])} onCancel={edit} okText="네" cancelText="아니요">
                            <Icon type="rollback" style={{marginRight: 10, color: "#7A7A7A"}}/>
                            </Popconfirm>
                            <Popconfirm placement="bottom" title="정말 삭제하시겠습니까?" onConfirm={deletePost(data.id)} onCancel={edit} okText="네" cancelText="아니요">
                            <Icon type="delete" style={{marginRight: 10}} onClick={deletePost}/>
                            </Popconfirm>
                            </>
                            }
                            <Icon onClick={setVisible} type="close"/>
                        </Icons>
                    </div>
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
                        <Col span={20}>
                            <ApplicationInfoBox>
                            <div className="applicationInfoBoxTitle">신청인원</div>
                            { !edit ?
                                <>
                                <div style={{display: "flex"}} className="applicationInfoBoxDetail"><div><span style={{fontSize: 18, color: "#FF4300"}}>0</span>/{data.needPersonnel}</div><button className="applyCheck" onClick={onModal}>신청 확인</button></div>      
                                {click &&<CheckDabeener click ={click} onModal ={onModal} needPersonnel={data.needPersonnel} applyCheck={data.isHelpApprove}/>}
                                </>
                                :
                                <div style ={{display:"flex"}}><div><span style={{fontSize: 18, color: "#FF4300"}}>0</span>/<input className ="needPersonnel" value={editNeedPersonnel} onChange={setEditNeedPersonnel}/></div></div>
                            }
                            </ApplicationInfoBox>
                            <ApplicationInfoBox>
                            <div className="applicationInfoBoxTitle">신청 마감 일시</div>
                            {
                                !edit ?
                                <div className="applicationInfoBoxDetail">{data.helpDeadline}</div>
                                : 
                                <>
                                <DatePicker defaultValue ={moment(helpDeadline[0], dateFormat)} onChange={onChangeHelpPicker(setEditHelpDeadLineDate)}/>
                                <TimePicker defaultValue={moment(helpDeadline[1], timeFormat)} onChange={onChangeHelpPicker(setEditHelpDeadLineTime)}/>
                                </>
                            }
                            </ApplicationInfoBox>
                            <ApplicationInfoBox>
                            <div className="applicationInfoBoxTitle">수행 일시</div>
                            {
                                !edit ?
                                <div className="applicationInfoBoxDetail">{data.helpExec}</div>
                                :
                                <>
                                <DatePicker defaultValue ={moment(helpExec[0] ,dateFormat)} onChange={onChangeHelpPicker(setEditHelpExecDate)}/>
                                <TimePicker defaultValue ={moment(helpExec[1], timeFormat)} onChange={onChangeHelpPicker(setEditHelpExecTime)} />
                                </>
                            }
                            </ApplicationInfoBox>
                        </Col>
                        <Col span={4}>
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
            </div>
        </Modal>
    );
};

export default PostDetail;