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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Form submitted:', formData);
      // Here you would add code to send the form data to your backend or perform some action
    }
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, feel free to reach out to our team!</p>

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
          <p><strong>StudentID: </strong> Data Analyst</p>
          <p><strong>Email:</strong> john.smith@example.com</p>
          <p>
  
          </p>
        </div>

        <div className="member-card">
          <h2>Channika Mao</h2>
          <p><strong>StudentID: </strong></p>
          <p><strong>Email:</strong> emily.johnson@example.com</p>
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
                rows="5" // Set the number of rows for larger comment box
              />
              {errors.comment && <p className="error">{errors.comment}</p>}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
