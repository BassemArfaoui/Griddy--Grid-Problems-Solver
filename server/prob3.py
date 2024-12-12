import gurobipy as gp
from gurobipy import GRB
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RouterPlacementRequest(BaseModel):
    grid_size: int
    router_ranges: list
    walls: list
    num_routers: int

def place_routers(grid_size, router_ranges, walls, num_routers):
    model = gp.Model("Router Placement")

    placement = model.addVars(grid_size, grid_size, num_routers, vtype=GRB.BINARY, name="placement")
    coverage = model.addVars(grid_size, grid_size, vtype=GRB.BINARY, name="coverage")

    for r in range(num_routers):
        model.addConstr(gp.quicksum(placement[i, j, r] for i in range(grid_size) for j in range(grid_size)) == 1)

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

    model.setObjective(gp.quicksum(coverage[i, j] for i in range(grid_size) for j in range(grid_size)), GRB.MAXIMIZE)

    model.optimize()

    grid_result = []
    total_coverage = 0

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

        for row in grid:
            grid_result.append(list(row))

        total_coverage = sum(coverage[i, j].X for i in range(grid_size) for j in range(grid_size))

    return grid_result, total_coverage

@app.post("/router-placement")
async def router_placement(request: RouterPlacementRequest):
    grid_size = request.grid_size
    router_ranges = request.router_ranges
    walls = request.walls  
    print(walls)
    num_routers = request.num_routers

    grid_result, total_coverage = place_routers(grid_size, router_ranges, walls, num_routers)

    return {"status": "Router placement completed.", "grid": grid_result, "total_coverage": total_coverage}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7000)
