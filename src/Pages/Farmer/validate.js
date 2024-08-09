

const validate = (values) => {
	const errors = {};
	console.log(values);
	const aadharRegex = new RegExp('^\d{12}$');
	const panRegex = new RegExp('^[A-Z]{5}\d{4}[A-Z]{1}$');
	const voterRegex = new RegExp('^[A-Z]{3}\d{7}$');
	const numberRegex = new RegExp('^\d{10}$');

	if(values.name===""){
		errors.name = "Name is Required";
	}
	if(values.fathername===""){
		errors.fathername = "Father Name is Required";
	}
	if(values.whatsappnumber===""){
		errors.whatsappnumber = "Watsapp Number is Required";
	}else if(values.whatsappnumber.length != 10){
		errors.whatsappnumber = "Invalid Watsapp Number";
	}

	if(values.ownedarea===""){
		errors.ownedarea = "Owned Land Area is Required";
	}
	if(values.leasedarea===""){
		errors.leasedarea = "Leased Land Area is Required";
	}
	if(values.cropscultivated===""){
		errors.cropscultivated = "Crops Cultivated is Required";
	}
	if(values.village===""){
		errors.village = "Village is Required";
	}
	if(values.block===""){
		errors.block = "Block is Required";
	}
	if(values.tehsil===""){
		errors.tehsil = "Tehsil is Required";
	}
	if(values.district===""){
		errors.district = "District is Required";
	}
	if(values.pincode===""){
		errors.pincode = "Pincode is Required"
	}else if(values.pincode.length != 6){
		errors.pincode = "Invalid Pincode";
	}

	if(values.idprooftype===""){
		errors.idprooftype = "Id Proof Type is Required"
	}

	

	if(values.idprooftype==="pan"){
		if(values.idnumber===''){
			errors.idnumber = "Pan Number is Required"
		}else{

		}

		if(values.file1===''){
			errors.file1 = "Pan Card is Required"
		}
	}
	if(values.idprooftype==="aadhar"){
		if(values.idnumber===''){
			errors.idnumber = "Aadhar Number is Required"
		}else{

		}
		if(values.file1===''){
			errors.file1 = "Front Image is Required"
		}
		if(values.file2===''){
			errors.file2 = "Back Image is Required"
		}
	}
	if(values.idprooftype==="voter"){
		if(values.idnumber===''){
			errors.idnumber = "Voter Id Number is Required"
		}else{

		}
		if(values.file1===''){
			errors.file1 = "Voter Card is Required"
		}
	}
	
	
	return errors;
}

export default validate