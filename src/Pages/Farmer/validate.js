

const validate = (values) => {
	const errors = {};
	// console.log(values);
	const voterRegex = new RegExp('^[A-Z]{3}\d{7}$');
	const aadharRegex = new RegExp('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$');
    const numberRegex = new RegExp('^[6-9]{1}[0-9]{9}');
    const panRegex = new RegExp("^[A-Z]{5}[0-9]{4}[A-Z]{1}$");

	if(values.name===""){
		errors.name = "Name is Required";
	}
	if(values.fathername===""){
		errors.fathername = "Father Name is Required";
	}

	if(values.phone===""){
		errors.phone = "Mobile Number is Required";
	}else if(numberRegex.test(values.phone) === false){
		errors.phone = "Invalid Mobile Number";
	}

	if(values.whatsappnumber!="" && numberRegex.test(values.whatsappnumber) === false){
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
	if(values.cropscultivated==="other" && values.otherCrop === ""){
		errors.otherCrop = "Crop name is Required";
	}
	if(values.village===""){
		errors.village = "Village is Required";
	}
	if(values.block===""){
		errors.block = "Block is Required";
	}
	if(values.block==="other" && values.otherBlock === ""){
		errors.otherBlock = "Block name is Required";
	}
	if(values.tehsil===""){
		errors.tehsil = "Tehsil is Required";
	}
	if(values.tehsil==="other" && values.otherTehsil === ""){
		errors.otherTehsil = "Tehsil name is Required";
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
			if(panRegex.test(values.idnumber) === false){
				errors.idnumber = "Invalid Pan Number"
			}
		}

		if(values.file1===''){
			errors.file1 = "Pan Card is Required"
		}
	}
	if(values.idprooftype==="aadhar"){
		if(values.idnumber===''){
			errors.idnumber = "Aadhar Number is Required"
		}else{
			if(aadharRegex.test(values.idnumber) === false){
				errors.idnumber = "Invalid Aadhar Number"
			}
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
			if(voterRegex.test(values.idnumber) === false){
				errors.idnumber = "Invalid Pan Number"
			}
		}
		if(values.file1===''){
			errors.file1 = "Voter Card is Required"
		}
	}
	
	return errors;
}

export default validate