import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import PostList from "../../components/posts/PostList";
import PostWrite from "../../components/posts/PostWrite";
import PostSearch from "../../components/posts/PostSearch";
import { loadHelpPostRequestAction } from "../../reducers/posts";

import { Pagination } from 'antd';
import { useSelector } from 'react-redux';

const Postmain = ({categoryNum, search}) => {
  // const categoryNum = useRouter().query.postmain; // 어떤 카테고리를 선택했는지에 대한 props
  const [postWriteVisible, setPostWriteVisible] = useState(false); // 게시글 쓰기 버튼을 클릭했을 때 Modal창 띄우기 위함
  const { totalPages } = useSelector(state => state.posts);
  // 카테고리 정한것을 바꿨을 때, postWrite이 보이는 상태이면 다시 Modal창을 닫아야함
  useEffect(() => {
    setPostWriteVisible(false);
  }, [categoryNum]);
  // postWrite Modal창을 닫을 수 있는 함수
  const setPostWriteInvisible = useCallback(e => {
    setPostWriteVisible(prev => !prev);
  }, []);
  
  const onChangePage = useCallback((page) => {
    loadHelpPostRequestAction({page, search, categoryNum});
  }, [search, categoryNum]);
  // 보고자 하는 카테고리가 바뀔 때 보여주는 Title을 결정해주는 함수
  const getTitle = useCallback(() => {
    switch (categoryNum) {
      case 1000:
        return {
          mainTitle: "심부름",
          subTitle: "간단한 심부름을 도와주세요!"
        };
      case 2000:
        return {
          mainTitle: "대여",
          subTitle: "물건을 잠시 맡겨보아요!"
        };
      case 3000:
        return {
          mainTitle: "잡일",
          subTitle: "부족한 일손을 채워보아요!"
        };
      default:
        return {
          mainTitle: "",
          subTitle: ""
        };
    }
  }, [categoryNum]);

  return (
    <PostUpperDiv>
      <div className="postmainWrapper">
        <div className="postmainTitle">
          <div className="postmainTitleMain">{getTitle().mainTitle}</div>
          <div className="postmainTitleSub">{getTitle().subTitle}</div>
        </div>
        <PostSearch categoryNum={categoryNum} />
        <div className="postmainContent">
          <PostList categoryNum={categoryNum} />
        </div>
        <div
          className="postmainWrite"
          onClick={useCallback(e => {
            setPostWriteVisible(true);
          }, [])}
        >
          <img
            className="postmainWriteIcon"
            alt="writePost"
            src={"/images/postIcon.PNG"}
          />
        </div>
        {postWriteVisible ? (
          <PostWrite setInvisible={setPostWriteInvisible} />
        ) : null}
      </div>
      <Pagination defaultCurrent={1} onChange={onChangePage} total={totalPages}/>
    </PostUpperDiv>
  );
};

const PostUpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & i, span {
    z-index : 0;
  }
  & .postmainWrapper {
    width: 100%;
    max-width: 1200px;
    min-width: 320px;
    padding: 0 10px;
  }
  & .postmainTitle {
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 0 10px;
    & .postmainTitleMain {
      min-width: 100px;
      font-size: 50px;
    }
    & .postmainTitleSub {
      padding-left: 10px;
      font-size: 28px;
    }
  }
  & .postmainSearch {
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    background: #f0f0f0;
    font-size: 18px;
  }
  & .postmainContent {
    padding: 0 10px;
  }
  & .postmainWrite {
    & .postmainWriteIcon {
      width: 86px;
      cursor: pointer;
    }
    position: fixed;
    right: 57px;
    bottom: 100px;
    & .postmainWriteModal {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.65);
      z-index: 3;
    }
  }
  & .ant-pagination {
      & li:hover {
        border : 1px solid #ff4300;
        & a {
          color : #ff4300;
        }
      }
      & .ant-pagination-item-active {
        border-color : #ff4300;
        & a {
          color : #ff4300;
        }
      }
      & li[title*="Pages"] {
        &:hover {
          border : none;
        }
        & * {
          color : darkgrey;
        }  
      }
    }
   
`;

Postmain.getInitialProps = async context => {
  const {postmain, search} = context.query; // 서치를 검색할 때 쓴다.
  let categoryNum = postmain ==="errand" ? 1000 : postmain === "rental" ? 2000 : 3000;
  context.store.dispatch(loadHelpPostRequestAction({categoryNum, search, page:1}));

  // 처음 들어가자마자 있어야 하는 정보들을 가지고 온다.
  // 여기에는 위에 주소마다 다르게 dispatch를 해야할 듯.
  // 처음 들어가자마자 있어야 하는 정보들은 여기서 아니면 useEffect 같은 곳에서
  // 리덕스 말고 다른 정보를 props로 주려면
  return {categoryNum, search}
};

export default Postmain;
