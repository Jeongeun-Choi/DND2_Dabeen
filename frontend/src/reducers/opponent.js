import produce from "immer";
import { createAction } from "../utils/actionFunction";
// 나 자신이 아닌 다른사람의 정보를 저장하는 State

export const initialState = {
  // 다른사람의 정보
  opponents: {},
  recommendOpponents : [],
  sggUser : '',
  // UserData를 받았는지
  loadedUserData: false,
  isLoadingUserData: false,
  loadUserDataErrorReason: "",
  // UserData를 업데이트 했는지
//   updatedUserData: false,
//   isUpdatingUserData: false,
//   updateUserDataErrorReason: "",
//   // UserData를 삭제
//   deletedUserData: false,
//   isDeletingUserData: false,
//   deleteUserDataErrorReason: ""
};
// UserData에 대한 types
export const LOAD_USERDATA_REQUEST = "LOAD_USERDATA_REQUEST";
export const LOAD_USERDATA_SUCCESS = "LOAD_USERDATA_SUCCESS";
export const LOAD_USERDATA_FAILURE = "LOAD_USERDATA_FAILURE";

export const LOAD_RECOMMEND_REQUEST ="LOAD_RECOMMEND_REQUEST";
export const LOAD_RECOMMEND_SUCCESS ="LOAD_RECOMMEND_SUCCESS";
export const LOAD_RECOMMEND_FAILURE ="LOAD_RECOMMEND_FAILURE";

// export const UPDATE_USERDATA_REQUEST = "UPDATE_USERDATA_REQUEST";
// export const UPDATE_USERDATA_SUCCESS = "UPDATE_USERDATA_SUCCESS";
// export const UPDATE_USERDATA_FAILURE = "UPDATE_USERDATA_FAILURE";

// export const DELETE_USERDATA_REQUEST = "DELETE_USERDATA_REQUEST";
// export const DELETE_USERDATA_SUCCESS = "DELETE_USERDATA_SUCCESS";
// export const DELETE_USERDATA_FAILURE = "DELETE_USERDATA_FAILURE";

// UserData에 대한 Actions

export const loadRecommendRequest = createAction(LOAD_RECOMMEND_REQUEST);
export const loadRecommendSuccess = createAction(LOAD_RECOMMEND_SUCCESS);
export const loadRecommendFailure = createAction(LOAD_RECOMMEND_FAILURE);

// export const AddUserDataRequest = createAction(ADD_USERDATA_REQUEST);
// export const AddUserDataSuccess = createAction(ADD_USERDATA_SUCCESS);
// export const AddUserDataFailure = createAction(ADD_USERDATA_FAILURE);

// export const UpdateUserDataRequest = createAction(UPDATE_USERDATA_REQUEST);
// export const UpdateUserDataSuccess = createAction(UPDATE_USERDATA_SUCCESS);
// export const UpdateUserDataFailure = createAction(UPDATE_USERDATA_FAILURE);

// export const DeleteUserDataRequest = createAction(DELETE_USERDATA_REQUEST);
// export const DeleteUserDataSuccess = createAction(DELETE_USERDATA_SUCCESS);
// export const DeleteUserDataFailure = createAction(DELETE_USERDATA_FAILURE);

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_RECOMMEND_REQUEST: {
        break;
      }
      case LOAD_RECOMMEND_SUCCESS: {
        draft.sggUser = action.data.ssg_user;
        draft.recommendOpponents = action.data.users.map(recommend => (
            {
            userId : recommend.id, // user_id로 바꿀 예정
            userNum : recommend.user_num,
            userName : recommend.user_name,
            nickname : recommend.nickname,
            avgRate : recommend.avg_rate,
            picPath : recommend.pic_path,
          }
        ))
        break;
      }
      case LOAD_RECOMMEND_FAILURE: {
        draft.loadUserDataErrorReason = action.data;
        break;
      }
      case LOAD_USERDATA_REQUEST: {
        draft.loadedUserData = false;
        draft.isLoadingUserData = true;
        break;
      }
      case LOAD_USERDATA_SUCCESS: {
        draft.loadedUserData = true;
        draft.isLoadingUserData = false;
        break;
      }
      case LOAD_USERDATA_FAILURE: {
        draft.isLoadingUserData = false;
        draft.loadUserDataErrorReason = action.data;
        break;
      }
    //   case UPDATE_USERDATA_REQUEST: {
    //     draft.updatedUserData = false;
    //     draft.isUpdatingUserData = true;
    //     break;
    //   }
    //   case UPDATE_USERDATA_SUCCESS: {
    //     draft.updatedUserData = true;
    //     draft.isUpdatingUserData = false;
    //     break;
    //   }
    //   case UPDATE_USERDATA_FAILURE: {
    //     draft.isUpdatingUserData = false;
    //     draft.updateUserDataErrorReason = action.data.error;
    //     break;
    //   }
    //   case DELETE_USERDATA_REQUEST: {
    //     draft.deletedUserData = false;
    //     draft.isDeletingUserData = true;
    //     break;
    //   }
    //   case DELETE_USERDATA_SUCCESS: {
    //     draft.deletedUserData = false;
    //     draft.isDeletingUserData = false;
    //     break;
    //   }
    //   case DELETE_USERDATA_FAILURE: {
    //     draft.isDeletingUserData = false;
    //     draft.deleteUserDataErrorReason = action.data.error;
    //     break;
    //   }
      default: {
        break;
      }
    }
  });
};

export default reducer;
