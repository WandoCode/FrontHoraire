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

const calendar = {
  getNbrDaysInMonth: (year, monthIndex) => {
    let date = new Date(year, monthIndex + 1, 0);
    return date.getDate();
  },
  // Return the day starting month: 0 = sunday, 6 = saturday
  getFirstDayMonthIndex: (year, monthIndex) => {
    let date = new Date(year, monthIndex, 1);

    return (date.getDay() + 6) % 7;
  },

  // return an array of 42 days for the given monthIndex
  constructCalendarArray: function (year, monthIndex) {
    // Current month
    let nbrDaysInMonth = this.getNbrDaysInMonth(year, monthIndex);
    let firstDayMonthIndex = this.getFirstDayMonthIndex(year, monthIndex);

    // Month before
    let nbrDaysInMonthBefore = this.getNbrDaysInMonth(year, monthIndex - 1);

    // Month after
    let trailingDays = 42 - firstDayMonthIndex - nbrDaysInMonth; //42 days = 6 weeks

    // Construct array
    let monthArray = [];
    // Days before current month
    for (let i = 0; i < firstDayMonthIndex; i++) {
      monthArray.push({
        day: nbrDaysInMonthBefore - firstDayMonthIndex + i + 1,
        currentMonth: false,
      });
    }
    // days of the current month
    for (let i = 0; i < nbrDaysInMonth; i++) {
      monthArray.push({ day: i + 1, currentMonth: true });
    }
    // Days after current month
    for (let i = 0; i < trailingDays; i++) {
      monthArray.push({ day: i + 1, currentMonth: false });
    }
    return monthArray;
  },
};

export { formatErrors, calendar };