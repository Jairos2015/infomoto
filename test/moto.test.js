import Moto from "../models/Moto.js";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.should();
 
chai.use(chaiHttp);
 
describe("Motos", () => {
  beforeEach((done) => {
    Moto.deleteMany({}, (err) => {
      if(err) {console.log(err)};
      done();
    });
  });
  describe("/GET moto", () => {
    it("it should GET all the motos", (done) => {
      chai
        .request(app)
        .get("/api/v1/motos")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST moto", () => {
    it("it should new POST a moto", (done) => {
      let moto = {
        "marca": "Honda",
        "modelo": "12345678",
        "anno":"j@js.com",
        "bujia":"[{j@js.com}]",
        "cadenas":"[{j@js.com}]",
        "baterias":"[{j@js.com}]",
        "rad_delantero":"j@js.com",
        "rad_trasero":"j@js.com",
        "lla_delantera":"j@js.com",
        "lla_trasera":"j@js.com",
        "rin_delantero":"j@js.com",
        "rin_trasero":"j@js.com",
        "bom_farola":"j@js.com",
        "bom_direccional":"j@js.com",
        "bom_stop":"j@js.com",
        "bom_tablero":"j@js.com",
        "ret_cig_izquierdo":"j@js.com",
        "ret_cig_derecho":"j@js.com",
        "ret_cambios":"j@js.com",
        "ret_crank":"j@js.com",
        "ret_salida":"j@js.com",
        "ret_vicluth":"j@js.com",
        "ret_telescopio":"j@js.com",
        "bal_cig_izquierdo":"j@js.com",
        "bal_cig_derecho":"j@js.com",
        "bal_cam_del_izquierda":"j@js.com",
        "bal_cam_del_derecha":"j@js.com",
        "bal_cam_tra_izquierda":"j@js.com",
        "bal_cam_tra_derecha":"j@js.com",
        "bal_cam_tra_sprocket":"j@js.com",
        "bal_caj_izquierda":"j@js.com",
        "bal_caj_derecha":"j@js.com",
        "bal_clutch":"j@js.com",
        "bal_arbol":"j@js.com"
      };
      chai
        .request(app)
        .post("/api/v1/motos")
        .send(moto)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });
  describe("/GET/:id moto", () => {
    it("it should GET a moto by the id", (done) => {
      let moto = new Moto({
        "marca": "Kawasaki",
        "modelo": "5678",
        "anno":"j@js.com",
        "bujia":"[{j@js.com}]",
        "cadenas":"[{j@js.com}]",
        "baterias":"[{j@js.com}]",
        "rad_delantero":"j@js.com",
        "rad_trasero":"j@js.com",
        "lla_delantera":"j@js.com",
        "lla_trasera":"j@js.com",
        "rin_delantero":"j@js.com",
        "rin_trasero":"j@js.com",
        "bom_farola":"j@js.com",
        "bom_direccional":"j@js.com",
        "bom_stop":"j@js.com",
        "bom_tablero":"j@js.com",
        "ret_cig_izquierdo":"j@js.com",
        "ret_cig_derecho":"j@js.com",
        "ret_cambios":"j@js.com",
        "ret_crank":"j@js.com",
        "ret_salida":"j@js.com",
        "ret_vicluth":"j@js.com",
        "ret_telescopio":"j@js.com",
        "bal_cig_izquierdo":"j@js.com",
        "bal_cig_derecho":"j@js.com",
        "bal_cam_del_izquierda":"j@js.com",
        "bal_cam_del_derecha":"j@js.com",
        "bal_cam_tra_izquierda":"j@js.com",
        "bal_cam_tra_derecha":"j@js.com",
        "bal_cam_tra_sprocket":"j@js.com",
        "bal_caj_izquierda":"j@js.com",
        "bal_caj_derecha":"j@js.com",
        "bal_clutch":"j@js.com",
        "bal_arbol":"j@js.com"
      });
      moto.save((err, moto) => {
        chai
          .request(app)
          .get("/api/v1/motos/" + moto.id)
          .send(moto)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id moto", () => {
    it("it should UPDATE a moto given the id", (done) => {
      let moto = new Moto({
        "marca": "Kawasaki",
        "modelo": "5678",
        "anno":"2022",
        "bujia":"[{j@js.com}]",
        "cadenas":"[{j@js.com}]",
        "baterias":"[{j@js.com}]",
        "rad_delantero":"j@js.com",
        "rad_trasero":"j@js.com",
        "lla_delantera":"j@js.com",
        "lla_trasera":"j@js.com",
        "rin_delantero":"j@js.com",
        "rin_trasero":"j@js.com",
        "bom_farola":"j@js.com",
        "bom_direccional":"j@js.com",
        "bom_stop":"j@js.com",
        "bom_tablero":"j@js.com",
        "ret_cig_izquierdo":"j@js.com",
        "ret_cig_derecho":"j@js.com",
        "ret_cambios":"j@js.com",
        "ret_crank":"j@js.com",
        "ret_salida":"j@js.com",
        "ret_vicluth":"j@js.com",
        "ret_telescopio":"j@js.com",
        "bal_cig_izquierdo":"j@js.com",
        "bal_cig_derecho":"j@js.com",
        "bal_cam_del_izquierda":"j@js.com",
        "bal_cam_del_derecha":"j@js.com",
        "bal_cam_tra_izquierda":"j@js.com",
        "bal_cam_tra_derecha":"j@js.com",
        "bal_cam_tra_sprocket":"j@js.com",
        "bal_caj_izquierda":"j@js.com",
        "bal_caj_derecha":"j@js.com",
        "bal_clutch":"j@js.com",
        "bal_arbol":"j@js.com"
      });
      moto.save((err, moto) => {
        console.log(moto.id);
        chai
          .request(app)
          .put("/api/v1/motos/" + moto.id)
          .send({
            "marca": "Yamaha",
            "modelo": "DT125",
            "anno":"2022",
            "bujia":"[{j@js.com}]",
            "cadenas":"[{j@js.com}]",
            "baterias":"[{j@js.com}]",
            "rad_delantero":"j@js.com",
            "rad_trasero":"j@js.com",
            "lla_delantera":"j@js.com",
            "lla_trasera":"j@js.com",
            "rin_delantero":"j@js.com",
            "rin_trasero":"j@js.com",
            "bom_farola":"j@js.com",
            "bom_direccional":"j@js.com",
            "bom_stop":"j@js.com",
            "bom_tablero":"j@js.com",
            "ret_cig_izquierdo":"j@js.com",
            "ret_cig_derecho":"j@js.com",
            "ret_cambios":"j@js.com",
            "ret_crank":"j@js.com",
            "ret_salida":"j@js.com",
            "ret_vicluth":"j@js.com",
            "ret_telescopio":"j@js.com",
            "bal_cig_izquierdo":"j@js.com",
            "bal_cig_derecho":"j@js.com",
            "bal_cam_del_izquierda":"j@js.com",
            "bal_cam_del_derecha":"j@js.com",
            "bal_cam_tra_izquierda":"j@js.com",
            "bal_cam_tra_derecha":"j@js.com",
            "bal_cam_tra_sprocket":"j@js.com",
            "bal_caj_izquierda":"j@js.com",
            "bal_caj_derecha":"j@js.com",
            "bal_clutch":"j@js.com",
            "bal_arbol":"j@js.com"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/DELETE/:id moto", () => {
    it("it should DELETE a moto given the id", (done) => {
      let moto = new Moto({
        "marca": "Kawasaki",
        "modelo": "5678",
        "anno":"2022",
        "bujia":"[{j@js.com}]",
        "cadenas":"[{j@js.com}]",
        "baterias":"[{j@js.com}]",
        "rad_delantero":"j@js.com",
        "rad_trasero":"j@js.com",
        "lla_delantera":"j@js.com",
        "lla_trasera":"j@js.com",
        "rin_delantero":"j@js.com",
        "rin_trasero":"j@js.com",
        "bom_farola":"j@js.com",
        "bom_direccional":"j@js.com",
        "bom_stop":"j@js.com",
        "bom_tablero":"j@js.com",
        "ret_cig_izquierdo":"j@js.com",
        "ret_cig_derecho":"j@js.com",
        "ret_cambios":"j@js.com",
        "ret_crank":"j@js.com",
        "ret_salida":"j@js.com",
        "ret_vicluth":"j@js.com",
        "ret_telescopio":"j@js.com",
        "bal_cig_izquierdo":"j@js.com",
        "bal_cig_derecho":"j@js.com",
        "bal_cam_del_izquierda":"j@js.com",
        "bal_cam_del_derecha":"j@js.com",
        "bal_cam_tra_izquierda":"j@js.com",
        "bal_cam_tra_derecha":"j@js.com",
        "bal_cam_tra_sprocket":"j@js.com",
        "bal_caj_izquierda":"j@js.com",
        "bal_caj_derecha":"j@js.com",
        "bal_clutch":"j@js.com",
        "bal_arbol":"j@js.com"
      });
      moto.save((err, moto) => {
        chai
          .request(app)
          .delete("/api/v1/motos/" + moto.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
});
