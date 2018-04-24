package com.epsilonschool.controller;

        import com.epsilonschool.dao.service.UserService;
        import com.epsilonschool.entity.User;
        import org.springframework.web.bind.annotation.*;

        import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/adduser")
    public boolean addUser(@RequestParam("uid") String uid) {
        userService.addUser(new User(uid));
        return true;
    }

    @GetMapping("/checkuser")
    public boolean checkUser(@RequestParam("uid") String uid) {
        Optional<User> user = Optional.ofNullable(userService.getUserByUid(uid));
        return user.isPresent() || addUser(uid);
    }

    @PostMapping("/getgrade")
    private double getUserAverageGrade(@RequestParam("uid") String uid) {
        return userService.getUserAverageGrade(uid);
    }
}
