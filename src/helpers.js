function loginUser(username, password) {
  //TODO: créer une fct qui fait le login de l'utilisateur pour pouvoir l'invoquer dans LoginForm et SignUpForm
  //TODO: Bien veiller à ce qu'elle ne fasse rien d'autre (les message d'erreurs seront gérés en dehors
  a;
}

/* Return errors message in an array */
const formatErrors = (responseDatas, cb) => {
  const validationErrors = responseDatas.validationErrors;
  let errorsArray = [];

  // Handle validation errors
  if (validationErrors) {
    errorsArray = validationErrors.errors.map((err) => {
      return err.msg;
    });
  }
  // Handle other errors
  else {
    errorsArray.push(responseDatas.message);
  }
  return errorsArray;
};

export { formatErrors, loginUser };