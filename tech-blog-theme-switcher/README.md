# Tech Blog - Responsive Website with Theme Switcher

This project is a responsive front-end for a tech blog website. It includes a light/dark theme switcher, multiple pages, and visual mock-ups for dynamic features like comments, user profiles, and chat. The current implementation is HTML, CSS, and client-side JavaScript for theme switching and mobile navigation.

## Current Front-End Features:

*   **Responsive Design:** Adapts to mobile, tablet, and desktop screens.
*   **Theme Switcher:** Allows users to toggle between a light (blue-to-aqua) and a dark theme. Preference is saved in `localStorage`.
*   **Navigation:**
    *   Homepage (`index.html`) with blog post previews and sidebar.
    *   Latest News page (`latest.html`).
    *   Categories page (`categories.html`).
    *   About Us page (`about.html`).
    *   Contact Us page (`contact.html`) with a styled contact form.
    *   Single Post page (`single-post.html`) template with a sample article.
    *   User Profile page (`profile.html`) mock-up.
    *   Chat page (`chat.html`) mock-up.
*   **Blog Post Structure:**
    *   Previews on the homepage.
    *   Detailed view on `single-post.html`.
*   **Comments Section (Mock-up):**
    *   Form to submit comments on `single-post.html`.
    *   Display area for comments on `single-post.html`.
*   **User Profile (Mock-up):**
    *   Profile icon in the header.
    *   Basic profile page structure.
*   **Chat (Mock-up):**
    *   Chat link in the navigation.
    *   Basic chat interface structure.

## Running the Front-End Locally:

