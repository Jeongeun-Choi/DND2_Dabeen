import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'antd';
import LiveHelpRequest from './LiveHelpRequest';
import MainDaBeenerProfile from './MainDaBeenerProfile';
import { loadLivePostRequestAction } from '../../reducers/posts';
import {LiveHelpRequestMenuBar, MainForm} from './Main.style';

const image = ['main1.jpg', 'main2.jpg', 'main3.jpg', 'main4.jpg'];
const Main = () => {
    const dispatch = useDispatch();
    // const { me : { address }} = useSelector(state => state.user);
    const { recommendOpponents } = useSelector(state => state.opponent);
    const getLivePost = useCallback((categoryNum = 1000) => () => {
        dispatch(loadLivePostRequestAction(categoryNum));
    }, []);
    // useEffect(() => {
    //     dispatch(loadRecommendRequest(address));
    //     getLivePost()();
    // }, []);
    


    return (
        <MainForm>
            {/* <div className = "mainImage"> 다빈 소개글 적는 부분 */}
                {/* <div style={{fontSize:"40px"}}>DaBeen</div>
                <p>
                    대충 우리 사이트 설명 어쩌고 저쩌고 다빈이라는 이름 예쁘다
                    나는 딸 가지면 이름을 아영이로 짓고싶다 ^^!
                    <br />
                    배경은 사진 넣으면됩니당.
                </p> */}
                <Carousel autoplay dots>
                    {image.map(img => (
                            <img key={img} src={`/images/${img}`} alt={img}/>
                    ))}
                </Carousel>
            {/* </div> */}
            <LiveHelpRequestMenuBar>
                <div className="title">실시간 도움 요청</div>
                <div className="liveHelpRequestForm">
                    <div className="liveHelpRequest" onClick={getLivePost(1000)}>심부름</div>
                    <div className="liveHelpRequest" onClick={getLivePost(2000)}>대여</div>
                    <div className="liveHelpRequest" onClick={getLivePost(3000)}>잡일</div>
                </div>
            </LiveHelpRequestMenuBar>
            <LiveHelpRequest />
            <div className="title">내 주변의 높은 평점을 가진 DaBeener를 확인하세요!</div>
            {recommendOpponents && <MainDaBeenerProfile recommendOpponents={recommendOpponents} />}
        </MainForm>
    );
};

export default Main;