import React, { useState } from "react";
import "./contact.css";
import emailjs from "emailjs-com";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_ty1p9d9",
                "template_tiwuosb",
                e.target, // use e.target instead of form.current
                "ciAKGsIV-L5ilNSpY"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setFormData({
                        name: "",
                        email: "",
                        message: ""
                    }); 
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact">
            {/* ... (rest of your JSX code) */}
            <form onSubmit={sendEmail}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <textarea
                    name="message"
                    rows="7"
                    placeholder="Enter Your Query"
                    required
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </section>
    );
};

export default Contact;
