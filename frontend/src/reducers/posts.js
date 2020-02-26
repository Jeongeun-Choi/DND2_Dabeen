import produce from "immer";
import { createAction } from "./actionFunction";

const dummyHelpPost = {
  transactionTime: "", // 통신시간
  resultCode: "", // 응답코드
  description: "", // 비고
  data: [
    {
      help_title: "이런, 튼튼한 오함마",
      help_num: "1", // 도움번호
      help_post_dttm: "", // 도움게시일시
      cat_num: "1", // 카테고리번호
      price: "2000", // 금액
      cont: "오함마 내놔", // 내용
      cnsr_num: "12", // 수요자번호
      user_name: "표석훈", // 사용자명
      address: "", // 주소
      phone_num: "01011010100", // 휴대폰번호
      id: "ironman", // 아이디
      email: "", // 이메일
      nickname: "순살치킨", // 닉네임
      pic_path: "", // 사진경로명
      help_aply_cls_dttm: "2002/02/02", // 도움신청마감일시
      help_aprv_whet: "false", // 도움승인여부
      post_num: "3", // 선호공급자수
      post_type: "", // 선호도움이행일시
      exec_loc: "", // 이행장소
      help_pic_list: "" // 도움사진목록
    }
  ]
};

const dummyHelpPost2 = {
  helpPosts: [
    {
      helpNum: 1, // 도움번호
      helpTitle: "이런, 튼튼한 오함마",
      helpPostDate: "2020-02-02 10:30", // 도움게시일시
      cat_num: 1, // 카테고리번호
      price: 2000, // 금액
      content: "오함마 내놔", // 내용
      userNum: 12, // 수요자번호
      userName: "표석훈", // 사용자명
      address: "부산광역시 대연동", // 주소
      phoneNum: "01011010100", // 휴대폰번호
      id: "ironman", // 아이디
      email: "ans@naver.com", // 이메일
      nickname: "순살치킨", // 닉네임
      picPath: "", // 사진경로명
      helpDeadLine: "2002/02/02", // 도움신청마감일시
      isHelpApprove: false, // 도움승인여부
      postNum: 3, // 선호공급자수
      helpExecDate: "", // 선호도움이행일시
      execLoc: "", // 이행장소
      helpPicList: "" // 도움사진목록,
    },
    {
      helpNum: 2, // 도움번호
      helpTitle: "오바바마마",
      helpPostDate: "2020-02-02 10:30", // 도움게시일시
      cat_num: 2, // 카테고리번호
      price: 2000, // 금액
      content: "ㅇㅅㅇㅅㅇ", // 내용
      userNum: 13, // 수요자번호
      userName: "문건우", // 사용자명
      address: "경남 창원시 도계동", // 주소
      phoneNum: "0101101010", // 휴대폰번호
      id: "superman", // 아이디
      email: "ans123@naver.com", // 이메일
      nickname: "간장치킨", // 닉네임
      picPath: "", // 사진경로명
      helpDeadLine: "2002/02/02", // 도움신청마감일시
      isHelpApprove: false, // 도움승인여부
      postNum: 4, // 선호공급자수
      helpExecDate: "", // 선호도움이행일시
      execLoc: "", // 이행장소
      helpPicList: "" // 도움사진목록,
    },
    {
      helpNum: 3, // 도움번호
      helpTitle: "아ㅏㅏㅏㅏ 귀찮다ㅏㅏㅏㅏ",
      helpPostDate: "2020-02-02 10:30", // 도움게시일시
      cat_num: 3, // 카테고리번호
      price: 3000, // 금액
      content: "자전거 빌려주세요", // 내용
      userNum: 15, // 수요자번호
      userName: "최정은", // 사용자명
      address: "경남 창원시 팔용동", // 주소
      phoneNum: "01011010100", // 휴대폰번호
      id: "black widow", // 아이디
      email: "chi@naver.com", // 이메일
      nickname: "양념치킨", // 닉네임
      picPath: "", // 사진경로명
      helpDeadLine: "2002/02/02", // 도움신청마감일시
      isHelpApprove: false, // 도움승인여부
      postNum: 5, // 선호공급자수
      helpExecDate: "", // 선호도움이행일시
      execLoc: "", // 이행장소
      helpPicList: "" // 도움사진목록,
    }
  ]
};
const dummyUserHelpPost = {
  transaction_time: "2020-02-23T01:21:12.2801793",
  result_code: 200,
  description: "OK",
  data: [
      {
          help_num: "2002130003",
          help_pstn_dttm: "2020-02-15T12:57:54",
          cat_num: "1000",
          cnsr_num: "2002160001",
          title: "title",
          exec_loc: "서울특별시",
          price: 10000000,
          pref_suppl_num: 10,
          pref_help_exec_dttm: "2020-02-15T12:57:54",
          help_aply_cls_dttm: "2020-02-15T12:57:54",
          cont: "Contents",
          help_aprv_whet: "n",
          exec_sgg_name: "성북구"
      },
      {
          help_num: "2002160001",
          help_pstn_dttm: "2020-02-16T12:38:17",
          cat_num: "1000",
          cnsr_num: "2002160001",
          title: "title",
          exec_loc: "서울특별시",
          price: 10000000,
          pref_suppl_num: 10,
          pref_help_exec_dttm: "2020-02-16T12:38:17",
          help_aply_cls_dttm: "2020-02-16T12:38:17",
          cont: "Contents",
          help_aprv_whet: "n",
          exec_sgg_name: "성북구"
      }
  ]
}

