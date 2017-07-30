const request = require("supertest");
const expect = require("expect");

const app = require("./server");

describe("Server", () => {
  describe("Get /", () => {
    it("should return hello world response", (done) => {
      request(app)
        .get("/")
        .expect(404)
        .expect(res => {
          expect(res.body).toInclude({
            error: "Page not found."
          })
        })
        .end(done);
    })
  });

  describe("Get user", () => {
    it("should return an array of users", (done) => {
      request(app)
        .get("/user")
        .expect(200)
        .expect(res => {
          expect(res.body).toInclude({
            name: "Joan",
            age: 31
          })
        })
        .end(done);
    });
  });
})
