const checkIfEmailInvalid = (email) => {
  const isMailDogInvalid = email.indexOf('@') <= 0 || email.indexOf('@') !==  email.lastIndexOf('@');
  const isMailDotInvalid = email.lastIndexOf('.') <= email.indexOf('@') + 1 || email.lastIndexOf('.') === email.length - 1;
  return isMailDogInvalid || isMailDotInvalid
}

export default checkIfEmailInvalid;
