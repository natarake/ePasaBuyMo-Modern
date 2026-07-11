# ePasaBuyMo Feature Inventory

This document records the current behavior of the application so it can be used as a migration checklist during refactoring.

## 1. User registration

- Current behavior
  - The register page collects username, email, and password.
  - On submit, the frontend sends a POST request to the authentication registration endpoint.
  - Google sign-in is also available through Firebase popup authentication.
  - The app does not appear to show a success state after registration beyond the request result.

- Expected output
  - A new user account is created in the backend.
  - The user can then log in and access the application.

- Dependencies
  - [src/pages/Register.jsx](src/pages/Register.jsx)
  - [src/utils/RequestMethods.js](src/utils/RequestMethods.js)
  - Firebase authentication config in [src/firebase/Firebase.js](src/firebase/Firebase.js)
  - Backend auth endpoint

- Risk level if modified
  - High

---

## 2. Login/logout

- Current behavior
  - The login page accepts a username and password.
  - The frontend dispatches login logic through Redux and sends a request to the auth login endpoint.
  - On success, the user state is stored and persisted using Redux Persist.
  - Logout clears the persisted user state and navigates the user back to login.
  - Google sign-in is also offered through Firebase popup.

- Expected output
  - Authenticated users can access protected flows such as browsing, cart, and admin features.
  - Logged-out users are redirected to login.

- Dependencies
  - [src/pages/Login.jsx](src/pages/Login.jsx)
  - [src/redux/apiCalls.js](src/redux/apiCalls.js)
  - [src/redux/userSlice.js](src/redux/userSlice.js)
  - [src/redux/store.js](src/redux/store.js)
  - [src/utils/RequestMethods.js](src/utils/RequestMethods.js)

- Risk level if modified
  - High

---

## 3. User roles

- Current behavior
  - The navbar checks whether the current user is an admin via `user.isAdmin`.
  - Admin users see dashboard navigation; non-admin users see request navigation.
  - The app appears to rely on the backend returning a user object with an admin flag.

- Expected output
  - Admin users gain access to admin-only screens and features.
  - Regular users see customer-facing functionality only.

- Dependencies
  - [src/components/Navbar.jsx](src/components/Navbar.jsx)
  - [src/redux/userSlice.js](src/redux/userSlice.js)
  - Backend user payload

- Risk level if modified
  - High

---

## 4. Main user flows

### Product browsing

- Current behavior
  - Users land on the home page, which renders a navbar, slider, products list, and footer.
  - Products can be filtered by category and searched by keyword.
  - Product cards are paginated.

- Expected output
  - Users can browse products easily and find relevant items.

- Dependencies
  - [src/pages/Home.jsx](src/pages/Home.jsx)
  - [src/components/Products.jsx](src/components/Products.jsx)
  - [src/components/ProductItems.jsx](src/components/ProductItems.jsx)
  - Backend product listing endpoints

- Risk level if modified
  - Medium

### Product detail viewing

- Current behavior
  - Clicking a product opens the single-product page.
  - Product details and quantity selection are shown.
  - Users can add the selected product to the cart.

- Expected output
  - Users can view product details and add items to the cart.

- Dependencies
  - [src/pages/SingleProduct.jsx](src/pages/SingleProduct.jsx)
  - [src/redux/cartSlice.js](src/redux/cartSlice.js)

- Risk level if modified
  - Medium

### Cart management

- Current behavior
  - Users can add products to the cart.
  - Cart items are stored in Redux state and persisted.
  - Cart quantity and total price are displayed in the navbar.
  - Cart page shows the products, their quantity, and a checkout section.

- Expected output
  - Users can review and remove items from the cart before checkout.

- Dependencies
  - [src/pages/CartList.jsx](src/pages/CartList.jsx)
  - [src/redux/cartSlice.js](src/redux/cartSlice.js)
  - [src/components/Navbar.jsx](src/components/Navbar.jsx)

- Risk level if modified
  - High

### Checkout

- Current behavior
  - The cart page uses Stripe Checkout for payment.
  - On successful payment, the cart is cleared and the user is redirected.

- Expected output
  - A successful purchase flow completes and the order state is finalized.

- Dependencies
  - [src/pages/CartList.jsx](src/pages/CartList.jsx)
  - Stripe publishable key in the component
  - Backend checkout endpoint

- Risk level if modified
  - High

---

## 5. CRUD operations

### Product CRUD

