package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String>{
    User findByUid(String uid);
}
