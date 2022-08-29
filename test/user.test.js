import User from "../models/User.js";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.should();
 
chai.use(chaiHttp);
 
describe("/DELETE Users", () => {
    it("it should ELETE all the users", (done) => {
      chai
        .request(app)
        .delete("/api/v1/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
   })
  });
  describe("/GET user", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(app)
        .get("/api/v1/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST user", () => {
    it("it should new POST a user", (done) => {
      let user = {
        email: "j@j.com",
        password: "12345678",
        username: "jairos"
      };
      chai
        .request(app)
        .post("/api/v1/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });
  describe("/GET/:id user", () => {
    it("it should GET a user by the id", (done) => {
      let user = new User({
          email: "j1@j1.com",
          password: "12345678",
          username: "jairos2022"
      });
      user.save((err, user) => {
        chai
          .request(app)
          .get("/api/v1/users/" + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id user", () => {
    it("it should UPDATE a user given the id", (done) => {
      let user = new User({
        email: "j12@j12.com",
        password: "12345678",
        username: "jairos2022"
      });
      user.save((err, user) => {
        console.log(user.id);
        chai
          .request(app)
          .put("/api/v1/users/" + user.id)
          .send({
            email: "j1updated@j1.com",
            password: "12345678",
            username: "jairos2022"          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/DELETE/:id user", () => {
    it("it should DELETE a user given the id", (done) => {
      let user = new User({
        email: "j1update@j1.com",
          password: "12345678",
          username: "jairos2022"      });
      user.save((err, user) => {
        chai
          .request(app)
          .delete("/api/v1/users/" + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });

