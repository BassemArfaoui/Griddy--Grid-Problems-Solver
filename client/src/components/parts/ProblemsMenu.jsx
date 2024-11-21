import React  from 'react'
import RouteIcon from '@mui/icons-material/Route';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import AppsIcon from '@mui/icons-material/Apps';
import './styles/Menu.css'
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
    navigate('/prob2')
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
            <p className="mb-0 fw-bold fs-2 ms-3 text-dark" onClick={openShortestPath}>
              Shortest Path
            </p>
          </div>
        </div>


         <div className="problem d-flex align-items-center justify-content-center gap-3 mb-2">
          <div
            className="noti-btn bg-primary text-light rounded-circle d-flex align-items-center justify-content-center px-2"
            style={{ width: "40px", height: "40px" }}
          >
            <LooksTwoIcon/>
          </div>      
          <div className="w-100">
            <p className="mb-0 fw-bold fs-2 ms-3 text-dark" onClick={openProb2}>
              Problem 2
            </p>
          </div>
        </div> 

        <div className="problem d-flex align-items-center justify-content-center gap-3 mb-2">
          <div
            className="noti-btn bg-primary text-light rounded-circle d-flex align-items-center justify-content-center px-2"
            style={{ width: "40px", height: "40px" }}
          >
            <AppsIcon />
          </div>      
          <div className="w-100">
            <p className="mb-0 fw-bold fs-2 ms-3 text-dark" onClick={openProb3}>
              Problem 3
            </p>
          </div>
        </div> 
    </div>
  );
}

export default ProblemsMenu