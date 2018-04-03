package com.epsilonschool.controller;

import com.fasterxml.jackson.core.JsonFactory;
import org.springframework.web.bind.annotation.*;

@RestController
public class SessionController {
    @CrossOrigin(origins = "http://localhost:4200/login")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login() {
        System.out.println("Logged in.");
        JsonFactory factory = new JsonFactory();
        return "You logged in.";
    }
}
