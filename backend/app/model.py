import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from statsmodels.tsa.holtwinters import ExponentialSmoothing

# Lazy loading of Random Forest model
_rf_model = None

def get_random_forest_model():
    global _rf_model
    if _rf_model is None:
        _rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    return _rf_model

# Random Forest Prediction
def predict_random_forest(df):
    features = ['Rooms', 'Distance', 'Landsize', 'BuildingArea', 'PropertyAge', 'YearBuilt', 'Lattitude', 'Longtitude']
    X = df[features]
    y = df['Price']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    rf_model = get_random_forest_model()
    rf_model.fit(X_train, y_train)

    df['Predicted_Price'] = rf_model.predict(X)
    return df[['Rooms', 'Distance', 'Predicted_Price']].to_dict(orient="records")

# DBSCAN Clustering Prediction
def predict_cluster(geo_scaled):
    dbscan = DBSCAN(eps=1, min_samples=6)
    clusters = dbscan.fit_predict(geo_scaled)
    return clusters

# Holt-Winters Forecasting Prediction
def forecast_price(df_forecast):
    model = ExponentialSmoothing(df_forecast['Price'], trend="add", seasonal=None)
    fit = model.fit()

    forecast = fit.forecast(steps=3)
    forecast_dict = dict(zip([2019, 2020, 2021], forecast))
    
    return forecast_dict

# Data Preprocessing for Random Forest
def preprocess_random_forest(df):
    # Select relevant features
    features = ['Rooms', 'Distance', 'Landsize', 'BuildingArea', 'PropertyAge', 'YearBuilt', 'Lattitude', 'Longtitude']
    df = df[features + ['Price']].dropna()
    return df

# Data Preprocessing for DBSCAN
def preprocess_dbscan(df):
    scaler = StandardScaler()
    geo_data = df[['Lattitude', 'Longtitude', 'Price']].dropna()
    geo_scaled = scaler.fit_transform(geo_data)
    return geo_scaled, geo_data

# Data Preprocessing for Holt-Winters Forecasting
def preprocess_holt_winters(df):
    df_forecast = df.groupby('Year').agg({'Price': 'mean'}).reset_index()
    return df_forecast.set_index('Year')

# Postprocessing for Random Forest Prediction
def postprocess_random_forest(predictions):
    return predictions

# Postprocessing for DBSCAN Prediction
def postprocess_dbscan(clusters, geo_data):
    geo_data['Cluster'] = clusters
    return geo_data[['Lattitude', 'Longtitude', 'Price', 'Cluster']].to_dict(orient="records")

# Postprocessing for Holt-Winters Forecasting
def postprocess_holt_winters(forecast_dict):
    return {"forecasted_prices": forecast_dict}
