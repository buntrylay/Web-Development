import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Report as ReportIcon
} from '@mui/icons-material';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" className="typing-effect">
            Predicting the Housing Market
          </Typography>
          <Typography variant="subtitle1" component="p" className="hero-subtitle">
            Your trusted source for accurate housing market predictions and insights.
          </Typography>
          <Link to="/Uploadapp" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary" size="large" className="cta-button">
            Get Started
          </Button>
          </Link>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" variant="outlined">
                <CardContent>
                  <TrendingUpIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Real-Time Predictions
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Access up-to-date predictions on housing prices based on the latest data.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" variant="outlined">
                <CardContent>
                  <AssessmentIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Comprehensive Analysis
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Analyze historical trends and future forecasts to make informed decisions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" variant="outlined">
                <CardContent>
                  <ReportIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Customized Reports
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Receive tailored reports based on your preferences and market interests.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* About Section */}
      <section className="about">
        <Container maxWidth="md" style={{ textAlign: 'center', padding: '40px 0' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            About Our Service
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We utilize advanced algorithms and machine learning models to provide insights into the housing market. 
            Our goal is to help buyers, sellers, and investors make informed decisions based on reliable data.
          </Typography>
        </Container>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <Container maxWidth="md" style={{ textAlign: 'center', padding: '40px 0' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Any Comment?
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Any questions
          </Typography>
          <Link to="/ContactUs" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary" size="large" className="cta-button">
            Feedback
          </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default Home;
