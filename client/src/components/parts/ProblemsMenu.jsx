import React  from 'react'
import RouteIcon from '@mui/icons-material/Route';
import { PiChartScatterBold } from "react-icons/pi";
import PublicIcon from '@mui/icons-material/Public';import './styles/Menu.css'
import { useNavigate } from 'react-router-dom';


function ProblemsMenu(props) {

    const navigate =useNavigate()


  function openShortestPath()
  {
    props.closeDrawer();
    navigate('/shortest-path')
  }

  function openProb2()
  {
    props.closeDrawer();
    navigate('/function-approximation')
  }

  function openProb3()
  {
    props.closeDrawer();
    navigate('/prob3')
  }
    
  return (
    <div>
        <div className="problem d-flex align-items-center justify-content-center gap-3 mb-2">
          <div
            className="noti-btn bg-primary text-light rounded-circle d-flex align-items-center justify-content-center px-2"
            style={{ width: "40px", height: "40px" }}
          >
            <RouteIcon />
          </div>      
          <div className="w-100">
            <p className="mb-0 fw-bold fs-4 ms-3 text-dark" onClick={openShortestPath}>
              Shortest Path
            </p>
          </div>
        </div>


         <div className="problem d-flex align-items-center justify-content-center gap-3 mb-2">
          <div
            className="fs-1 noti-btn bg-primary text-light rounded-circle d-flex align-items-center justify-content-center px-2"
            style={{ width: "40px", height: "40px" }}
          >
            <PiChartScatterBold />
          </div>      
          <div className="w-100">
            <p className="mb-0 fw-bold fs-4 ms-3 text-dark" style={{whiteSpace:'nowrap' , overflow : 'hidden' , textOverflow : 'ellipsis'}} onClick={openProb2}>
              Polynomial Approxi...
            </p>
          </div>
        </div> 

        <div className="problem d-flex align-items-center justify-content-center gap-3 mb-2">
          <div
            className="noti-btn bg-primary text-light rounded-circle d-flex align-items-center justify-content-center px-2"
            style={{ width: "40px", height: "40px" }}
          >
            <PublicIcon />
          </div>      
          <div className="w-100">
            <p className="mb-0 fw-bold fs-4 ms-3 text-dark" onClick={openProb3}>
              Network Range
            </p>
          </div>
        </div> 
    </div>
  );
}

export default ProblemsMenu