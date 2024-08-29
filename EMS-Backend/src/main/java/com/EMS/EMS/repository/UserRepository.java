package com.EMS.EMS.repository;

import com.EMS.EMS.entity.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, ObjectId> {
    Optional<UserEntity> findById(String id);

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByResetToken(String resetToken);
}
