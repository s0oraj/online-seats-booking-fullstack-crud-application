import React,{useState} from "react";
import styles from './SigninForm.module.css';
import Navigationbar from "./Navigationbar";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Resetpassword=()=>
{
  const user = JSON.parse(localStorage.getItem("user"));
    const [form,setForm] = useState(
        {
            currentpassword:"",
            newpassword:"",
            confirmpassword:"",
            
            
        }
        );
        

    const onUpdateField=e=>
    {
        const nextFormState={
            ...form,
            [e.target.name]:e.target.value
        }
        setForm(nextFormState)
    }

    const onSubmitForm=e=>
    {
        e.preventDefault();
        
        let hasError = false;
    let errorMessage = "";

    if (form.newpassword.length < 8) {
      hasError = true;
      errorMessage = "Password must be at least 8 characters long, must contain at least one number, one lowercase letter, and one uppercase letter.";
    } else {
      const hasNumber = /\d/.test(form.newpassword);
      const hasLowercase = /[a-z]/.test(form.newpassword);
      const hasUppercase = /[A-Z]/.test(form.newpassword);

      if (!hasNumber || !hasLowercase || !hasUppercase) {
        hasError = true;
        errorMessage =
          "Password must contain at least one number, one lowercase letter, and one uppercase letter.";
      } else if (form.newpassword !== form.confirmpassword) {
        hasError = true;
        errorMessage = "New password and confirm password don't match.";
      }
    }

    if (hasError) {
      alert(errorMessage);
      return; // Prevent form submission if invalid
    }
        
        // alert(JSON.stringify(form,null,2))
          // Create reset password request
          const resetPasswordRequest = {
            newPassword: form.confirmpassword, // Replace with the actual new password
          };
          const token = localStorage.getItem("jwtToken");
          console.log(token);
          // Send reset password request
          axios
            .put(
              "https://onlineseatbooking.onrender.com/auth/user/resetpassword",
              resetPasswordRequest,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              toast.success("Password changed successfully!");
              if (response.status === 200) {
                console.log("Password reset successful");
              } else {
                console.log("Password reset failed");
              }
            })
            .catch((error) => {
              if (error.message === "Network Error") {
                console.log("Unable to connect to server");
              } else {
                console.log(error.message);
              }
            });
        

    } 

      
    return (
      <div className={styles.userprofile}>
        <header className={styles.header}>
          <br></br>
          <h1>Reset Password</h1>
        </header>

        <Navigationbar />

        <form className={styles.resetform} onSubmit={onSubmitForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <h3>Current Password</h3>{" "}
            </label>
            <input
              type="password"
              name="currentpassword"
              onChange={onUpdateField}
              className={styles.formField}
              placeholder="Current password"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <h3>New Password</h3>{" "}
            </label>
            <input
              type="password"
              name="newpassword"
              value={form.password}
              onChange={onUpdateField}
              className={styles.formField}
              placeholder="Password"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <h3>Confirm Password</h3>{" "}
            </label>
            <input
              type="password"
              name="confirmpassword"
              value={form.confirmPassword}
              onChange={onUpdateField}
              className={styles.formField}
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className={styles.formActions}>
            <button className={styles.resetformBtn} type="submit">
              Send Request
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    );
}
 
export default Resetpassword;