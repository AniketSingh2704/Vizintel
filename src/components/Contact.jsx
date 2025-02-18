import React from "react";
import { useSelector } from "react-redux";

const Contact = () => {
  const { isAuthenticated, user, email, password, schoolName } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {/* Container for the content */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Contact Page</h1>

        {/* Display User Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">User Information</h2>
          <div className="space-y-4">
            <p className="text-lg">
              <strong>Name:</strong> {user}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {email}
            </p>
            <p className="text-lg">
              <strong>Password:</strong> {password ? "*****" : "Not Available"}
            </p>
            <p className="text-lg">
              <strong>School:</strong> {schoolName}
            </p>
          </div>
        </div>

        {/* Contact Form or Message */}
        <div>
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            If you have any questions, feel free to reach out to us through this form.
          </p>
          {/* Add your contact form here */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

