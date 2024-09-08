import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const PrescriptionForm = () => {
    // Retrieve userId from local storage
    const userId = JSON.parse(localStorage.getItem('user'))?.id;

    const [prescriptions, setPrescriptions] = useState([]);
    const [formData, setFormData] = useState({
        medicationName: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: '',
        reminderTime: '',
        missedDoses: 0,
        isActive: true
    });

    useEffect(() => {
        if (userId) {
            axios.get(`/api/v1/prescriptions/user/${userId}`)
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setPrescriptions(response.data);
                    } else {
                        console.error('Expected an array but got:', response.data);
                    }
                })
                .catch(error => console.log(error));
        }
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId) {
            axios.post('/api/v1/prescriptions', { ...formData, userId })
                .then(response => {
                    if (response.data && typeof response.data === 'object') {
                        setPrescriptions([...prescriptions, response.data]);
                        setFormData({
                            
                            medicationName: '',
                            dosage: '',
                            frequency: '',
                            startDate: '',
                            endDate: '',
                            reminderTime: '',
                            missedDoses: 0,
                            isActive: true
                        });
                    } else {
                        console.error('Unexpected response format:', response.data);
                    }
                })
                .catch(error => console.log(error));
        } else {
            console.error('User ID is missing');
        }
    };

    const handleDeactivate = (id) => {
        axios.put(`/api/v1/prescriptions/${id}/deactivate`)
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    setPrescriptions(prescriptions.map(prescription =>
                        prescription.id === id ? response.data : prescription
                    ));
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch(error => console.log(error));
    };

    const handleIncrementMissedDose = (id) => {
        axios.put(`/api/v1/prescriptions/${id}/missed-dose`)
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    setPrescriptions(prescriptions.map(prescription =>
                        prescription.id === id ? response.data : prescription
                    ));
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                Manage Prescriptions
            </Typography>
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Add Prescription
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Medication Name"
                                    name="medicationName"
                                    value={formData.medicationName}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Dosage"
                                    name="dosage"
                                    value={formData.dosage}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Frequency"
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Start Date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="End Date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="time"
                                    label="Reminder Time"
                                    name="reminderTime"
                                    value={formData.reminderTime}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Missed Doses"
                                    name="missedDoses"
                                    value={formData.missedDoses}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            name="isActive"
                                        />
                                    }
                                    label="Active"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Add Prescription
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            <Typography variant="h6" gutterBottom>
                Prescription List
            </Typography>
            <List>
                {prescriptions.map((prescription) => (
                    <ListItem key={prescription.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleIncrementMissedDose(prescription.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeactivate(prescription.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }>
                        <ListItemText
                            primary={`${prescription.medicationName} - ${prescription.dosage} - ${prescription.frequency}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default PrescriptionForm;
