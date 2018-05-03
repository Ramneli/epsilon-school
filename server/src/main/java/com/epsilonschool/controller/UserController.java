package com.epsilonschool.controller;

        import com.epsilonschool.dao.service.SettingsService;
        import com.epsilonschool.dao.service.UserService;
        import com.epsilonschool.entity.Settings;
        import com.epsilonschool.entity.User;
        import org.springframework.web.bind.annotation.*;

        import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private UserService userService;
    private SettingsService settingsService;

    public UserController(UserService userService, SettingsService settingsService) {
        this.userService = userService;
        this.settingsService = settingsService;
    }

    @GetMapping("/adduser")
    public boolean addUser(@RequestParam("uid") String uid) {
        userService.addUser(new User(uid));
        settingsService.saveUserSettings(new Settings(uid, '0'));
        return true;
    }

    @GetMapping("/status")
    private int getAdminStatus(@RequestParam("uid") String uid) {
        return this.userService.getUserByUid(uid).getAdmin();
    }

    @GetMapping("/access")
    private int getAccessStatus(@RequestParam("uid") String uid) {
        return this.userService.getUserByUid(uid).getIsBlocked();
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
