import React, { useEffect, useState } from "react";
import "../css/ShortestPage.css";
import "../css/index.css";
import { notify } from "../components/tools/CustomToaster";
import StartIcon from '@mui/icons-material/Start';
import FlagIcon from '@mui/icons-material/Flag';

const ShortestPath = () => {
  const n = 10;
  const [button, setButton] = useState(false);

  const [grid, setGrid] = useState(
    Array.from({ length: n }, () => Array(n).fill(false))
  );
  const [path, setPath] = useState([]);

  const toggleBlock = (row, col) => {
    if ((row === 0 && col === 0) || (row === n - 1 && col === n - 1)) {
      return;
    }
    const newGrid = grid.map((r, rowIndex) =>
      rowIndex === row
        ? r.map((cell, colIndex) => {
            if (colIndex === col) {
              return !cell;
            }
            return cell;
          })
        : r
    );

    const isPath = path.some(
      ([pathRow, pathCol]) => pathRow === row && pathCol === col
    );

    if (isPath) {
      setPath([]); 
    }

    setGrid(newGrid); 
    console.log(newGrid);
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

    fetch("http://localhost:8000/optimal_path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blocked: blockedCells }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Optimal path:", data.path);
        if(data.error)
        {
          notify("No path exists");
          return
        }
        setPath(data.path);
      })
      .catch((error) => {
        console.error("Error fetching optimal path:", error);
      });
  };

  useEffect(() => {
    getOptimalPath();
  }, [button]);

  return (
    <div className="cont-container">
        <div className="main">
          <div className="grid-container">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isPath = path.some(
                  ([pathRow, pathCol]) => pathRow === rowIndex && pathCol === colIndex
                );
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`grid-item ${cell ? "blocked" : ""} ${isPath ? "path" : ""}`}
                    onClick={() => {toggleBlock(rowIndex, colIndex);setButton(!button)}}
                  >
                    {rowIndex === 0 && colIndex === 0 && (
                      <StartIcon fontSize="large"/>
                    )}

                    {rowIndex === n-1 && colIndex === n-1 && (
                      <FlagIcon fontSize="large"/>
                    )}
 
                  </div>
                );
              })
            )}
          </div>
        </div>
    </div>

  );
};


export default ShortestPath;