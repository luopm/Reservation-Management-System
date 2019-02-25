package com.luopm.reservationmanagement.Controller;



import com.luopm.reservationmanagement.Model.FaceRequest;
import com.luopm.reservationmanagement.Model.User;
import com.luopm.reservationmanagement.Service.FaceService;
import com.luopm.reservationmanagement.Service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(value = "/SystemController")
public class SystemController {

    @Autowired
    private SystemService systemService;
    @Autowired
    private FaceService faceService;

    @ResponseBody
    @RequestMapping(value = "/Login" )
    public Object login(User user){
        return  systemService.login(user);
    }
    @ResponseBody
    @RequestMapping(value = "/Register" )
    public Object register(User user){
        return  systemService.register(user);
    }


    @ResponseBody
    @RequestMapping(value = "/FaceLogin", method = RequestMethod.POST)
    public Object faceLogin(FaceRequest faceRequest) throws Exception{
        return  faceService.searchFace(faceRequest);
    }
    @ResponseBody
    @RequestMapping(value = "/AddFaceGroup", method = RequestMethod.POST)
    public Object addFaceGroup( FaceRequest faceRequest) throws Exception{
        return  faceService.addGroup(faceRequest);
    }
    @ResponseBody
    @RequestMapping(value = "/AddFace", method = RequestMethod.POST)
    public Object AddFace(FaceRequest faceRequest) throws Exception{
        return  faceService.addFace(faceRequest);
    }
    @ResponseBody
    @RequestMapping(value = "/UpdateFace", method = RequestMethod.POST)
    public Object UpdateFace(@RequestBody FaceRequest faceRequest) throws Exception{
        return  faceService.updateFace(faceRequest);
    }

}