// HelpApiController.java
// 작성자 : 권영인

package com.dabeen.dnd.controller.api;

import javax.validation.Valid;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.HelpPic;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpPicApiRequest;
import com.dabeen.dnd.model.network.response.HelpPicApiResponse;
import com.dabeen.dnd.model.pk.HelpPicPK;
import com.dabeen.dnd.service.api.HelpPicApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/help-pic")
public class HelpPicApiController{

    @Autowired
    HelpPicApiService helpPicApiService;

    @PostMapping("")
    public Header<HelpPicApiResponse> create(@RequestParam @Valid Header<HelpPicApiRequest> request){
        return helpPicApiService.create(request);
    }

    @GetMapping("")
    public Header<HelpPicApiResponse> read(
        @RequestParam(name = "help_num") String helpNum,
        @RequestParam(name = "pic_ornu") Integer picOrnu){

        HelpPicPK helpPicPK = new HelpPicPK(helpNum, picOrnu);

        return helpPicApiService.read(helpPicPK);
            
    }
    
    @PutMapping("")
    public Header<HelpPicApiResponse> update(@RequestParam @Valid Header<HelpPicApiRequest> request){
        return helpPicApiService.update(request);
    }


    @DeleteMapping("")
    public Header delete(
        @RequestParam(name = "help_num") String helpNum,
        @RequestParam(name = "pic_ornu") Integer picOrnu){

        HelpPicPK helpPicPK = new HelpPicPK(helpNum, picOrnu);

        return helpPicApiService.delete(helpPicPK);

    }

}