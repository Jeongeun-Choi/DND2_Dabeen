// MileageUseHistApiRequest.java
// MileageUseHist 엔터티의 Request에서 전달받는 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.MileageUseType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MileageUseHistApiRequest {
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String userNum; // 사용자 번호

    private LocalDateTime mileageUseDttm; // 마일리지 사용 일시
    
    @NotNull(message = "값이 존재해야 합니다.")
    private MileageUseType useType; // 사용구분

    @NotNull(message = "값이 존재해야 합니다.")
    @Min(value = 0, message = "값이 0 이상이어야 합니다.")
    private BigDecimal usePrice; // 사용금액

    private String bsktNum; // 장바구니
    private String wdrlBank; // 인출 은행
    private String wdrlAcctNum; //인출계좌번호
    private String pymtNum; // 결제번호
}