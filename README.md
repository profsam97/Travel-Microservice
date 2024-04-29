# Flight Booking Microservices

This repository utilizes microservices architecture using **NestJS**. It consists of services, each performing a specific purpose.


## Services

1. **api-gateway-service**: This service is used to route incoming requests to appropriate.
2. **auth-service**: This service is responsible for authentication.
3. **user-service**: This service handles user-related operations.
4. **hotel-service**: This service manages hotel booking-related functionality.
5. **flight-service**: This service manages flight booking-related functionality.

## Features

- **Authentication Service:**

  - **User Signup:** Users can create new accounts by providing their personal details.
  - **User Signin:** Registered users can sign in to access their accounts.
  - **Password Management:** Customers update their passwords securely.

- **Hotel Booking Service:**

  - **Ticket Booking:**  This service Enables users to book hotel tickets.
  - **Ticket Cancellation:** This service Allows users to cancel their booked hotel tickets.
  - **Ticket Detail:** This allows users to view their booked  hotel tickets.

- **Flight Booking Service:**

  - **Ticket Booking:**  This service Enables users to book flight tickets.
  - **Ticket Cancellation:** This service Allows users to cancel their booked flight tickets.
  - **Ticket Detail:** This allows users to view their booked  flight tickets.


## Other Features

### Dockerization

Each service is containerized using **Docker**, ensuring consistent deployment across environments.

### RabbitMQ Communication

I made use of **RabbitMQ** as the message broker for communication between services. It ensures reliable and asynchronous communication.

### Different Databases

- **User Service** and **Auth Service** makes use **PostgreSQL** for storing user data.
- **Flight Service** and **Hotel Service** utilize **MongoDB** for booking and payment-related data.


### OAuth2 with JWT and passport 

- **OAuth2** is used for authentication and authorization.
- **JSON Web Tokens (JWT)** are issued upon successful authentication, allowing secure communication between services.

### Getting Started

To get started with the Flight Booking System, please follow the instructions provided in the Docs folder files for each service:

- Auth Service: [Readme](https://github.com/profsam97/Travel-Microservice/tree/main/Documentations/auth-service.md)
- User Service: [Readme](https://github.com/profsam97/Travel-Microservice/tree/main/Documentations/user-service.md)
- Hotel Service: [Readme](https://github.com/profsam97/Travel-Microservice/tree/main/Documentations/hotel-service.md)
- Flight Service: [Readme](https://github.com/profsam97/Travel-Microservice/tree/main/Documentations/flight-service.md)


### Technologies Used

- Typescript
- Node.js
- Nest.js
- MongoDB (Mongoose)
- PostgreSQL (prisma)
- RabbitMQ (Message Queue)
- JSON Web Tokens (JWT)
- PASSPORT
- bcrypt.js

## Getting Started

### There are two main ways to access this app

### Number 1, Running locally

1. Clone this repository.
2. Install dependencies for each service.
3. Configure environment variables (e.g., database connections, RabbitMQ settings).
4. Run services using `npm run start`.

### Number 2, Running through Docker

1. Clone this repository.
2. Start the services using `docker compose up`.
