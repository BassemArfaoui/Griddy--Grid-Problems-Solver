import gurobipy as gp
from gurobipy import GRB
import numpy as np
import matplotlib.pyplot as plt
import base64
from io import BytesIO
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

class PolynomialRequest(BaseModel):
    data_points: list
    degree: int

def fit_and_plot_polynomial(data_points, degree, x_range=None, num_points=100):
    # Unpack x and y data points
    x_data, y_data = zip(*data_points)

    # Set custom x_range if not provided (between -35 and 35)
    if x_range is None:
        x_range = (-35, 35)

    # Create the optimization model
    model = gp.Model("polynomial_approximation")

    coefficients = model.addVars(degree + 1, name="coefficients")

    errors = model.addVars(len(data_points), name="errors", vtype=GRB.CONTINUOUS)

    # Create constraints for fitting polynomial to the data points
    for i, (x, y) in enumerate(data_points):
        y_approx = gp.LinExpr()
        for j in range(degree + 1):
            y_approx += coefficients[j] * (x ** (degree - j))

        # Error constraints for the polynomial approximation
        model.addConstr(errors[i] >= y - y_approx)
        model.addConstr(errors[i] >= y_approx - y)

    # Minimize the error
    model.setObjective(gp.quicksum(errors[i] for i in range(len(data_points))), GRB.MINIMIZE)

    model.optimize()

    if model.status == GRB.OPTIMAL:
        # Extract coefficients
        coeffs = [coefficients[j].X for j in range(degree + 1)]

        # Generate the equation of the polynomial
        equation = "y = " + " + ".join([f"{coeffs[j]:.2f}x^{degree-j}" for j in range(degree)]) + f" + {coeffs[-1]:.2f}"

        # Generate the polynomial plot from first to last point
        x_values = np.linspace(x_data[0], x_data[-1], num_points)  # Plot only between first and last x values
        y_values = np.polyval(coeffs, x_values)  # Calculate corresponding y values

        # Create the plot
        plt.figure(figsize=(10, 6))
        plt.plot(x_values, y_values, label=f'Polynomial degree {degree}', color='blue')
        plt.title(f'Polynomial Function of Degree {degree}')
        plt.xlabel('x')
        plt.ylabel('y')
        plt.grid(True)
        plt.legend()

        # Set the axis limits
        plt.xlim(-35, 35)  # x-axis from -35 to 35
        plt.ylim(-12, 12)  # y-axis from -12 to 12

        # Save the plot to a buffer and encode it to base64
        img_buf = BytesIO()
        plt.savefig(img_buf, format='png')
        img_buf.seek(0)

        img_base64 = base64.b64encode(img_buf.getvalue()).decode('utf-8')

        return equation, coeffs, img_base64
    else:
        return None, None, None

@app.post("/polynomial")
async def get_polynomial(data: PolynomialRequest):
    data_points = data.data_points
    print(data_points)
    degree = data.degree
    equation, coeffs, plot_base64 = fit_and_plot_polynomial(data_points, degree)

    if equation:
        return {"equation": equation, "coeffs": coeffs, "plot_base64": plot_base64}
    else:
        return {"error": "No optimal polynomial found."}




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)