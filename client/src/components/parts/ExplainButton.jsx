import React, { useState, useEffect } from 'react';
import { IconButton, Modal, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomTooltip from '../tools/CustomTooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useLocation } from 'react-router-dom';

export default function ExplainButton() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleModal = (open) => {
    setOpen(open);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key.toLowerCase() === 'm') {
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
      {location.pathname !== '/' && <>
          <CustomTooltip title="Explain" placement="left">
            <IconButton
              variant="contained"
              onClick={() => toggleModal(true)}
              aria-label="Toggle notifications"
              className="position-fixed bottom-0 end-0 m-3 mx-4 bg-success"
              style={{ zIndex: 1050, backgroundColor: '#f8f9fa' }}
            >
              <QuestionMarkIcon fontSize="large" className="text-dark" />
            </IconButton>
          </CustomTooltip>
          <Modal
            open={open}
            onClose={() => toggleModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded"
              style={{ width: '40%', border: '2px solid #dcdcdc' }}
            >
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
                <h2 id="modal-title" className="fw-bold text-success fs-1">
                  Shortest Path
                </h2>
                <IconButton onClick={() => toggleModal(false)} aria-label="Close">
                  <CloseIcon className="text-black fs-2" />
                </IconButton>
              </div>
              {/* Content */}
              <div id="modal-description" className="mt-3">
                <p className="text-dark fs-4 fw-bold p-3">
                    {
                        location.pathname === '/shortest-path' && <span>Watch as the shortest path is calculated and displayed on the grid! <br /> <br/> Block squares to create obstacles, and see how the path dynamically adjusts to avoid them.</span>
                    }
                    {
                        location.pathname === '/prob2' && <span>problem 2 <br /> <br/>description.</span>
                    }
                    {
                        location.pathname === '/prob3' && <span>problem 3 <br /> <br/>description.</span>
                    }
                </p>
              </div>
            </Box>
          </Modal>
      </>}
    </>
  );
}