- Current behavior
  - Admins can view a product list.
  - Admins can add a product.
  - Admins can update product details.
  - Admins can delete products.

- Expected output
  - Product inventory remains consistent and reflects admin changes in the UI.

- Dependencies
  - [src/admin/ProductList.jsx](src/admin/ProductList.jsx)
  - [src/admin/CreateProduct.jsx](src/admin/CreateProduct.jsx)
  - [src/admin/UpdateProduct.jsx](src/admin/UpdateProduct.jsx)
  - [src/redux/apiCalls.js](src/redux/apiCalls.js)
  - [src/redux/productSlice.js](src/redux/productSlice.js)
  - Backend product endpoints

- Risk level if modified
  - High

### Request CRUD-like flow

- Current behavior
  - Regular users can submit a product request form.
  - A request includes product details and an image upload.
  - The submission is posted to the backend request endpoint.

- Expected output
  - Admins receive the user request for a product that is not currently available.

- Dependencies
  - [src/pages/Request.jsx](src/pages/Request.jsx)
  - [src/components/Form.jsx](src/components/Form.jsx)
  - Firebase Storage
  - Backend request endpoint

- Risk level if modified
  - Medium

---

## 6. API endpoints

The frontend currently relies on the following API areas:

- Authentication
  - POST /auth/register
  - POST /auth/login

- Products
  - GET /products
  - GET /products?category=...
  - GET /products/find/:id
  - POST /products
  - PUT /products/:id
  - DELETE /products/:id

- Checkout
  - POST /checkout/payment

- Requests
  - POST /request

- Dependencies
  - [src/redux/apiCalls.js](src/redux/apiCalls.js)
  - [src/components/Products.jsx](src/components/Products.jsx)
  - [src/pages/SingleProduct.jsx](src/pages/SingleProduct.jsx)
  - [src/pages/CartList.jsx](src/pages/CartList.jsx)
  - [src/pages/Request.jsx](src/pages/Request.jsx)

- Risk level if modified
  - High

---

## 7. Database collections/tables

Based on the current application behavior and naming conventions, the likely backend data model includes:

- users
  - Stores authentication and profile-related information.
  - Used for login, registration, and admin role checks.

- products
  - Stores product metadata such as name, description, price, category, stock status, image URL, and ID.
  - Used across browse, detail, admin CRUD, and cart flows.

- requests
  - Stores customer product requests and associated media.

- orders or payment-related records
  - Likely generated during checkout/payment processing.

- Dependencies
  - Backend service referenced in the README and API calls
  - Current frontend assumptions around product shape and user payloads

- Risk level if modified
  - High

---

## 8. Screens/pages

- Home page
  - [src/pages/Home.jsx](src/pages/Home.jsx)

- Login page
  - [src/pages/Login.jsx](src/pages/Login.jsx)

- Register page
  - [src/pages/Register.jsx](src/pages/Register.jsx)

- Product detail page
  - [src/pages/SingleProduct.jsx](src/pages/SingleProduct.jsx)

- Cart page
  - [src/pages/CartList.jsx](src/pages/CartList.jsx)

- Request page
  - [src/pages/Request.jsx](src/pages/Request.jsx)

- Admin dashboard
  - [src/admin/Dashboard.jsx](src/admin/Dashboard.jsx)

- Admin product list
  - [src/admin/ProductList.jsx](src/admin/ProductList.jsx)

- Admin create product page
  - [src/admin/CreateProduct.jsx](src/admin/CreateProduct.jsx)

- Admin update product page
  - [src/admin/UpdateProduct.jsx](src/admin/UpdateProduct.jsx)

- Risk level if modified
  - Medium

---

## 9. Navigation paths

- /
  - Home page, redirects to login if unauthenticated in the current routing logic.

- /login
  - Login screen.

- /register
  - Registration screen.

- /cart
  - Cart page.

- /product/:id
  - Single product detail page.

- /request
  - Product request page for non-admin users.

- /admin
  - Admin dashboard.

- /products
  - Create product page.

- /products/:id
  - Update product page.

- Dependencies
  - [src/App.js](src/App.js)

- Risk level if modified
  - Medium

---

## Migration checklist notes

- Authentication and role handling are high-risk because they affect access control and session persistence.
- Cart and checkout are high-risk because they affect transactional behavior.
- Product CRUD is high-risk because it impacts the core inventory experience.
- UI pages and navigation are medium-risk and easier to evolve safely.
- Any migration should preserve current route behavior and backend contract expectations until explicitly changed.
