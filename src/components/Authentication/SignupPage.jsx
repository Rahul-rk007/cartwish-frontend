import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import "./SignupPage.css";
import user from "../../assets/user.png";
import { getUser, signup } from "../../services/userServices";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters." }),
    email: z.string().email({ message: "Please enter valid email." }),
    password: z
      .string()
      .min(8, { message: "Password must beat least 8 characters." }),
    cpassword: z.string(),
    address: z
      .string()
      .min(15, { message: "Address must be at least 15 characters." }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Confirm password does not match password.",
    path: ["cpassword"],
  });

const SignupPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await signup(formData, profilePic);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="align_center form_page">
      <form
        action=""
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>
        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="image_input"
          />
        </div>
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form_text_input"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="cpassword"
              id="cpassword"
              className="form_text_input"
              placeholder="Enter your confirm password"
              {...register("cpassword")}
            />
            {errors.cpassword && (
              <em className="form_error">{errors.cpassword.message}</em>
            )}
          </div>
          <div className="signup_textarea_section">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              name="address"
              id="address"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("address")}
            />
            {errors.address && (
              <em className="form_error">{errors.address.message}</em>
            )}
          </div>

          {formError && <em className="form_error">{formError}</em>}

          <button type="submit" className="signup_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignupPage;
