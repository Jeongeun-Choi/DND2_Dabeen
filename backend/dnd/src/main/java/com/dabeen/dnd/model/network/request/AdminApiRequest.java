// AdminApiRequest.java
// admin 엔터티의 request에 해당되는 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminApiRequest{
    private String adminNum; // 관리자 번호
    private String adminName; // 관리자 이름
    private String address; // 관리자 주소
    private String phoneNum; // 관리자 전화번호
    private String adminId; // 아이디
    private String pwd; // 비밀번호
    private String email; // 이메일
}
