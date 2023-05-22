import * as Yup from 'yup'

const patientValidation = Yup.object({
    first_name: Yup.string().required("Please Enter Patient Name"),
    date_of_birth:Yup.date().required("Please Enter Patient DOB"),
    gender:Yup.string().required("Please Enter Patient Gender"),
    mobile_no:Yup.number().required("Please Enter Patient Mobile Number"),
    cnic:Yup.string().required("Please Enter Patient CNIC")
})
const doctorValidation = Yup.object({
    first_name:Yup.string().required("Please Enter Doctor Name"),
    date_of_birth:Yup.string().required("Please Enter Doctor DOB"),
    gender:Yup.string().required("Please Enter Doctor Gender"),
    mobile_no:Yup.number().required("Please Enter Doctor Mobile Number"),
    email:Yup.string().email().required("Please Enter Doctor Email"),
    cnic:Yup.string().required("Please Enter Doctor CNIC"),


})

export {patientValidation,doctorValidation}