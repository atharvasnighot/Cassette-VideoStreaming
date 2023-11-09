package com.atharva.cassette.controllers;

import com.atharva.cassette.entities.Users;
import com.atharva.cassette.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    private UserServices userServices;

    @GetMapping("/user")
    public List<Users> getUser(){
        System.out.println("Getting users");
        return this.userServices.getUsers();
    }

    @GetMapping("/current")
    public Map<String, String> getLoggedInUser(Principal principal) {
        Map<String, String> response = new HashMap<>();
        response.put("username", principal.getName());
        return response;
    }


}
