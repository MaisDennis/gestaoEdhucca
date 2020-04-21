import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Contract from '../models/Contract';
import Student from '../models/Student';
import Company from '../models/Company';
import Calendar from '../models/Calendar';
import Holidays from '../../utils/calcHolidaysBR';
import Chrono from '../../utils/generateStudentCalendar';

class ContractController {
  async store(req, res) {
    const schema = Yup.object().shape({});
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, company_id, start_date } = req.body;
    const parsedStart_date = parseISO(start_date);

    const calendars = await Calendar.findAll({
      order: ['id'],
    });
    const calendarx = calendars[0].calendar;
    // console.log(calendarx);

    const calendara = Chrono(calendarx, start_date);
    const chrono = JSON.stringify(calendara);
    const end_date = calendara[calendara.length - 1][0];
    // const end_date = addMonths(parsedStart_date, 24);

    /*
    // generate chrono
    const businessDays = differenceInBusinessDays(end_date, parsedStart_date);
    const pDays = businessDays * 0.4;
    const tDays = businessDays * 0.6;
    const holidays = Holidays(parsedStart_date, end_date);
    const chrono = Chrono(parsedStart_date, end_date);
    const conglo = chrono.concat(holidays);
    conglo.sort();
    const congloLength = conglo.length;
    let i;
    for (i = congloLength; i > 1; i -= 1) {
      if (conglo[i - 2][0] === conglo[i - 1][0]) {
        conglo.splice(i - 1, 1);
        console.log(conglo[i - 1][0]);
      }
    }
    */
    // console.log(conglo);

    // generate calendar
    // const calendar = genCalendar();

    const contract = await Contract.create({
      student_id,
      company_id,
      start_date,
      end_date,
      chrono,
    });

    return res.json({
      contract,
      // calendarx,
      chrono,
      // businessDays,
      // pDays,
      // tDays,
      // holidays,
      // chrono,
      // conglo,
      // calendar,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { student_id, company_id, start_date } = req.body;

    const contract = await Contract.findByPk(id);
    if (contract.token) {
      return res
        .status(400)
        .json({ error: 'This contract can not be updated.' });
    }

    contract.update({ student_id, company_id, start_date });

    return res.json(contract);
  }

  async index(req, res) {
    // const { test } = req.query;
    // console.log(test);
    const contracts = await Contract.findAll({
      order: ['createdAt'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'cpf'],
        },
        {
          model: Company,
          as: 'company',
          attributes: ['name', 'cnpj'],
        },
      ],
    });
    return res.json(contracts);
  }
}

export default new ContractController();
