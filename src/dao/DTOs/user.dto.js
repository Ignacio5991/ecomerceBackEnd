const DTOsUser = (user) => {
  const newUserDto = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
  return newUserDto;
};
// class DTOsUser {
//   constructor(users) {
//     this.firstName = users.firstName;
//     this.lastName = users.lastName;
//     this.fullName = users.firstName + ' ' + users.lastName;

//     this.email = users.email;
//     this.age = users.age;
//     this.password = users.password;
//     this.role = users.role;
//   }
// }

module.exports = DTOsUser;
