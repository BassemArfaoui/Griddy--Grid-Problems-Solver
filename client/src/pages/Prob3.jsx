import React, { useState } from "react";
import Select from "react-select";
import "../css/ShortestPage.css";
import "../css/Prob3.css";
import SpinnerSpan from "../components/tools/SpinnerSpan";
import { notify } from "../components/tools/CustomToaster";
import ReplayIcon from "@mui/icons-material/Replay";


const NetworkCoverageProblem = () => {
  const gurobiLim = 18;
  const [n, setN] = useState(10); 
  const [networkGrid, setNetworkGrid] = useState(
    Array.from({ length: n }, () => Array(n).fill("-"))
  ); 
  const [numRange5, setNumRange5] = useState(0); 
  const [numRange3, setNumRange3] = useState(0); 
  const [blockedCells, setBlockedCells] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const gridStyle = {
    gridTemplateColumns: `repeat(${n}, 1fr)`,
    gridTemplateRows: `repeat(${n}, 1fr)`,
  };

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "rgb(202, 202, 202)",
      borderWidth: "2pt",
      borderRadius: "12px",
      padding: "3px",
      width: "300px",
      outline: "none",
      boxShadow: "none",
      "&:hover": {
        borderColor: "rgb(25, 135, 84)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
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
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
      fontSize: "17px",
      fontWeight: "bold",
    }),
  };

  const options = Array.from({ length: gurobiLim - 1 }, (_, i) => {
    const value = i + 2;
    return { value, label: `${value} x ${value}` };
  });

  const selectChanged = (selectedOption) => {
    const newSize = selectedOption.value;
    setLoading(true);
    setN(newSize);
    const newGrid = Array.from({ length: newSize }, () => Array(newSize).fill("-"));
    setNetworkGrid(newGrid);
    setBlockedCells([]); 

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const toggleWall = (row, col) => {
    const newGrid = networkGrid.map((r, rowIndex) =>
      rowIndex === row
        ? r.map((cell, colIndex) => (colIndex === col ? (cell === "W" ? "-" : "W") : cell))
        : r
    );
    setNetworkGrid(newGrid);
  
    // Update the list of blocked cells (walls)
    const newBlockedCells = [...blockedCells];
    if (newGrid[row][col] === "W") {
      newBlockedCells.push([row, col]); // Add wall to blocked cells
    } else {
      const index = newBlockedCells.findIndex(
        (cell) => cell[0] === row && cell[1] === col
      );
      if (index > -1) {
        newBlockedCells.splice(index, 1); // Remove wall from blocked cells
      }
    }
    setBlockedCells(newBlockedCells);
  };
  

  const sendNetworkDataToAPI = async () => {
    if (
      isNaN(numRange5) || 
      isNaN(numRange3) || 
      numRange5 < 0 || 
      numRange3 < 0
    ) {
      notify(
        "Invalid input: Number of routers must be non-negative numbers."      );
      return;
    }
  
    if (numRange5 === 0 && numRange3 === 0) {
      notify(
        "Invalid input: At least one router (5 GHz or 2.4 GHz) must be specified."
      );
      return;
    }
  
    const routerRanges = [
      ...Array(numRange5).fill(5),
      ...Array(numRange3).fill(3),
    ];
  
    const requestData = {
      grid_size: n,
      router_ranges: routerRanges,
      walls: blockedCells,
      num_routers: routerRanges.length,
    };
  
    console.log("Sending data to API:", requestData);
  
    try {
      setLoading(true);
  
      const response = await fetch("http://localhost:7000/router-placement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Response received:", data);
        setNetworkGrid(data.grid);
        console.log("Total Coverage:", data.total_coverage);
      } else {
        console.error("Error from API:", data);
        notify("An error occurred while fetching the data.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      notify("Your Situation is too complex for a Free Gurobi liscence");
    } finally {
      setLoading(false);
    }
  };

  const renderCell = (cell) => {
    if (cell === "R") {
      return { backgroundColor: "blue" };
    }
    if (cell === "C") {
      return { backgroundColor: "green" };
    }
    if (cell === "W") {
      return { backgroundColor: "black" };
    }
    return { backgroundColor: "lightgray" };
  };

  const resetGrid = () => {
    setNetworkGrid(
      Array.from({ length: n }, () => Array(n).fill("-"))
    );
    setNumRange5(0); 
    setNumRange3(0); 
    setBlockedCells([]); 
    setLoading(false); 
  };

  return (
    <div className="cont-container">
      <div className="main d-flex flex-row gap-5 justify-content-center">
        <div
          className="d-flex align-items-center flex-column gap-3"
          style={{ width: "400px" }}
        >
          <Select
            options={options}
            value={options.find((option) => option.value === n)}
            placeholder="Select Grid Size"
            onChange={selectChanged}
            isOptionDisabled={(option) => option.value === n}
            styles={selectStyles}
          />
          <div className="d-flex flex-column align-items-center gap-3 mt-3">
            <div
              className="text-start ms-1 fw-bold text-secondary mt-0 ms-2"
              style={{ width: "300px" }}
            >
              Number of 5 GHz Routers :
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="Number of Range 5 Routers"
              value={numRange5}
              onChange={(e) => setNumRange5(Number(e.target.value))}
              style={{ width: "300px" }}
            />

            <div
              className="text-start ms-1 fw-bold text-secondary mt-3 ms-2"
              style={{ width: "300px" }}
            >
              Number of 2.4 GHz Routers :
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="Number of Range 3 Routers"
              value={numRange3}
              onChange={(e) => setNumRange3(Number(e.target.value))}
              style={{ width: "300px" }}
            />
          </div>
          <div className="d-flex justify-content-center mt-4 gap-3">
            <span>
              <button
                className="pol-btn btn bg-success rounded-circle p-0 flex-grow-0"
                onClick={resetGrid}
              >
                <ReplayIcon />
              </button>
            </span>

            <button
              onClick={sendNetworkDataToAPI}
              className="pol-btn btn bg-success fs-6 fw-bold rounded-4 flex-grow-1"
            >
              Place Routers
            </button>

          </div>
        </div>

        <div className="grid-wrapper d-flex justify-content-center align-items-center mt-1">
          {loading ? (
            <div
              className="loading-message w-100 h-100 d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "rgba(211,211,211,0.7)" }}
            >
              <SpinnerSpan />
            </div>
          ) : (
            <div className="grid-container" style={gridStyle}>
              {networkGrid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="grid-item"
                    style={renderCell(cell)}
                    onClick={() => toggleWall(rowIndex, colIndex)}
                  ></div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkCoverageProblem;
