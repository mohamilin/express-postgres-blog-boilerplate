/**
 * TYPES OF RULE
 * 1 = superAdmin
 * 2 = admin
 * 3 = user
 */

/**
 * Spesific Task
 * Role superAdmin := dapat melakukan 3 tugas khusus ; 'managerUsers', 'getUsers', 'manageCategory'
 * Role admin := dapat melakukan 2 tugas khusu ; 'getUsers', 'manageCategory'
 * Role user := tidak memiliki tugas khusus.
 *
 */

const listRoles = {
  1: ['managerUsers', 'getUsers', 'manageCategory'],
  2: ['getUsers', 'manageCategory'],
  3: [],
};

const roles = Object.keys(listRoles);
const role = new Map(Object.entries(listRoles));

module.exports = {
  roles,
  role,
};
