// Help.java
// Help 엔터티
// 작성자 : 권영인


package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Accessors(chain = true)
// @Table(name = "help")
@ToString(exclude = {"helpSupplComps","user","category","helpPics","chat"})
public class Help{

    @Id
    private String helpNum; // 도움번호

    private LocalDateTime helpPstnDttm; // 도움게시일시

    //FK로써 추후 만들어지는 엔터티로 종속성 연결 필요
    // @NotEmpty(message = "is not empty")
    // private String catNum; // 카테고리번호

    // @NotEmpty(message = "is not empty")

    //FK로써 추후 만들어지는 엔터티로 종속성 연결 필요
    // @NotEmpty(message = "is not empty")
    // private String cnsrNum; // 수요자번호

    private String title; // 제목

    private String execLoc; // 이행위치

    private BigDecimal price; // 금액

    private Integer prefSupplNum; // 희망공급자수

    private LocalDateTime prefHelpExecDttm; // 희망도움이행일시

    private LocalDateTime helpAplyClsDttm; // 도움신청마감일시

    private String cont; // 내용

    @Enumerated(EnumType.STRING)
    private Whether helpAprvWhet; // 도움승인여부

    private String execSggName; //이행시군구명
    
    /* 연관관계 설정 */
    
    @ManyToOne
    @JoinColumn(name = "cnsr_num")
    private User user;

    @ManyToOne
    @JoinColumn(name="cat_num")
    private Category category;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "help")
    private List<HelpSupplComp> helpSupplComps;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "help")
    private List<HelpPic> helpPics;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "help")
    private Chat chat;

}