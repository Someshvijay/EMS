package com.EMS.EMS.controller;

import com.EMS.EMS.entity.PrescriptionEntity;
import com.EMS.EMS.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PrescriptionEntity>> getPrescriptionsByUserId(@PathVariable String userId) {
        List<PrescriptionEntity> prescriptions = prescriptionService.findPrescriptionsByUserId(userId);
        if (prescriptions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(prescriptions, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PrescriptionEntity> createPrescription(@RequestBody PrescriptionEntity prescription) {
        PrescriptionEntity createdPrescription = prescriptionService.createPrescription(prescription);
        return new ResponseEntity<>(createdPrescription, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrescriptionEntity> updatePrescription(@PathVariable String id, @RequestBody PrescriptionEntity updatedPrescription) {
        try {
            PrescriptionEntity prescription = prescriptionService.updatePrescription(id, updatedPrescription);
            return new ResponseEntity<>(prescription, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<PrescriptionEntity> deactivatePrescription(@PathVariable String id) {
        try {
            PrescriptionEntity updatedPrescription = prescriptionService.deactivatePrescription(id);
            return new ResponseEntity<>(updatedPrescription, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/missed-dose")
    public ResponseEntity<PrescriptionEntity> incrementMissedDose(@PathVariable String id) {
        try {
            PrescriptionEntity updatedPrescription = prescriptionService.incrementMissedDose(id);
            return new ResponseEntity<>(updatedPrescription, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable String id) {
        try {
            prescriptionService.deletePrescription(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
