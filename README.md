# WaterPleaseApp – Backend

WaterPleaseApp is a full-stack web application for managing indoor plants, visualizing their placement on a grid map, and tracking watering schedules.

Frontend: React + TypeScript  
Backend: Node.js + Express + MongoDB

Frontend repository: https://github.com/Anty-Anty/WaterPleaseApp

## Live API: (used by the frontend demo)
https://waterpleaseapp.netlify.app

<!-- ⚠️ Cold Start Notice
The backend is hosted on Render’s free tier.
Initial requests may take up to ~60 seconds while the server wakes up. -->

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- express-validator
- REST API
- MongoDB Transactions (Sessions)

## Why I Built This

I built this backend to practice real-world REST API design, MongoDB data modeling, transactional updates, and maintaining consistency between related resources (plants ↔ maps). The focus was on correctness, clarity, and predictable frontend–backend contracts rather than authentication or user management.

## Architecture Overview

The backend exposes two main resources:

- Plants – core domain entity (watering logic, map position)
- Maps – grid configuration and plant placement references

Each plant can exist independently or be assigned to a map position.
Map updates and plant assignments are handled atomically to prevent data desynchronization.

## Key Technical Decisions
<details>

### 1. RESTful Resource Design
Plants and maps are modeled as separate resources with clear responsibilities:
- Plants store their own state (mapPosition, watering data)
- Maps store references to assigned plants
This avoids duplicating layout logic across collections.

### 2. MongoDB Transactions for Data Integrity
When assigning or removing a plant from a map, MongoDB sessions are used to ensure:
- Plant documents
- Map documents
are updated atomically, preventing partial or inconsistent writes during drag & drop or deletion flows.

### 3. Explicit Validation with express-validator
All write operations are validated at the API boundary:
- Required fields
- Value ranges
- Date formats (YYYY-MM-DD)
This keeps the backend resilient and reduces defensive logic in the frontend.

### 4. Backend as Source of Truth
The backend always remains authoritative:
- The frontend performs optimistic UI updates
- Final state is confirmed via API responses
This pattern keeps the UI responsive while preserving correctness.

### 5. Clear Frontend–Backend Contract
API responses return normalized objects using:

`toObject({ getters: true })`

This ensures:
- Consistent id fields
- Minimal frontend transformation
- Easier future extension (e.g. users, multiple maps)

</details>

## API Endpoints
### 🌱 Plants
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/plants` | Fetch all plants |
| POST | `/api/plants/createplant` | Create a new plant |
| PATCH | `/api/plants/:pid` | Update plant data or map position |
| DELETE | `/api/plants/:pid` | Delete plant and clean up map references |

### 🗺 Maps
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/maps` | Fetch map configuration |
| PATCH | `/api/maps/editmap` | Update active map squares |

## Features
### 🌱 Plant Management

- Create plants with:
    - Name
    - Icon
    - Water level
    - Last watered date
    - Watering interval
- Update plant metadata
- Delete plants with automatic cleanup of map references

### 🗺 Map Synchronization

- Grid-based map configuration
- Assign plants to map positions
- Remove plants from map squares
- Transaction-safe updates to avoid orphaned references

### 🧠 Data Integrity

- MongoDB sessions for multi-document updates
- Validation on all write operations
- Graceful error handling with consistent HTTP responses

### Error Handling

A centralized error-handling middleware ensures:
- Predictable API responses
- Meaningful HTTP status codes
- No silent failures during transactional updates


## Future Improvements

- Authentication & user accounts
- Per-user maps and plants
- Multiple maps / rooms
- Role-based access control
- Rate limiting and request logging