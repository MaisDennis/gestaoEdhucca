import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Contract from '../models/Contract';

class ApprovalController {
  async update(req, res) {
    const { id } = req.params;
    const rnd = Math.random();
    const contract = await Contract.findByPk(id);
    const token = jwt.sign({ rnd }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const approval = await contract.update({ token });

    return res.json(approval);
  }
}

export default new ApprovalController();
