const DTOsUser = (user) => {
  const newUserDto = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    last_connection: user.last_connection,
  };
  return newUserDto;
};
module.exports = DTOsUser;
