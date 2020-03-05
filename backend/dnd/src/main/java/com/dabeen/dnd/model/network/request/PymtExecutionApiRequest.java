// PymtExecutionApiRequest.java
// 결제 생성을 위한 Request
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.PymtMthdType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PymtExecutionApiRequest{
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String userNum;

    @NotNull(message = "값이 존재해야 합니다.")
    private PymtMthdType pymtMthdType;

    @NotNull(message = "값이 존재해야 합니다.")
    private List<String> helpNums;
}