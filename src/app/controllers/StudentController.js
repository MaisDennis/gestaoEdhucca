import * as Yup from 'yup';
import CPF from 'cpf'; // https://github.com/theuves/cpf

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required().min(11).max(11),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const studentExists = await Student.findOne({
      where: { cpf: req.body.cpf },
    });
    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const checkCpf = CPF.isValid(req.body.cpf);
    if (!checkCpf) {
      return res.status(400).json({ error: 'Invalid CPF.' });
    }

    const { id, name, cpf } = await Student.create(req.body);

    return res.json({
      id,
      name,
      cpf,
    });
  }
}

export default new StudentController();
