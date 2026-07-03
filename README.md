# EdgeShield AI

EdgeShield AI is a comprehensive security and telemetry monitoring solution that leverages advanced AI models to provide real-time protection and insights for your applications. It features a robust backend powered by FastAPI and Node.js, and an intuitive frontend built with React.

## Features

- **Real-time Threat Detection:** AI-driven security monitoring to detect and mitigate threats instantaneously.
- **Comprehensive Telemetry:** Detailed logging and monitoring of application performance and usage metrics.
- **Interactive Dashboard:** A modern, responsive React frontend for visualizing security events and telemetry data.
- **Multi-language Backend:** Combining the performance of FastAPI (Python) for AI tasks with the versatility of Node.js for real-time services.
- **Secure Authentication:** Built-in secure authentication to protect sensitive data and controls.

## Technology Stack

- **Frontend:** React, Vite, Tailwind CSS, Recharts
- **Backend:** FastAPI (Python), Node.js, Express
- **AI & Analytics:** Custom Python AI engines and models
- **Database:** Configurable data storage solutions

## Project Structure

```
edgeshield-ai/
├── backend/                # Backend source code (FastAPI & Node.js)
│   ├── ai_engine.py        # Python AI Engine
│   ├── aiEngine.js         # Node.js AI Engine integration
│   ├── main.py             # FastAPI entry point
│   ├── server.js           # Node.js entry point
│   └── ...                 # Additional backend services
├── src/                    # Frontend source code (React)
│   ├── components/         # Reusable React components
│   ├── pages/              # Application pages
│   └── ...
├── public/                 # Static assets
└── package.json            # Node.js dependencies and scripts
```

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aishwarya-s2711/edgeshield.ai.git
   cd edgeshield.ai
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   Navigate to the `backend` directory and install the necessary Python and Node.js dependencies.
   ```bash
   cd backend
   npm install
   # For Python dependencies (assuming a requirements.txt exists or using pip directly)
   # pip install -r requirements.txt
   ```

4. **Run the Development Server:**
   From the root directory, start the frontend:
   ```bash
   npm run dev
   ```
   Start the backend services as per their respective start scripts.

## Screenshots

*(Add screenshots of your application here)*

## License

This project is licensed under the MIT License - see the LICENSE file for details.