export const initialState = {
  livePosts : [],
  helpPosts : [], //  작성한 도움
  // helpPosts: [
  //   {
  //     id: 1,
  //     helpPostDate: "2020-02-24 11:23:13",
  //     postName: "망치 빌려주세요.", //게시글 제목
  //     category: "심부름", //카테고리
  //     helpDeadline: "2020-02-24 23:23:10",  // 마감 일시
  //     helpExec: "2020-03-08 14:06:19", // 수행 일시
  //     needPersonnel: 3, //필요 인원
  //     price: 3000, //금액
  //     execLoc: "경남 창원시 의창구 남산로 20", //이행 위치
  //     sigungu: "의창구", //이행 시군구
  //     content: "열정페이로 일하실분 우대합니다!", //요구사항
  //   }
  // ],
  imagePaths: [], //사진 첨부, 여러개 올릴 수 있음
  totalPages : 1,
  helpsPerPage : 0,
  totalHelps : 0,

  userPosts: [],  // 유저가 작성한 도움

  isLoadingHelpPost: false,
  loadHelpPostErrorReason: "false",
  helpPostLoaded: false,
  // maxId: 1,
  addHelpPostErrorReason: "", //도움 게시글 업로드 실패 사유
  isAddingHelpPost: false, //도움 게시글 업로드 중
  helpPostAdded: false, //도움 게시글 업로드 성공
  updateHelpPostErrorReason: "", //도움 게시글 수정 실패 사유
  isUpdatingHelpPost: false, //도움 게시글 수정 중
  helpPostUpdated: false, //도움 게시글 수정 성공
  removeHelpPostErrorReason: "", //도움 게시글 삭제 실패 사유
  isRemovingHelpPost: false, //도움 게시글 삭제 중
  helpPostRemoved: false, //도움 게시글 삭제 성공
  isLoadingUserPost: false,
  loadUserPostErrorReason: "false",
  userPostLoaded: false,
};
// 실시간 도움 요청
export const LOAD_LIVEPOST_REQUEST = "LOAD_LIVEPOST_REQUEST";
export const LOAD_LIVEPOST_SUCCESS = "LOAD_LIVEPOST_SUCCESS";
export const LOAD_LIVEPOST_FAILURE = "LOAD_LIVEPOST_FAILURE";

export const LOAD_HELPPOST_REQUEST = "LOAD_HELPPOST_REQUEST";
export const LOAD_HELPPOST_SUCCESS = "LOAD_HELPPOST_SUCCESS";
export const LOAD_HELPPOST_FAILURE = "LOAD_HELPPOST_FAILURE";

export const ADD_HELPPOST_REQUEST = "ADD_HELPPOST_REQUEST";
export const ADD_HELPPOST_SUCCESS = "ADD_HELPPOST_SUCCESS";
export const ADD_HELPPOST_FAILURE = "ADD_HELPPOST_FAILURE";

export const UPDATE_HELPPOST_REQUEST = "UPDATE_HELPPOST_REQUEST";
export const UPDATE_HELPPOST_SUCCESS = "UPDATE_HELPPOST_SUCCESS";
export const UPDATE_HELPPOST_FAILURE = "UPDATE_HELPPOST_FAILURE";

export const REMOVE_HELPPOST_REQUEST = "REMOVE_HELPPOST_REQUEST";
export const REMOVE_HELPPOST_SUCCESS = "REMOVE_HELPPOST_SUCCESS";
export const REMOVE_HELPPOST_FAILURE = "REMOVE_HELPPOST_FAILURE";

export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";

export const LOAD_USERPOST_REQUEST = "LOAD_USERPOST_REQUEST";
export const LOAD_USERPOST_SUCCESS = "LOAD_USERPOST_SUCCESS";
export const LOAD_USERPOST_FAILURE = "LOAD_USERPOST_FAILURE";

export const loadLivePostRequestAction = createAction(LOAD_LIVEPOST_REQUEST);
export const loadLivePostSuccessAction = createAction(LOAD_LIVEPOST_SUCCESS);
export const loadLivePostFailureAction = createAction(LOAD_LIVEPOST_FAILURE);

