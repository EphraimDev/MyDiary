import GUID from '../utils/guid';

const data = {
  signup: {
    user_id: GUID,
    firstname: 'James',
    lastname: 'Andrew',
    country: 'Nigeria',
    email: 'abgf@yahoo.com',
    password: 'JamesAnd1@',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
  },
  login: {
    email: 'abgf@yahoo.com',
    password: 'JamesAnd1@',
  },
  forgotPassword: {
    email: 'abgf@yahoo.com',
  },
  resetPassword: {
    email: 'abgf@yahoo.com',
    password: 'JamesAnd1@',
  },
  noName: {
    user_id: GUID,
    lastname: 'Andrew',
    country: 'Nigeria',
    email: 'abgf@yahoo.com',
    password: 'JamesAnd1@',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
  },
  wrongEmailFormat: {
    user_id: GUID,
    firstname: 'James',
    lastname: 'Andrew',
    country: 'Nigeria',
    email: 'yahoo',
    password: 'JamesAnd1@',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
  },
  wrongPasswordFormat: {
    user_id: GUID,
    firstname: 'James',
    lastname: 'Andrew',
    country: 'Nigeria',
    email: 'abgf@yahoo.com',
    password: 'JamesAnd',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
  },
  wrongEmailLoginFormat: {
    email: 'yahoo.com',
    password: 'JamesAnd1@',
  },
  wrongPasswordLoginFormat: {
    email: 'abgf@yahoo.com',
    password: 'JamesAnd',
  },
  noUser: {
    email: 'abf@yahoo.com',
    password: 'JamesAnd1@',
  },
  incorrectPassword: {
    email: 'abgf@yahoo.com',
    password: 'Jamesnd1@',
  },
  incorrectEmail: {
    email: 'abdgf@yahoo.com',
  },

};

export default data;
