var request = require("supertest");
var expect = require("expect");

var app = require("../server");
var Todo = require("../models/todos");

beforeEach(done => {
  Todo.remove({}).then(() => done());
});

describe("Post /todos", () => {
  it("should create a new todo", (done) => {
    var text = "Some test todo text ";
    var expectedText = text.trim();
    request(app)
      .post("/todos")
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toEqual(expectedText);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then(todos => {
          expect(todos.length).toEqual(1);
          expect(todos[0].text).toEqual(expectedText);
          done();
        }).catch(err => {
          done(err);
        });
      });
  });

  it("should not create a new todo with invalid data", () => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .expect(res => {
        expect(res.body).toIncludeKey("errors")
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then(todos => {
          expect(todos.length).toEqual(0);
          done();
        }).catch(err => {
          done(err);
        });
      });
  });
});
