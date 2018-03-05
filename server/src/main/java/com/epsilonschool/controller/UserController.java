package com.epsilonschool.controller;

import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value="user/adduser", method = RequestMethod.GET)
    public void addUser(@RequestParam("username") String username) {
        userService.addUser(new User(username));
    }
}
