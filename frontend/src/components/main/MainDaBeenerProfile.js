import React from 'react';
import { Rate } from 'antd';
import Link from 'next/link';
import {MainDaBeenerProfileForm, MainDaBeenerProfileInfo } from './MainDaBeenerProfile.style';
import { calculateRate } from '../../utils/calculateRate';

const MainDaBeenerProfile = ({ recommendOpponents }) => {
  console.dir(recommendOpponents)
  return (
    <MainDaBeenerProfileForm>
      {recommendOpponents.map(user => (
        <Link
          href='/userpage/[usernum]/[pagename]'
          as={`/userpage/${user.userNum}/userinfo`}
          key={user.userNum}
        >
          <a>
            <MainDaBeenerProfileInfo >
              <img className="MainProfilePicture" src={user.picPath ||'/images/defaultProfile.png'} alt="유저프로필"/>
              <div className="MainProfileNickname">{user.nickname}</div>
              <div className="MainProfileId">@{user.userId}</div>
              <Rate
                allowHalf
                disabled
                defaultValue={
                  calculateRate(user.avgRate)
                }
                style={{ fontSize: 12 }}
              />
              <div className="MainProfileRateValue">{user.avgRate}</div>
            </MainDaBeenerProfileInfo>
          </a>
        </Link>
      ))}
    </MainDaBeenerProfileForm>
  );
};

export default MainDaBeenerProfile;
