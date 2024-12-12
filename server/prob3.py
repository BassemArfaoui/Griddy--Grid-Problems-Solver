import gurobipy as gp
from gurobipy import GRB
import numpy as np


def place_routers(grid_size, router_ranges, walls, num_routers):
    # Create model
    model = gp.Model("Router Placement")

    # Variables
    placement = model.addVars(grid_size, grid_size,
                              num_routers, vtype=GRB.BINARY, name="placement")
    coverage = model.addVars(grid_size, grid_size,
                             vtype=GRB.BINARY, name="coverage")

    # Constraints
    # Each router can be placed at only one location
    for r in range(num_routers):
        model.addConstr(gp.quicksum(placement[i, j, r] for i in range(
            grid_size) for j in range(grid_size)) == 1)

    # Coverage constraints
    for i in range(grid_size):
        for j in range(grid_size):
            if (i, j) not in walls:
                model.addConstr(
                    coverage[i, j] <= gp.quicksum(
                        placement[x, y, r]
                        for r in range(num_routers)
                        for x in range(max(0, i - router_ranges[r]), min(grid_size, i + router_ranges[r] + 1))
                        for y in range(max(0, j - router_ranges[r]), min(grid_size, j + router_ranges[r] + 1))
                        if (x, y) not in walls and abs(x - i) + abs(y - j) <= router_ranges[r]
                    )
                )

    # Objective: Maximize covered cells
    model.setObjective(gp.quicksum(coverage[i, j] for i in range(
        grid_size) for j in range(grid_size)), GRB.MAXIMIZE)

    # Optimize
    model.optimize()

    # Extract results
    if model.status == GRB.OPTIMAL:
        grid = np.full((grid_size, grid_size), "-")
        for (i, j) in walls:
            grid[i, j] = "W"

        router_count = 1
        for r in range(num_routers):
            for i in range(grid_size):
                for j in range(grid_size):
                    if placement[i, j, r].X > 0.5:
                        grid[i, j] = f"R{router_count}"
                        router_count += 1

        for i in range(grid_size):
            for j in range(grid_size):
                if coverage[i, j].X > 0.5 and grid[i, j] == "-":
                    grid[i, j] = "C"

        print("Optimal Router Placement:")
        for row in grid:
            print(" ".join(row))

        total_coverage = sum(coverage[i, j].X for i in range(
            grid_size) for j in range(grid_size))
        print(f"Total Covered Cells: {int(total_coverage)}")

    else:
        print("No optimal solution found.")


# Example usage
grid_size = 10
router_ranges = [3, 1, 3]  # Ranges for each router
walls = [(3, 3), (3, 4), (4, 3), (6, 4), (7, 4), (8, 4), (9, 4)]
num_routers = len(router_ranges)

place_routers(grid_size, router_ranges, walls, num_routers)
