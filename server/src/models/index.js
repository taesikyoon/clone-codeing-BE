export * from "./sequelize.js";
import sequelize from "./sequelize.js";

import User from "./user.js";
import Post from "./post.js";
import Comment from "./comment.js";
import UserDetail from "./user-detail.js";

const db = {};

db.sequelize = sequelize;
db.User = User;
db.UserDetail = UserDetail;
db.Post = Post;
db.Comment = Comment;

User.init(sequelize);
UserDetail.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);

User.associate(db);
UserDetail.associate(db);
Post.associate(db);
Comment.associate(db);

export {
  db,
};