from fastapi.middleware.cors import CORSMiddleware 
from fastapi import FastAPI, UploadFile, File, HTTPException
import pandas as pd
from app.model import preprocess_random_forest, preprocess_dbscan, preprocess_holt_winters
from app.model import predict_random_forest, predict_cluster, forecast_price
from app.model import postprocess_random_forest, postprocess_dbscan, postprocess_holt_winters

app = FastAPI()

# Add CORS middleware for frontend-backend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend React origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (authorization, content-type, etc.)
)

@app.get("/")
async def root():
    return {"message": "FastAPI server is running"}

@app.get("/predict/")
async def predict():
    try:
        # Load the embedded Excel file
        df = pd.read_excel("data/MergeData.xlsx")

        # 1. Random Forest Processing
        df_rf = preprocess_random_forest(df)
        predictions_rf = predict_random_forest(df_rf)
        result_rf = postprocess_random_forest(predictions_rf)

        # 2. DBSCAN Processing
        geo_scaled, geo_data = preprocess_dbscan(df)
        clusters = predict_cluster(geo_scaled)
        result_dbscan = postprocess_dbscan(clusters, geo_data)

        # 3. Holt-Winters Forecast Processing
        df_forecast = preprocess_holt_winters(df)
        forecast_dict = forecast_price(df_forecast)
        result_forecast = postprocess_holt_winters(forecast_dict)

        # Return the combined result for all models
        return {
            "random_forest": result_rf,
            "dbscan": result_dbscan,
            "forecast": result_forecast
        }

    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="The embedded file is empty or corrupted")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the file: {str(e)}")