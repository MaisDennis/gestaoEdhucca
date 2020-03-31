import User from '../models/User';

class CoordController {
  async index(req, res) {
    const coordinators = await User.findAll({
      where: { coordinator: true },
    });
    return res.json(coordinators);
  }
}
export default new CoordController();
