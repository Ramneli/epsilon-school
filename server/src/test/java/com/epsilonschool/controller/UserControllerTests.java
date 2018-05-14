package com.epsilonschool.controller;

import com.epsilonschool.dao.repository.SettingsRepository;
import com.epsilonschool.dao.repository.UserRepository;
import com.epsilonschool.dao.service.ReportService;
import com.epsilonschool.dao.service.SettingsService;
import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.User;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

public class UserControllerTests {

    UserRepository userRepository;
    UserService userService;
    UserController userController;
    SettingsService settingsService;
    ReportService reportService;

    @Before
    public void setUp() {
        userRepository = Mockito.mock(UserRepository.class);
        settingsService = Mockito.mock(SettingsService.class);
        reportService = Mockito.mock(ReportService.class);
        userService = new UserService(userRepository);
        userController = new UserController(userService, settingsService, reportService);
    }

    @Test
    public void testUserControllerGetUserById() {

        userController.checkUser("user123Id");

        Mockito.verify(userRepository, Mockito.times(1)).findByUid("user123Id");
    }

    @Test
    public void testUserControllerAddUser() {

        userController.addUser("user123Id");

        Mockito.verify(userRepository, Mockito.times(1)).save(Mockito.any(User.class));
    }

    @Test
    public void testUserControllerNotLookingForMultipleUsers() {
        userController.checkUser("user123Id");

        Mockito.verify(userRepository, Mockito.times(0)).findAll();
    }


}
