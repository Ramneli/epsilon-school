package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.UserRepository;
import com.epsilonschool.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findOne(userId);
    }
    public User getUserByUid(String uid) {
        return userRepository.findByUid(uid);
    }
    public void addUser(User user) {
        userRepository.save(user);
    }

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getUserIdFromUid(String uid) {
        return userRepository.findByUid(uid).getId();
    }

    public double getUserAverageGrade(String uid) {
       return userRepository.findByUid(uid).getAverageGrade();
    }

    public void updateAverageGrade(String userId, double weighedAverageGrade) {
        userRepository.updateAverageGrade(userId, weighedAverageGrade);
    }

    public List<User> getAllReportedUsers() {
        return userRepository.findAllReportedUsers();
    }

    public void unblockUser(String uid) {
        userRepository.unBlockUser(uid);
    }

    public void blockUser(String uid) {
        userRepository.blockUser(uid);
    }


    public void resolveReports(String uid) {
        userRepository.resolveReports(uid);
    }
}