export const loadHelpPostRequestAction = createAction(LOAD_HELPPOST_REQUEST);
export const loadHelpPostSuccessAction = createAction(LOAD_HELPPOST_SUCCESS);
export const loadHelpPostFailureAction = createAction(LOAD_HELPPOST_FAILURE);

export const addHelpPostRequestAction = createAction(ADD_HELPPOST_REQUEST);
export const addHelpPostSuccessAction = createAction(ADD_HELPPOST_SUCCESS);
export const addHelpPostFailureAction = createAction(ADD_HELPPOST_FAILURE);

export const updateHelpPostRequestAction = createAction(
  UPDATE_HELPPOST_REQUEST
);
export const updateHelpPostSuccessAction = createAction(
  UPDATE_HELPPOST_SUCCESS
);
export const updateHelpPostFailureAction = createAction(
  UPDATE_HELPPOST_FAILURE
);

export const removeHelpPostRequestAction = createAction(
  REMOVE_HELPPOST_REQUEST
);
export const removeHelpPostSuccessAction = createAction(
  REMOVE_HELPPOST_SUCCESS
);
export const removeHelpPostFailureAction = createAction(
  REMOVE_HELPPOST_FAILURE
);

export const uploadImageRequestAction = createAction(UPLOAD_IMAGE_REQUEST);
export const uploadImageSuccessAction = createAction(UPLOAD_IMAGE_SUCCESS);
export const uploadImageFailureAction = createAction(UPLOAD_IMAGE_FAILURE);

