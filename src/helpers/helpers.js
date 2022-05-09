/* Return errors message in an array */
const formatErrors = (responseDatas) => {
  let errorsArray = [];

  // Handle validation errors
  const validationErrors = responseDatas.validationErrors;
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