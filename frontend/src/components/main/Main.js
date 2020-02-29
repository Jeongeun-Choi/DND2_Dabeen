import React, { useCallback, useEffect, useState } from 'react';
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
    const { isUserResult } = useSelector(state => state.posts);
    const [selectLiveMenu, setSelectLiveMenu] = useState("errand");

    const getLivePost = useCallback((categoryNum = 1000) => () => {
        dispatch(loadLivePostRequestAction({categoryNum, location : address}));
        setSelectLiveMenu(categoryNum === 1000 ? "errand" : categoryNum === 2000 ? "rent" : "etc");
    }, [address]);
    
    useEffect(() => {
        dispatch(loadRecommendRequest({address, userNum, cookie : getCookie()}));
        dispatch(loadLivePostRequestAction({location: address, categoryNum : 1000}))
    }, [address, userNum]);

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
            <LiveHelpRequestMenuBar selectLiveMenu={selectLiveMenu}>
                <h1 className="title">{isUserResult ? "주변 실시간 도움 " : "전체 실시간 도움" }</h1>
                <div className="liveHelpRequestForm">
                    <div className="liveHelpRequest" name="errand" onClick={getLivePost(1000)}>심부름</div>
                    <div className="liveHelpRequest" name="rent" onClick={getLivePost(2000)}>대여</div>
                    <div className="liveHelpRequest" name="etc" onClick={getLivePost(3000)}>잡일</div>
                </div>
            </LiveHelpRequestMenuBar>
            <LiveHelpRequest />
            <div className="title">{sggUser ? "내 주변의 높은 평점을 가진 DaBeener를 확인하세요!" : "전체에서 높은 평점을 가진 DaBeener를 확인하세요!"}</div>
            {recommendOpponents && <MainDaBeenerProfile recommendOpponents={recommendOpponents} />}
        </MainForm>
    );
};

export default Main;