// Fqa.java
// Fqa 엔터티
// 작성자 : 권영인

package com.dabeen.dnd.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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
@ToString(exclude = {"admin"})
public class Fqa{

    @Id
    private String fqaNum; // 자주묻는질문번호

    private LocalDateTime questPstnDttm; // 질문게시일시

    private String title; // 제목

    private String rplyCont; // 답변내용

    //Default CRUD 생성 후 종속성 연결 작업 필요
    // @NotEmpty(message = "is not empty")
    // private String fqaRgistrantNum; // 자주묻는질문등록자번호

    /* 연관관계 설정 */
    @ManyToOne
    @JoinColumn(name = "fqa_rgistrant_num")
    private Admin admin;

}