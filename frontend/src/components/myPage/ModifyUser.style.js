import styled from 'styled-components';

export const ModifyUserUpperDiv = styled.div`
    & .ModifyTitle{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 18px;
        border-bottom: 1px solid #E9E9E9;
        font-size: 33px;
        font-weight: bold;
    }
    & .ModifyContent{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px 0;
        width: 100%;
        max-width: 600px;
        min-width: 280px;
        /* height: 1120px; */
        & .ModifyUserProfile{
            border: 1px solid #BFC7CE;
            border-radius: 50%;
            width: 150px;
            height: 150px;
        }
        & .ModifyUserProfileDeleteIcon {
            position: relative;
            font-size: 45px;
            width: 50px;
            cursor: pointer;
            margin-left: 50px;
            margin-right: -50px;
            top: 50px;
        }
            & .ModifyUserProfileChangeIcon {
                width: 50px;
                cursor: pointer;
                margin-left: 50px;
                margin-right: -50px;
                margin-top: -50px;
            }
        & hr{
            width: 100%;
            color: #d9d9d9;
            border: none;
            border-top: 1px solid #d9d9d9;
            margin: 35px 0;
        }
        & .ModifyTips{
            width: 100%;
            margin: 10px 0;
            max-width: 425px;
            min-width: 270px;
            font-size: 15px;
        }
    }
    & .ModifyBtn{
        display: flex;
        & .ModifyBtnBack{
            width: 100%;
            height: 100vh;
            max-width: 100px;
            max-height: 40px;
            min-width: 60px;
            min-height: 30px;
            & :hover, :focus {
            outline : none;
            color : #ff4300;
            border : 1px solid  #ff4300;
        }
        }
        & .ModifyBtnAccess {
            width: 100%;
            height: 100vh;
            max-width: 100px;
            max-height: 40px;
            min-width: 60px;
            min-height: 30px;
            background: #ff4300;
            color : white;
            transition : 0.3s;
            & :hover, :focus {
            outline : none;
            border : none;
            opacity : 0.9;
        }
        }
      
    }
`;

export const ModifyUserGetDataDiv = styled.div`
    display: flex;
    flex-direction: column;
   
    padding : 5px;
    margin: 10px 0;
    max-width: 425px;
    min-width: 250px;
    width : 100%;
    
    & .ModifyUserTitle{
        font-size: 20px;
        font-weight: bold;
    }
    & .ModifyUserCheck{
        height: 30px;

        color: red;
        align-self: flex-end;
    }
    & .ModifyUserCheckAll{
        margin-top: 20px;
        height: 30px;
        color: red;
        align-self: flex-end;
    }
`;