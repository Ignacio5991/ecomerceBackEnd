const DTOsUser = (user) => {
  const newUserDto = {
    id:user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    last_connection: user.last_connection,
    documents:user.documents
  };
  return newUserDto;
};
module.exports = DTOsUser;
