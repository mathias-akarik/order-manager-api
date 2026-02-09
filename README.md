

````md
# Order Management Feature — Architecture & Planning Notes

## Technology Stack
This feature was designed and implemented using a simple, production-shaped stack:

- **Frontend:** Next.js (React)  
- **Backend:** Node.js with Express (REST API)  
- **Language:** TypeScript  
- **Testing:** Jest + Supertest  
- **Persistence:** In-memory storage (assessment scope)  
- **Deployment Targets:** Vercel (frontend), Node-compatible hosting (backend)

The stack was intentionally kept lightweight while following real-world architectural patterns to ensure clarity, testability, and ease of future extension.

---

## Goal
Deliver a minimal yet production-shaped Order Management slice for a food delivery application that supports:

- Displaying menu items (name, description, price, image, category)
- Cart and checkout flow with quantities and delivery details
- Order placement and order status tracking
- Simulated real-time status updates
- A REST API with strong input validation
- Test coverage for critical backend behavior

This project balances realism with assessment scope: the system is deployment-ready by design while using in-memory persistence for simplicity.

---

## Requirement Decomposition (Pre-Implementation Plan)
Before implementation, the requirements were broken down into four clear domains. Treating these as independent concerns helped keep the codebase clean, testable, and easy to reason about.

### 1. Menu Retrieval
- Provide a stable API for fetching available menu items.
- Keep menu structure database-agnostic so persistence can be swapped later.

### 2. Order Creation
- Accept delivery details and ordered items with quantities.
- Validate input at the API boundary to prevent invalid state from entering the system.

### 3. Order Lifecycle & Status Tracking
- Model a deterministic order lifecycle:
  `Order Received → Preparing → Out for Delivery → Delivered`
- Design the mechanism so it can later be replaced with background workers or queues.

### 4. Testing Strategy
- Cover order creation, retrieval, validation, and status transitions.
- Ensure tests are deterministic, fast, and regression-focused.

---

## System Architecture Overview
The backend follows a layered architecture that mirrors common production systems:

- **Application Layer (`app.ts`)**  
  Defines the Express application, middleware, and route mounting.  
  Exported for use in integration tests.

- **Server Entry Point (`server.ts`)**  
  Responsible only for binding the port and starting the process.

- **Routes Layer**  
  Defines API endpoints and delegates logic to controllers.

- **Controllers Layer**  
  Handles request validation, input shaping, and orchestration of domain behavior.

- **Domain Models (TypeScript Interfaces)**  
  Defines the shape of `Order` and `MenuItem` to ensure consistency and type safety.

- **Persistence (In-Memory Store)**  
  Orders and menu data are stored in memory to meet assessment constraints, while keeping the design database-agnostic.

This separation of concerns keeps controllers thin, improves testability, and makes future refactoring straightforward.

---

## API Design (Planned Contract)
All endpoints are served under an `/api` prefix for clarity and future versioning.

### Menu
- `GET /api/menu`  
  Returns a list of available menu items.

### Orders
- `POST /api/order`  
  Body:
  ```json
  {
    "userDetails": { "name": "string", "address": "string", "phone": "string" },
    "items": [{ "menuItemId": "string | number", "quantity": number }]
  }
````

Returns the created order.

* `GET /api/orders/:id`
  Returns an order with its current status derived via simulation.

* `GET /api/orders`
  Returns all non-delivered orders.

* `PUT /api/order/status`
  Body:

  ```json
  { "id": "string", "status": "Order Received | Preparing | Out for Delivery | Delivered" }
  ```

  Returns the updated order.

---

## Order Status Simulation (Real-Time Approximation)

To approximate real-time behavior without additional infrastructure:

* Each order stores a `createdAt` timestamp.
* On retrieval (`GET /api/orders/:id`), the backend derives the current status based on elapsed time.

Current thresholds (optimized for quick demonstration and testing):

* `0–5s` → Order Received
* `5–15s` → Preparing
* `15–30s` → Out for Delivery
* `>30s` → Delivered

This approach mimics a worker-driven state machine while remaining lightweight and easy to reason about.

---

## Validation & Safety

Validation is enforced at the API boundary to protect system integrity:

* Reject missing user details or empty item lists.
* Reject invalid order IDs.
* Reject invalid status transitions.
* Apply CORS restrictions to allow only the hosted frontend and localhost development.

By preventing invalid state from entering the system, downstream logic remains predictable and simpler to maintain.

---

## Scalability & Production Hardening (Planned Extensions)

If extended beyond assessment scope, the system is designed to support:

* Replacing in-memory storage with a database
  (e.g., PostgreSQL with Prisma or MongoDB)
* Moving status transitions to background workers and queues
  (BullMQ, RabbitMQ, SQS)
* Introducing real-time transport
  (WebSockets or Server-Sent Events)
* Stronger schema validation
  (Zod or Joi)
* Authentication and rate limiting if required

The current architecture intentionally keeps these upgrades low-friction.

---

## Testing Strategy

Testing focuses on the most critical behaviors:

* Happy-path order creation
* Input validation failures
* Status transition correctness
* Order retrieval

Tests are designed to be deterministic, fast, and regression-oriented.

> Note: The Express application is exported separately from the server listener to allow Supertest integration without binding a network port, which improves test stability.

---

## Deployment Notes

The backend is structured for both local development and hosted environments:

* CORS supports localhost and the hosted frontend domain.
* The listening port is configurable via the `PORT` environment variable.
* No architectural changes are required for deployment.

```

