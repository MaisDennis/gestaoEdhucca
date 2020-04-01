import * as Yup from 'yup';
import {
  addMonths,
  parseISO,
  format,
  differenceInBusinessDays,
} from 'date-fns';

import Contract from '../models/Contract';
import Holidays from '../../utils/calcHolidaysBR';
import Chrono from '../../utils/generateChrono';

class ContractController {
  async store(req, res) {
    const schema = Yup.object().shape({});
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, company_id } = req.body;
    // const start_date = new Date();
    const start_date = parseISO('2020-03-30');
    const end_date = addMonths(start_date, 24);
    const businessDays = differenceInBusinessDays(end_date, start_date);
    const pDays = businessDays * 0.4;
    const tDays = businessDays * 0.6;

    const holidays = Holidays(start_date, end_date);
    const chrono = Chrono(start_date, end_date);

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
    // console.log(conglo);

    const contract = await Contract.create({
      student_id,
      company_id,
      start_date,
      end_date,
    });

    return res.json({
      contract,
      businessDays,
      pDays,
      tDays,
      // holidays,
      // chrono,
      conglo,
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
    const contracts = await Contract.findAll();
    return res.json(contracts);
  }
}

export default new ContractController();
