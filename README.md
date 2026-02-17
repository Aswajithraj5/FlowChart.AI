# FlowChart.AI

Turns your code into clear, visual flowcharts instantly using AI.

![FlowChart.AI](https://img.shields.io/badge/Powered%20by-Gemini%20AI-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

*   **Code to Flowchart:** Convert Python, Java, C++, and JavaScript code into Mermaid.js flowcharts.
*   **AI-Powered Explanations:** Get step-by-step algorithms and pseudocode alongside your diagrams.
*   **Interactive Editor:** Edit the generated results, copy them, or fix formatting with one click.
*   **Premium UI:** A modern, dark-themed interface built with React, Tailwind CSS, and Framer Motion.
*   **Secure Auth (Simulated):** User registration via Google Forms integration (no backend database required).

## 🛠️ Tech Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Tailwind CSS, Framer Motion
*   **AI:** Google Gemini API (`gemini-2.0-flash-exp`)
*   **Icons:** Lucide React
*   **Visualization:** Mermaid.js

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/flowchart-ai.git
    cd flowchart-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    *   Create a `.env` file in the root directory.
    *   Add your Gemini API key:
        ```
        VITE_GEMINI_API_KEY=your_actual_api_key_here
        ```
    *   *Note: Never commit your `.env` file to GitHub.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🔒 Security Note
This project uses a client-side API key for demonstration purposes. For a production deployment, it is recommended to proxy API requests through a backend server to keep your keys secure.

## 📝 License
This project is open-source and available under the MIT License.
