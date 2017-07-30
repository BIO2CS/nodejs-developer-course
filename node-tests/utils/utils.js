module.exports = {
  add: (a, b) => a + b,
  asyncAdd: (a, b, callback) => {
    setTimeout(() => {
      callback(a + b);
    }, 1000);
  },
  square: (a) => a * a,
  asyncSquare: (x, callback) => {
    setTimeout(() => {
      callback(x * x);
    }, 1000);
  },
  setName: (user, fullName) => {
    var names = fullName.split(" ");
    user.firstName = names[0];
    user.lastName = names[1];
    return user;
  }
}
