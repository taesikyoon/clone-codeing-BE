import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {       
      nickname: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      snsId: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "local",
      },
      introduce: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique : true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM("male", "female"),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: true,
      modelName: "User",
      tableName: "user",
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  };

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "fk_user_id", sourceKey: "id" });
    db.User.hasMany(db.Post, { foreignKey: "fk_user_id", sourceKey: "id" });
    db.User.belongsToMany(db.Post, {
      through: "Like",
      foreignKey: "fk_user_id",
      sourceKey: "id",
    });
    db.User.belongsToMany(db.Comment, { through: "CommentLike" });
  }
}
