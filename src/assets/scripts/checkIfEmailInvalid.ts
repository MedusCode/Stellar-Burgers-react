const checkIfEmailInvalid = (email: string): boolean => {
  const isMailDogInvalid: boolean = email.indexOf('@') <= 0 || email.indexOf('@') !==  email.lastIndexOf('@');
  const isMailDotInvalid: boolean = email.lastIndexOf('.') <= email.indexOf('@') + 1 || email.lastIndexOf('.') === email.length - 1;
  return isMailDogInvalid || isMailDotInvalid
}

export default checkIfEmailInvalid;
