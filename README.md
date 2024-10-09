# Clash Stats

Clash Stats is a React-based web application that allows users to search for player data and view detailed player profiles on a dashboard. This project is specifically designed for Clash of Clans, a mobile game that I play. The goal of this small project is to work with the Clash of Clans API and create a convenient interface for my clan, so they can view clan members and their statistics.

## Features

- **Search Field:** Users can input player names or tags into a search field.
- **Result Navigation:** Clicking on a player’s name navigates to a detailed player profile.
- **Dashboard View:** Displays detailed information about the selected player, including statistics and other relevant data.

## Motivation

This project was developed as a small experiment with React and the Clash of Clans API. It provides a user-friendly way for my clan members to view information about our clan and its members, including their achievements and statistics. Using React helps me improve my knowledge of modern frontend technologies while building a practical application for a game I enjoy in my spare time.

## Technologies Used

- **JavaScript:** The primary programming language used for writing the application's logic and functionality.
- **React:** A JavaScript library for building user interfaces, used for creating the components and managing the application's state.
- **HTML/CSS:** Markup and styling languages used to create and design the application's user interface.
- **Tailwind CSS:** A utility-first CSS framework used to style the application and ensure a responsive design.
- **Clash of Clans API:** The API used to fetch player data and statistics for the application.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Ersin2004/ClashStats.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd Clash-Stats
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Start the Development Server:**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. **Open the Application:** Navigate to `http://localhost:3000` in your web browser.
2. **Search for Players:** Enter player names or tags into the search field.
3. **View Results:**
   - **Loading Spinner:** Appears during the 3-second debounce period while search results are being fetched.
   - **No Players Found:** Displayed if no players match the search criteria after loading.
   - **Search Results:** A list of player names that can be clicked to navigate to a detailed player profile.

4. **View Player Dashboard:**
   - **Detailed Player View:** After clicking on a player’s name, users are redirected to a dashboard with detailed information about the selected player, including their statistics and performance.

## Development

### Code Overview

- **`SearchPage` Component:** Manages the search functionality and user interface.
  - **State Management:**
    - `searchQuery`: Stores the current search input.
    - `searchResults`: Stores the search results fetched from the server.
    - `isLoading`: Indicates whether the search request is in progress.
    - `error`: Stores any error messages from failed requests.
  - **Effect Hook:** Performs debounced search queries based on `searchQuery`.
  - **Event Handlers:**
    - `handleSearchChange`: Updates `searchQuery` when input changes.
    - `handlePlayerClick`: Navigates to the detailed player view when a player name is clicked.

- **Dashboard Component:** Displays detailed information about the selected player.
  - **Data Fetching:** Retrieves and shows extensive player statistics and performance metrics.

- **Debouncing:** Uses a `setTimeout` with a 3-second delay to manage debouncing and prevent excessive API calls during typing.

- **Loading Spinner:** Shows a spinner while data is being fetched to inform users that a request is being processed.

- **Error Handling:** Displays errors from failed requests to provide feedback to users in case of API issues.

## Contribution

1. **Fork the Repository.**
2. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Commit Your Changes:**

   ```bash
   git add .
   git commit -m "Add feature: your-feature"
   ```

4. **Push to the Branch:**

   ```bash
   git push origin feature/your-feature
   ```

5. **Create a Pull Request** on GitHub.

## Contact

For questions or feedback, please contact [e.karaduman3838@gmail.com](mailto:e.karaduman3838@gmail.com).

[![Connect with Ersin Karaduman on LinkedIn](https://img.shields.io/badge/Connect_with_Ersin_Karaduman_on_LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ersin-karaduman/)