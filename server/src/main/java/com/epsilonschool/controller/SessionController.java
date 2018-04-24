package com.epsilonschool.controller;

import com.fasterxml.jackson.core.JsonFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SessionController {
    @GetMapping("/test")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Void> test() {
        System.out.println("Was here");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("monster", "high");
        return ResponseEntity.ok().header("tere", "maailm").build();
    }

    @CrossOrigin(origins = "http://localhost:4200/login")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login() {
        System.out.println("Logged in.");
        JsonFactory factory = new JsonFactory();
        return "You logged in.";
    }
}
