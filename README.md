# PecheTech Fuel Service

## 📝 Overview
The Fuel Service is a NestJS microservice responsible for managing fuel consumption, tracking fuel cards, and analyzing fuel-related expenses. It follows Domain-Driven Design (DDD) to keep business rules strictly isolated and well-organized.

## 🛠 Tech Stack
- **Framework:** NestJS
- **Language:** TypeScript
- **Containerization:** Docker

## 📂 Project Structure
- `/src`: Application source code
  - `/core`: Domain logic and entities
  - `/use-cases`: Application services
  - `/presentation`: REST controllers and DTOs
  - `/infrastructure`: Data access and external APIs
- `/tests`: Unit, integration, and e2e tests
- `/docs`: API specifications and DDD models
- `/docker`: Docker configurations

## ⚙️ Prerequisites
- Node.js (v18+)
- npm or yarn
- Docker & Docker Compose

## 🚀 Setup & Installation
1. Install dependencies:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application
**Development Mode:**
```bash
npm run start:dev
```

**Using Docker:**
```bash
docker-compose -f docker/docker-compose.yml up --build
```

## 🧪 Testing
```bash
npm run test
```
