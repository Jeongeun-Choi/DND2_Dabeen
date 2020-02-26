import React, { useState, useCallback, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import { Select,  DatePicker, TimePicker, Icon, Button, Form, message } from 'antd';
import SearchJuso from '../map/SearchJuso';
import inputChangeHook from '../../hooks/inputChangeHook';
import { addHelpPostRequestAction } from '../../reducers/posts';
import axios from 'axios';
import moment from 'moment';

const categorys = {
    "심부름": "1000",
    "대여": "2000",
    "잡일": "3000"
} //카테고리

// const categorys = ["심부름", "대"]

const PostWrite = ({setInvisible, userNum}) => {
    const [postTitle, onChangePostTitle] = inputChangeHook(''); //게시글 제목
    const [category, setCategory] = useState('');
    const [helpDeadlineDate, setHelpDeadlineDate] = useState(''); //신청 마감 날짜
    const [helpDeadlineTime, setHelpDeadlineTime] = useState(''); //신청 마감 시간
    const [helpExecDate, setHelpExecDate] = useState('');   //수행 날짜
    const [helpExecTime, setHelpExecTime] = useState('');   //수행 시간
    const [needPersonnel, onChangeNeedPersonnel] = inputChangeHook(0);  //필요 인원
    const [money, onChangeMoney] = inputChangeHook(0);  //금액
    const [location, setLocation] = useState('');   //이행위치
    const [sigungu, setSigungu] = useState('');     //이행시군구명
    const [content, onChangeContent] = inputChangeHook('');   //요구사항
    const [images, setImages] = useState([]);       //도움 이미지
    // const [urls, setUrls] = useState([]);           //도움 이미지 미리보기 위한 url
    const {imagePaths} = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const imageInput = useRef();
    // const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    // const time = new Date(Date.now() - timezoneOffset);
    const time = moment();
    console.log(time.format('YYYY-MM-DDTHH:mm:ss'));
    const getCategory = useCallback(category => {
        // console.log(result);
        setCategory(categorys[category]);
    }, []);

    const onChangeHelpPicker = setStateFunc =>
    useCallback((moment, string) => {
      setStateFunc(string);
    }, []);

    const getLocation = useCallback((fullAddress, sigunguName) => {
        setLocation(fullAddress);
        setSigungu(sigunguName);
    }, []);
    
    //게시글 업로드
    const addPost = useCallback((e) => {
        e.preventDefault();
        if(!postTitle || !postTitle.trim()){
            message.error('제목을 입력해주세요!');
        } 
        dispatch(addHelpPostRequestAction({
            // todayDate: time.toISOString().split('.')[0],
            todayDate: time.format('YYYY-MM-DD HH:mm:ss'),
            userNum: userNum,
            postName: postTitle,
            category: category,
            helpDeadline: helpDeadlineDate.concat('T' + helpDeadlineTime),
            helpExec: helpExecDate.concat('T' + helpExecTime),
            postNum: parseInt(needPersonnel),
            price: parseInt(money),
            execLoc: location,
            sigungu: sigungu,
            content: content
        }));
        setInvisible();
    }, [time, userNum, postTitle, category, helpDeadlineDate, helpDeadlineTime, helpExecDate, helpExecTime, needPersonnel, money, location, sigungu, content]);

    //이미지 삭제
    // const deleteImage = useCallback(key => e =>{
    //     setUrls(urls.filter(url => url.key !== key));
    //     setImages(images.filter(image => image.key !== key));
    // }, [urls, images]);

    const onChangeImages = useCallback(async (e) => {
        const imageFormData = new FormData();
        console.log(e.target.files[0]);
        imageFormData.append('pic', e.target.files[0]);
        console.log(imageFormData.get('pic'));
        try{
            const result = await axios.post('/pic/upload/help', imageFormData);
            console.log(result);
            setImages(prev => [...prev, result.data.data]);
        }catch(e){
            console.log(e.response);
        }
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    return (
        <Modal>
            <Form onSubmit={addPost} style={{width: "50%", maxWidth: 600, minWidth: 300}} encType="multipart/form-data">
                <Content>
                    <Title>
                        <InputTitle placeholder="제목을 입력하세요." value={postTitle} onChange={onChangePostTitle}/> {/*input 쓰삼 */}
                        <Icon onClick={setInvisible} type="close" style={{fontSize: 35, color:"#BFC7CE", marginRight: 10}}/>
                    </Title>
                    <PostSetting>
                        <PostSettingBox>
                            <div className="postSettingTitle">카테고리</div>
                            <Select className="postSettingSelect" placeholder="Category" onChange={getCategory}>
                                {Object.keys(categorys).map((_category) => <Select.Option value={_category} key={_category}>{_category}</Select.Option>)}
                            </Select>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">신청 마감 일시</div>
                            <div className="postSettingGetData">
                                <DatePicker className="postSettingDatePicker" format="YYYY-MM-DD"style={{marginRight: 5}}  onChange={onChangeHelpPicker(setHelpDeadlineDate)}/>
                                <TimePicker className="postSettingTimePicker" format="HH:mm:ss" onChange={onChangeHelpPicker(setHelpDeadlineTime)}/>
                            </div>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">수행 일시</div>
                            <div className="postSettingGetData">
                                <DatePicker className="postSettingDatePicker" format="YYYY-MM-DD" style={{marginRight: 5}} onChange={onChangeHelpPicker(setHelpExecDate)}/>
                                <TimePicker className="postSettingTimePicker" format="HH:mm:ss" onChange={onChangeHelpPicker(setHelpExecTime)}/>
                            </div>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">필요인원</div>
                            <input className="postSettingInput" type="number" value={needPersonnel} onChange={onChangeNeedPersonnel}/>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">금액</div>
                            <input className="postSettingInput" type="number" placeholder="최소 금액 0000원" value={money} onChange={onChangeMoney}/>
                        </PostSettingBox>
                    </PostSetting>
                    <ContentItem>
                        <div>위치</div>  
                        <SearchJuso location={location} getLocation={getLocation}/>
                    </ContentItem>
                    <ContentItem>
                        <div>요구사항</div>
                        <textarea placeholder="요구사항을 입력하세요." required  value={content} onChange={onChangeContent}/>
                    </ContentItem>
                    <UploadImage>
                        <div>사진첨부</div>
                            <input type="file"  hidden ref={imageInput} onChange={onChangeImages}/>
                            <Button onClick={onClickImageUpload}><Icon type="upload" />Upload</Button>
                            <div className="previewImage">
                                {images.map((v, i) => {
                                    return (
                                    <div key={v} className="imgBorder"> 
                                    <div className="deleteIcon">
                                        <Icon type="close" />
                                    </div>
                                    <img src={`/pic/upload/help`} alt={v}/> 
                                    </div>
                                    )
                                })}
                            </div>
                        {/* <Upload urls={urls} images={images} getUrls={setUrls} getImages={setImages}/> */}
                        {/* <div className="previewImage">
                            {images.length !== 0 ? 
                                urls.map((url, i) => {
                                    return(
                                    <div className="imgBorder"><div className="deleteIcon"><Icon type="close" onClick={deleteImage(url.key)}/></div><img src={url.url} key={i} alt="미리보기"/></div>
                                    )
                                }) : <></>}
                        </div> */}
                    </UploadImage>
                    <div style={{height:"auto"}}>    
                    <UploadButton htmlType="submit">글 올리기</UploadButton>     
                    </div>
                </Content>                  
            </Form>
        </Modal>
    );
};

const Modal = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.25);
    overflow: auto;
    /* ::-webkit-scrollbar{display:none;}  스크롤바 안보이게 */
`;

const Content = styled.div`
    width: 100%;
    max-width: 600px;
    min-width: 300px;
    padding: 30px;
    margin: 60px 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 20px;
    color: #424242;
    background: white;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 550px;
    min-width: 250px;
    font-size: 40px;
    margin-bottom: 20px;
`;

const PostSetting = styled.div`
    width: 100%;
    max-width: 550px;
    min-width: 230px;
    padding: 10px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;

    border-radius: 8px;
    background: #F0F0F0;
    font-size: 20px;
`;

const PostSettingBox = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 550px;
    min-width: 230px;

    & .postSettingTitle {
        min-width: 160px;
    }
    & .postSettingSelect{
        width: 130px;
    }
    & .ant-select-arrow{
        color: #FF4300;
    }
    & .ant-calendar-picker-icon{
        color: #FF4300;
    }

    & .ant-time-picker-clock-icon{
        color: #FF4300; 
    }
    & .postSettingGetData{
        display: flex;
    }
    & .postSettingDatePicker{
        width: 100%;
        min-width: 100px;
        max-width: 130px;
    }
    & .postSettingTimePicker{
        width: 100%;
        min-width: 90px;
        max-width: 120px;
        margin-left: 10px;
    }
    & .postSettingInput{
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        width: 100%;
        min-width: 100px;
        max-width: 130px;
        height: 32px;
        padding-left: 2px;
        font-size: 15px;
        color: #7a7a7a;
        :hover{
            border-color: #40a9ff;
        }
        :focus{
            outline: none;
        }
        ::placeholder{
            color: #BFC7CE;
        }
    }
    /* input type="number"일 경우 생기는 화살표 제거 */
    & input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const InputTitle = styled.input`
    border: none;
    color: #7a7a7a;
    font-size: 40px;
    width: 100%;
    max-width: 400px;
    min-width: 250px;
    ::placeholder{
        color: #BFC7CE;
    }

    :focus{
        outline: none;  
    }
`;

const ContentItem = styled.div`
    width: 100%;
    max-width: 550px;
    min-width: 250px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 25px;

    & > textarea {
        width: 100%;
        max-width: 550px;
        min-width: 250px;
        height: 200px;
        resize: none;
        color: #7a7a7a;
        border-color: #d9d9d9;
        border-radius: 8px;
        font-size: 20px;
        ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/

        ::placeholder{
            color: #BFC7CE;
        }
    }
`;

const UploadImage = styled.div`
    width: 100%;
    max-width: 550px;
    min-width: 250px;
    font-size: 25px;

    & .uploadImage {
        font-size: 16px;
        border: 1px solid #BFC7CE;
        border-radius: 5px;
        padding: 5px;
        width: 100px;
        height: 20px;
        cursor: pointer;
    }
    & input[type="file"] {
        position:absolute;
        width:1px;
        height:1px;
        padding:0;
        margin:-1px;
        overflow:hidden;
        clip:rect(0,0,0,0);
        border:0;
    }

    & .previewImage {
        display: flex;
        margin-top: 1vh;

        & .imgBorder{
            width: 100px;
            height: 100px;
            border: 1px solid #BFC7CE;
            border-radius: 4px;
            margin-right: 10px;

            & .deleteIcon{
                font-size: 12px;
                text-align: right;
                margin-left: 5px;
            }
        }

        & img{
            margin-left: 15px;
            margin-bottom: 10px;
            width: 70px;
            height: 70px;
        }
    }
`;

const UploadButton = styled(Button)`
    width: 200px;
    height: 45px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #FF4300;
    border: #FF4300;
    color: white;
    font-size: 20px;
    box-shadow: 2px 3px 5px #BFC7CE;

    :hover {
        opacity: 0.9;
        background: #FF4300;
        border: #FF4300;
        color: white;
    }

    :focus{
        background: #FF9644;
        border: #FF9644;
        color: white;
    }
`;

export default PostWrite;