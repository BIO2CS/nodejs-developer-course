var request = require("supertest");
var expect = require("expect");

var app = require("../server");
var Todo = require("../models/todos");

const todos = [
  {text: "Initial test todo text"},
  {text: "Some other text"}
];

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe("POST /todos", () => {
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
        Todo.find({text: expectedText}).then(todos => {
          expect(todos.length).toEqual(1);
          expect(todos[0].text).toEqual(expectedText);
          done();
        }).catch(err => {
          done(err);
        });
      });
  });

  it("should not create a new todo with invalid data", (done) => {
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
          expect(todos.length).toEqual(2);
          done();
        }).catch(err => {
          done(err);
        });
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toEqual(2);
      })
      .end(done);
  });
});
