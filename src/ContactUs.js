// ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.comment) formErrors.comment = 'Feedback is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch("http://localhost:8000/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setSuccessMessage(data.message); // Set success message
          setFormData({ name: "", email: "", comment: "" }); // Clear the form
          setErrors({});
        } else {
          console.error("Failed to submit feedback");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="contact-us">
      <div >
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, feel free to reach out to our team!</p>
      </div>
      <div className="team-members">
        <div className="member-card">
          <h2>Buntry Lay</h2>
          <p><strong>StudentID: </strong>103831850</p>
          <p><strong>Email: </strong>103831850@swin.edu.au</p>
          <p>
          </p>
        </div>

        <div className="member-card">
          <h2>Min Khant Aung</h2>
          <p><strong>StudentID: </strong> 103833225</p>
          <p><strong>Email:</strong> 103833225@student.swin.edu.au</p>
          <p>
  
          </p>
        </div>

        <div className="member-card">
          <h2>Channika Mao</h2>
          <p><strong>StudentID: </strong>103821194</p>
          <p><strong>Email:</strong> 103821194@student.swin.edu.au</p>
          <p>
          </p>
        </div>
      
        <div className="feedback-form">
          <h1>Feedback</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-field">
              <label>Comment</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows="5"
              />
              {errors.comment && <p className="error">{errors.comment}</p>}
            </div>

            <button type="submit">Submit</button>
          </form>

          {successMessage && <p className="success">{successMessage}</p>} {/* Display success message */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
