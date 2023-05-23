const DTOsUser = (user) => {
  const newUserDto = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
  return newUserDto;
};


class UserDTO{
  constructor(user){
    this.firstName=user.firstName;
    this.lastName=user.lastName;
    this.role=user.role;
  }
}



module.exports = DTOsUser;
module.exports = UserDTO;
