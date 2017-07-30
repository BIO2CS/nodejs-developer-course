const expect = require("expect");

const utils = require("./utils.js");

describe("Utils", () => {

  describe("#Add", () => {
    it("should add two numbers", () => {
      const res = utils.add(1, 2);
      expect(res).toBeA("number").toEqual(3);
    });

    it("should async add two numbers", (done) => {
      utils.asyncAdd(10, 22, (sum) => {
        expect(sum).toBeA("number").toEqual(32);
        done();
      });
    })
  });

  it("should square a number", () => {
    const res = utils.square(3);
    expect(res).toEqual(9).toBeA("number");
  });

  it("should async square a number", (done) => {
    utils.asyncSquare(9, (square) => {
      expect(square).toBeA("number").toEqual(81);
      done();
    });
  })

  it("should set name correctly", () => {
    const user = {
      age: 31,
      location: "Cupertino"
    };
    utils.setName(user, "Joan Gu");
    expect(user).toInclude({firstName: "Joan"});
    expect(user).toInclude({lastName: "Gu"});
  });

});



// it("should expect some value", () => {
//   expect([ 1, 2, 3 ]).toInclude(3)
//   expect({ a: 1, b: 2 }).toInclude({ b: 2 })
//   expect({ a: 1, b: 2, c: { d: 3 } }).toInclude({ b: 2, c: { d: 3 } })
//   expect('hello world').toInclude('world')
// });
