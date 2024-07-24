import {
	validateAlphaNumeric,
	validateAuthenticationUrl,
	validateDate,
	validateEmail,
	validateName,
	validateNumber,
	validatePassword,
	validatePhoneNumber,
	validateString2,
	validateUrl,
	validateUserName,
	validateZipcode,
} from "./FieldValidation";

let VALIDATION_OBJ = {
	event_name: (value, errors) => {
		if (!value) {
			errors["event_name"] = " Event Name is Required";
		} else if (value && !validateString2(value)) {
			errors["event_name"] = "Please enter valid event name";
		}
	},
	challenge_name: (value, errors) => {
		if (!value) {
			errors["challenge_name"] = "Challenge name is Required";
		} else if (value && !validateString2(value)) {
			errors["challenge_name"] = "Please enter valid Challenge name";
		}
	},
	title: (value, errors) => {
		if (!value) {
			errors["title"] = " Title is Required";
		} else if (value && !validateString2(value)) {
			errors["title"] = "Please enter valid Title";
		}
	},
	schools: (value, errors) => {
		if (!value?.length) {
			errors["schools"] = "Please Select Schools";
		}
	},
	classes: (value, errors) => {
		if (!value?.length) {
			errors["classes"] = "Please Select Classes";
		}
	},
	tests: (value, errors) => {
		if (!value?.length) {
			errors["tests"] = "Please Select TestItems";
		}
	},
	required: (value, errors) => {
		if (!value?.length) {
			errors["required"] = "Please Select Required value";
		}
	},

	start_date: (value, errors) => {
		if (!value) {
			errors["start_date"] = "Please Select Start Date";
		} else if (value && !validateDate(value)) {
			errors["start_date"] = "Please enter valid Start Date";
		}
	},
	end_date: (value, errors) => {
		if (!value) {
			errors["end_date"] = "Please Select End Date";
		} else if (value && !validateDate(value)) {
			errors["end_date"] = "Please enter valid End Date";
		}
	},
	event_type: (value, errors) => {
		if (!value) {
			errors["event_type"] = "Please Select the Event Type";
		}
	},
	challenge_type: (value, errors) => {
		if (!value) {
			errors["challenge_type"] = "Please Select the Challenge Type";
		}
	},
	event_struct: (value, errors) => {
		if (!value.length) {
			errors["event_struct"] = "Please Select  Test Items  to Create Event";
		}
	},
	description: (value, errors) => {
		if (!value) {
			errors["description"] = "Please Enter the Description";
		}
	},
	daily_goal: (value, errors) => {
		if (!value) {
			errors["daily_goal"] = "Please Enter the Daily Goal";
		} else if (value && !validateNumber(value)) {
			errors["daily_goal"] = "Please enter valid Daily Goal";
		}
	},
	user_id: (value, errors) => {
		if (!value) {
			errors["user_id"] = "User ID is Required";
		}
	},
	first_name: (value, errors) => {
		if (!value) {
			errors["first_name"] = " First Name is Required";
		} else if (value && !validateName(value)) {
			errors["first_name"] = "Please enter valid First name";
		}
	},
	last_name: (value, errors) => {
		if (!value) {
			errors["last_name"] = " Last Name is Required";
		} else if (value && !validateName(value)) {
			errors["last_name"] = "Please enter valid Last name";
		}
	},
	middle_name: (value, errors) => {
		if (value && !validateName(value)) {
			errors["middle_name"] = "Please enter valid middle name";
		}
	},
	middle_initial: (value, errors) => {
		if (value && !validateName(value)) {
			errors["middle_initial"] = "Please enter valid middle Initial";
		}
	},
	nick_name: (value, errors) => {
		if (value && !validateName(value)) {
			errors["nick_name"] = "Please enter valid Nickname ";
		}
	},
	user_name: (value, errors) => {
		if (!value) {
			errors["user_name"] = " Username is Required";
		} else if (value && !validateUserName(value)) {
			errors["user_name"] = "Please enter valid User name";
		}
	},
	email: (value, errors) => {
		if (!value) {
			errors["email"] = " Email Address is Required";
		} else if (value && !validateEmail(value)) {
			errors["email"] = "Please enter valid Email Address";
		}
	},
	re_enter_password: (value, errors) => {
		if (!value) {
			errors["re_enter_password"] = "Please Re-enter Password ";
		}
	},

	email_1: (value, errors) => {
		if (value && !validateEmail(value)) {
			errors["email_1"] = "Please enter valid Email Address";
		}
	},
	email_2: (value, errors) => {
		if (value && !validateEmail(value)) {
			errors["email_2"] = "Please enter valid Email Address";
		}
	},
	phone: (value, errors) => {
		if (value && !validatePhoneNumber(value)) {
			errors["phone"] = "Please enter valid Phone Number";
		}
	},
	phone_1: (value, errors) => {
		if (value && !validatePhoneNumber(value)) {
			errors["phone_1"] = "Please enter valid Phone Number";
		}
	},
	phone_2: (value, errors) => {
		if (value && !validatePhoneNumber(value)) {
			errors["phone_2"] = "Please enter valid Phone Number";
		}
	},
	password: (value, errors, user) => {
		if (!value) {
			errors["password"] = "Please enter Password";
		} else if (value && user === "student" && !validatePassword(value)) {
			errors["password"] =
				"Password should contain 8 characters with one uppercase letter,one lowercase letter,one number and one special character[!@#$%^&_*().-=+]";
		} else if (
			value &&
			user !== "student" &&
			user !== "login" &&
			!validatePassword(value)
		) {
			errors["password"] =
				"Password should contain 8 characters with one uppercase letter,one lowercase letter one number and special character[!@#$%^&_*().-=+]";
		}
	},

	login_status: (value, errors) => {
		if (value != 1 && value != 0) {
			errors["login_status"] = "Please select Status";
		}
	},

	// district_administrator_id: (value, errors) => {
	// 	if (!value) {
	// 		errors["district_administrator_id"] = "District Admin ID is Required";
	// 	}
	// },

	student_id: (value, errors) => {
		if (!value) {
			errors["student_id"] = "Student ID is Required";
		}
	},

	// school_administrator_id: (value, errors) => {
	// 	if (!value) {
	// 		errors["school_administrator_id"] = "School Administrator ID is Required";
	// 	}
	// },
	grade: (value, errors) => {
		if (!value) {
			errors["grade"] = "Grade is Required";
		}
	},

	date_of_birth: (value, errors) => {
		if (!value) {
			errors["date_of_birth"] = "Date of Birth is Required";
		}
	},

	parent_email_1: (value, errors) => {
		if (value && !validateEmail(value)) {
			errors["parent_email_1"] = "Please enter valid Email Address";
		}
	},
	parent_email_2: (value, errors) => {
		if (value && !validateEmail(value)) {
			errors["parent_email_2"] = "Please enter valid Email Address";
		}
	},

	gender: (value, errors) => {
		if (!value) {
			errors["gender"] = "Gender is Required";
		}
	},

	// ethnicity: (value, errors) => {
	//   if (!value) {
	//     errors["ethnicity"] = "ethnicity is Required";
	//   }
	// },

	class_name: (value, errors) => {
		if (!value) {
			return (errors["class_name"] = "Classname is Required");
		}
		if (value?.length > 90) {
			return (errors["class_name"] =
				"Classname should not contain more than 90 characters");
		}
	},

	school_name: (value, errors) => {
		if (!value) {
			errors["school_name"] = "School Name is Required";
		}
		if (value?.length > 90) {
			return (errors["school_name"] =
				"School Name should not contain more than 90 characters");
		}
	},

	status: (value, errors) => {
		if (!value) {
			errors["status"] = "status is Required";
		}
	},

	role: (value, errors) => {
		if (!value) {
			errors["role"] = "Role is Required";
		}
	},
	category: (value, errors) => {
		if (!value) {
			errors["category"] = "Category is Required";
		}
	},
	subject: (value, errors) => {
		if (!value) {
			errors["subject"] = "Subject is Required";
		}
	},
	primary_audience_name: (value, errors) => {
		if (!value || value.length === 0) {
			errors["primary_audience_name"] = "Primary Audience is Required";
		}
	},
	assessment_name: (value, errors) => {
		if (!value) {
			errors["assessment_name"] = "Assessment is Required";
		}
	},
	test_name: (value, errors) => {
		if (!value) {
			errors["test_name"] = "Test Name is Required";
		}
	},
	publish_date: (value, errors) => {
		if (!value) {
			errors["publish_date"] = "Publish Date is Required";
		}
	},
	expired_date: (value, errors) => {
		if (!value) {
			errors["expired_date"] = "Expired Date is Required";
		}
	},
	media_type: (value, errors) => {
		if (!value) {
			errors["media_type"] = "Media Type is Required";
		}
	},
	file_url: (value, errors) => {
		if (!value) {
			errors["file_url"] = "File is Required";
		}
	},
	district_name: (value, errors) => {
		if (!value) {
			errors["district_name"] = "District Name is Required";
		}
	},
	local_identifier: (value, errors) => {
		if (!value) {
			errors["local_identifier"] = "Local Identifier is Required";
		} else if (value && !validateAlphaNumeric(value)) {
			errors["local_identifier"] = "Please enter valid Local Identifier";
		}
	},
	// sso_id: (value, errors) => {
	//   if (value && !validateAlphaNumeric(value)) {
	//     errors["sso_id"] = "Please enter valid District SSO ID";
	//   }
	// },

	schoolUuid: (value, errors) => {
		if (!value) {
			errors["schoolUuid"] = "Please Select Schools";
		}
	},

	state: (value, errors) => {
		if (!value) {
			errors["state"] = "State is Required";
		}
	},
	is_active: (value, errors) => {
		if (!value) {
			errors["is_active"] = "Status is Required";
		}
	},

	name: (value, errors) => {
		if (!value) {
			errors["name"] = "Subject Name is Required";
		} else if (value && !validateString2(value)) {
			errors["name"] = "Please enter valid Subject Name";
		}
	},

	district_identifier: (value, errors) => {
		if (!value) {
			errors["district_identifier"] = "District  Identifier is Required";
		}
	},
	zipcode: (value, errors) => {
		if (!value) {
			errors["zipcode"] = "Zip code is Required";
		} else if (value && !validateZipcode(value)) {
			errors["zipcode"] = "Please enter valid zip code";
		}
	},

	district_code: (value, errors) => {
		if (!value) {
			errors["district_code"] = "District Code is Required";
		}
	},

	disclaimerAccepted: (value, errors) => {
		if (!value) {
			errors["disclaimerAccepted"] = "Required*";
		}
	},
	funder_name: (value, errors) => {
		if (!value) {
			errors["funder_name"] = "Funder Name is Required*";
		}
	},
	school_limit: (value, errors) => {
		if (!value) {
			errors["school_limit"] = "School Limit is Required*";
		}
	},

	cc: (value, errors) => {
		if (!value) {
			errors["cc"] = "Please select any emailID*";
		} else if (value && !validateEmail(value)) {
			errors["cc"] = "Please enter valid Email Address";
		}
	},

	bcc: (value, errors) => {
		if (!value) {
			errors["bcc"] = "Please select any emailID*";
		} else if (value && !validateEmail(value)) {
			errors["bcc"] = "Please enter valid Email Address";
		}
	},

	old_user_name: (value, errors) => {
		if (!value) {
			errors["old_user_name"] = "Please enter Old Username";
		}
	},
	new_user_name: (value, errors) => {
		if (!value) {
			errors["new_user_name"] = "Please enter New Username";
		}
	},
	confirm_user_name: (value, errors) => {
		if (!value) {
			errors["confirm_user_name"] = "Please Confirm your Username";
		}
	},
	old_password: (value, errors) => {
		if (!value) {
			errors["old_password"] = "Please enter your Old Password";
		}
	},

	new_password: (value, errors) => {
		if (!value) {
			errors["new_password"] = "Please enter Password";
		}
	},

	confirm_password: (value, errors) => {
		if (!value) {
			errors["confirm_password"] = "Please Confirm your Password";
		}
	},
	announcement_title: (value, errors) => {
		if (!value) {
			errors["announcement_title"] = "Please enter the Announcement Title";
		}
	},
	desc: (value, errors) => {
		if (!value) {
			errors["desc"] = "Please enter the Description";
		}
	},
	audience: (value, errors) => {
		if (!value?.length) {
			errors["audience"] = "Please Select intended Audience";
		}
	},
	url: (value, errors) => {
		if (value && !validateUrl(value)) {
			errors["url"] = "Please Enter valid Url";
		}
	},
	sendTo: (value, errors) => {
		if (!value) {
			errors["sendTo"] = "Please choose one option to send email";
		}
	},
	organization: (value, errors) => {
		if (!value) {
			errors["organization"] = "Please Select Organization";
		}
	},

	app_id_url: (value, errors) => {
		if (!value) {
			errors["app_id_url"] = "Please Enter App URL";
		}
	},

	authentication_type: (value, errors) => {
		if (!value) {
			errors["authentication_type"] = "Please Enter Authentication Type";
		}
	},

	authorization_url: (value, errors) => {
		if (!value) {
			errors["authorization_url"] = "Please Enter Authorization URL";
		} else if (value && !validateAuthenticationUrl(value)) {
			errors["authorization_url"] = "Please Enter Valid Authorization URL";
		}
	},

	callback_url: (value, errors) => {
		if (!value) {
			errors["callback_url"] = "Please Enter Callback URL";
		}
	},

	configuration_name: (value, errors) => {
		if (!value) {
			errors["configuration_name"] = "Please Enter Configuration name";
		}
	},

	district_uuid: (value, errors) => {
		if (!value) {
			errors["district_uuid"] = "Please Enter District name";
		}
	},

	fitness_gram_sso_field: (value, errors) => {
		if (!value) {
			errors["fitness_gram_sso_field"] = "Please Select from options";
		}
	},

	metadata_url: (value, errors) => {
		if (!value) {
			errors["metadata_url"] = "Please Enter Metadata URL";
		}
	},

	user_id_property: (value, errors) => {
		if (!value) {
			errors["user_id_property"] = "Please Enter User ID";
		}
	},

	discovery_url: (value, errors) => {
		if (!value) {
			errors["discovery_url"] = "Please Enter Discover Url";
		}
	},

	issuer: (value, errors) => {
		if (!value) {
			errors["issuer"] = "Please Enter Issuer";
		}
	},

	token_url: (value, errors) => {
		if (!value) {
			errors["token_url"] = "Please Enter Token Url";
		}
	},

	user_info_url: (value, errors) => {
		if (!value) {
			errors["user_info_url"] = "Please Enter User Info Url";
		}
	},

	user_info_http_type: (value, errors) => {
		if (!value) {
			errors["user_info_http_type"] = "Please Enter User Info Url";
		}
	},

	user_info_response_type: (value, errors) => {
		if (!value) {
			errors["user_info_response_type"] = "Please Enter User Info Response";
		}
	},

	district_id_property: (value, errors) => {
		if (!value) {
			errors["district_id_property"] = "Please Enter District Id";
		}
	},

	Json_web_key_set_url: (value, errors) => {
		if (!value) {
			errors["Json_web_key_set_url"] = "Please Enter JSON key";
		}
	},

	url_path: (value, errors) => {
		if (!value) {
			errors["url_path"] = "Please Enter Url";
		}
	},

	client_id: (value, errors) => {
		if (!value) {
			errors["client_id"] = "Please Enter Client Id";
		}
	},

	client_secret: (value, errors) => {
		if (!value) {
			errors["client_secret"] = "Please Enter Client Secret";
		}
	},

	response_type: (value, errors) => {
		if (!value) {
			errors["response_type"] = "Please Enter Response";
		}
	},

	response_mode: (value, errors) => {
		if (!value) {
			errors["response_mode"] = "Please Enter Response";
		}
	},

	scope: (value, errors) => {
		if (!value) {
			errors["scope"] = "Please Enter Scope";
		}
	},

	enable_state: (value, errors) => {
		if (!value) {
			errors["enable_state"] = "Please Enter Enabled State";
		}
	},

	enable_nonce: (value, errors) => {
		if (!value) {
			errors["enable_nonce"] = "Please Enter Enabled Nonce";
		}
	},

	fitness_gram_sso_field: (value, errors) => {
		if (!value) {
			errors["fitness_gram_sso_field"] = "Please Select from options";
		}
	},

	metadata_url: (value, errors) => {
		if (!value) {
			errors["metadata_url"] = "Please Enter Metadata URL";
		}
	},

	user_id_property: (value, errors) => {
		if (!value) {
			errors["user_id_property"] = "Please Enter User ID";
		}
	},

	school_start_date: (value, errors) => {
		if (!value) {
			errors["school_start_date"] = "Please Select Start Date";
		}
	},

	district_admin_role: (value, errors) => {},
	school_admin_role: (value, errors) => {},
	teacher_role: (value, errors) => {},
	state_admin_role: (value, errors) => {},
	partner_role: (value, errors) => {},
	funder_uuid: (value, errors) => {},
	license_uuid: (value, errors) => {},
	sso_id: (value, errors) => {},
	state_name: (value, errors) => {
		if (!value) {
			errors["state_name"] = "Please Enter Name";
		}
	},

	type: (value, errors) => {
		if (!value) {
			errors["type"] = "Please Select Type";
		}
	},

	district_uuid: (value, errors) => {
		if (!value) {
			errors["district_uuid"] = "Please Select District";
		}
	},
	license_name: (value, errors) => {
		if (!value) {
			errors["license_name"] = "Please enter license name";
		}
	},
};

export const validateFormData = (data, user = "hi") => {
	let errors = {};

	Object.keys(data).forEach((key) => {
		if (key.includes("password")) {
			VALIDATION_OBJ[key](data[key], errors, user);
		} else {
			VALIDATION_OBJ[key](data[key], errors);
		}
	});

	return errors;
};
