import produce from "immer";
import { createAction } from "./actionFunction";

export const initialState = {
  livePosts : [],
  helpPosts : [], //  작성한 도움
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
        draft.helpPosts.push(action.data);
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
