import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CachedIcon from '@mui/icons-material/Cached';


function CustomToaster() {

    const toastOptions=
    {
      duration: 2100,
      position: 'bottom-center',
      icon: <ErrorIcon style={{fontSize:'40px'}}/>,
      style: {
        background: 'rgb(244, 67, 54)',
        color: 'white',
        padding:'15px 20px',
        fontSize: '17px',
        fontWeight: 'bold',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        margin:'0 10px  10px 10px',
      }     
      }



  return (
    <>
        <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={20}
        toastOptions={toastOptions}
      />
    </>
  )
}



//success
const successOptions=
{
  duration: 2100,
  position: 'bottom-center',
  style: {
    background: 'rgb(67, 160, 71)',
    color: 'white',
    padding:'15px 20px',
    fontSize: '17px',
    fontWeight: 'bold',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    lineHeight: '1.5',
    margin:'0 10px  10px 10px',
  },
  icon: <CheckCircleOutlineIcon style={{fontSize:'40px'}}/>
  }

const successNotify = (success) => toast.success(success,successOptions);




const processOptions=
{
  duration: 1500,
  position: 'bottom-center',
  style: {
    background: 'rgb(255, 153, 51)',
    color: 'white',
    padding:'15px 20px',
    fontSize: '17px',
    fontWeight: 'bold',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    lineHeight: '1.5',
    margin:'0 5px  10px 10px',
  },
  icon: <CachedIcon style={{fontSize:'40px'}}/>
}

const processNotify = (process) => toast.loading(process,processOptions);


  
const notify = (alert) => toast(alert);


export default CustomToaster;
export {notify,successNotify,processNotify}