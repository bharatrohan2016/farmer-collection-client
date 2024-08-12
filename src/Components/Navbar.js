import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';

export default function Navbar() {
    const [isMobile, setIsMobile] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = localStorage.getItem("token");

    React.useEffect(() => {
        console.log("hit-sidebar");
        const handleResize = () => {
          // Check the window width to determine if it's a mobile device
          setIsMobile(window.innerWidth <= 768); // You can adjust the threshold as needed
        };
    
        handleResize();
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{color: 'white', backgroundColor : '#193c34'}}>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems : 'center'}} > 
              {
                !isMobile && <Box component='img' sx={{
                  height: '9vh',
                  width: '3vw'
                }} src='./Bharat_rohan.svg'></Box>
              }
              <Typography variant="h6" noWrap component="div">
                CropAssure ®
              </Typography>
              <Box>
                
                  { userInfo && <LogoutIcon
                  style={{'cursor': 'pointer'}}
                  onClick={() => {
                    localStorage.clear();
                    navigate('/')
                    toast.success('Logged Out Successfully')
                  }}
                />}   
              </Box> 
            </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
