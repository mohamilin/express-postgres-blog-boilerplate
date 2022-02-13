const listRoles = {
  superAdmin: ['managerUsers', 'getUsers'],
  admin: ['getUsers'],
  user: [],
};

const roles = Object.keys(listRoles);
const role = new Map(Object.entries(listRoles));

module.exports = {
  roles,
  role,
};
