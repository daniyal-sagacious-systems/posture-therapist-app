import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { PatternFormat } from "react-number-format";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import { Box, styled, Button, Icon } from '@mui/material';
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';
import '../Patient/Patient.css'
import { doctorValidation } from 'app/components/Validation/ValidationSchema';
import Input from 'app/components/UI Components/Input';
import { City, Country, State } from "country-state-city";
import Select from "react-select";
// import {Select,MenuItem } from '@mui/material';
import pp from "./avatar.png";

import Form from 'react-bootstrap/Form';

const initialValue = {
    first_name: "",
    last_name: "",
    date_of_birth: "",
    age: "",
    gender: "",
    address: "",
    mobile_no: "",
    email: "",
    cnic: "",
    practitioner_type: "",
    home_phone: "",
    work_phone: "",
    remarks: "",
    specialization: "",
    experience: "",
    engagement_terms: "",
    financial_information:"",
    salary:"",
}

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));


const DoctorForm = () => {

    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();
    const [country, setCountry] = useState(countryData[0]);
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [file, setfile] = useState();
    const [doctorPicture, setDoctorPicture] = useState("")


    
    useEffect(() => {
        setStateData(State.getStatesOfCountry(country?.isoCode));
        console.log("stateData", stateData)
    }, [country]);

    useEffect(() => {
        setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
        console.log("cityData", cityData)
    }, [state]);

    useEffect(() => {
        stateData && setState(stateData[0]);
        console.log("state")
    }, [stateData]);

    useEffect(() => {
        cityData && setCity(cityData[0]);
        console.log("city", city)
    }, [cityData]);


    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValue,
        validationSchema: doctorValidation,
        onSubmit: async (values, action) => {
            try {
                const data = new FormData();
                data.append('picture',doctorPicture)
                data.append('first_name', values.first_name);
                data.append('last_name', values.last_name);
                data.append('date_of_birth', values.date_of_birth);
                data.append('age', values.age);
                data.append('gender', values.gender);
                data.append('address', values.address);
                data.append('mobile_no', values.mobile_no);
                data.append('email', values.email);
                data.append('practitioner_type', values.practitioner_type);
                data.append('cnic', values.cnic);
                data.append('home_phone', values.home_phone);
                data.append('work_phone', values.work_phone);
                data.append('remarks', values.remarks);
                data.append('specialization', values.specialization);
                data.append('experience', values.experience);
                data.append('engagement_terms', values.engagement_terms);
                data.append('financial_information', values.financial_information);
                data.append('salary', values.salary)
                data.append('country', selectedCountry.name);
                data.append('state', selectedState.name);
                data.append('city', selectedCity.name);

                const addDoctor = await axios.post(process.env.REACT_APP_ORIGIN_URL + 'api/users',data)

                // const doctorForm = await axios.post(process.env.REACT_APP_ORIGIN_URL + 'api/users', {
                //     surname: values.surname,
                //     first_name: values.first_name,
                //     middle_name: values.middle_name,
                //     date_of_birth: values.date_of_birth,
                //     age: values.age,
                //     gender: values.gender,
                //     address: values.address,
                //     mobile_no: values.mobile_no,
                //     email: values.email,
                //     practitioner_type: values.practitioner_type,
                //     cnic: values.cnic,
                //     home_phone: values.home_phone,
                //     work_phone: values.work_phone,
                //     remarks: values.remarks,
                //     specialization: values.specialization,
                //     experience: values.experience,
                //     engagement_terms: values.engagement_terms,
                //     country: selectedCountry,
                //     state: selectedState,
                //     city: selectedCity,


                // })
               addDoctor && NotificationManager.success("Successfully Registered");

            } catch (error) {
                NotificationManager.error("Something went wrong")
                console.log("error", error)

            }
            action.resetForm()
            setSelectedCountry(null)
            setSelectedState(null)
            setSelectedCity(null)
            setfile("")

        }

    })



    function ageCalculator() {
        var userInput = values.date_of_birth;
        var dob = new Date(userInput);
        if (userInput == null || userInput == '') {
            //   document.getElementById("message").innerHTML = "**Choose a date please!";    
            return false;
        } else {

            //calculate month difference from current date in time  
            var month_diff = Date.now() - dob.getTime();

            //convert the calculated difference in date format  
            var age_dt = new Date(month_diff);

            //extract year from date      
            var year = age_dt.getUTCFullYear();

            //now calculate the age of the user  
            var age = Math.abs(year - 1970);
            values.age = age
            //display the calculated age  
            return age =
                "Age is: " + age + " years. ";
        }
    }

    function convertBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    async function uploadImage(event) {
        const pictureFile = event.target.files[0];
        const base64 = await convertBase64(pictureFile);
        const object = {
            target: {
                value: base64,
            },
        };
        setfile(base64);
        setDoctorPicture(pictureFile)


        // handleFormData("profilepic")(object);


        console.log("base64", base64);
        // document.getElementById("avatar").src = `${base64}`;

        return base64;
        // avatar.src = base64;
        // textArea.innerText = base64;
    }


    return (
        <Container>

            {/* <section className="content"> */}

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Doctor Registration' }]} />
            </Box>
            <NotificationContainer />



            {/* ****************Doctor Information**************** */}

            <div className="card">
                <div className="card-body" style={{ margin: "10px" }}>
                    <h5>DOCTOR INFORMATION</h5>

                    <Form className="mb-3 d-flex mt-3 " controlId="formGridProfilePic">
                    <div>
                            <div>
                        <Form.Label htmlFor="uploadpic">
                            {file ? (
                                <>
                                    {/* {console.log("picinsrc",URL.createObjectURL(file))} */}

                                    <img
                                        className="rounded-circle"
                                        style={{ width: "130px", height: "130px" }}
                                        src={file}
                                        alt=""
                                    />
                                </>
                            ) : (
                                <img
                                    className="rounded-circle"
                                    src={pp}
                                    alt=""
                                    style={{ width: "130px", height: "130px" }}
                                />
                            )}
                        </Form.Label>

                        <Form.Control
                            type="file"
                            name="file"
                            // value={emp.profilepic}
                            defaultValue={values.profilepic}
                            style={{ display: "none" }}
                            id="uploadpic"
                            onChange={async (e) => {
                                await uploadImage(e);
                            }}
                        />

</div>
                            <label style={{marginTop:'1rem'}}><strong>Upload Picture</strong></label>
                       
                        </div>
                    </Form>

                    <div className="row" style={{ marginTop: "2rem" }}>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="first_name">
                                {" "}
                                <div>First Name:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3 ">
                            {" "}
                            <Input style={{ paddingLeft: '0.3rem' }} type="text" name="first_name" label="First Name" value={values.first_name} onChange={handleChange} onBlur={handleBlur} />
                            {errors.first_name && touched.first_name ? (<p style={{ color: "red" }}>{errors.first_name}</p>) : null}
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="last_name">
                                {" "}
                                <div>Last Name:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            {" "}
                            <Input style={{ paddingLeft: '0.3rem' }} type="text" name="last_name" label="Last Name" value={values.last_name} onChange={handleChange} onBlur={handleBlur} />
                            

                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="email">
                                <div>Email:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Input style={{ paddingLeft: '0.3rem' }} type="email" name="email" label="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && touched.email ? (<p style={{ color: "red" }}>{errors.first_name}</p>) : null}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="date_of_birth">
                                {" "}
                                <div>Date of Birth:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Input
                                type="date"
                                name="date_of_birth"
                                value={values.date_of_birth}
                                onChange={(e) => { handleChange(e); ageCalculator() }} onBlur={handleBlur}
                            />
                            {errors.date_of_birth && touched.date_of_birth ? (<p style={{ color: "red" }}>{errors.date_of_birth}</p>) : null}
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="age">
                                {" "}
                                <div>Age:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2  p-3">
                            {" "}
                            <Input
                                style={{ paddingLeft: '0.3rem' }}

                                name="age"
                                type="text"
                                label="Age"
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 3);
                                }}
                                value={values.age}
                                onChange={handleChange} onBlur={handleBlur}
                            />

                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="gender">
                                {" "}
                                <div>Gender:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            {" "}
                            {/* <select name="gender" class="form-control dropdown" onChange={handleChange} value={values.gender} onBlur={handleBlur}>
                                <option
                                    value=""
                                    selected="selected"
                                    disabled="disabled"
                                >
                                    Select Gender...
                                </option>
                               
                            </select> */}
                            <Form.Select name="gender" value={values.gender} onChange={handleChange}>
                                <option>Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                            {errors.gender && touched.gender ? (<p style={{ color: "red" }}>{errors.gender}</p>) : null}

                        </div>
                    </div>



                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                            <label htmlFor="address">
                                {" "}
                                <div>Address:</div>
                            </label>
                        </div>
                        <div className="col-xl-10 col-lg-2 col-sm-2 border p-3">
                            <Input style={{ paddingLeft: '0.3rem' }} type="text" name="address" label="Address" value={values.address} onChange={handleChange} />
                        </div>


                    </div>

                    <div className="row">
                    <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="cnic">
                                <div>CNIC:</div>
                            </label>
                        </div>


                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">

                            <PatternFormat
                                style={{
                                    width: "100%",
                                    borderColor: "grey",
                                    paddingLeft: '0.3rem'
                                }}

                                required
                                name="cnic"
                                format="#####-#######-#"
                                allowEmptyFormatting
                                mask="x"
                                value={values.cnic}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.cnic && touched.cnic ? (<p style={{ color: "red" }}>{errors.cnic}</p>) : null}
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="work_phone">
                                {" "}
                                <div>Work Phone No:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Input style={{ paddingLeft: '0.3rem' }} type="text" name="work_phone" label="Work Phone" value={values.work_phone} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="mobile_no">
                                <div>Mobile No:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Input style={{ paddingLeft: '0.3rem' }} type="number" name="mobile_no" label="Mobile No" value={values.mobile_no} onChange={handleChange} onBlur={handleBlur} onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value))
                                    .toString()
                                    .slice(0, 11);
                            }} />
                            {errors.mobile_no && touched.mobile_no ? (<p style={{ color: "red" }}>{errors.mobile_no}</p>) : null}
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="country">
                                <div>Country:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Select
                                options={Country.getAllCountries()}
                                getOptionLabel={(options) => {
                                    return options["name"];
                                }}
                                getOptionValue={(options) => {
                                    return options["name"];
                                }}
                                value={selectedCountry}
                                onChange={(item) => {
                                    setSelectedCountry(item);
                                    console.log("country",item)
                                }}
                            />
                           

                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="state">
                                <div>State:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Select
                                options={State?.getStatesOfCountry(
                                    selectedCountry?.isoCode
                                )}
                                getOptionLabel={(options) => {
                                    return options["name"];
                                }}
                                getOptionValue={(options) => {
                                    return options["name"];
                                }}
                                value={selectedState}
                                onChange={(item) => {
                                    setSelectedState(item);
                                    console.log("state",item)
                                }}
                            />

                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="city">
                                <div>City:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Select
                                options={City.getCitiesOfState(
                                    selectedState?.countryCode,
                                    selectedState?.isoCode
                                )}
                                getOptionLabel={(options) => {
                                    return options["name"];
                                }}
                                getOptionValue={(options) => {
                                    return options["name"];
                                }}
                                value={selectedCity}
                                onChange={(item) => {
                                    setSelectedCity(item);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="Specialization">
                                <div>Specialization:</div>
                            </label>
                        </div>


                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">

                            <Input
                                type="text"
                                name="specialization"
                                label="Specialization"
                                value={values.specialization}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                        </div>

                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="experience">
                                <div>Experience:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Input style={{ paddingLeft: '0.3rem' }} type="text" name="experience" label="Experience" value={values.experience} onChange={handleChange} onBlur={handleBlur} />

                        </div>

                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="engagement_terms">
                                <div>Engagement Terms:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Form.Select name="engagement_terms" class="form-control dropdown" onChange={handleChange} value={values.engagement_terms} onBlur={handleBlur}>
                                <option
                                    value=""
                                    selected="selected"
                                    disabled="disabled"
                                >
                                    Select Engagement Terms:...
                                </option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                            </Form.Select>

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="practitioner_type">
                                <div>Practitioner Type:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Input style={{ paddingLeft: '0.3rem' }} type="text" name="practitioner_type" label="Practitioner Type" value={values.practitioner_type} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="financial_information">
                                <div>Financial Information:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                        <Input style={{ paddingLeft: '0.3rem' }} type="text" name="financial_information" label="Financial Information" value={values.financial_information} onChange={handleChange} onBlur={handleBlur} />

                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="salary">
                                <div>Salary:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <Input style={{ paddingLeft: '0.3rem' }} type="number" name="salary" label="salary" value={values.salary} onChange={handleChange} onBlur={handleBlur} />

                        </div>
                    </div>
                  

                    <div className="row">
                   
                        <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                            <label htmlFor="remarks">
                                {" "}
                                <div>Remarks:</div>
                            </label>
                        </div>
                        <div className="col-xl-10 col-lg-2 col-sm-2 border p-3">
                            <Input style={{ paddingLeft: '0.3rem' }} type="text" name="remarks" label="Remarks" value={values.remarks} onChange={handleChange} />
                        </div>



                    </div>


                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                        {/* <button style={{ padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white", marginTop: '2rem' }} onClick={handleSubmit}>Submit</button> */}
                        <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }} >Submit</Span>
                        </Button>
                    </div>



                </div>
            </div>
        </Container>


    )
}

export default DoctorForm