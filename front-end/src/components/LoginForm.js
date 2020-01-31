import React from 'react'
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

function LoginForm({ values, errors, touched, isSubmitting }) {
    return (
        <Form>
            <div>
                {touched.username && errors.username && <p>{errors.username}</p>}
                <Field type="text" name="username" placeholder="Username" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
            </div>
            <label>
                <Field type ="checkbox" name="tos" checked={values.tos} />
                I have read and agree to the Terms of Service
            </label>
            <button disabled={isSubmitting}>Submit</button>
        </Form>
    );
}

const FormikLoginForm = withFormik({mapPropsToValues({ email, password, tos }) {
    return {
        username:username || "",
        password: password || "",
        tos: tos || false
    };
},
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Username is not valid")
            .required("Username is required"),
        password: Yup.string()
            .min(10, "Password must be 10 chracters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.username === "alreadytaken@atb.dev") {
            setErrors({ email: "That username is already taken" });
    } else {
        axios
            .post("https://INSERT-HERE.com",values)
            .then(res => {
                console.log(res);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err); // There was an error creating the data and logs to console
                setSubmitting(false);
            });
        }
    }
})(LoginForm);


export default FormikLoginForm;