
# Data Prediction Application

## Overview
This application is a data prediction and visualization tool using machine learning models to provide insights on property data. It includes a **frontend** built with React and a **backend** powered by FastAPI, integrated with various machine learning models.

## Table of Contents
- [Directory Structure](#directory-structure)
- [Setup Instructions](#setup-instructions)
- [Running Instructions](#running-instructions)
- [Configuration for AI Model Integration](#configuration-for-ai-model-integration)
- [Available Scripts](#available-scripts)
- [Learn More](#learn-more)
- [Notes](#notes)

## Directory Structure  
- **backend/app**: Contains the FastAPI application files:
  - `main.py`: The FastAPI entry point that handles API routes.
  - `model.py`: Implements data processing and machine learning model functions.
- **node_modules**: Directory for Node.js dependencies.
- **public**: Contains public assets for the frontend.
- **src**: Contains the React components, CSS, and other frontend files.
- **.gitignore**: Specifies files and directories to ignore in version control.
- **package.json**: Lists project dependencies and scripts for the frontend.
- **package-lock.json**: Locks the versions of installed dependencies.
- **README.md**: Project documentation.

## Setup Instructions

### Prerequisites
- **Backend**:
  - Python 3.8 or higher
  - FastAPI
  - Uvicorn (for running the FastAPI server)
  - Required Python libraries: `pandas`, `scikit-learn`, `statsmodels`

- **Frontend**:
  - Node.js and npm

### Installation Steps


#### 1. Frontend Setup
1. Navigate to the `web-development/ ` directory.
2. Install the required Node.js packages:
   
   `npm install`

3. Start the React application:
   
   `npm start`
   
   - The frontend will be available at `http://localhost:3000`.

#### 2. Backend Setup
1. Clone this repository.
2. Navigate to the `Web-Development/backend` directory.
3. Install the required Python packages:

   `pip install fastapi uvicorn pandas scikit-learn statsmodels`

4. Start the FastAPI server:

   `uvicorn main:app --reload`
   
   - The backend server should now be running at `http://localhost:8000`.

## Running Instructions

1. Start the backend server by running `uvicorn main:app --reload` in the `Web-Development/backend/` directory.
2. Start the frontend server with `npm start` in the `web-development` directory.
3. Open `http://localhost:3000` in your browser to access the frontend interface and interact with the application.

Here’s an expanded **AI Model Integration** section with explanations on how to integrate models in `model.py`, connect them in `main.py`, and display results on the frontend — without specific code examples:

---

## AI Model Integration

Integrating a new AI model involves three main steps: adding the model in `model.py`, connecting it to the API endpoint in `main.py`, and displaying the results on the frontend. 

### 1: Adding the Model in `model.py`
In `model.py`, you need to create functions for each AI model, including separate functions for preprocessing the data, making predictions, and postprocessing the results.

- **Preprocessing**: Start by defining a function that prepares the data specifically for your model. This may involve selecting particular columns, scaling values, or handling missing data.
  
- **Prediction**: Implement a function that loads the model, makes predictions on the preprocessed data, and returns the raw prediction results.
  
- **Postprocessing**: Finally, create a function to format the prediction results. For instance, you may need to structure the output in a way that is easy to interpret and visualize on the frontend, such as converting numerical predictions into JSON-friendly dictionaries or lists.

This modular setup in `model.py` keeps each model's logic isolated and well-organized.

### 2: Connecting Models in `main.py`
In `main.py`, connect the models by calling their functions within the `/predict/` endpoint, which serves as the main API endpoint for predictions.

- **Importing Model Functions**: Import the preprocessing, prediction, and postprocessing functions for each model from `model.py`.

- **Endpoint Logic**: Inside the `/predict/` endpoint, load the input data (e.g., an Excel file), then call the preprocessing, prediction, and postprocessing functions for each model. Store each model’s output in a structured response, such as a dictionary, which will be returned to the frontend.

This setup in `main.py` allows all model predictions to be generated and returned through a single API request, making the data easily accessible for the frontend.

### 3: Displaying Results on the Frontend
The frontend, usually managed in `Uploadapp.js` or similar components, is responsible for fetching the data from the backend and displaying it.

- **Data Fetching**: Use a method (such as `axios`) to make a request to the `/predict/` endpoint, retrieving predictions for all models. Store each model’s results in the frontend's state for easy access and rendering.

- **Data Visualization**: Create visualization components tailored to each model. For instance, if a model returns time-series predictions, use a line chart; if it provides spatial clusters, use a scatter plot. A library like Plotly or Chart.js can help create interactive charts.

- **Adding to Interface**: Integrate the new visualization components into the main display area, such as a carousel or tabbed view, so users can switch between different model predictions. This setup allows users to easily navigate and view predictions from each model.

### 4. Testing and Validation
   - **Backend Testing**: Run the backend server to ensure that the new model’s functions execute without errors. Test the `/predict/` endpoint to confirm it returns the expected JSON structure with all model outputs.
   - **Frontend Testing**: Open the frontend application and verify that it correctly displays results from the new model. Ensure that data fetched from the backend appears accurately in the UI.
   - **Integration Testing**: Perform end-to-end testing by uploading a dataset and verifying that predictions from all models are correctly displayed on the frontend.

### Summary
1. **In `model.py`**: Define functions for data preprocessing, prediction, and postprocessing for each new model.
2. **In `main.py`**: Import these functions and integrate them into the `/predict/` endpoint, allowing the frontend to access predictions from all models in a single API call.
3. **In `Uploadapp.js`**: Fetch the data from the API, create visualization components, and integrate them into the user interface for interactive data viewing.


### Backend Configuration
The backend, powered by FastAPI, includes three machine learning models for predictions:

- **Random Forest Regression**: Predicts property prices based on attributes like `Rooms`, `Distance`, `Landsize`, etc. This model is defined in `model.py` with functions for preprocessing, prediction, and postprocessing.
- **DBSCAN Clustering**: Clusters properties by geographic location. It uses latitude and longitude features to group nearby properties.
- **Holt-Winters Forecasting**: Provides time-series forecasts on property prices, predicting future trends based on historical data.

These models are triggered via the `/predict/` endpoint in `main.py`, where data processing and predictions are combined and returned as a JSON response.

### Frontend Configuration
The React frontend includes:
- **Home.js**: Displays an overview of the application and its key features.
- **Uploadapp.js**: Fetches prediction data from the backend and visualizes it using Plotly charts for different models (Random Forest, DBSCAN Clustering, and Holt-Winters Forecasting).
- **App.js**: Defines the router and navigation, linking the different sections of the application (Home, Upload, and Contact pages).


## Troubleshooting and Error Handling

This application includes robust error handling and troubleshooting mechanisms to ensure smooth operation and make it easier to debug issues across both the backend and frontend.

### Backend Error Handling (in `main.py`)
The backend, implemented in `main.py` using FastAPI, includes error handling to manage common issues such as empty or corrupted data files, model failures, and unexpected server errors.

- **File Handling Errors**: The `/predict/` endpoint loads data from an Excel file. If this file is empty, corrupted, or missing required columns, a specific error is raised. The application catches this error and returns an HTTP 400 response, informing the user about the problem with the file.
  
- **Model Prediction Errors**: Each model function (e.g., `predict_random_forest`, `predict_cluster`) might encounter errors due to data format issues or model-specific problems. A general exception handler is in place to capture unexpected errors, log them, and send an HTTP 500 response with an error message. This prevents the server from crashing and provides the user with feedback on the issue.

- **CORS Configuration**: Cross-Origin Resource Sharing (CORS) is enabled to allow requests from the frontend (`http://localhost:3000`). If this setting is misconfigured, requests from the frontend may be blocked. Ensure that the `allow_origins` parameter in CORS middleware includes the frontend’s URL to prevent this issue.

### Frontend Error Handling and Troubleshooting (in `Uploadapp.js`)
The React frontend includes error-handling mechanisms to manage network issues, data fetching errors, and any unexpected errors during rendering.

- **Network Request Errors**: When fetching data from the backend using `axios`, network-related errors (e.g., connection failures, server issues) are caught and logged to the console. If an error occurs, a message like "Error fetching predictions" is displayed to inform the user, ensuring issues like server outages are handled gracefully.

- **State Management for Error Display**: Any errors encountered are stored in the component’s state, allowing error messages to be displayed dynamically. For example, if there’s a failure to connect to the backend, a friendly error message can be shown to the user instead of leaving the display empty.

- **Browser Console Logging**: Errors and important debugging information are logged to the browser console. For example, if the backend response has an unexpected format, the console log provides a record of what went wrong, aiding in troubleshooting.

- **Error Boundaries**: Although not implemented by default, Error Boundaries can be added in React to catch rendering errors within specific components. This can help catch unexpected errors during data visualization and prevent them from crashing the entire app.

### Troubleshooting Connection Issues between Backend and Frontend
Connection issues between the backend and frontend are a common source of errors. Here are some specific troubleshooting steps:

- **Verify Correct URL and Port**: The frontend expects the backend to be running on `http://localhost:8000`. Ensure the backend server is accessible at this address; if the backend is hosted elsewhere, update the URL in `axios` requests in `Uploadapp.js`.

- **Check Backend Status**: Make sure the backend server is running by navigating to `http://localhost:8000` in your browser or using a tool like `curl`. If the backend isn’t running, the frontend won’t be able to retrieve data.

- **CORS Misconfiguration**: If you see CORS-related errors in the browser console, this could be due to a misconfiguration in the backend’s CORS settings. Ensure that `http://localhost:3000` (or the frontend’s URL) is included in the `allow_origins` parameter of the FastAPI CORS middleware.

- **Inspect Browser Console for Errors**: The browser console provides detailed error messages for issues like CORS errors, connection failures, and JSON parsing issues. Checking the console output can help identify specific problems during communication with the backend.



## Available Scripts

In the `web-development` directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits. You may also see any lint errors in the console.

### `npm test`
Launches the test runner in interactive watch mode. See the [running tests documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!** Ejecting gives full control over the configuration files and dependencies.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). To learn React, check out the [React documentation](https://reactjs.org/).

### Additional Sections:
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Troubleshooting](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

