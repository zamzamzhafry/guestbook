# Guestbook and Invitation Website To-Do List

## Project Setup

-   [ V ] Set up Next.js project and dependencies
-   [ V  ] Install Prisma and configure database
-   [ ] Set up authentication

## Pages and Components

### Main Pages

-   [ ] **Home Page** (`/`)

    -   [ ] Introduction and link to Dashboard (for admins and authenticated users)

-   [ ] **Guest Dashboard** (`/dashboard`)

    -   [ ] Input fields for adding guests manually
    -   [ ] Import guest list via XLS format (e.g., using `read-excel-file` or `SheetJS`)
    -   [ ] Display guest list with actions like edit, delete, or confirm attendance
    -   [ ] Show links to generated invitations for each guest

-   [ ] **Invitation Page** (`/invitation/[guestId]`)
    -   [ ] Show invitation details (name, date, location, Google Maps link)
    -   [ ] Button to copy invitation details or share to messaging apps

### Attendance Pages

-   [ ] **QR Code Generator and Scan** (`/attendance/qr-generator`)

    -   [ HALF ] QR code generator with options for encoding invitation details
    -   [ V ] QR code scanner (use a library like `react-qr-reader`) to scan codes and mark attendance

-   [ ] **Front Desk** (`/attendance/check-in`)
    -   [ ] Front desk (or keeper) page to confirm attendance status
    -   [ ] Option to manually add a guest if they are not listed

### Real-time Guestbook Page (`/guestbook`)

-   [ ] Display list of guests who have confirmed attendance, with real-time updates
-   [ ] Show congratulatory messages as each guest checks in, possibly using a WebSocket connection

### Admin Dashboard (`/admin`)

-   [ ] Admin dashboard for managing guests and events
-   [ ] View, add, update, or delete guests
-   [ ] Generate a shareable link for each guest's invitation
-   [ ] Import XLS guest lists
-   [ ] Manage location, date, and event details

## Additional Components and Functionality

-   [ ] **Navigation and Layout**

    -   [ ] Set up a main navigation bar with links to Home, Dashboard, Guestbook, etc., based on user roles
    -   [ ] Ensure responsive layout with consistent styling

-   [ ] **QR Code Generator**

    -   [ ] Component to generate QR codes with attendance URLs (`/attendance/check-in?guestId=[id]`)
    -   [ ] Add QR code download and copy options

-   [ ] **Invitation Sharing**

    -   [ ] Copy-to-clipboard button for sharing invitation details
    -   [ ] Link to Google Maps based on event location

-   [ ] **Real-time Updates**

    -   [ ] Integrate WebSockets or a solution like Firebase for real-time updates on attendance
    -   [ ] Display congratulatory messages for new check-ins

-   [ ] **Form and Validation**

    -   [ ] Validate forms for guest entry, invitation details, and attendance

-   [ ] **File Upload and Parsing**

    -   [ ] Use a package like `SheetJS` to import guests from XLS files

-   [ ] **Error Handling and Notifications**
    -   [ ] Add notifications for success/failure in guest addition, attendance confirmation, etc.
