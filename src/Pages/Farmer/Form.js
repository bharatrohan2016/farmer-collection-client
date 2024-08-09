import { Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import BharatrohanTheme from '../../Components/BharatrohanTheme'
import {useFormik} from 'formik';
import validate from './validate';
import { location } from '../../Utils/location';
const Form = () => {
  const [tehsil, setTehsil] = useState([]);
  const [block, setBlock] = useState([]);
  const districts = Object.keys(location);
  
  const formik = useFormik({
	initialValues : {
		name : '',
		fathername : '',
		whatsappnumber : '',
		ownedarea : '',
		leasedarea : '',
		cropscultivated : '',
		village : '',
		block : '',
		tehsil : '',
		district : '',
		pincode : '',
		idprooftype : '',
		idnumber : '',
		file1 : '',
		file2 : ''
	},
	validate,
	onSubmit : (values) => {
		console.log(values);
	}
  })

  const districtChangeHandler = (event) => {
	// console.log(event.target.value)
	const value = event.target.value;
	const arr = Object.keys(location[value]);
	setTehsil(arr);
	formik.setFieldValue('district', event.target.value);
  }

  const tehsilChangeHandler = (value) => {
	const arr = location[formik.values.district][value];
	setBlock(arr);
	console.log(arr);
	formik.setFieldValue('tehsil', value);
  }

  return (
	<ThemeProvider theme={BharatrohanTheme}>
	<Box>	
		<Box>
			<Navbar/>
		</Box>

		<Box
		  component='form'
		  onSubmit={formik.handleSubmit}
          sx={{
			m : 2,
            p : 3,
            height : 'fit-content',
            boxShadow : 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
          }}
        >
			
			<Box>
				<h3>Farmer Basic Details</h3>
		  		<Grid container spacing={4}>
				  	<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField 
								id="name" 
								label="Name*" 
								variant="standard" 
								value={formik.values.name}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur}
								error={(formik.submitCount>0 && formik.errors.name) ? true : false}
								helperText={(formik.submitCount>0 && formik.errors.name) ? formik.errors.name : ''}
							/>
						</FormControl>
					</Grid>
					<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField 
								id="fathername" 
								label="Father Name*" 
								variant="standard" 
								value={formik.values.fathername}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur}
								error={(formik.submitCount>0 && formik.errors.fathername) ? true : false}
								helperText={(formik.submitCount>0 && formik.errors.fathername) ? formik.errors.fathername : ''}
							/>
						</FormControl>
					</Grid>
				</Grid>
				<Grid container spacing={4} mt={1}>
				  	<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField 
								id="whatsappnumber" 
								label="Watsapp Number" 
								variant="standard" 
								value={formik.values.whatsappnumber}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur}
								error={(formik.submitCount>0 && formik.errors.whatsappnumber) ? true : false}
								helperText={(formik.submitCount>0 && formik.errors.whatsappnumber) ? formik.errors.whatsappnumber : ''}
							/>
							
						</FormControl>
					</Grid>
					<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth  error={(formik.submitCount>0 && formik.errors.district) ? true : false}>
						<InputLabel id="district">District</InputLabel>
						<Select
							name='district'
							labelId="district"
							label="district"
							variant="standard" 
							value={formik.values.district}
							onChange={(event) => districtChangeHandler(event)} 
							onBlur={formik.handleBlur}
							
							helperText={(formik.submitCount>0 && formik.errors.district) ? formik.errors.district : ''}
						>
							<MenuItem  disabled={true} value="">
								<em>-Select-</em>
							</MenuItem>
							{
								districts.map((item) => 
									<MenuItem value={item}>{item}</MenuItem>	
								)
							}
						</Select>
						{ (formik.submitCount>0 && formik.errors.district) && <FormHelperText>{formik.errors.district}</FormHelperText> }
						</FormControl>
					</Grid>
				</Grid>

				<Grid container spacing={4} mt={1}>
				  	<Grid item md={6} xs={12} sm={12}>
						<FormControl fullWidth error={(formik.submitCount>0 && formik.errors.tehsil) ? true : false}>
							<InputLabel id="tehsil">Tehsil</InputLabel>
							<Select
								name='tehsil'
								labelId="tehsil"
								label="tehsil"
								variant="standard" 
								value={formik.values.tehsil}
								onChange={(event) => tehsilChangeHandler(event.target.value)} 
								onBlur={formik.handleBlur}
							>
								<MenuItem  disabled={true} value="">
									<em>-Select-</em>
								</MenuItem>
								{
									tehsil.map((item) => 
										<MenuItem value={item}>{item}</MenuItem>	
									)
								}
								
							</Select>
							{ (formik.submitCount>0 && formik.errors.tehsil) && <FormHelperText>{formik.errors.tehsil}</FormHelperText> }
						</FormControl>
					</Grid>
					<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth error={(formik.submitCount>0 && formik.errors.block) ? true : false}>
							<InputLabel id="block">Block</InputLabel>
							<Select
								name='block'
								labelId="block"
								label="Block"
								variant="standard" 
								value={formik.values.block}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur}
							>
								<MenuItem  disabled={true} value="">
									<em>-Select-</em>
								</MenuItem>
								{
									block.map((item) => 
										<MenuItem value={item}>{item}</MenuItem>	
									)
								}
							</Select>
							{ (formik.submitCount>0 && formik.errors.block) && <FormHelperText>{formik.errors.block}</FormHelperText> }
						</FormControl>
					</Grid>
				</Grid>

				<Grid container spacing={4} mt={1}>
				  	<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField id="village" label="Village" variant="standard" 
							name='village'
							value={formik.values.village}
							onChange={formik.handleChange} 
							onBlur={formik.handleBlur}
							error={(formik.submitCount>0 && formik.errors.village) ? true : false}
							helperText={(formik.submitCount>0 && formik.errors.village) ? formik.errors.village : ''}
							/>
						</FormControl>
					</Grid>
					<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField id="pincode" label="Pincode" variant="standard" 
							value={formik.values.pincode}
							onChange={formik.handleChange} 
							onBlur={formik.handleBlur}
							error={(formik.submitCount>0 && formik.errors.pincode) ? true : false}
							helperText={(formik.submitCount>0 && formik.errors.pincode) ? formik.errors.pincode : ''}
							/>
						</FormControl>
					</Grid>
				</Grid>

				<Grid container spacing={4} mt={1}>
				  	<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField id="leasedarea" type='number' label="Leased Land Area" variant="standard" 
							value={formik.values.leasedarea}
							onChange={formik.handleChange} 
							onBlur={formik.handleBlur}
							error={(formik.submitCount>0 && formik.errors.leasedarea) ? true : false}
							helperText={(formik.submitCount>0 && formik.errors.leasedarea) ? formik.errors.leasedarea : ''}
							/>
						</FormControl>
					</Grid>
					<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField id="ownedarea" type='number' label="Owned Land Area" variant="standard" 
							value={formik.values.ownedarea}
							onChange={formik.handleChange} 
							onBlur={formik.handleBlur}
							error={(formik.submitCount>0 && formik.errors.ownedarea) ? true : false}
							helperText={(formik.submitCount>0 && formik.errors.ownedarea) ? formik.errors.ownedarea : ''}
							/>
						</FormControl>
					</Grid>
				</Grid>

				{/* <Grid container spacing={4} mt={1}>
				  	<Grid item md={6}>
						<FormControl fullWidth>
							<TextField id="leasedarea" label="Leased Land Area" variant="standard" />
						</FormControl>
					</Grid>
					
				</Grid> */}

				<Grid container spacing={4} mt={1}>
				  	<Grid item  md={6} xs={12} sm={12}>
					  <FormControl variant="standard" fullWidth error={(formik.submitCount>0 && formik.errors.cropscultivated) ? true : false}>
						<InputLabel id="cropscultivated">Crops Cultivated</InputLabel>
						<Select
							labelId="cropscultivated"
							name="cropscultivated"
							label="Crops Cultivated"
							value={formik.values.cropscultivated}
							onChange={formik.handleChange} 
							onBlur={formik.handleBlur}
						>
							<MenuItem  disabled={true} value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value='paddy'>Paddy</MenuItem>
							<MenuItem value='potato'>Potato</MenuItem>
							<MenuItem value='mentha'>Mentha</MenuItem>
							<MenuItem value='mustard'>Mustard</MenuItem>
							<MenuItem value='wheat'>Wheat</MenuItem>
							<MenuItem value='melons'>Melons</MenuItem>
							<MenuItem value='other'>Other</MenuItem>
						</Select>
						{ (formik.submitCount>0 && formik.errors.cropscultivated) ? <FormHelperText>{formik.errors.cropscultivated}</FormHelperText> : '' }
					</FormControl>
					</Grid>

					<Grid item  md={6} xs={12} sm={12}>
					  <FormControl variant="standard" fullWidth error={(formik.submitCount>0 && formik.errors.idprooftype) ? true : false}>
							<InputLabel id="idprooftype">Id Proof Type</InputLabel>
							<Select
								labelId="idprooftype"
								name="idprooftype"
								label="Id Proof Type"
								value={formik.values.idprooftype}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur}
							>
							<MenuItem disabled={true} value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value='aadhar'>Aadhar Card</MenuItem>
							<MenuItem value='pan'>Pan Card</MenuItem>
							<MenuItem value='voter'>VoterId Card</MenuItem>
							</Select>
							{ (formik.submitCount>0 && formik.errors.idprooftype) ? <FormHelperText>{formik.errors.idprooftype}</FormHelperText> : '' }
						</FormControl>
					</Grid>
					
				</Grid>

		  		<br/>
				{ 
					formik.values.idprooftype !='' &&  
					<Box>
						<h3>Upload Documents</h3>
						<Grid container spacing={4}>
							<Grid item  md={6} xs={12} sm={12}>
								<FormControl fullWidth>
									<TextField id="idnumber" label="Id Proof Number"  type='text' variant="standard"  
										value={formik.values.idnumber}
										onChange={formik.handleChange} 
										onBlur={formik.handleBlur}
										error={(formik.submitCount>0 && formik.errors.idnumber) ? true : false}
										helperText={(formik.submitCount>0 && formik.errors.idnumber) ? formik.errors.idnumber : ''}
									/>
								</FormControl>
							</Grid>
							<Grid item  md={6} xs={12} sm={12}>
								<FormControl fullWidth error={(formik.submitCount>0 && formik.errors.file1) ? true : false}>
									<InputLabel id="file1">{formik.values.idprooftype === 'aadhar' ? 'Front Side' : 'Document'}</InputLabel>
									<Input id="file1" type='file' variant="standard" onChange={(event) => formik.setFieldValue('file1', event.target.value)}/>
									<FormHelperText>{formik.values.idprooftype === 'aadhar' } File is to be uploaded.</FormHelperText>
								</FormControl>
							</Grid>
							{
								formik.values.idprooftype === 'aadhar' &&	
								<Grid item  md={6} xs={12} sm={12}>
									<FormControl fullWidth  error={(formik.submitCount>0 && formik.errors.file2) ? true : false}>
										<InputLabel id="file2">Back Side*</InputLabel>
										<Input id="file2" type='file' variant="standard" onChange={(event) => formik.setFieldValue('file2', event.target.value)}/>
										<FormHelperText>Back Image file </FormHelperText>
									</FormControl>
								</Grid>
							}
						</Grid>
					</Box>
				}

				<Box sx={{textAlign : 'center'}}>
					<Button
					type="submit"
					color='primary'
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					>
					Submit
					</Button>
				</Box>
				
			</Box>
		</Box>
	</Box>
	</ThemeProvider>
  )
}

export default Form