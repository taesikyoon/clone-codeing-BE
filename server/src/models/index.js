export * from "./sequelize.js";
import sequelize from "./sequelize.js";

import User from "./user.js";
import Post from "./post.js";
import Comment from "./comment.js";

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);

export { db };
