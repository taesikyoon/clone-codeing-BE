import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class UserDetail extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      introduce: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM("남자", "여자"),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "UserDetail",
      tableName: "user_detail",
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  };

  static associate(db) {
    db.UserDetail.belongsTo(db.User, { foreignKey: "fk_user_id", sourceKey: "id" });
  } 
}