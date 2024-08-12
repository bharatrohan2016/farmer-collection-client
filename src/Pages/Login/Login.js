import React, { useState } from 'react';
import {Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, FormHelperText, Grid, TextField, ThemeProvider, Typography} from '@mui/material';
// import 

import BharatrohanTheme from '../../Components/BharatrohanTheme';
import { useFormik } from 'formik';
import validate from './validate';
import { login } from '../../APIS/apiCalls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues : {
      email : '',
      password : '',
    },
    validate : validate,
    onSubmit : async(values) => {
      console.log(values);
      try{
        const response = await login(values);
        
        if(response.message === "Signed In"){
          localStorage.setItem('token', response.token);
          navigate('/onboard');
          toast.success("Signed In Successfully")
        }
      }catch(error){
        console.log(error)
        if(error.response.status === 401){
          console.log(error.response.data.message)
          toast.error(error.response.data.message);
        }
      }
    }
  })

  
 
  return (
    <ThemeProvider theme={BharatrohanTheme}>
      <Container component="main" maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <CssBaseline />
        <Box
          sx={{
            p : 2,
            height : 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow : 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            
              <TextField
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                fullWidth
                error={formik.errors.email ? true : false}
                helperText={formik.errors.email ? formik.errors.email : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={formik.errors.password ? true : false}
              helperText={formik.errors.password ? formik.errors.password : ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
  </ThemeProvider>
  )
}

export default Login