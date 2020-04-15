/* eslint-disable eqeqeq */
function Chrono(calendarx, start_date) {
  const calendary = calendarx;
  const calendarz = [];
  const calendara = [];
  let counterT = 0;
  let counterP = 0;
  let i;
  for (i = 0; i < calendary.length; i += 1) {
    if (calendary[i][0] >= start_date) {
      calendarz.push(calendary[i]);
    }
  }
  // console.log(calendarz);
  for (i = 0; i < calendarz.length; i += 1) {
    calendarz[i][6] = i;
    // console.log(calendarz[i][0]);
    if (counterP < 1288) {
      if (calendarz[i][5] == 'P') {
        counterP += 4;
        // console.log(counterP);
      } else if (calendarz[i][5] == 'T') {
        counterT += 4;
      }
      calendara.push(calendarz[i]);
    }
  }
  // //console.log(calendara);
  // console.log(counterP);
  // console.log(counterT);

  return calendara;
}

export default Chrono;
