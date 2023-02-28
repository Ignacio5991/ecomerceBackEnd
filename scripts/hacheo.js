const bcrypt = require('bcrypt');

const hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, hash) => {
  const response = bcrypt.compareSync(password, hash);
  console.log(response);
};
