import Sequelize, { Model } from 'sequelize';

class Calendar extends Model {
  static init(sequelize) {
    super.init(
      {
        calendar: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Calendar;
