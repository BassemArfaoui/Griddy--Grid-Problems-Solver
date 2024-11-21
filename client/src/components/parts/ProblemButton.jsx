import React , {useState , useEffect  } from 'react';
import { IconButton, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomTooltip from '../tools/CustomTooltip';
import MenuIcon from '@mui/icons-material/Menu';
import ProblemsMenu from './ProblemsMenu';

export default function ProblemButton() {
  const [open, setOpen] = useState(false);


  


  //open/close func
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };


  // alt n event
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key.toLowerCase() === 'n') {
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);



  return (
    <>
        <CustomTooltip title="Problems" placement="left">
            <IconButton
                variant="contained"
                onClick={toggleDrawer(true)}
                aria-label="Toggle notifications"
                className="position-fixed bottom-0 start-0 m-3 mx-4 bg-success "
                style={{ zIndex: 1050, backgroundColor: '#f8f9fa' }} 
              >
                  <MenuIcon  fontSize="large" className='text-dark'/>
              </IconButton>
        </CustomTooltip>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className="d-flex flex-column h-100 p-3" style={{ width: '400px' }}>
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
            <h2 className='fw-bold text-success fs-1'>Problems</h2>
            <IconButton onClick={toggleDrawer(false)} aria-label="Close">
              <CloseIcon className='text-black fs-2'/>
            </IconButton>
          </div>

          <div className="flex-grow-1 overflow-auto mt-3">
                <ProblemsMenu closeDrawer={()=>{setOpen(false)}}/>
          </div>
        </div>
      </Drawer>
    </>
  );
}