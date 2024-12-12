import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const RouterPlacementForm = () => {
  const [gridSize, setGridSize] = useState(""); // No initial value for grid size
  const [routerRanges, setRouterRanges] = useState(""); // No initial value for router ranges
  const [walls, setWalls] = useState([]);
  const [grid, setGrid] = useState([]);
  const [open, setOpen] = useState(false); // To control modal visibility
  const [error, setError] = useState(""); // To handle errors
  const [message, setMessage] = useState("Please fill the form to proceed.");

  // Automatically calculate the number of routers based on the routerRanges array length
  const numRouters = routerRanges ? routerRanges.split(",").length : 0;

  // Generate grid based on gridSize
  const generateGrid = () => {
    const newGrid = Array(parseInt(gridSize, 10)).fill(null).map(() => Array(parseInt(gridSize, 10)).fill(""));
    setGrid(newGrid);
  };

  // Effect hook to regenerate the grid whenever the gridSize changes
  useEffect(() => {
    if (gridSize) {
      generateGrid();
    }
  }, [gridSize]);

  // Handle grid size change
  const handleGridSizeChange = (e) => {
    setGridSize(e.target.value);
  };

  // Handle router range input
  const handleRouterRangeChange = (e) => {
    const value = e.target.value;
    setRouterRanges(value);

    // Validate if the values are numbers
    const parsedRanges = value.split(",").map(range => parseInt(range.trim(), 10));
    if (parsedRanges.some(isNaN)) {
      setError("Please enter valid numbers for the router ranges.");
    } else {
      setError("");
    }
  };

  // Add wall at a specific grid position
  const handleAddWall = (i, j) => {
    setWalls([...walls, [i, j]]);
    console.log("Wall added at:", i, j);
  };

  // Handle form submission and send to API
  const handleSubmit = () => {
    // Placeholder for API call logic (empty for now)
    console.log("Form submitted with grid size:", gridSize);
    console.log("Router ranges:", routerRanges);
    console.log("Walls:", walls);
    setOpen(false); // Close modal after form submission
  };

  // Render the grid
  const renderGrid = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 25px)` , border:'2px solid black' }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                width: '25px',
                height: '25px',
                border: '1px solid black',
                textAlign: 'center',
                lineHeight: '25px',
                backgroundColor: walls.some(wall => wall[0] === i && wall[1] === j) ? 'black' : 'white',
                cursor: 'pointer'
              }}
              onClick={() => handleAddWall(i, j)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className='d-flex justify-content-center flex-column'>
      {/* Button to open the form modal */}
      <div className='d-flex justify-content-center mt-3'>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Open Form
        </Button>
      </div>

      {/* Render grid */}
      <div style={{ marginTop: '20px' }}>
        <div className='d-flex justify-content-center mb-5 mt-0'>{gridSize && renderGrid()}</div> 
      </div>

      {/* Modal for the form */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Fill the Form</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{message}</Typography>

          <TextField
            label="Grid Size"
            type="number"
            value={gridSize}
            onChange={handleGridSizeChange}
            fullWidth
            margin="normal"
            placeholder="Enter grid size"
          />

          <TextField
            label="Router Ranges (comma-separated)"
            value={routerRanges}
            onChange={handleRouterRangeChange}
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error}
            placeholder="Enter router ranges (e.g., 5, 3, 5)"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RouterPlacementForm;
