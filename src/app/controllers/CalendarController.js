import Calendar from '../models/Calendar';
import genCalendar from '../../utils/generateCalendar';
import updateCalendar from '../../utils/updateCalendar';

class CalendarController {
  async store(req, res) {
    // const { start_date, end_date } = req.body;

    const start_date = '2020-01-01';
    const end_date = '2030-12-31';
    const calendar = JSON.stringify(genCalendar(start_date, end_date));
    // console.log(calendar);
    await Calendar.create({
      start_date,
      end_date,
      calendar,
    });

    return res.json({
      calendar,
      start_date,
      end_date,
    });
  }

  async index(req, res) {
    // const { id } = req.params;
    const calendars = await Calendar.findAll({
      order: ['id'],
    });
    return res.json(calendars);
  }

  async update(req, res) {
    const { id } = req.params;

    const {
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
      fcType,
    } = req.body;
    console.log(fcType);
    let calendars = await Calendar.findByPk(id);
    // console.log(calendars);
    let { calendar } = calendars;
    // console.log(calendar.length);

    calendar = updateCalendar(
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
    );

    calendars = await calendars.update({ calendar: JSON.stringify(calendar) });
    // console.log(calendars.length);

    return res.json(calendars);
  }
}

export default new CalendarController();
