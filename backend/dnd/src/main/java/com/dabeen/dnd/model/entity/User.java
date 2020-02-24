// User.java
// User 엔터티
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Accessors(chain = true)
@ToString(exclude = {"helpSupplComps", "mileageUseHists", "bskts", "quests"})
public class User{
    // 기본 식별자
    @Id
    private String userNum; // 사용자 번호

    private String userName; // 사용자 이름

    private String birthDate; // 생일

    private String address; // 주소

    private String phoneNum; //휴대폰 번호

    @Column(name = "id") // 레파지토리를 이용하여 find하기 위해서 속성 이름 변경
    private String userId; // 아이디

    private String pwd; // 비밀번호

    private String email; // 이메일

    private String nickname; // 닉네임

    private String itdcCont; // 소개내용

    @Enumerated(EnumType.STRING) // 여부에 해당되는 값을 지정하기 위해 enumclass로 처리
    private Whether supplWhet; // 공급자 여부

    private String picPath; // 사진경로명

    private String rrnRear; // 주민번호 뒷자리
    
    private BigDecimal avgRate; // 평점

    private BigDecimal ownMileage; // 보유 마일리지

    
    /* 연관관계 설정 */
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "suppler") // OneToMany의 경우 기본적으로 즉시로딩의 정책을 사용하므로 변경.
    private List<HelpSupplComp> helpSupplComps; // 도움 공급자 구성과 양방향 연관관계

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<MileageUseHist> mileageUseHists; // 마일리지 사용 이력과 양방향 연관관계

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "bsktUser")
    private List<Bskt> bskts;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quester")
    private List<Post> quests;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "rplyer")
    private List<Post> replies;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<Help> helps;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cnsrUser")
    private List<Chat> cnsrChats;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "supplUser")
    private List<Chat> supplChats;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "writerUser")
    private List<Msg> msgs;
}