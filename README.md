# Griddy: Grid Problems Solver

Griddy is a comprehensive project designed to solve grid-based problems using advanced optimization techniques, implemented with React (frontend), FastAPI (backend), and Gurobi (optimization solver). The project includes three main problem-solving modules, each implemented differently but leveraging the powerful capabilities of Gurobi:

1. **Shortest Path Problem with Obstacle Avoidance (SPP-OA)**
2. **Polynomial Approximation Using Gurobi Optimization**
3. **Router Placement Optimization**

This project provides both web and desktop versions for accessibility and user convenience.

## Features

### General Features:

- Intuitive and responsive frontend built with React.
- Efficient backend powered by FastAPI.
- Integration with Gurobi for solving complex optimization problems.
- Desktop version built using Electron.js for cross-platform compatibility.
- Error handling mechanisms for robust and user-friendly interactions.

### Problem-Specific Features:

#### Shortest Path Problem with Obstacle Avoidance (SPP-OA):

- Dynamic grid visualization with customizable size (default: 10x10).
- Real-time updates for blocked squares.
- Weighted path calculation for varying traversal costs.
- Implemented using Gurobi to solve optimization models for shortest paths.
- Integration with React frontend for seamless visualization.

#### Polynomial Approximation:

- Fit polynomials to data points using Gurobi optimization.
- Graphical representation of the polynomial function and input data points.
- Supports polynomials of any degree (default: cubic).
- Handles outliers robustly by minimizing absolute errors.
- Uses Gurobi to define and solve the optimization problem for polynomial fitting.

#### Router Placement Optimization:

- Determines optimal router placements for maximum coverage.
- Supports different router types (e.g., 2.4 GHz and 5 GHz).
- Visualizes coverage areas and obstacle placements on a grid.
- Uses Gurobi to model and solve integer linear programming problems for router placement.
- Applications in wireless network design, urban planning, and surveillance systems.

## Technologies Used

### Frontend:

- **React**: Interactive UI with dynamic and responsive design.
- **Electron.js**: Desktop application support for Windows, macOS, and Linux.

### Backend:

- **FastAPI**: High-performance and asynchronous API framework.

### Optimization Solver:

- **Gurobi**: Efficient solver for linear, integer, and mixed-integer programming problems, used in all problem modules.

### Visualization:

- Integrated graph plotting for polynomial approximation.
- Real-time grid updates for SPP-OA and router placement problems.

## How to Use

### Web Version:

1. Clone the repository:
   ```bash
   git clone https://github.com/BassemArfaoui/Griddy--Grid-Problems-Solver.git
   ```
2. Navigate to the client directory:
   ```bash
   cd Griddy--Grid-Problems-Solver/client
   ```
3. Install frontend dependencies and start the frontend:
   ```bash
   npm install
   npm start
   ```
4. Navigate to the server directory:
   ```bash
   cd ../server
   ```
5. Install backend dependencies:
   ```bash
   pip install fastapi uvicorn gurobipy numpy matplotlib base64
   ```
6. Start the problem-solving modules:
   ```bash
   python prob1.py
   python prob2.py
   python prob3.py
   ```

### Desktop Version:

1. Navigate to the client directory and install dependencies:
   ```bash
   cd Griddy--Grid-Problems-Solver/client
   npm install
   ```
2. Navigate to the desktop directory and start the Electron app:
   ```bash
   cd ../desktop
   npm run electron
   ```

## Applications

1. **Shortest Path Problem**:

   - Robotics and dynamic environments.
   - Real-time navigation and obstacle avoidance.

2. **Polynomial Approximation**:

   - Data modeling and regression analysis.
   - Trend approximation in scientific and business analysis.

3. **Router Placement Optimization**:

   - Wireless network design in homes and offices.
   - Sensor deployment in smart city infrastructure.

## Handled Errors

- SPP-OA:

  - No solution found due to blocked start or end cells.
  - Real-time error feedback during grid configuration.

- Polynomial Approximation:

  - Minimum of 5 data points required.
  - Points must not be too far apart for increased accuracy.

- Router Placement Optimization:

  - Ensures valid input parameters, such as positive integers for router counts.

## Contributions

I am open to pull requests as long as they align with the theme of this project. Some possible contributions include:

- Adding a new API endpoint (`prob4.py`) for a new optimization problem.
- Creating the corresponding React component and route for the new page 

---

Enjoy exploring Griddy and its capabilities in solving grid-based optimization problems! Feel free to contribute and suggest improvements.

