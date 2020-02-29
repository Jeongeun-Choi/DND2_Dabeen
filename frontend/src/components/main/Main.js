import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'antd';
import LiveHelpRequest from './LiveHelpRequest';
import MainDaBeenerProfile from './MainDaBeenerProfile';
import { loadLivePostRequestAction } from '../../reducers/posts';
import {LiveHelpRequestMenuBar, MainForm} from './Main.style';
import { loadRecommendRequest } from '../../reducers/opponent';
import { getCookie } from '../../utils/cookieFunction';

const image = ['main1.jpg', 'main2.jpg', 'main3.jpg', 'main4.jpg'];
const Main = () => {
    const dispatch = useDispatch();
    const { me : { address, userNum }} = useSelector(state => state.user);
    const { recommendOpponents, sggUser } = useSelector(state => state.opponent);

    const getLivePost = useCallback((categoryNum = 1000) => () => {
        dispatch(loadLivePostRequestAction(categoryNum));
    }, []);
    
    useEffect(() => {
        dispatch(loadRecommendRequest({address, userNum, cookie : getCookie()}));
        dispatch(loadLivePostRequestAction(address))
    }, [address, userNum]);

    return (
        <MainForm>
            <Carousel autoplay dots>
                {image.map(img => (
                        <img key={img} src={`/images/${img}`} alt={img}/>
                ))}
            </Carousel>
            <LiveHelpRequestMenuBar>
                <div className="title">실시간 도움 요청</div>
                <div className="liveHelpRequestForm">
                    <div className="liveHelpRequest" onClick={getLivePost(1000)}>심부름</div>
                    <div className="liveHelpRequest" onClick={getLivePost(2000)}>대여</div>
                    <div className="liveHelpRequest" onClick={getLivePost(3000)}>잡일</div>
                </div>
            </LiveHelpRequestMenuBar>
            <LiveHelpRequest />
            <div className="title">{sggUser ? "내 주변의 높은 평점을 가진 DaBeener를 확인하세요!" : "전체에서 높은 평점을 가진 DaBeener를 확인하세요!"}</div>
            {recommendOpponents && <MainDaBeenerProfile recommendOpponents={recommendOpponents} />}
        </MainForm>
    );
};

export default Main;