package com.epsilonschool.controller;

import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.User;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value="user/adduser", method = RequestMethod.GET)
    public void addUser(@RequestParam("username") String username) {
        userService.addUser(new User(username));
    }
}
