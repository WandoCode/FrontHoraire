/* Return errors message in an array */
const formatErrors = (responseDatas) => {
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