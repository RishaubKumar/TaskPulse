# TaskPulse

## Project Description
TaskPulse is a web application that helps you organize your tasks. It uses AI to break down big goals into smaller, easy steps. I built this project to learn about full-stack development using React and Node.js.

## Features
- **AI Task Breakdown:** You can enter a task, and the app uses AI (Google Gemini) to give you a step-by-step plan.
- **Simple UI:** Easy to use interface to add and view tasks.
- **Responsive Design:** Works on different screen sizes.

## How to Run Locally

### Prerequisites
- Node.js installed
- Google Gemini API Key

### Steps
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RishaubKumar/TaskPulse.git
    cd TaskPulse
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Create a .env file and add your API key:
    # GOOGLE_API_KEY=your_api_key_here
    # PORT=3000
    npm start
    ```

3.  **Setup Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Open in Browser:**
    Go to `http://localhost:5173` (or the port shown in your terminal).

## Technologies Used
- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **AI:** Google Gemini API, LangChain

## Contact
Created by Rishaub Kumar.