# HOF Pack — Leads API & Integration Guide

Welcome to the HOF Pack project repository. This guide provides comprehensive documentation for developers integrating with our secure **Leads API**.

---

## 🚀 CRM Developer Integration: Leads API

The Leads API allows third-party CRM systems, automation webhooks, and sales platforms to securely fetch customer inquiries and packaging leads submitted through the HOF Pack website.

---

### 1. Authentication & Security

All requests to the Leads API must include the API key in the request header.

| Header | Value | Description |
| :--- | :--- | :--- |
| `x-api-key` | `<CRM_API_KEY>` | The secret CRM API key configured in your environment |

> **Security Note:** If the `x-api-key` header is missing, incorrect, or empty, the API will immediately reject the request with HTTP `401 Unauthorized`.

---

### 2. Endpoints

#### **GET** `/api/leads`
Fetches a list of leads ordered from newest to oldest.

- **Base URL (Production):** `https://hofpack.com/api/leads`
- **Base URL (Local Development):** `http://localhost:3000/api/leads`

#### **Query Parameters (Optional)**

| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `since` | String (ISO 8601) | Optional | Filters leads created on or after the specified timestamp. | `2026-08-31T00:00:00.000Z` |

---

### 3. Response Schema

#### Success Response (`200 OK`)

```json
{
  "leads": [
    {
      "id": "664fa1e2b83f0a9c8e123456",
      "name": "Sarah Connor",
      "email": "sarah.connor@example.com",
      "phone": "+1 (555) 345-6789",
      "message": "Looking for custom rigid boxes with gold foil stamping for luxury cosmetic bottles. Quantity: 5000 pcs.",
      "created_at": "2026-08-31T08:45:22.100Z"
    },
    {
      "id": "664fa1e2b83f0a9c8e123457",
      "name": "Michael Chang",
      "email": "mchang@brandretail.com",
      "phone": "+1 (555) 987-6543",
      "message": "Requesting sample proof for tuck-top mailer boxes.",
      "created_at": "2026-08-30T14:15:00.000Z"
    }
  ]
}
```

#### Field Definitions

- **`id`** (`string`): Unique identifier of the lead.
- **`name`** (`string`): Customer full name.
- **`email`** (`string`): Customer email address.
- **`phone`** (`string`): Customer contact number (or empty string if not provided).
- **`message`** (`string`): Project details, quantity, dimensions, and custom requirements.
- **`created_at`** (`string`): ISO 8601 timestamp when the lead was submitted.

---

### 4. Error Responses

| Status Code | Reason | Example Response |
| :--- | :--- | :--- |
| **`401 Unauthorized`** | Missing or invalid `x-api-key` header | `{"error": "Unauthorized", "message": "Invalid or missing 'x-api-key' header."}` |
| **`400 Bad Request`** | Invalid `since` date format | `{"error": "Bad Request", "message": "Invalid 'since' query parameter. Must be a valid ISO-8601 date string."}` |
| **`500 Internal Server Error`** | Server / Database error | `{"error": "Internal Server Error", "message": "Failed to retrieve leads from the database."}` |

---

### 5. Example cURL Commands

#### A. Fetch all leads
```bash
curl -X GET "https://hofpack.com/api/leads" \
  -H "x-api-key: your_secure_crm_api_key_here" \
  -H "Accept: application/json"
```

#### B. Fetch incremental leads since a specific date (Polling / Cron)
```bash
curl -X GET "https://hofpack.com/api/leads?since=2026-08-31T00:00:00.000Z" \
  -H "x-api-key: your_secure_crm_api_key_here" \
  -H "Accept: application/json"
```

#### C. Local development test
```bash
curl -X GET "http://localhost:3000/api/leads" \
  -H "x-api-key: crm_live_hofpack_9f8a7b6c5d4e3f2a1" \
  -H "Accept: application/json"
```

---

### 6. Submitting Leads via Form or API

Customer inquiries submitted via the website contact form (`/contact`) are processed by `POST /api/contact`, which includes:
1. **IP Rate Limiting:** Maximum 5 submissions per 10 minutes per IP address.
2. **Zod Schema Validation:** Rigorous type and input sanitation checks.
3. **Honeypot Bot Protection:** Automated spam bot trapping.
4. **Persistent Storage:** Stored directly into the `leads` table/collection.

#### Example Lead Submission (`POST /api/contact`):
```bash
curl -X POST "http://localhost:3000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "5551234567",
    "message": "Need 2500 custom mailer boxes",
    "source": "contact_form"
  }'
```
