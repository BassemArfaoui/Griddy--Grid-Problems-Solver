import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import Select from "react-select";
import { notify } from "../components/tools/CustomToaster";
import "../css/Prob2.css";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "rgb(25, 135, 84)" : "rgb(202, 202, 202)",
    borderWidth: "2pt",
    borderRadius: "12px",
    padding: "3px",
    width: "140px",
    outline: "none",
    boxShadow: state.isFocused ? "0 0 5px rgba(25, 135, 84, 0.5)" : "none",
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgb(25, 135, 84)"
      : state.isFocused
      ? "rgba(172, 255, 47, 0.441)"
      : "#fff",
    color: state.isSelected ? "#fff" : "#000",
    cursor: state.isSelected ? "not-allowed" : "pointer",
    padding: "10px",
    fontSize: "17px",
    fontWeight: "bold",
    "&:active": {
      backgroundColor: "rgba(172, 255, 47, 0.9)",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
    fontWeight: "bold",
  }),
};

const GridSelector = ({ rows = 25, columns = 71 }) => {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [polynomialData, setPolynomialData] = useState(null);
  const [degree, setDegree] = useState(3);

  const togglePointSelection = (x, y) => {
    const transformedX = x - Math.floor(columns / 2);
    const transformedY = Math.floor(rows / 2) - y;

    const pointExists = selectedPoints.some(
      (point) => point.x === x && point.y === y
    );

    if (pointExists) {
      // Remove the point from both arrays
      setSelectedPoints((prev) =>
        prev.filter((point) => point.x !== x || point.y !== y)
      );
      setSelectedCoordinates((prev) =>
        prev.filter(
          (coords) => coords[0] !== transformedX || coords[1] !== transformedY
        )
      );
    } else {
      // Check for points in the same column
      const sameColumnPoint = selectedPoints.some((point) => point.x === x);

      if (sameColumnPoint) {
        notify("You cannot select multiple points in the same column!");
        return;
      }

      // Add the point to both arrays
      setSelectedPoints((prev) => [...prev, { x, y }]);
      setSelectedCoordinates((prev) => [...prev, [transformedX, transformedY]]);
    }
  };

  const sendSelectedPoints = async () => {
    if (selectedCoordinates.length === 0) {
      notify("Click on the grid to select points !");
      return;
    }

    if (selectedCoordinates.length < 5) {
      notify("Please select at least 5 points");
      return;
    }

    const maxDistance = 8;

    // Create a sorted copy of the array based on x-coordinates
    const sortedCoordinates = [...selectedCoordinates].sort((a, b) => a[0] - b[0]);
    
    for (let i = 1; i < sortedCoordinates.length; i++) {
      const [x1, y1] = sortedCoordinates[i - 1];
      const [x2, y2] = sortedCoordinates[i];
      const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    
      if (distance > maxDistance) {
        notify("Some points are too far apart!");
        return;
      }
    }
    

    const formattedData = selectedCoordinates.map((coord) => [
      coord[0],
      coord[1],
    ]);
    try {
      const response = await axios.post("http://localhost:9000/polynomial", {
        data_points: formattedData,
        degree: degree,
      });

      console.log("Polynomial response:", response.data);
      setPolynomialData(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error sending points:", error);
      alert("An error occurred while sending points to the server.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const resetGrid = () => {
    if (selectedPoints.length > 0) {
      setSelectedPoints([]);
      setSelectedCoordinates([]);
      setPolynomialData(null);
      setDegree(3);
    } else {
      notify("No points selected !");
    }
  };

  return (
    <div className="grid-selector">
      <div>
        <Select
          value={{ value: degree, label: `Degree ${degree}` }}
          onChange={(selectedOption) => setDegree(selectedOption.value)}
          options={Array.from({ length: 7 }, (_, i) => ({
            value: i + 1,
            label: `Degree ${i + 1}`,
          }))}
          styles={selectStyles}
          placeholder="Select Degree"
          isSearchable={false}
        />
      </div>
      <div className="grid">
        <div className="grid-row axis">
          <div className="grid-cell"></div>
          {Array.from({ length: columns }, (_, col) => (
            <div
              key={col}
              className={`grid-cell axis-label ${
                col === Math.floor(columns / 2) ? "axis" : ""
              }`}
            >
              {col - Math.floor(columns / 2)}
            </div>
          ))}
        </div>

        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="grid-row">
            <div
              className={`grid-cell axis-label ${
                row === Math.floor(rows / 2) ? "axis" : ""
              }`}
            >
              {Math.floor(rows / 2) - row}
            </div>

            {Array.from({ length: columns }, (_, col) => (
              <div
                key={col}
                className={`grid-cell ${
                  selectedPoints.some(
                    (point) => point.x === col && point.y === row
                  )
                    ? "selected"
                    : ""
                } ${
                  col === Math.floor(columns / 2) ||
                  row === Math.floor(rows / 2)
                    ? "axis"
                    : ""
                }`}
                onClick={() => togglePointSelection(col, row)}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{ marginTop: "6px" }}
        className="d-flex justify-content-center align-items-center gap-3"
      >
        <span>
          <button
            className="pol-btn btn bg-success rounded-circle p-0 flex-grow-0"
            onClick={resetGrid}
          >
            <ReplayIcon />
          </button>
        </span>

        {/* Generate Polynomial Button */}
        <button
          variant="contained"
          color="primary"
          onClick={sendSelectedPoints}
          className="pol-btn btn bg-success fs-6 fw-bold rounded-4 flex-grow-1"
        >
          Generate Polynomial
        </button>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 3,
            borderRadius: "10px",
            boxShadow: 24,
            width: "60%",
            position: "relative",
            paddingTop: "20px",
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          <div className="d-flex justify-content-center">
            <span className="result-title fs-4 fw-bold  text-center px-3 py-1 rounded-4 mb-3 text-success">
              Polynomial Result :
            </span>
          </div>

          {polynomialData ? (
            <>
              <div className="fs-6 text-secondary text-center mb-0 fw-bold ">
                Equation :
              </div>

              <div className="d-flex justify-content-center">
                <span
                  className="my-2 equation px-3 py-2 rounded-3 fw-bold text-center "
                  style={{ cursor: "pointer" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      polynomialData &&
                      polynomialData.coeffs
                        .map((coeff, index) => {
                          const formattedCoeff = coeff.toFixed(7);
                          if (formattedCoeff === "0.0000000") return null;

                          const power =
                            polynomialData.coeffs.length - index - 1;

                          if (power === 0) return `${formattedCoeff}`;
                          if (power === 1) return `${formattedCoeff}X`;
                          return `${formattedCoeff}X<sup>${power}</sup>`;
                        })
                        .filter((term) => term)
                        .join(" + ")
                        .replace(/\+ -/g, "- "),
                  }}
                ></span>
              </div>

              <div>
                <div className="fs-6 text-secondary text-center mb-0 mt-3 fw-bold ">
                  Preview :
                </div>
                <img
                  src={`data:image/png;base64,${polynomialData.plot_base64}`}
                  alt="Polynomial Plot"
                  style={{ maxWidth: "100%", marginTop: "0" }}
                />
              </div>
            </>
          ) : (
            <Typography variant="body2">Loading...</Typography>
          )}
          <IconButton
            onClick={handleCloseModal}
            aria-label="Close"
            className="position-absolute end-0 top-0"
          >
            <CloseIcon className="text-black fs-2" />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
};

export default GridSelector;
