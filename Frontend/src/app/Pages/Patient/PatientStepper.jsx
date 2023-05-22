import React, { useState, useEffect } from 'react'
import { Col, Row, } from "react-bootstrap";
import { Box, styled, Button, Icon } from '@mui/material';
import PatientVisit from './PatientVisit';
import PatientPrescription from './PatientPrescription';
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));
const PatientStepper = () => {
    const [step, setstep] = useState(1);
    const [formData, setFormData] = useState({
        personal_conditions: "",
        current_treatment: "",
        remarks: "",
        AssTrauma_diseases: "",
        ROMstatus: "",
        muscle_status: "",
        skin_soft_tissues_pain: "",
        cardio_vascular_status: "",
        general_mobility: "",
        transfers: "",
        balance: "",
        upper_limb_functions: "",
        daily_life_activities: "",
        DiagnosisICD10code: "",
        BriefMedicalHistory: "",
        WeightBearingPrecautions: "",
        ActivityRestrictions: "",
        OtherMedicalConsiderations: "",
        PhysicalTherapyEvaluationTreatment: "",
        Other: "",
        AnticipatedFrequencyDuration: "",
        SpecialInstructions: ""

    })

    const nextStep = () => {
        setstep(step + 1);
        console.log("nextstep", nextStep);
    };

    const prevStep = () => {
        setstep(step - 1);
    };
    const handleInputData = (input) => (e) => {
        console.log("eee", e);
        // input value from the form
        const { value } = e.target;

        //updating for data state taking previous state and then adding new value to create new object
        setFormData((prevState) => ({
            ...prevState,
            [input]: value,
        }));
    };
    switch (step) {
        // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
        case 1:
            return (
                <div>
                    <Container>
                    
                        <PatientVisit
                            nextStep={nextStep}
                            handleFormData={handleInputData}
                            values={formData}
                        />
                     
                    </Container>
                </div>
            );
        case 2:
            return (
                <div className="App">
                    <Container>
                    
                        <PatientPrescription
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleFormData={handleInputData}
                            values={formData}
                        />
                  
                    </Container>
                </div>
            );
   


        default:
            return "unknown step";
    }
}

export default PatientStepper