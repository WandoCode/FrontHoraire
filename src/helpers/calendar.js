import VAR from "../globalVars.json";

const WEEKEND_POSITION = VAR.WEEKEND_POSITION;

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

    /* Construct array */
    let monthArray = [];
    let arrayIndex = 0;
    // Days before current month
    for (let i = 0; i < firstDayMonthIndex; i++) {
      let { newYear, newMonthIndex } = this.lastMonth(year, monthIndex);

      monthArray.push({
        day: nbrDaysInMonthBefore - firstDayMonthIndex + i + 1,
        monthIndex: newMonthIndex,
        year: newYear,
        currentMonth: false,
        weekend: WEEKEND_POSITION.includes(arrayIndex),
      });
      arrayIndex++;
    }
    //  Current month's days
    const now = new Date(Date.now());
    console.log(now);
    for (let i = 0; i < nbrDaysInMonth; i++) {
      monthArray.push({
        day: i + 1,
        monthIndex: monthIndex,
        year: year,
        currentMonth: true,
        today: now.getDate() === i + 1,
        weekend: WEEKEND_POSITION.includes(arrayIndex),
      });
      arrayIndex++;
    }
    // Days after current month
    for (let i = 0; i < trailingDays; i++) {
      let { newYear, newMonthIndex } = this.nextMonth(year, monthIndex);
      monthArray.push({
        day: i + 1,
        monthIndex: newMonthIndex,
        year: newYear,
        currentMonth: false,
        weekend: WEEKEND_POSITION.includes(arrayIndex),
      });
      arrayIndex++;
    }
    return monthArray;
  },
  // Return the next month
  nextMonth: (year, monthIndex) => {
    let newMonthIndex = monthIndex + 1;
    let newYear = year;
    if (newMonthIndex >= 12) {
      newMonthIndex = 0;
      newYear = year + 1;
    }
    return { newYear, newMonthIndex };
  },
  // Return the last month
  lastMonth: (year, monthIndex) => {
    let newMonthIndex = monthIndex - 1;
    let newYear = year;
    if (newMonthIndex <= -1) {
      newMonthIndex = 11;
      newYear = year - 1;
    }
    return { newYear, newMonthIndex };
  },
};

export { calendar };