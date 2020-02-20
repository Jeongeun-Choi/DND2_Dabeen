// FqaMapper.java
// 식별자를 일련번호롤 생성하기 위한 쿼리문을 매핑하기 위한 인터페이스
// 작성자 : 권영인

package com.dabeen.dnd.repository.mapper;

import com.dabeen.dnd.model.entity.Fqa;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FqaMapper{
    void insert(Fqa fqa);
}