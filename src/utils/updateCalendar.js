import { parseISO, differenceInCalendarDays } from 'date-fns';

function updateCalendar(
  calendar,
  tDate,
  tType,
  rDate,
  rType,
  lrDate,
  lrType,
  pDate,
  pType,
  fiStartDate,
  fiEndDate,
  fiType,
  fcStartDate,
  fcEndDate,
  fcType
) {
  let i;
  let j;

  // Date for 'T'.
  for (i = 0; i < calendar.length; i += 1) {
    if (calendar[i][0] == tDate) {
      // console.log(calendars.calendar[i][0]);
      calendar[i][5] = tType;
    }
    // console.log(calendar[i][0]);
  }

  // Date for 'R'.
  for (i = 0; i < calendar.length; i += 1) {
    if (calendar[i][0] == rDate) {
      calendar[i][5] = rType;
    }
  }

  // Date for 'LR'.
  for (i = 0; i < calendar.length; i += 1) {
    if (calendar[i][0] == lrDate) {
      calendar[i][5] = lrType;
    }
  }

  // Date for 'P'.
  for (i = 0; i < calendar.length; i += 1) {
    if (calendar[i][0] == pDate) {
      calendar[i][5] = pType;
    }
  }

  // Date for 'W'.
  for (i = 0; i < calendar.length; i += 1) {
    if (calendar[i][4] == 0 || calendar[i][4] == 6) {
      calendar[i][5] = 'W';
    }
  }

  // Start date and End date for 'FI'.
  const deltaFI =
    1 + differenceInCalendarDays(parseISO(fiEndDate), parseISO(fiStartDate));
  for (i = 0; i < calendar.length; i += 1) {
    if (calendar[i][0] == fiStartDate) {
      for (j = 0; j < deltaFI; j += 1) {
        calendar[i][5] = fiType;
        i += 1;
      }
      i -= deltaFI;
    }
  }

  // Start date and End date for 'FC'.
  const deltaFC =
    1 + differenceInCalendarDays(parseISO(fcEndDate), parseISO(fcStartDate));
  for (i = 0; i < calendar.length; i += 1) {
    if (calendar[i][0] == fcStartDate) {
      for (j = 0; j < deltaFC; j += 1) {
        calendar[i][5] = fcType;
        i += 1;
      }
      i -= deltaFC;
    }
  }

  return calendar;
}

export default updateCalendar;
