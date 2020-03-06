import styled from 'styled-components';
// 전체 upper div
export const MyHelpCapsuleUpperDiv = styled.div`
  flex: 1;
  width: 100%;
  max-width: 350px;
  min-width: 280px;
  /* padding: -1px; */
  margin: 5px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border: 1.25px solid #E9E9E9;
  border-radius: 5px;
  box-shadow: 0 5px 10px 0.5px #E9E9E9;

  &:hover{
    box-shadow: 0 5px 10px 2px #BFC7CE;
  }

  overflow: hidden;
  cursor: pointer;

  /* 글자가 넘어가면 ellipsis 처리 */
  & .MyhelpCapsuleTitleMain, .MyhelpCapsulePriceValue{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .MyhelpCapsuleImage{
    width: 100%;
    min-height: 150px;
    max-height: 150px;
    margin-top: -34px;
    justify-self: flex-end;
    align-self: flex-end;
    /* border: 1px solid #BFC7CE; */
    /* border-radius: 4px; */
  }
  & .DoWrapper{
    z-index: 0;
    width: 100%;
    height: 34px;
    padding: 0 8px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  & .doing, .done {
    width: 60px;
    height: 23px;
    border-radius: 5px;
    text-align: center;
  }
  & .doing {
    background: #ff4300;
    color: white;
  }
  & .done {
    background: #BFC7CE;
  }
  & .MyHelpCapsuleTimeWrapper{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  & .MyhelpCapsulePrice{
    width: 100px;
    display: flex;
    justify-content: flex-end;
    color: #FF9644;
  }

`;

// Title 부분을 관리하는 div
export const MyHelpCapsuleTitle = styled.div`
  /* width: -webkit-calc(100% - 88px); */
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  & .MyhelpCapsuleTitleMain {
    font-size: 22px;
    font-weight: bold;
    height: 35px;
  }
`;
// 정보 부분을 관리하는 div
export const MyHelpCapsuleInfo = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;

  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid #E9E9E9;

  color: #7A7A7A;

  & .MyhelpCapsuleSub{
    display: flex;
    align-items: center;
    & .MyhelpCapsulePeople{
      padding: 0 5px;
      color: #7A7A7A;
    }
  }
`;