import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

// var style = {
//   backgroundColor: '#F8F8F8',
//   borderTop: '1px solid #E7E7E7',
//   textAlign: 'center',
//   position: 'fixed',
//   left: '0',
//   bottom: '0',
//   height: '30px',
//   width: '100%',
// };

// var phantom = {
//   display: 'block',
//   height: '30px',
//   width: '100%',
// };

function Footer({ children }) {
  return (
    // <div>
    //   <div style={phantom} />
    //   <div style={style}>
    //     {children} <h3>my internetBanking Site</h3>
    //   </div>
    // </div>
    <MDBFooter>
      <br />
      <br />
      <br />
      <br />
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="4">
            <a href="/login">
              <img
                src="https://ibnodeserver.herokuapp.com/images/Bing1.png"
                width="250"
                height="150"
              ></img>
            </a>
            <h5>
              <p>Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM</p>
            </h5>
          </MDBCol>
          <MDBCol md="3">
            <ul>
              <h3 className="title">Liên hệ</h3>
              <i className="tel-link">
                <a>Phone: </a>
              </i>
              <a>1900 54 54 13</a>
              <br />
              <i className="mail-link">
                <a>Email: </a>
              </i>
              <a>17k.web2@gmail.com</a>
              <br />
              <i className="quick-link">
                <a>Chi nhánh: </a>
              </i>
              <a>
                227 Nguyễn Văn Cừ, Quận 5, Thành phố Hồ Chính Minh, Viêt Nam
              </a>
              <br />
              <br />
            </ul>
          </MDBCol>
          <MDBCol md="2">
            <ul>
              <h3 className="title">Thông tin</h3>
              <i>
                <a>Tỷ giá</a>
              </i>
              <br />
              <i>
                <a>Lãi suất</a>
              </i>
              <br />
              <i>
                <a>Biểu mẫu</a>
              </i>
              <br />
              <i>
                <a>Câu hỏi thường gặp</a>
              </i>
            </ul>
          </MDBCol>
          <MDBCol md="2">
            <ul>
              <h3>Theo dõi </h3>
              <a href="#facebook">
                <img
                  src="https://ibnodeserver.herokuapp.com/images/Bing2.png"
                  width="50"
                  height="50"
                ></img>
              </a>
              <a href="#instagram">
                <img
                  src="https://ibnodeserver.herokuapp.com/images/Bing3.jpg"
                  width="50"
                  height="50"
                ></img>
              </a>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer>
          &copy; {new Date().getFullYear()}
          <h3>My InternetBanking Site</h3>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
