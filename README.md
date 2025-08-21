# fe_login

A frontend authentication system built with React and Vite, designed to handle user registration, login, and user management. The main branch is for production-ready code, and the dev branch is for local testing and development. It includes user registration with email and password, user login and authentication, password hashing for security, session management, and environment-based configuration via `.env`.

To install and set up the project, follow these steps:

1. **Clone the repository and enter the folder**:  
   `git clone https://github.com/NANB-an/fe_login.git && cd fe_login`

2. **Install dependencies**:  
   `npm install`

3. **Copy the environment file**:  
   `cp .env.example .env`

4. **Configure your `.env` file**:  
   - For **local testing**, set `VITE_API_URL=http://127.0.0.1:8000/api`.  
   - For **production**, set `VITE_API_URL=<your-production-api-url>`.  
   - Set `VITE_SANCTUM_STATEFUL_DOMAINS=localhost` for local testing or your frontend domain for production.

5. **Start the development server**:  
   `npm run dev`  
   The frontend will be accessible at `http://localhost:5173`.

**API Endpoints**:  
- `POST /api/register` – Register a new user  
- `POST /api/login` – Login a user  
- `POST /api/logout` – Logout the authenticated user  (protected route)  
- `GET /api/users` – List users (protected route)  


**Testing**:  
Run tests using:  
`npm run test`

This project is open-source under the MIT License.
