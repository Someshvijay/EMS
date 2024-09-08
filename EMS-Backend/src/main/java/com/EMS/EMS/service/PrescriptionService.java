package com.EMS.EMS.service;

import com.EMS.EMS.entity.PrescriptionEntity;
import com.EMS.EMS.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    public List<PrescriptionEntity> findPrescriptionsByUserId(String userId) {
        return prescriptionRepository.findByUserId(userId);
    }

    public PrescriptionEntity createPrescription(PrescriptionEntity prescription) {
        return prescriptionRepository.save(prescription);
    }

    public PrescriptionEntity updatePrescription(String id, PrescriptionEntity updatedPrescription) {
        Optional<PrescriptionEntity> optionalPrescription = prescriptionRepository.findById(id);
        if (optionalPrescription.isPresent()) {
            PrescriptionEntity prescription = optionalPrescription.get();
            prescription.setMedicationName(updatedPrescription.getMedicationName());
            prescription.setDosage(updatedPrescription.getDosage());
            prescription.setFrequency(updatedPrescription.getFrequency());
            prescription.setStartDate(updatedPrescription.getStartDate());
            prescription.setEndDate(updatedPrescription.getEndDate());
            return prescriptionRepository.save(prescription);
        } else {
            throw new RuntimeException("Prescription not found");
        }
    }

    public void deletePrescription(String id) {
        prescriptionRepository.deleteById(id);
    }

    public PrescriptionEntity deactivatePrescription(String id) {
        Optional<PrescriptionEntity> optionalPrescription = prescriptionRepository.findById(id);
        if (optionalPrescription.isPresent()) {
            PrescriptionEntity prescription = optionalPrescription.get();
            prescription.setActive(false); // Set the prescription as inactive
            return prescriptionRepository.save(prescription);
        } else {
            throw new RuntimeException("Prescription not found");
        }
    }

    public PrescriptionEntity incrementMissedDose(String id) {
        Optional<PrescriptionEntity> optionalPrescription = prescriptionRepository.findById(id);
        if (optionalPrescription.isPresent()) {
            PrescriptionEntity prescription = optionalPrescription.get();
            prescription.setMissedDoses(prescription.getMissedDoses() + 1);
            return prescriptionRepository.save(prescription);
        } else {
            throw new RuntimeException("Prescription not found");
        }
    }

    public boolean checkMissedDoses(String prescriptionId, LocalDate date) {
        Optional<PrescriptionEntity> optionalPrescription = prescriptionRepository.findById(prescriptionId);
        if (optionalPrescription.isPresent()) {
            PrescriptionEntity prescription = optionalPrescription.get();
            return prescription.getLastTakenDate() != null && prescription.getLastTakenDate().isBefore(date);
        } else {
            throw new RuntimeException("Prescription not found");
        }
    }

    public void sendDoseReminder(String userId, String prescriptionId) {
        Optional<PrescriptionEntity> optionalPrescription = prescriptionRepository.findById(prescriptionId);
        if (optionalPrescription.isPresent()) {
            PrescriptionEntity prescription = optionalPrescription.get();
            String message = "Reminder: It's time to take your medication - " + prescription.getMedicationName();
            // Code to send notification or email to the user
            System.out.println(message);
        } else {
            throw new RuntimeException("Prescription not found");
        }
    }
}
