# E-commerce Backend

The **e-commerce-backend** is a powerful backend system developed for an e-commerce website. This project enables seamless management of products, orders, and user authentication. Built using Node.js, Express.js, Mongoose, and MongoDB, it offers a secure and scalable solution for online store operations.

## Features

### Admin Features

- **Admin Authentication**: Admin users can securely log in to access the backend functionalities.
- **Product Management**: Admins have the ability to add, update, and delete products. Each product can be assigned a name, description, price, and stock availability.
- **Order State Management**: Admins can change the order state, such as marking orders as pending, shipped, or any other relevant status.

### User Features

- **User Registration**: Users can register for an account to enjoy a personalized shopping experience.
- **Order Placement**: Authenticated users can place orders for the desired products.
- **Order Cancellation**: Users have the option to cancel their placed orders within a specified time frame.
- **Order Details**: Users can retrieve detailed information about their placed orders, including product selection and shipping details.

## Technologies Used

- **Node.js**: A JavaScript runtime environment for server-side development.
- **Express.js**: A minimal and flexible web application framework for Node.js.
- **Mongoose**: An object modeling tool for MongoDB, providing a straightforward schema-based solution for data modeling.
- **MongoDB**: A widely used NoSQL database for storing and managing data.
- **jsonwebtoken**: A library for generating access and refresh tokens to authenticate and authorize users.
- **Crypto js**: A library used for password encryption and decryption, ensuring secure storage of user credentials.

## Getting Started

To set up and run the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Configure the MongoDB connection in the project's configuration files.
4. Start the server: `npm start`
5. Access the backend API at `http://localhost:4500` (or the configured port).

Feel free to explore the codebase, customize it according to your requirements, and contribute to its further development.