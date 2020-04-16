import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { parseISO, getYear, getMonth } from 'date-fns';

import authConfig from '../../config/auth';
import Contract from '../models/Contract';

class ApprovalController {
  async update(req, res) {
    const { id } = req.params;
    const rnd = Math.random();
    const rounded = Math.round(2 * rnd * 1000);
    const month = getMonth(new Date());
    const year = getYear(new Date());
    const contract = await Contract.findByPk(id);
    // const token = jwt.sign({ rnd }, authConfig.secret, {
    //   expiresIn: authConfig.expiresIn,
    // });

    const token = String(`ed${id}${month}${year}${rounded}`);

    const approval = await contract.update({ token });

    return res.json(approval);
  }
}

export default new ApprovalController();
