package com.epsilonschool.controller;

import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value="user/adduser", method = RequestMethod.GET)
    public boolean addUser(@RequestParam("uid") String uid) {
        userService.addUser(new User(uid));
        return true;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value="user/checkuser", method = RequestMethod.GET)
    public boolean checkUser(@RequestParam("uid") String uid) {
        Optional<User> user = Optional.ofNullable(userService.getUserByUid(uid));
        return user.isPresent() || addUser(uid);
    }
}
