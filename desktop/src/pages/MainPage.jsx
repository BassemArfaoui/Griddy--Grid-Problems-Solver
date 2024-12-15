import React from 'react';
import { Grid, Zap, Infinity, Puzzle } from 'lucide-react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <div className="bg-dark text-light pt-5" tyle={{ height: 'calc(100vh)'}}>
      <main className="overflow-auto" > 
        <section className="text-center py-5">
          <Container>
            <Grid className="text-success" style={{ width: 150, height: 150 }} />
            <Typography variant="h2" className="mb-4 mt-4">Welcome to <span className="fw-bolder">Griddy</span></Typography>
            <Typography variant="body1" className="mb-4 fs-5" style={{ maxWidth: '700px', margin: 'auto' }}>
              We present all the Grid Optimization Solutions<br /> you'll ever need
            </Typography>
            <Button variant="success" size="lg" href="#" className="px-5 py-3">
              See Problems
            </Button>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            <Typography variant="h4" className="text-center mb-5">Why Choose Griddy?</Typography>
            <Row>
              <Col md={4} className="mb-4">
                <FeatureCard
                  icon={<Zap className="text-success" style={{ width: 48, height: 48 }} />}
                  title="Lightning Fast"
                  description="Experience rapid problem solving using Gurobi."
                />
              </Col>
              <Col md={4} className="mb-4">
                <FeatureCard
                  icon={<Infinity className="text-success" style={{ width: 48, height: 48 }} />}
                  title="Totally scalable"
                  description="get the unlimited version to take the problem to a bigger scale"
                />
              </Col>
              <Col md={4} className="mb-4">
                <FeatureCard
                  icon={<Puzzle className="text-success" style={{ width: 48, height: 48 }} />}
                  title="Change the Coplexity"
                  description="you can play with complexity if you like to experience the different results "
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="position-relative py-5" style={{ backgroundColor: '#28a745', opacity: 0.8 }}>
          <Container className="position-relative z-index-10 text-center py-5">
            <Typography variant="h4" className="mb-4">Ready to Grid?</Typography>
            <Typography variant="body1" className="mb-5 fs-5" style={{ maxWidth: '700px', margin: 'auto' }}>
              Join us to get the best out of our Grid Optimization
            </Typography>
            <Button variant="success" size="lg" href="#" className="px-5 py-3">
              Create Free Account
            </Button>
          </Container>

        </section>
      </main>

      <footer className="py-4 bg-dark text-center text-light">
        <Container>
          <Typography variant="body2" className='fw-bold text-secondary fs-6 mt-3'>Griddy, All rights reserved &copy; 2024 . </Typography>
        </Container>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="bg-dark text-light text-center p-4 h-100 border border-success">
      <Card.Body>
        <div className="mb-3">{icon}</div>
        <Typography variant="h5" className="mb-3">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Card.Body>
    </Card>
  );
}
