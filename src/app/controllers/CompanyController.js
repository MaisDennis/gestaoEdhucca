import * as Yup from 'yup';
import { validate } from 'cnpj'; // https://github.com/gabrielizaias/cnpj

import Company from '../models/Company';

class CompanyController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cnpj: Yup.string().required().min(14).max(14),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const companyExists = await Company.findOne({
      where: { cnpj: req.body.cnpj },
    });
    if (companyExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    console.log(req.body.cnpj);

    const checkCnpj = validate(req.body.cnpj);
    if (!checkCnpj) {
      return res.status(400).json({ error: 'Invalid CNPJ.' });
    }

    const { id, name, cnpj } = await Company.create(req.body);

    return res.json({
      id,
      name,
      cnpj,
    });
  }
}

export default new CompanyController();
