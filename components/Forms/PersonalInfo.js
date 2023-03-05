import { useRef } from "react";
import styles from "../../styles/styles.module.scss";
import { Form } from "@unform/web";
import Input from "../Input Fields/Input";
import { useFormData } from "../../context";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  facultyEmail: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export default function PersonalInfo({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();
  const formRef = useRef();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed - do something with data
      setFormValues(data);
      nextFormStep();
    } catch (err) {
      const errors = {};
      // Validation failed - do show error
      if (err instanceof yup.ValidationError) {
        console.log(err.inner);
        // Validation failed - do show error
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        formRef.current.setErrors(errors);
      }
    }
  }

  return (
    <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
      <h2>Personal Info</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Input name="name" label="Name" type="name" />
        </div>
        <div className={styles.formRow}>
          <Input name="facultyEmail" label="Email" type="email" />
        </div>
        <div className={styles.formRow}>
          <Input name="phoneNumber" label="Email" type="tel" />
        </div>
        <button type="submit">Next</button>
      </Form>
    </div>
  );
}
