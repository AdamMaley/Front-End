import React from 'react'
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import Axios from 'axios';

function LoginForm({ values, errors, touched, isSubmitting }) {
    return (
        <Form>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="Email" />
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

const FormikLoginForm = withFormik({mapPropsToValues({ email, passowrd, tos }) {
    return {
        email:email || "",
        password: password || "",
        tos: tos || false
    };
},
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email is not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(10, "Password must be 10 chracters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.email === "alreadytaken@atb.dev") {
            setErrors({ email: "That email is already taken" });
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

export default LoginForm;
export default FormikLoginForm;