import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        image: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: false,
        underscored: true,
        modelName: "Post",
        tableName: "post",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "fk_user_id", sourceKey: "id" });
    db.Post.hasMany(db.Comment, { foreignKey: "fk_post_id", sourceKey: "id" });
    db.Post.belongsToMany(db.User, {
      through: "Like",
      as: "Liker",
      foreignKey: "fk_post_id",
      sourceKey: "id",
    });
  }
}
