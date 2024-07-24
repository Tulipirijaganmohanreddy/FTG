export const validateString = (value) => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(value);
};
export const validateAlphaNumeric = (value) => {
  const regex = /^[a-zA-Z0-9-]+$/;
  return regex.test(value);
};
export const validateName = (value) => {
  const regex = /^[A-Za-z\s\-'.!@#$%^&*()_]+$/;
  return regex.test(value);
};

export const validateString2 = (value) => {
  const regex = /^[ A-Za-z0-9_@./#&+-]*$/;
  return regex.test(value);
};
export const validateUserName = (value) => {
  const regex = /^[ A-Za-z0-9_@./#&+'-]*$/;
  return regex.test(value);
};
export const validateRequired = (value) => {
  return value !== "";
};

export const validateEmail = (value) => {
  const regex = /^[\w.%+'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  return regex.test(value);
};

export const validatePhoneNumber = (value) => {
  const regex = /^(\+?1[-.\s]?)?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return regex.test(value);
};

export const validatePAN = (value) => {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(value);
};

export const validateAadhar = (value) => {
  const regex = /^[0-9]{12}$/;

  return regex.test(value);
};
export const validateNumber = (value) => {
  var regex = /^[0-9]*$/;
  return regex.test(value);
};

export const validateDate = (value) => {
  var regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(value);
};
export const validatePincode = (value) => {
  const regex = /^[0-9]{6}$/;
  return regex.test(value);
};

export const validateZipcode = (value) => {
  const regex = /^\d{5}(?:[-\s]\d{4})?$/;
  return regex.test(value);
};

export const validatePassword = (value) => {
  // const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-_=+]{8}.*$/;



  // pattern with . character 

  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-=+_.])[A-Za-z\d!@#$%^&*()\-=+_.]{8,}$/;

  // previous pattern without . character

  // /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-=+_])[A-Za-z\d!@#$%^&*()\-=+_]{8,}$/;



  // /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?~]{8,}$/

  // const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8}$/;

  return regex.test(value);
};
export const validatePassword_2 = (value) => {
  // const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-_=+]{12,}$/;
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-=+_])[A-Za-z\d!@#$%^&*()\-=+_.]{12,}$/;
  return regex.test(value);
};

export const validateUrl = (value) => {
  const regex =
    // /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[a-zA-Z0-9./_-]*$/;
    /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[a-zA-Z0-9./_-]*\??.*$/;

  return regex.test(value);
};

export const validateAuthenticationUrl = (value) => {
  const regex = /^\S*$/;

  return regex.test(value);
};

export const validateAuthenticationType = (value) => {
  const regex = /^[a-zA-Z0-9]{4}$/;

  return regex.test(value);
};

export const validateId = (value) => {
  const regex = /^(?=.*[a-zA-Z0-9]).+$/;
  return regex.test(value);
};
