import React from "react";
import { useSelector } from "react-redux";

const Contact = () => {
  const { isAuthenticated,user,token,email } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Contact Page</h1>
      {/* Your contact form or content goes here */}
      <h1>hello</h1>
      <h1>{user}</h1>
      <h1>{email}</h1>
    </div>
  );
};

export default Contact;
