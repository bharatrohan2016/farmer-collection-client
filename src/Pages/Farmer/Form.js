import { Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import BharatrohanTheme from '../../Components/BharatrohanTheme'
import {useFormik} from 'formik';
import validate from './validate';
import { location } from '../../Utils/location';
import { getOne, onboard, update } from '../../APIS/apiCalls';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Form = () => {
  const {id} = useParams();
  console.log(id);
  const [tehsil, setTehsil] = useState([]);
  const [block, setBlock] = useState([]);
  const districts = Object.keys(location);
  
  const formik = useFormik({
	initialValues : {
		name : '',
		fathername : '',
		phone : '',
		whatsappnumber : '',
		ownedarea : '',
		leasedarea : '',
		cropscultivated : '',
		otherCrop : '',
		otherTehsil : '',
		otherBlock : '',
		village : '',
		block : '',
		tehsil : '',
		district : '',
		pincode : '',
		idprooftype : '',
		idnumber : '',
		file1 : '',
		file2 : '',
		khasraNumbers : '',
	},
	validate,
	onSubmit : async (values) => {
		
		let formData = new FormData();
		for(let key in values){
			if(key === 'file1' || key === 'file2'){
				// let index = key === 'file1' ? 0 : 1;
				formData.append(`images`, values[key]);
			}else{
				formData.append(key, values[key]);
			}
		}

		try{
			const response = id===undefined ? await onboard(formData) : await update(id, formData);
			console.log(response);
			
			if(response.message === 'Created'){
				toast.success("Thank you for onboarding farmer", {
					toastId: 2,
					autoClose: 1000,
				})
			}
			if(response.message === 'Farmer updated successfully'){
				toast.success("Farmer updated successfully", {
					toastId: 2,
					autoClose: 1000,
				})
			}
		}
		catch(error){
			console.log(error)
			toast.error(error.response.data.message, {
				toastId: 2,
				autoClose: 1000,
			});
		}
		
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

  useEffect(()=>{
	if(id!=undefined){
		getOne(id).then((response) =>{
			console.log(response);
			
			formik.setValues(response.response);
			let arr = Object.keys(location[response.response.district]);
			setTehsil(arr);
			arr = location[response.response.district][response.response.tehsil];
			setBlock(arr);
		})
	}
  },[])

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
					<Grid item md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField 
								id="phone" 
								label="Phone Number*" 
								variant="standard" 
								value={formik.values.phone}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur}
								error={(formik.submitCount>0 && formik.errors.phone) ? true : false}
								helperText={(formik.submitCount>0 && formik.errors.phone) ? formik.errors.phone : ''}
							/>
						</FormControl>
					</Grid>
				  	<Grid item md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField 
								id="whatsappnumber" 
								label="Watsapp Number*" 
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
						<InputLabel id="district">District*</InputLabel>
						<Select
							name='district'
							labelId="district"
							label="District*"
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
				

				
				  	<Grid item md={6} xs={12} sm={12}>
						<FormControl fullWidth error={(formik.submitCount>0 && formik.errors.tehsil) ? true : false}>
							<InputLabel id="tehsil">Tehsil*</InputLabel>
							<Select
								name='tehsil'
								labelId="tehsil"
								label="Tehsil*"
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
								{/* <MenuItem value='other'>Other</MenuItem> */}
							</Select>
							{ (formik.submitCount>0 && formik.errors.tehsil) && <FormHelperText>{formik.errors.tehsil}</FormHelperText> }
						</FormControl>
					</Grid>
					{/* {
						formik.values.tehsil === 'other' && 
						<Grid item  md={6} xs={12} sm={12}>
							<FormControl fullWidth>
								<TextField id="otherTehsil" label="Other Tehsil"  type='text' variant="standard"  
									value={formik.values.otherTehsil}
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									error={(formik.submitCount>0 && formik.errors.otherTehsil) ? true : false}
									helperText={(formik.submitCount>0 && formik.errors.otherTehsil) ? formik.errors.otherTehsil : ''}
								/>
							</FormControl>
						</Grid>
					} */}
					
					<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth error={(formik.submitCount>0 && formik.errors.block) ? true : false}>
							<InputLabel id="block">Block*</InputLabel>
							<Select
								name='block'
								labelId="block"
								label="Block*"
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
								<MenuItem value='other'>Other</MenuItem>
							</Select>
							{ (formik.submitCount>0 && formik.errors.block) && <FormHelperText>{formik.errors.block}</FormHelperText> }
						</FormControl>
					</Grid>
					{
						formik.values.block === 'other' && 
						<Grid item  md={6} xs={12} sm={12}>
							<FormControl fullWidth>
								<TextField id="otherBlock" label="Other Block*"  type='text' variant="standard"  
									value={formik.values.otherBlock}
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									error={(formik.submitCount>0 && formik.errors.otherBlock) ? true : false}
									helperText={(formik.submitCount>0 && formik.errors.otherBlock) ? formik.errors.otherBlock : ''}
								/>
							</FormControl>
						</Grid>
					}
				

				{/* <Grid container spacing={4} mt={1}> */}
				  	<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField id="village" label="Village*" variant="standard" 
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
							<TextField id="pincode" label="Pincode*" variant="standard" 
							value={formik.values.pincode}
							onChange={formik.handleChange} 
							onBlur={formik.handleBlur}
							error={(formik.submitCount>0 && formik.errors.pincode) ? true : false}
							helperText={(formik.submitCount>0 && formik.errors.pincode) ? formik.errors.pincode : ''}
							/>
						</FormControl>
					</Grid>
				{/* </Grid> */}
				
				  	<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField id="leasedarea" type='number' label="Leased Land Area(Acres)*" variant="standard" 
							
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
							<TextField id="ownedarea" type='number' label="Owned Land Area(Acres)*" variant="standard" 
							value={formik.values.ownedarea}
							onChange={formik.handleChange} 
							onBlur={formik.handleBlur}
							error={(formik.submitCount>0 && formik.errors.ownedarea) ? true : false}
							helperText={(formik.submitCount>0 && formik.errors.ownedarea) ? formik.errors.ownedarea : ''}
							/>
						</FormControl>
					</Grid>

				

				
				  	<Grid item  md={6} xs={12} sm={12}>
					  <FormControl variant="standard" fullWidth error={(formik.submitCount>0 && formik.errors.cropscultivated) ? true : false}>
						<InputLabel id="cropscultivated">Crops Cultivated*</InputLabel>
						<Select
							labelId="cropscultivated"
							name="cropscultivated"
							label="Crops Cultivated*"
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
					
					{
						formik.values.cropscultivated === 'other' && 
						<Grid item  md={6} xs={12} sm={12}>
							<FormControl fullWidth>
								<TextField id="otherCrop" label="Other Crop*"  type='text' variant="standard"  
									value={formik.values.otherCrop}
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									error={(formik.submitCount>0 && formik.errors.otherCrop) ? true : false}
									helperText={(formik.submitCount>0 && formik.errors.otherCrop) ? formik.errors.otherCrop : ''}
								/>
							</FormControl>
						</Grid>
					}

					<Grid item  md={6} xs={12} sm={12}>
						<FormControl fullWidth>
							<TextField id="khasraNumbers" label="Khasra Numbers(Seperate by commas)" variant="standard" 
							value={formik.values.khasraNumbers}
							onChange={formik.handleChange} 
							onBlur={formik.handleBlur}
							error={(formik.submitCount>0 && formik.errors.khasraNumbers) ? true : false}
							helperText={(formik.submitCount>0 && formik.errors.khasraNumbers) ? formik.errors.khasraNumbers : ''}
							/>
						</FormControl>
					</Grid>

					<Grid item  md={6} xs={12} sm={12}>
					  <FormControl variant="standard" fullWidth error={(formik.submitCount>0 && formik.errors.idprooftype) ? true : false}>
							<InputLabel id="idprooftype">Id Proof Type*</InputLabel>
							<Select
								labelId="idprooftype"
								name="idprooftype"
								label="Id Proof Type*"
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
									<TextField id="idnumber" label="Id Proof Number*"  type='text' variant="standard"  
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
									<Input id="file1" type='file' variant="standard" onChange={(event) => formik.setFieldValue('file1', event.target.files[0])}/>
									<FormHelperText>{formik.values.idprooftype === 'aadhar' } File is to be uploaded.</FormHelperText>
								</FormControl>
							</Grid>
							{
								formik.values.idprooftype === 'aadhar' &&	
								<Grid item  md={6} xs={12} sm={12}>
									<FormControl fullWidth  error={(formik.submitCount>0 && formik.errors.file2) ? true : false}>
										<InputLabel id="file2">Back Side*</InputLabel>
										<Input id="file2" type='file' variant="standard" onChange={(event) => formik.setFieldValue('file2', event.target.files[0])}/>
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