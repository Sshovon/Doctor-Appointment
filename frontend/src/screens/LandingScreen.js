import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const LandingScreen = () => {

  if(window.localStorage.getItem('reload')){
    window.localStorage.removeItem('reload')
    window.location.reload();
  }

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("userEmail")) setIsAuth(true);
  }, []);

  return (
    <div style={{   backgroundSize:'cover', height:'90vh', backgroundImage:"url(/landingBG.jpg)"}}>
      <div style={{paddingTop:'20px'}}>
      <Row>
        <Col md={4}>
          {/* <Image
            src={require("../images/doctor.png")}
            fluid
            style={{ maxHeight: "450px", paddingLeft: "40px" }}
          /> */}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush" style={{backgroundColor:'transparent'}}>
            <ListGroup.Item variant="primary" style={{backgroundColor:'transparent'}}>
              <h3>Dr. Masum</h3>
            </ListGroup.Item>
            <ListGroup.Item style={{backgroundColor:'transparent'}}></ListGroup.Item>
            <ListGroup.Item style={{ fontSize: "20px", backgroundColor:'transparent' }}>
              ENT specialist
            </ListGroup.Item>
            <ListGroup.Item style={{backgroundColor:'transparent'}}>
              Dr. Masum is double board certified in Otolaryngology
              and Sleep Medicine. He is a fellow of the American College of
              Surgeons (FACS), and a member of the American College of Surgeons
              Oncology Group. (ACOSOG) • Assistant Clinical Professor of
              Otolaryngology Tufts University School of Medicine/Tufts-New
              England Medical Center. Chief of Surgery at Jordan Hospital from
              1994–2007. In 2019, 2020 and 2021 Dr. Masum won the
              Sylhet Top Doctors.
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card style={{ textAlign: "center", marginRight: "10px", backgroundColor:'transparent' }}>
            <ListGroup variant="flush">
              <ListGroup.Item variant='primary' style={{backgroundColor:'transparent'}}>
                <h4>Specialities</h4>
                <ListGroup.Item style={{backgroundColor:'transparent'}}>ALLERGY</ListGroup.Item>
                <ListGroup.Item style={{backgroundColor:'transparent'}}>EARS/AUDIOLOGY</ListGroup.Item>
                <ListGroup.Item style={{backgroundColor:'transparent'}}>TINNITUS SUPPORT</ListGroup.Item>
                <ListGroup.Item style={{backgroundColor:'transparent'}} >REFLUX, VOICE AND SWALLOWING</ListGroup.Item>
                <ListGroup.Item style={{backgroundColor:'transparent'}}>PEDIATRICS</ListGroup.Item>
                <ListGroup.Item style={{backgroundColor:'transparent'}}>NOSE AND SINUS</ListGroup.Item>
              </ListGroup.Item>
              {
              !isAuth && <LinkContainer style={{backgroundColor:'transparent'}} to="/appointment">
                <ListGroup.Item>
                  <Button className="btn-block" type="button">
                    Have appointment
                  </Button>
                </ListGroup.Item>
              </LinkContainer>
}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      </div>
    </div>
  );
};

export default LandingScreen;
