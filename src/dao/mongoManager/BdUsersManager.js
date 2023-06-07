const UsersModel = require('../models/users.model');

class BdUserManager {
  get = () => UsersModel.find();

  insert = (user) => UsersModel.create(user);

  update = (user, id) => UsersModel.findByIdAndUpdate(id, user);

  delete = (id) => UsersModel.findByIdAndDelete(id);

  lastConnection = (user, lastconnection) => {
    user.last_connection = lastconnection;
    let result = UsersModel.updateOne({ email: user.email }, user);
    return result;
  };
}

module.exports = new BdUserManager();
