import {
  format,
  parseISO,
  getDay,
  getDate,
  getMonth,
  getYear,
  addDays,
  differenceInCalendarDays,
} from 'date-fns';

function genCalendar(start_date, end_date) {
  const parsedStart_date = parseISO(start_date);
  const parsedEnd_date = parseISO(end_date);
  const calendarDays = differenceInCalendarDays(
    parsedEnd_date,
    parsedStart_date
  );
  const Data = [];
  let i;
  let year;
  let month;
  let day;
  let day_week;
  const type = 'P';
  let next_date = parsedStart_date;
  let bracket = [];

  for (i = 0; i < calendarDays; i += 1) {
    year = getYear(next_date);
    month = getMonth(next_date);
    day = getDate(next_date);
    day_week = getDay(next_date);
    const id = i;

    const formatNext = format(next_date, "yyyy'-'MM'-'dd");
    bracket = [formatNext, year, month, day, day_week, type, id];
    next_date = addDays(next_date, 1);

    Data.push(bracket);
  }
  return Data; // array with bracket [formatNext, year, month, day, day_week].
}

export default genCalendar;
