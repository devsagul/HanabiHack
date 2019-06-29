module.exports = {
  people: getPeople(),
  admin: getAdmin(),
  users: getUsers(),
  paths: getPaths()
};

function getPeople() {
  return [
    { id: 1, firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
    { id: 2, firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
    { id: 3, firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
    { id: 4, firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
    { id: 5, firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
    { id: 6, firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { id: 7, firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' },
    { id: 8, firstName: 'Aaron', lastName: 'Jinglehiemer', age: 22, location: 'Utah' }
  ];
}

function getAdmin() {
  return [
    { id: 1, firstName: 'Alberto', lastName: 'Garza', age: 25, location: 'Utah' },
    { id: 2, firstName: 'Robert', lastName: 'Parr', age: 40, location: 'California' }
  ]
}

function getUsers() {
  return [
    { email: 'user@test.com', password: '1234', roles: ['USER']},
    { email: 'admin@test.com', password: '1234', roles: ['USER', 'ADMIN']}
  ]
}

function getPaths() {
  return [
    {path: '/people', roles: ['USER', 'ADMIN']},
    {path: '/person/:id', roles: ['USER', 'ADMIN']},
    {path: '/admin', roles: ['ADMIN']}
  ]
}
