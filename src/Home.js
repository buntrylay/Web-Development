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
            Accurate, data-driven insights to help you make smarter housing decisions.
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
                  <AssessmentIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Comprehensive Analysis
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dive into historical trends and forecasts to guide your next property move.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" variant="outlined">
                <CardContent>
                  <TrendingUpIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Interactive Data Visualization
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Explore the market visually with interactive charts and maps, helping you understand trends and performance at a glance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" variant="outlined">
                <CardContent>
                  <AssessmentIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Predictive Analytics
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Benefit from predictive analytics that anticipate market shifts, offering foresight into price changes and demand fluctuations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" variant="outlined">
                <CardContent>
                  <ReportIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Regional Comparisons
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Easily compare regional trends, allowing you to assess opportunities and risks across multiple locations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" variant="outlined">
                <CardContent>
                  <TrendingUpIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Market Risk Assessment
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Gauge market risk factors to make more informed investment decisions, backed by detailed risk analysis.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" variant="outlined">
                <CardContent>
                  <ReportIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Regular Market Updates
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Stay informed with periodic updates that keep you aware of the latest trends and market dynamics.
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
          Leveraging advanced algorithms and cutting-edge machine learning models, we analyze vast sets of historical and real-time data to bring transparency and clarity to housing market trends. By examining patterns in pricing, demand, and market performance, our platform offers precise insights that cater to all types of market participants—whether you're a first-time buyer, a seasoned investor, or a real estate professional.
          </Typography>
        </Container>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <Container maxWidth="md" style={{ textAlign: 'center', padding: '40px 0' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Have Questions or Feedback?
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            We're here to help! Reach out with any comments or inquiries.
          </Typography>
          <Link to="/ContactUs" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" size="large" className="cta-button">
              Share Feedback
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default Home;
