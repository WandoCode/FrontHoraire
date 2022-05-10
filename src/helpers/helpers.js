/* Return errors message in an array */
const formatErrors = (responseDatas) => {
  let errorsObject = {};

  // Handle validation errors
  const validationErrors = responseDatas.validationErrors;
  if (validationErrors) {
    const errors = validationErrors.errors;
    for (const error of errors) {
      errorsObject[error.param]
        ? errorsObject[error.param].push(error.msg)
        : (errorsObject[error.param] = [error.msg]);
    }
  }
  // Handle other errors
  else {
    errorsObject["all"] = responseDatas.message;
  }
  return errorsObject;
};

const createPathCal = (calendrier, { day, monthIndex, year }) => {
  // Check if the year, month and day are already in the calendrier
  // Create path if necessary
  if (!calendrier) {
    calendrier = {};
  }
  if (!calendrier[year]) {
    calendrier[year] = {};
  }

  if (!calendrier[year][monthIndex]) {
    calendrier[year][monthIndex] = {};
  }

  if (!calendrier[year][monthIndex][day]) {
    calendrier[year][monthIndex][day] = {};
  }

  return calendrier;
};

export { formatErrors, createPathCal };