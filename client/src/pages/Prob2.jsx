import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, Button } from '@mui/material';
import { notify } from '../components/tools/CustomToaster';
import '../css/Prob2.css';

const GridSelector = ({ rows = 25, columns = 71 }) => {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [polynomialData, setPolynomialData] = useState(null);

  const togglePointSelection = (x, y) => {
    if (!selectedPoints.some((point) => point.x === x && point.y === y)) {
      const sameColumnPoint = selectedPoints.some((point) => point.x === x);
  
      if (sameColumnPoint) {
        notify('You cannot select multiple points in the same column!');
        return; 
      }
    }
  
    const pointExists = selectedPoints.some((point) => point.x === x && point.y === y);
  
    if (pointExists) {
      setSelectedPoints(selectedPoints.filter((point) => point.x !== x || point.y !== y));
      setSelectedCoordinates(
        selectedCoordinates.filter((coords) => coords[0] !== x || coords[1] !== y)
      );
    } else {
      setSelectedPoints([...selectedPoints, { x, y }]);
      setSelectedCoordinates([ 
        ...selectedCoordinates,
        [x - Math.floor(columns / 2), Math.floor(rows / 2) - y],
      ]);
    }
  
    console.log(selectedCoordinates);
  };
  






  const sendSelectedPoints = async () => {
    const formattedData = selectedCoordinates.map(coord => [coord[0], coord[1]]); 
    try {
      const response = await axios.post('http://localhost:9000/polynomial', {
        data_points: formattedData, 
        degree: 5,
      });
  
      console.log('Polynomial response:', response.data);
      setPolynomialData(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error('Error sending points:', error);
      alert('An error occurred while sending points to the server.');
    }
  };
  

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="grid-selector">
      <div className="grid">

        <div className="grid-row axis">
          <div className="grid-cell"></div>
          {Array.from({ length: columns }, (_, col) => (
            <div
              key={col}
              className={`grid-cell axis-label ${col === Math.floor(columns / 2) ? 'axis' : ''}`}
            >
              {col - Math.floor(columns / 2)}
            </div>
          ))}
        </div>

        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="grid-row">
            <div
              className={`grid-cell axis-label ${row === Math.floor(rows / 2) ? 'axis' : ''}`}
            >
              {Math.floor(rows / 2) - row}
            </div>

            {/* Grid cells */}
            {Array.from({ length: columns }, (_, col) => (
              <div
                key={col}
                className={`grid-cell ${
                  selectedPoints.some((point) => point.x === col && point.y === row)
                    ? 'selected'
                    : ''
                } ${
                  col === Math.floor(columns / 2) || row === Math.floor(rows / 2)
                    ? 'axis'
                    : ''
                }`}
                onClick={() => togglePointSelection(col, row)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button className="submit-button" onClick={sendSelectedPoints}>
        Generate Polynomial
      </button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Polynomial Result
          </Typography>
          {polynomialData ? (
            <>
              <Typography variant="body1">Equation: {polynomialData.equation}</Typography>
              <Typography variant="body2">Coefficients: {polynomialData.coeffs.join(', ')}</Typography>
              <div>
                <Typography variant="body2">Plot:</Typography>
                <img
                  src={`data:image/png;base64,${polynomialData.plot_base64}`}
                  alt="Polynomial Plot"
                  style={{ maxWidth: '100%', marginTop: '16px' }}
                />
              </div>
            </>
          ) : (
            <Typography variant="body2">Loading...</Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default GridSelector;
