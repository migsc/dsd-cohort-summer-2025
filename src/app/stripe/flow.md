+------------------+ (1) User Clicks "Pay" +----------------------------------+
| FRONTEND | ----------------------------> | BACKEND: /api/generate-checkout |
| (Booking Form) | | |
| | | - Gets/Creates Stripe Customer |
| | | (Stores cus*... in KV) |
| | | - Creates Checkout.Session (cs*...) |
| | | (with mode, line*items, URLs) |
| | | - Returns Stripe Checkout URL |
+------------------+ +----------------------------------+
| |
| (2) Browser Redirects |
V |
+--------------------------+ |
| STRIPE-HOSTED | <-----------------------------+
| CHECKOUT PAGE |
| |
| - User Enters Payment |
| - Stripe Processes Payment, Creates PaymentIntent (pi*...) |
| |
+--------------------------+
| |
| | (3) Redirects upon Success
| +---------------------------------> +-----------------------------+
| | FRONTEND: /success Page |
| | |
| | - Triggers BACKEND sync call|
| | (e.g., to syncStripeDataToKV) |
| +-----------------------------+
| |
| | (4) Calls syncStripeDataToKV
| V
| +-----------------------------+
| | BACKEND: syncStripeDataToKV |
| | |
| | - Fetches PaymentIntent status from Stripe |
| | - Updates KV Store with status |
| | - (Optional) Updates Your App DB|
+-----------------------------------------> +-----------------------------+
|
| (5) User Redirects to Dashboard/Confirm
V
+---------------------+
| FRONTEND: |
| Dashboard / |
| Confirmation Page |
+---------------------+

+--------------------------+
| STRIPE-HOSTED |
| CHECKOUT PAGE (continued)|
| |
| - Also, regardless of |
| redirect... |
| - Stripe Emits Webhook |
| Events (e.g., |
| payment_intent.succeeded, |
| checkout.session.completed)|
+--------------------------+
|
| (A) Webhook Event Sent (Asynchronous)
V
+--------------------------+
| BACKEND: /api/stripe |
| (Webhook Handler) |
| |
| - Verifies Signature |
| - Calls syncStripeDataToKV for relevant events |
| - Updates KV Store |
| - CRITICAL: Updates Your |
| App's Primary Database |
+--------------------------+
