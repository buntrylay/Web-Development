import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Uploadapp.css';

const Uploadapp = () => {
  const [resultRF, setResultRF] = useState(null);
  const [resultDBSCAN, setResultDBSCAN] = useState(null);
  const [resultForecast, setResultForecast] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Automatically fetch predictions when the component mounts
    const fetchPredictions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/predict/');
        console.log('Response from API:', response.data);  // Log the API response

        // Update state with prediction results from backend
        setResultRF(response.data.random_forest);
        setResultDBSCAN(response.data.dbscan);
        setResultForecast(response.data.forecast);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setError('Error fetching predictions, please try again');
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="App">
      <h1>Data Predictions</h1>

      {loading && <p>Loading predictions...</p>}
      {error && <p className="error">{error}</p>} {/* Display errors */}

      {/* Show the visualizations */}
      <div className="visualizations-container">
        {resultRF && <RandomForestVisualization result={resultRF} />}
        {resultDBSCAN && <DBSCANVisualization result={resultDBSCAN} />}
        {resultForecast && <HoltWintersVisualization result={resultForecast} />}
      </div>
    </div>
  );
};

export default Uploadapp;

/* Component for Random Forest Visualization */
const RandomForestVisualization = ({ result }) => {
  const rooms = result.map((item) => item.Rooms);
  const predictedPrices = result.map((item) => item.Predicted_Price);

  return (
    <div>
      <h2>Random Forest Prediction</h2>
      <Plot
        data={[{
          x: rooms,
          y: predictedPrices,
          type: 'bar',
          marker: { color: 'blue' },
        }]}
        layout={{ title: 'Predicted Prices vs Rooms' }}
      />
    </div>
  );
};

/* Component for DBSCAN Visualization */
const DBSCANVisualization = ({ result }) => {
  const latitude = result.map((item) => item.Lattitude);
  const longitude = result.map((item) => item.Longtitude);
  const clusters = result.map((item) => item.Cluster);

  return (
    <div>
      <h2>DBSCAN Clustering</h2>
      <Plot
        data={[{
          x: latitude,
          y: longitude,
          mode: 'markers',
          marker: {
            size: 10,
            color: clusters,
            colorscale: 'Viridis',
          },
        }]}
        layout={{ title: 'Geo Clusters of Properties' }}
      />
    </div>
  );
};

/* Component for Holt-Winters Visualization */
const HoltWintersVisualization = ({ result }) => {
  const years = Object.keys(result.forecasted_prices);
  const forecastedPrices = Object.values(result.forecasted_prices);

  return (
    <div>
      <h2>Holt-Winters Forecasting</h2>
      <Plot
        data={[{
          x: years,
          y: forecastedPrices,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'orange' },
        }]}
        layout={{ title: 'Forecasted Property Prices (2019-2021)' }}
      />
    </div>
  );
};
