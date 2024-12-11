import React, { useEffect, useState } from "react";
import Select from "react-select"; 
import "../css/ShortestPage.css";
import StartIcon from '@mui/icons-material/Start';
import FlagIcon from '@mui/icons-material/Flag';
import SpinnerSpan from "../components/tools/SpinnerSpan";
import { notify } from "../components/tools/CustomToaster";

const ShortestPath = () => {
  const gurobiLim = 22
  const [n, setN] = useState(10);
  const [button, setButton] = useState(false);
  const [grid, setGrid] = useState(
    Array.from({ length: n }, () => Array(n).fill(false))
  );
  const [path, setPath] = useState([]);
  const len=path.length ;  
  const [loading, setLoading] = useState(false); 

  const gridStyle = {
    gridTemplateColumns: `repeat(${n}, 1fr)`,
    gridTemplateRows: `repeat(${n}, 1fr)`,
  };

  const selectStyles ={
    control: (provided,state) => ({
      ...provided,
      borderColor: "rgb(202, 202, 202)",
      borderWidth : '2pt' ,
      borderRadius: "12px", 
      padding: "3px",
      width: "140px",
      outline: "none", 
      boxShadow: "none", 
      "&:hover": {
        borderColor: "rgb(25, 135, 84)"}
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgb(25, 135, 84)" : state.isFocused ? "rgba(172, 255, 47, 0.441)" : "#fff", 
      color: state.isSelected ? "#fff" : "#000", 
      cursor : state.isSelected ? "not-allowed" : "pointer", 
      padding: "10px",
      fontSize : '17px' ,
      fontWeight : 'bold' ,
      "&:active": {
        backgroundColor: state.isSelected ? "rgb(25, 135, 84)" : "rgba(172, 255, 47, 0.9)", 
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
      fontSize : '17px' ,
      fontWeight : 'bold' ,
    }),
  };

  const iconSize = 'fs-'+ (n>15 ? '6' : n >10 ? '5' : n>5 ? '4' : '1')  

  const options = Array.from({ length: gurobiLim-1 }, (_, i) => {
    const value = i + 2;
    return { value, label: `${value} x ${value}` };
  });

  const selectChanged = (selectedOption) => {
    const newSize = selectedOption.value;
    setLoading(true);  
    setN(newSize);
    const newGrid = Array.from({ length: newSize }, () => Array(newSize).fill(false));
    setGrid(newGrid);
    setPath([]);  

    setTimeout(() => {
      setLoading(false);  
    }, 300);  
  };

  const toggleBlock = (row, col) => {
    if ((row === 0 && col === 0) || (row === n - 1 && col === n - 1)) {
      notify("Start and End points can't be blocked");
      return;  
    }

    const newGrid = grid.map((r, rowIndex) =>
      rowIndex === row
        ? r.map((cell, colIndex) => (colIndex === col ? !cell : cell))
        : r
    );

    setGrid(newGrid);
    setButton(!button);  
  };

  const getOptimalPath = () => {
    const blockedCells = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j]) {
          blockedCells.push([i, j]);
        }
      }
    }

    fetch("http://localhost:8001/optimal_path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blocked: blockedCells, n }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          notify("No path exists");
          setPath([]);  
          return;
        }
        setPath(data.path);
      })
      .catch((error) => {
        console.error("Error fetching optimal path:", error);
        setPath([]); 
      });
  };
  
  useEffect(() => {
    getOptimalPath();  
  }, [button, n]);

  return (
    <div className="cont-container">
      <div className="main">
        <div className="d-flex align-content-center gap-3">
          <Select
            options={options}
            value={options.find((option) => option.value === n)}
            placeholder="Select Grid Size"
            onChange={selectChanged}
            isOptionDisabled={(option) => option.value === n}
            styles={selectStyles}
          />
          <div className="d-flex align-items-center">
            <span
              id="length"
              className="length  rounded-3  fw-bold border-3 border-secondary"
              style={{ padding: "4pt 13px" }}
            >
              {!loading ?<span>Length : {len}</span> : <span className="text-secondary small d-flex justify-content-center align-items-center" style={{ padding: "1pt 13px" }}>Loading ...</span>}
            </span>
          </div>
        </div>

        <div className="grid-border d-flex justify-content-center align-items-center mt-1">
          {loading ? (
            <div
              className="loading-message   w-100 h-100 d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "rgba(211,211,211,0.7)" }}
            >
              <SpinnerSpan />
            </div>
          ) : (
            <div className="grid-container" style={gridStyle}>
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isBlocked = cell;
                  const isPath = path.some(
                    ([pathRow, pathCol]) =>
                      pathRow === rowIndex && pathCol === colIndex
                  );
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`grid-item ${isBlocked ? "blocked" : ""} ${
                        isPath ? "path" : ""
                      }`}
                      onClick={() => toggleBlock(rowIndex, colIndex)}
                    >
                      {rowIndex === 0 && colIndex === 0 && (
                        <StartIcon className={iconSize} />
                      )}

                      {rowIndex === n - 1 && colIndex === n - 1 && (
                        <FlagIcon className={iconSize} />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortestPath;
