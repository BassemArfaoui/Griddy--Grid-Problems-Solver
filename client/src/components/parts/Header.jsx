import React  from "react";
import './styles/Header.css'
import { Link , useLocation } from "react-router-dom";
// import {useNavigate} from 'react-router-dom'
// import CustomTooltip from "../tools/CustomTooltip";
// import HomeIcon from '@mui/icons-material/Home';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import SearchIcon from '@mui/icons-material/Search';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AddIcon from '@mui/icons-material/Add';



function Header()
{


  // //key event useeffect
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.altKey) {
  //       switch (event.key) {
  //         case "h":
  //           navigate("/");
  //           break;
  //         case "s":
  //           navigate("/saved");
  //           break;
  //         case "p":
  //           navigate("/profile");
  //           break;
  //         case "t":
  //           navigate("/settings");
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [navigate]); 


  // //menu buttons useEffect
  // useEffect(() => {
  //   updateMenuButton();
  // }, [location.pathname]);


  //menu buttons func
  // function updateMenuButton() {
  //   const btn = document.querySelectorAll('.menu-btn');
  
  //   btn.forEach(element => {
  //     if ( element.name == '/' && location.pathname === element.name) 
  //     {
  //       element.classList.add('active');
  //     }
  //     else if (location.pathname.startsWith(element.name) && element.name !== '/') {
  //       element.classList.add('active');
  //     } 
  //     else {
  //       element.classList.remove('active');
  //     }
  //   });
  // }
 


return (
        <header className=" border-bottom border-3 d-flex align-items-center w-100 position-relative">
               
                  <h1 className="ms-4  fw-bolder position-absolute text-success" style={{fontSize:'39px'}}> <Link to='/' className="m-0 text-decoration-none text-success">OptiSolve</Link></h1>
                
                {/* <div className="d-flex gap-4 me-5 align-items-center position-absolute end-0">
                    <CustomTooltip title='Search'>
                      <h4><SearchIcon className="mt-1 text-success" style={{fontSize:'47px'}}/></h4>
                    </CustomTooltip> 
                    <CustomTooltip title='Logout'>
                      <h4><LogoutIcon className="mt-1 text-success" style={{fontSize:'39px'}} /></h4>
                    </CustomTooltip> 
                </div>
                <div className="d-flex justify-content-center w-100 gap-5">

                        <ul className="d-flex gap-4 m-0">
                            <Link to="/" className="btn ms-3 menu-btn  d-flex align-items-center active"  name='/' ><HomeIcon style={{fontSize:'44px'}} /></Link>

                            <li className="add-btn btn rounded-circle d-flex justify-content-center align-items-center m-0 " style={{width:'68px',height:'68px'}}><AddIcon style={{fontSize:'65px'}}/></li>

                            <Link to='/saved' className="btn menu-btn  d-flex align-items-center"  name='/saved'><BookmarkIcon style={{fontSize:'41px'}} /></Link>

                        </ul>
                </div> */}

        </header>
    )
}


export default Header