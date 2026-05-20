const transporter = require("../config/mail");

const sendRegistrationEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: email,
      subject: "Registration Successful",
      html: `
        <h2>Welcome ${name} 🎉</h2>
        <p>Your account has been created successfully.</p>
      `,
    });

    console.log("Registration email sent");
  } catch (error) {
    console.log(error);
  }
};

const sendOrderConfirmationEmail = async (
  email,
  name,
  orderId,
  total
) => {
  try {
    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: email,
      subject: "Order Confirmation",
      html: `
        <h2>Hello ${name}</h2>
        <p>Your order has been placed successfully.</p>
        <h3>Order ID: ${orderId}</h3>
        <h3>Total Amount: ₹${total}</h3>
      `,
    });

    console.log("Order confirmation email sent");
  } catch (error) {
    console.log(error);
  }
};

const sendDeliveryUpdateEmail = async (
  email,
  name,
  orderId,
  status
) => {
  try {
    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: email,
      subject: "Delivery Update",
      html: `
        <h2>Hello ${name}</h2>
        <p>Your order delivery status has been updated.</p>
        <h3>Order ID: ${orderId}</h3>
        <h3>Status: ${status}</h3>
      `,
    });

    console.log("Delivery update email sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendRegistrationEmail,
  sendOrderConfirmationEmail,
  sendDeliveryUpdateEmail,
};