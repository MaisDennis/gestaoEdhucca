import {
  format,
  addBusinessDays,
  differenceInBusinessDays,
  getMonth,
} from 'date-fns';

function Chrono(start_date, end_date) {
  const businessDays = differenceInBusinessDays(end_date, start_date);
  const Data = [];
  let i;
  let next_date = start_date;
  let j = 0;
  let bracket = [];

  for (i = 0; i < businessDays; i += 1) {
    const beforeMonth = getMonth(next_date);
    next_date = addBusinessDays(next_date, 1);
    const afterMonth = getMonth(next_date);
    j += 1;

    const formatNext = format(next_date, "yyyy'-'MM'-'dd");
    if (j < 9) {
      bracket = [formatNext, 'P'];
    } else {
      bracket = [formatNext, 'T'];
    }

    if (beforeMonth !== afterMonth) {
      j = 0;
    }
    Data.push(bracket);
  }

  return Data;
}

export default Chrono;
