package com.EMS.EMS.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "prescriptions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionEntity {

    @Id
    private String id;

    private String userId; // Reference to the UserEntity
    private String medicationName;
    private String dosage;
    private String frequency; // e.g., "daily", "twice a day"
    private LocalDate startDate;
    private LocalDate endDate; // optional

    // New fields
    private LocalTime reminderTime;  // Time of day to send reminders
    private int missedDoses;  // Track how many doses have been missed
    private boolean isActive;  // To mark whether the prescription is still active or completed
    private LocalDate lastTakenDate;
}
