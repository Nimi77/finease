## Finease

Finease is a web application designed to facilitate easy and secure financial transactions, providing users with a seamless experience for managing their finances.

### Features

- **User Authentication**: Secure login and registration process.
- **Dashboard**: A centralized interface for users to view their transaction history, manage deposits, and transfer funds.
- **Account Management**: View and manage your account details.
- **Verification**: Includes a verify feature in the dashboard header menu, allowing users to check a list of verified account numbers, ensuring transfers are working as expected.

### API Integration

- **Axios Instance**: A pre-configured `axiosInstance` is used to handle API requests, ensuring consistent inclusion of user details such as accessToken.
- **Authentication State**: User details, including `accessToken` and `refreshToken` are stored in the `authStore` and synchronized with local storage for persistent session management.
- **Token Management**: The axiosInstance automatically intercepts failed requests due to expired tokens and refreshes them using the refreshToken to maintain a seamless user experience.

### Technologies Used

- **React**: For building the user interface of the web application.
- **TypeScript**: Provides static typing to make the code more robust and easier to maintain.
- **React-query**: Helps manage server-state by fetching, caching, and synchronizing data.
- **Zustand**: A lightweight state management library for managing application state.
- **React Router**: Handles navigation and routing between pages in the app.
- **Vite**: A fast build tool and development server for building modern web applications.

### Getting Started

To get a local copy of the project running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/finease.git
   ```

2. Navigate to the project directory:
   ```bash
   cd finease
   ```
3. Install the required dependencies:

   ```bash
   npm install or bun install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the app in action.

### Usage

- **Register**: Create a new account by providing your details.
- **Login**: Access your account using your credentials.
- **Dashboard**: Manage your finances with various options like deposit and transfer.

### Hosting Link

You can access the live version of the Finease web app here:

[Finease](https://fineasee.vercel.app)

### License

Distributed under the MIT License. See `LICENSE` for more information.
