package com.EMS.EMS.repository;

import com.EMS.EMS.entity.PrescriptionEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescriptionRepository extends MongoRepository<PrescriptionEntity, String> {
    List<PrescriptionEntity> findByUserId(String userId);  // Find prescriptions by user ID
}