1.  Ensure all project files (`index.html`, other HTML files, `css/` directory, `js/` directory) are in the same main directory (e.g., `tech-blog-theme-switcher`).
2.  Open `tech-blog-theme-switcher/index.html` in your web browser.
    *   You can typically do this by double-clicking the file or right-clicking and choosing "Open with" your preferred browser.
    *   Alternatively, if you have a simple HTTP server installed (like Python's `http.server` or Node.js `serve`), you can run it from the `tech-blog-theme-switcher` directory for a more realistic local server experience.
        *   Example with Python: `python -m http.server` (then navigate to `http://localhost:8000`)
        *   Example with Node.js `serve`: `npx serve .` (then navigate to the provided localhost address)

## MVP Backend Development - Step-by-Step Guide:

This section outlines a suggested path to build the backend functionality to make the mocked-up features work. Choose your preferred backend technology stack (e.g., Node.js/Express, Python/Django, Ruby on Rails, etc.).

**Assumptions for MVP:**
*   Focus on core functionality.
*   User authentication is key for comments, profiles, and chat.

---

**Step 1: Basic Setup & Blog Post Display (Dynamic Content)**

*   **Backend:**
    1.  **Setup Project:** Initialize your backend project, install necessary libraries (framework, database ORM/driver).
    2.  **Database - Posts:** Create a `Posts` table (e.g., `post_id`, `title`, `slug`, `content`, `author_id` (optional for MVP), `publish_date`, `image_url`).
    3.  **API - Get Posts:**
        *   `GET /api/posts`: Endpoint to retrieve a list of all posts (for `index.html` previews and potentially `latest.html`). Return essential fields (title, slug, excerpt, image_url, publish_date).
        *   `GET /api/posts/{slug_or_id}`: Endpoint to retrieve a single post by its slug or ID (for `single-post.html`).
    4.  **Seed Data:** Add a few sample posts to your database.
*   **Frontend (`index.html`, `single-post.html`, `latest.html`):**
    1.  **JavaScript:**
        *   On `index.html` load, use `fetch` to call `GET /api/posts`. Dynamically render the post previews.
        *   Update "Read More" links and post titles to navigate to `single-post.html?slug={post_slug}` or `single-post.html?id={post_id}`.
        *   On `single-post.html` load, parse the `slug` or `id` from the URL query parameters. Use `fetch` to call `GET /api/posts/{slug_or_id}`. Dynamically populate the page with the post content.
        *   (Optional) `latest.html` can also use `GET /api/posts` and potentially offer pagination if you implement it on the backend.

---

**Step 2: Contact Form Submission**

*   **Backend:**
    1.  **API - Submit Contact:**
        *   `POST /api/contact`: Endpoint to receive contact form data (`name`, `email`, `subject`, `message`).
    2.  **Validation:** Implement server-side validation for the received data.
    3.  **Action:**
        *   Send an email to your admin address (using a mail library or service like SendGrid/Mailgun).
        *   OR, store the message in a `ContactMessages` database table.
    4.  **Response:** Return a JSON success/error message.
*   **Frontend (`contact.html`):**
    1.  **JavaScript:**
        *   Add an event listener to the contact form submission.
        *   `event.preventDefault()`.
        *   Collect form data.
        *   Use `fetch` to `POST` data to `/api/contact`.
        *   Display success/error message to the user based on the backend response.

---

**Step 3: User Authentication (Core for next features)**

*   **Backend:**
    1.  **Database - Users:** Create a `Users` table (e.g., `user_id`, `username`, `email`, `password_hash`, `join_date`).
    2.  **API - Authentication:**
        *   `POST /api/auth/register`: Handle user registration. Hash passwords securely (e.g., bcrypt, Argon2) before storing.
        *   `POST /api/auth/login`: Handle user login. Compare provided password with the stored hash.
        *   `POST /api/auth/logout`: Handle user logout (invalidate session/token).
    3.  **Session Management:** Implement session management (e.g., JWT tokens stored in `localStorage` or HTTP-only cookies, or server-side sessions).
*   **Frontend (Create new HTML/JS for login/register or use modals):**
    1.  **HTML:** Create login and registration forms.
    2.  **JavaScript:**
        *   Handle form submissions for login/register, sending data to backend endpoints.
        *   Store session token upon successful login.
        *   Implement logout functionality (clear token, call logout endpoint).
        *   Update UI based on login state (e.g., show "Profile" / "Logout" instead of "Login" / "Register").

---

**Step 4: Comments (Requires User Authentication)**

*   **Backend:**
    1.  **Database - Comments:** Create a `Comments` table (e.g., `comment_id`, `post_id` (FK), `user_id` (FK), `comment_text`, `timestamp`).
    2.  **API - Comments:**
        *   `POST /api/posts/{postId}/comments`: Submit a new comment. Requires authentication. Associate comment with `user_id`.
        *   `GET /api/posts/{postId}/comments`: Retrieve comments for a post. Join with `Users` table to get author names.
*   **Frontend (`single-post.html`):**
    1.  **JavaScript:**
        *   **Displaying:** On load, fetch and display comments for the current post.
        *   **Submitting:**
            *   If user is logged in, enable the comment form.
            *   On form submission, `POST` comment data (and auth token in headers) to the backend.
            *   On success, either re-fetch comments or dynamically add the new comment to the list.

---

**Step 5: User Profiles (Basic - Requires User Authentication)**

*   **Backend:**
    1.  **API - Profile:**
        *   `GET /api/profile` (or `GET /api/users/{userId}`): Fetch profile data for the logged-in user (or specified user). Include username, email (selectively), join date, bio (if added).
        *   `PUT /api/profile`: Allow logged-in user to update their profile (e.g., bio).
*   **Frontend (`profile.html`):**
    1.  **JavaScript:**
        *   On load, if user is logged in, fetch their profile data and display it.
        *   (Optional for MVP) Implement "Edit Profile" functionality with a form and `PUT` request.

---

**Step 6: Live Chat (Advanced - Consider for post-MVP or simplified version)**

*   **Backend:**
    1.  **WebSocket Server:** Set up a WebSocket server (e.g., using Socket.IO with Node.js, Django Channels).
    2.  **Authentication:** Authenticate WebSocket connections.
    3.  **Message Handling:**
        *   Receive messages from clients.
        *   Broadcast messages to other connected clients (in a general room for MVP).
*   **Frontend (`chat.html`):**
    1.  **JavaScript:**
        *   Establish WebSocket connection if user is logged in.
        *   Send messages typed by the user.
        *   Listen for incoming messages and display them.
        *   (Basic MVP) Display a list of currently connected users (can be simplified).

---

**Further Considerations (Post-MVP):**

*   **Content Management System (CMS):** For easily adding/editing blog posts.
*   **File Uploads:** For user avatars, post images.
*   **Admin Panel:** For managing users, comments, posts.
*   **Advanced Search & Filtering:** For blog posts.
*   **Email Notifications:** For new comments, password resets, etc.
*   **Pagination:** For lists of posts, comments.
*   **More Detailed User Activity Tracking.**

This MVP roadmap focuses on getting the core dynamic features working one by one, building upon user authentication. Good luck!
