# Interbanking Challenge API 🚀

Welcome to the backend solution developed for the Interbanking technical challenge. This REST API is built with **Node.js**, **Express**, **MongoDB**, and follows the **Hexagonal Architecture (Ports and Adapters)** pattern. The project is containerized with Docker and includes security layers such as **JWT-based authentication** and **HTTPS support**.

🔗 Deployed at: https://challenge-interbanking.crisdev.tech

---

## 📁 Project Structure

```
src/
├── domain/              # Business logic and models
├── application/         # Use cases (services)
├── infrastructure/
│   ├── db/              # MongoDB repositories
│   └── http/            # HTTP routes and middlewares
├── config/              # Configuration files (e.g., dotenv)
tests/                   # Unit tests
```

---

## ⚙️ Getting Started with Docker

1. Clone the repository:

```bash
git clone https://github.com/your-username/interbanking-challenge-api.git
cd interbanking-challenge-api
```

2. Create the environment file:

```bash
cp .env.example .env
```

3. Run the project:

```bash
docker-compose up --build
```

4. API will be available at:

```
https://challenge-interbanking.crisdev.tech
```

---

## 🧪 API Endpoints

| Method | Endpoint                                 | Description                                |
|--------|------------------------------------------|--------------------------------------------|
| POST   | `/auth/login`                            | Authenticates user and returns a JWT token |
| GET    | `/empresas-transferencias-recientes`     | Lists companies with transfers in last month |
| GET    | `/empresas-adhesiones-recientes`         | Lists companies added in last month         |
| POST   | `/empresas`                              | Registers a new company                     |

All protected endpoints require a valid JWT in the `Authorization` header.

---

## 🧾 Example JSON Payloads

### Registering a Company

```json
{
  "cuit": "20304050607",
  "razonSocial": "Tech Solutions SRL",
  "fechaAdhesion": "2024-08-10T00:00:00Z"
}
```

### Transfer Record (internal document schema)

```json
{
  "empresaId": "6532e0dc0cf82305e4f0f6c1",
  "importe": 15000.75,
  "cuentaDebito": "0011223344556677889900",
  "cuentaCredito": "0099887766554433221100",
  "fecha": "2024-08-20T12:34:56Z"
}
```

---

## 🔐 Security Considerations

This API incorporates several layers of security to simulate real-world enterprise-grade applications, especially within a banking context:

### ✅ JWT Authentication

- Access to protected endpoints is restricted via **JWT tokens**.
- Users must log in with valid credentials to receive a token.
- Tokens are signed using a secure secret and have configurable expiration.

### ✅ Input Validation

- All incoming payloads are validated using **Joi** to ensure data integrity.
- Invalid or malformed data receives a `400 Bad Request`.

### ✅ HTTPS

- The API is served under a valid HTTPS certificate.
- This ensures **encrypted communication** between clients and the server.
- The production domain is: `https://challenge-interbanking.crisdev.tech`

### ✅ Helmet

- **Helmet** is used to apply secure HTTP headers (e.g., `X-Content-Type-Options`, `Strict-Transport-Security`, etc.)

### ✅ MongoDB Isolation

- The MongoDB container is **not exposed to the host**.
- It is only accessible internally via Docker’s network by the Node.js container.

### ✅ Centralized Error Handling

- The application uses a centralized error handler to:
  - Prevent stack traces from leaking
  - Respond with generic error messages when unexpected errors occur

---

## 🧱 Why Hexagonal Architecture?

This project uses **Hexagonal Architecture (Ports and Adapters)** to structure the application in a clean, maintainable way:

- **Domain**: Pure business logic and validation (no dependencies)
- **Application**: Use cases (services that orchestrate logic)
- **Infrastructure**: Implementations of adapters (e.g., Express routes, MongoDB repos)

### Benefits:

- 🔁 Easily testable (mock repositories without DB)
- 🧪 Unit-testable business logic
- 🛠️ Easily swappable adapters (e.g., swap Mongo for PostgreSQL)
- 🔐 Minimizes side-effects by isolating the domain

---

## 🔑 Authentication Flow

1. **Login** using a valid CUIT and password:

```bash
curl -X POST https://challenge-interbanking.crisdev.tech/auth/login \
     -H "Content-Type: application/json" \
     -d '{ "cuit": "20304050607", "password": "interbank123" }'
```

2. **Receive token**:

```json
{ "token": "eyJhbGciOi..." }
```

3. **Call protected endpoint** with token:

```bash
curl -X GET https://challenge-interbanking.crisdev.tech/empresas-adhesiones-recientes \
     -H "Authorization: Bearer <token>"
```

---

## 🧪 Testing

Run unit tests with:

```bash
npm test
```

Tests are focused on:

- ✅ Business logic (domain and services)
- ✅ Authentication flow
- ✅ Repository behavior with mocks

---

## 📄 License

MIT

---

Developed by [Cris Dev](https://crisdev.tech) — [LinkedIn](https://linkedin.com/in/christian-rios-dev)