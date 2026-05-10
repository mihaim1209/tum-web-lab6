Expense Tracker API (Lab 7)

Run the API locally:

1. Install dependencies: `npm install`
2. Start server: `npm run start:server`

Endpoints:
- `POST /token` or `GET /token?permissions=READ,WRITE` — returns a short-lived JWT (1 minute)
- `GET /expenses` — list (requires `READ` permission)
- `POST /expenses` — create (requires `WRITE` permission)
- `PUT /expenses/:id` — update (requires `WRITE` permission)
- `DELETE /expenses/:id` — delete (requires `DELETE` permission)

Swagger UI: `http://localhost:4000/docs`
