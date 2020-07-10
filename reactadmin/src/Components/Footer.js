import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Footer extends Component {
  render() {
    
    return (
      
        <div style={{  bottom: '2px' }}>
      <Navbar bg="light" expand="bl">
          
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Internet Banking</h5>
            <p>
              Welcom!
            </p>
          </MDBCol>
          <MDBCol md="15">
            <h5 className="title">Admin</h5>
            <ul>
              <li className="list-unstyled">
                <p>1760378-Trần Thị Cẩm Nhung</p>
              </li>
              <li className="list-unstyled">
                <p>1760399-Phan Thị Lệ Quyên</p>
              </li>
              <li className="list-unstyled">
                <p>1760402-Huỳnh Hoàng Sang</p>
              </li>
              <li className="list-unstyled">
                <p>1760463-Nguyễn Minh Văn</p>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      
    </Navbar>
    <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="/"> DoAnWeb2 </a>
        </MDBContainer>
      </div>
      </div>
      
    );
  }
}
export default Footer;
