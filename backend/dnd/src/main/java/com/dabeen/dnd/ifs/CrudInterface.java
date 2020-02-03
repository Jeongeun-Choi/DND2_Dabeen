// CrudInteface.java
// 반드시 정의되어야할 CRUD 메소드의 명시를 위한 클래스
// 작성자 : 이은비
package com.dabeen.dnd.ifs;

import com.dabeen.dnd.model.network.Header;

public interface CrudInterface<Req, Res> {
    Header<Res> create(Header<Res> request); 
    Header<Res> read(String id);
    Header<Res> update(Header<Res> request);
    Header delete(String id);
}