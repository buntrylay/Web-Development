import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Uploadapp.css';

const Uploadapp = () => {
  const [resultRF, setResultRF] = useState(null);
  const [resultDBSCAN, setResultDBSCAN] = useState(null);
  const [resultForecast, setResultForecast] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/predict/');
        setResultRF(response.data.random_forest);
        setResultDBSCAN(response.data.dbscan);
        setResultForecast(response.data.forecast);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };

    fetchPredictions();
  }, []);

  const models = [
    {
      name: 'Random Forest Prediction',
      component: <RandomForestVisualization result={resultRF} />,
      description: 'This model uses a Random Forest to predict property prices based on multiple features.',
      dataInfo: 'Data used: Number of rooms, location, property age, and distance to city center.',
      modelExplanation: 'The Random Forest model is an ensemble learning method that builds multiple decision trees and averages them to improve prediction accuracy and reduce overfitting.',
    },
    {
      name: 'DBSCAN Clustering',
      component: <DBSCANVisualization result={resultDBSCAN} />,
      description: 'DBSCAN clustering groups properties based on their geographic locations.',
      dataInfo: 'Data used: Latitude and Longitude to identify geographic clusters of properties.',
      modelExplanation: 'DBSCAN (Density-Based Spatial Clustering of Applications with Noise) groups points that are closely packed together while marking points that lie alone in low-density areas as outliers. This helps to identify clusters in spatial data.',
    },
    {
      name: 'Holt-Winters Forecasting',
      component: <HoltWintersVisualization result={resultForecast} />,
      description: 'Holt-Winters forecasting predicts future property prices over time.',
      dataInfo: 'Data used: Historical property prices over a time period.',
      modelExplanation: 'The Holt-Winters model, also known as triple exponential smoothing, is used for time-series forecasting. It takes into account seasonal variations, trends, and the overall level to make accurate future predictions.',
    },
  ];

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % models.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + models.length) % models.length);

  return (
    <div className="App">
      <h1>Data Prediction Insights</h1>
      <TransitionGroup className="slider">
        <CSSTransition key={currentSlide} timeout={600} classNames="fade">
          <div className="slide-container">
            <div className="graph-container">{models[currentSlide].component}</div>
            <div className="description-box">
              <h2>{models[currentSlide].name}</h2>
              <p><strong>Description:</strong> {models[currentSlide].description}</p>
              <p><strong>Data Info:</strong> {models[currentSlide].dataInfo}</p>
              <p><strong>Model Explanation:</strong> {models[currentSlide].modelExplanation}</p>
            </div>
            <button className="next-button" onClick={nextSlide}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6l6 6-6 6" />
              </svg>
            </button>
            <button className="prev-button" onClick={prevSlide}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 6l-6 6 6 6" />
              </svg>
            </button>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <ProgressIndicator currentSlide={currentSlide} totalSlides={models.length} />
      <button className="refresh-button" onClick={() => window.location.reload()}>
        Refresh Data
      </button>
    </div>
  );
};

export default Uploadapp;

const ProgressIndicator = ({ currentSlide, totalSlides }) => (
  <div className="progress-indicator">
    {Array.from({ length: totalSlides }).map((_, index) => (
      <div key={index} className={`progress-dot ${index === currentSlide ? 'active' : ''}`}></div>
    ))}
  </div>
);

const RandomForestVisualization = React.memo(({ result }) => {
  const rooms = result ? result.map((item) => item.Rooms) : [];
  const predictedPrices = result ? result.map((item) => item.Predicted_Price) : [];

  return (
    <Plot
      data={[
        {
          x: rooms,
          y: predictedPrices,
          type: 'bar',
          marker: { color: '#00c6ff' },
          name: 'Predicted Price',
        },
      ]}
      layout={{
        title: 'Random Forest Price Prediction',
        xaxis: { title: 'Rooms' },
        yaxis: { title: 'Predicted Price' },
        autosize: true,
        height: 400,
        paper_bgcolor: '#1e1e2e',
        plot_bgcolor: '#1e1e2e',
        font: { color: '#fff' },
        legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.2 },
      }}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
    />
  );
});

const DBSCANVisualization = React.memo(({ result }) => {
  const latitude = result ? result.map((item) => item.Lattitude) : [];
  const longitude = result ? result.map((item) => item.Longtitude) : [];
  const clusters = result ? result.map((item) => item.Cluster) : [];

  return (
    <Plot
      data={[
        {
          x: latitude,
          y: longitude,
          mode: 'markers',
          marker: {
            size: 10,
            color: clusters,
            colorscale: 'Viridis',
            colorbar: { title: 'Cluster' },
          },
          name: 'Geographic Clusters',
        },
      ]}
      layout={{
        title: 'DBSCAN Clustering',
        xaxis: { title: 'Latitude' },
        yaxis: { title: 'Longitude' },
        autosize: true,
        height: 400,
        paper_bgcolor: '#1e1e2e',
        plot_bgcolor: '#1e1e2e',
        font: { color: '#fff' },
        legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.2 },
      }}
      useResizeHandler={true}
      style={{ width: '95%', height: '100%' }}
    />
  );
});

const HoltWintersVisualization = React.memo(({ result }) => {
  const years = result ? Object.keys(result.forecasted_prices) : [];
  const forecastedPrices = result ? Object.values(result.forecasted_prices) : [];

  return (
    <Plot
      data={[
        {
          x: years,
          y: forecastedPrices,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: '#ff6347' },
          name: 'Forecasted Price',
        },
      ]}
      layout={{
        title: 'Holt-Winters Forecasting',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Forecasted Price' },
        autosize: true,
        height: 400,
        paper_bgcolor: '#1e1e2e',
        plot_bgcolor: '#1e1e2e',
        font: { color: '#fff' },
        legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.2 },
      }}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
    />
  );
});