export const loadUserPostRequestAction = createAction(LOAD_USERPOST_REQUEST);
export const loadUserPostSuccessAction = createAction(LOAD_USERPOST_SUCCESS);
export const loadUserPostFailureAction = createAction(LOAD_USERPOST_FAILURE);

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_HELPPOST_REQUEST: {
        draft.isLoadingHelpPost = true;
        draft.loadHelpPostErrorReason = "";
        draft.helpPostLoaded = false;
        break;
      }
      case LOAD_HELPPOST_SUCCESS: {
        draft.isLoadingHelpPost = false; // 뭐 여러개의 포스트를 불러와서 넣을거임
        draft.helpPosts = dummyHelpPost2.helpPosts; // 일단 더미를 준다!
        draft.helpPosts = action.data.map(post => ({
          helpNum: post.help_num, // 도움번호
          helpTitle: post.title,
          helpPostDate: post.help_pstn_dttm, // 도움게시일시
          categoryNum: post.cat_num, // 카테고리번호
          price: post.price, // 금액
          content: post.cont, // 내용
          userNum: post.user_num,// 수요자번호
          userName: post.user_name, // 사용자명
          address: post.address, // 주소
          phoneNumber: post.phone_num, // 휴대폰번호
          userId: post.user_id, // 아이디
          email: post.email, // 이메일
          nickname: post.nickname, // 닉네임
          picPath: post.pic_path, // 사진경로명
          helpDeadLine: post.help_aply_cls_dttm, // 도움신청마감일시
          isHelpApprove: post.help_aprv_whet, // 도움승인여부
          postNum: post.pref_suppl_num, // 선호공급자수
          helpExecDate: post.pref_help_exec_dttm, // 선호도움이행일시
          location: post.exec_loc, // 이행장소
          helpPicList: '' // 도움사진목록,
        }));
        draft.totalHelps = action.data.total_helps;
        draft.totalPages = action.data.total_pages;
        draft.helpsPerPage = action.data.helps_per_page;
        draft.helpPostLoaded = true; // 추가 다 됨.
        break;
      }
      case LOAD_HELPPOST_FAILURE: {
        draft.isLoadingHelpPost = false;
        draft.loadHelpPostErrorReason = action.data.error;
        break;
      }
      case ADD_HELPPOST_REQUEST: {
        draft.isAddingHelpPost = true;
        draft.addHelpPostErrorReason = "";
        draft.helpPostAdded = false;
        break;
      }
      case ADD_HELPPOST_SUCCESS: {
        draft.isAddingHelpPost = false;
        draft.helpPosts = action.data.map(post => ({
          helpNum: post.help_num,
          helpPostDate: post.help_pstn_dttm,
          categoryNum: post.cat_num,
          userNum: post.cnsr_num,
          helpTitle: post.title,
          execLoc: post.exec_loc,
          price: post.price,
          postNum: post.pref_suppl_num,  //선호 공급자수
          helpDeadLine: post.pref_help_exec_dttm, //신청 마감일
          helpExec: post.help_aply_cls_dttm,
          content: post.cont, 
          isHelpApprove: post.help_aprv_whet,
          sigungu: post.exec_sgg_name,
        }))
        // draft.maxId += 1;
        draft.helpPostAdded = true;
        break;
      }
      case ADD_HELPPOST_FAILURE: {
        draft.isAddingHelpPost = false;
        draft.addHelpPostErrorReason = action.data.error;
        break;
      }
      case UPDATE_HELPPOST_REQUEST: {
        draft.isUpdatingHelpPost = true;
        draft.updateHelpPostErrorReason = "";
        draft.helpPostUpdated = false;
        break;
      }
      case UPDATE_HELPPOST_SUCCESS: {
        draft.isUpdatingHelpPost = false;
        draft.helpPosts[action.object.id] = action.data.object;
        draft.helpPostUpdated = true;
        break;
      }
      case UPDATE_HELPPOST_FAILURE: {
        draft.isUpdatingHelpPost = false;
        draft.updateHelpPostErrorReason = action.data.error;
        break;
      }
      case REMOVE_HELPPOST_REQUEST: {
        draft.isRemovingHelpPost = true;
        draft.removeHelpPostErrorReason = "";
        draft.helpPostRemoved = false;
        break;
      }
      case REMOVE_HELPPOST_SUCCESS: {
        draft.isRemovingHelpPost = false;
        const index = draft.helpPosts.findIndex(v => v.id === action.data);
        draft.helpPosts.splice(index, 1);
        draft.helpPostRemoved = true;
        break;
      }
      case REMOVE_HELPPOST_FAILURE: {
        draft.isRemovingHelpPost = false;
        draft.removeHelpPostErrorReason = action.data.error;
        break;
      }
      case LOAD_LIVEPOST_REQUEST: {
        break;
      }
      case LOAD_LIVEPOST_SUCCESS: {
        draft.livePosts = action.data.map(post => (
          {
            helpNum: post.help_num,
            helpDate: post.help_post_dttm,
            helpTitle: post.title,
            helpContent: post.content,
            hlepPrice: post.price,
            helpDeadLine: post.help_aply_cls_dttm, // 도움신청마감일시
            isHelpApprove: post.help_aprv_whet, // 도움승인여부
            postNum: post.pref_suppl_num, // 선호공급자수
            helpExecDate: post.pref_help_exec_dttm, // 선호도움이행일시
            location: post.exec_loc, // 이행장소
            helpPicList: '',// 도움사진목록,
            
            userId : post.user.id,
            nickname : post.user.nickname,
            userPic: post.user.pic,
          }
        ))
        break;
      }
      case LOAD_LIVEPOST_FAILURE: {

        break;
      }
      // case UPLOAD_IMAGE_REQUEST: {
      //   break;
      // }
      // case UPLOAD_IMAGE_SUCCESS: {
      //   action.data.map(p => {
      //     draft.imagePaths.push(p);
      //   });
      //   break;
      // }
      // case UPLOAD_IMAGE_FAILURE: {
      //   break;
      // }
      case LOAD_USERPOST_REQUEST: {
        draft.isLoadingUserPost = true;
        draft.loadUserPostErrorReason = "";
        draft.userPostLoaded = false;
        break;
      }
      case LOAD_USERPOST_SUCCESS: {
        draft.isLoadingUserPost = false;
        draft.userPostLoaded = true;
        // draft.userPosts = dummyUserHelpPost.data.map(post => ({ // 더미포스트
        //   helpNum: post.help_num, // 도움번호
        //   helpTitle: post.title,  // 타이틀
        //   helpPostDate: post.help_pstn_dttm, // 도움게시일시
        //   categoryNum: post.cat_num, // 카테고리번호
        //   price: post.price, // 금액
        //   content: post.cont, // 내용
        //   userNum: post.cnsr_num,// 수요자번호
        //   isHelpApprove: post.help_aprv_whet, // 도움승인여부
        //   postNum: post.pref_suppl_num, // 선호공급자수
        //   helpExecDate: post.pref_help_exec_dttm, // 선호도움이행일시
        //   location: post.exec_loc, // 이행장소
        //   // exec_sgg_name
        // }));
        draft.userPosts = action.data.map(post => ({
          helpNum: post.help_num, // 도움번호
          helpTitle: post.title,  // 타이틀
          helpPostDate: post.help_pstn_dttm, // 도움게시일시
          categoryNum: post.cat_num, // 카테고리번호
          price: post.price, // 금액
          content: post.cont, // 내용
          userNum: post.cnsr_num,// 수요자번호
          isHelpApprove: post.help_aprv_whet, // 도움승인여부
          postNum: post.pref_suppl_num, // 선호공급자수
          helpExecDate: post.pref_help_exec_dttm, // 선호도움이행일시
          location: post.exec_loc, // 이행장소
          // exec_sgg_name
        }));
        break;
      }
      case LOAD_USERPOST_FAILURE: {
        draft.isLoadingUserPost = false;
        draft.loadUserPostErrorReason = action.data.error;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
