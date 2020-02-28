// HelpApiController.java
// 작성자 : 권영인

package com.dabeen.dnd.controller.api;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.exception.NotYourselfException;
import com.dabeen.dnd.model.entity.Help;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;
import com.dabeen.dnd.model.network.response.HelpAppliInfoApiResponse;
import com.dabeen.dnd.model.network.response.HelpExecLocApiResponse;
import com.dabeen.dnd.service.api.HelpApiService;
import com.sun.tools.sjavac.Log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/help")
@Slf4j
public class HelpApiController{
    @Autowired
    private HelpApiService helpApiService;

    @Autowired
    private Validator validator;

    /* jwt 검증때문에 상속없이 직접 구현  */
    // Create 메소드
    @PostMapping("")
    public Header<HelpApiResponse> create(@RequestBody @Valid Header<HelpApiRequest> request, Authentication authentication){
        HelpApiRequest reqDate = request.getData();

        this.idVerification(authentication, reqDate.getCnsrNum());
        this.validate(reqDate);

        return helpApiService.create(request);
    }

    // Read 메소드
    @GetMapping("{num}") // User의 id와 헷갈려서 num으로 작성
    public Header<HelpApiResponse> read(@PathVariable String num){
        return helpApiService.read(num);
    }

    // Update 메소드
    @PutMapping("")
    public Header<HelpApiResponse> update(@RequestBody @Valid Header<HelpApiRequest> request, Authentication authentication){
        HelpApiRequest reqDate = request.getData();

        this.idVerification(authentication, reqDate.getCnsrNum());
        this.validate(reqDate);

        return helpApiService.update(request);
    }

    // Delete 메소드
    @DeleteMapping("{num}")
    public Header delete(@PathVariable String num){
        return helpApiService.delete(num);
    }

    /* 사용자 API */

    // 미결제 도움 APi
    @GetMapping("{userNum}/no-payment-helps")
    public Header<List<HelpAppliInfoApiResponse>> searchNoPaymentHelps(@PathVariable String userNum, Authentication authentication){
        this.idVerification(authentication, userNum);
        
        return helpApiService.searchNoPaymentHelps(userNum);
    }

    // 받을 도움 APi, 본인이 작성한 도움 중 이행 시간이 현재보다 미래인 것
    @GetMapping("{userNum}/to-receive-helps")
    public Header<Map<String, Object>> searchToReceiveHelps(@PathVariable String userNum, @PageableDefault(size = 15) Pageable pageable){
        return helpApiService.searchToReceiveHelps(userNum, pageable);
    }

    // 받은 도움 APi, 본인이 작성한 도움 중 이행 시간이 현재보다 과거인 것
    @GetMapping("{userNum}/received-helps")
    public Header<Map<String, Object>> searchReceivedHelps(@PathVariable String userNum, @PageableDefault(size = 15) Pageable pageable){
        return helpApiService.searchReceivedHelps(userNum, pageable);
    }

    @GetMapping("/search-exec-loc/{execLoc}")
    public Header<List<HelpExecLocApiResponse>> searchExecLocHelps(@PathVariable String execLoc){
        return helpApiService.searchExecLocHelps(execLoc);
    }

    /* 추가 메소드 */

    // @Vaild 를 통한 검증
    public void validate(Object objcet){
        Errors errors = new BeanPropertyBindingResult(objcet, "event");
        validator.validate(objcet, errors);
    }

    // jwt을 이용하여 본인이 아닐경우 예외 호출
    public void idVerification(Authentication authentication, String userNum){
        if(!authentication.getAuthorities().toString().equals("ROLE_ADMIN")){
            Claims claims = (Claims) authentication.getPrincipal();

            if(!userNum.equals(claims.get("userNum", String.class)))
                throw new NotYourselfException();
        }
    }
}