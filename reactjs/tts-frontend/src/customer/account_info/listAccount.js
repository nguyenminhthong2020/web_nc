import React from "react";
import axios from "axios";
import DB from "./../database/index";
import {
  Card,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  CardBody,
  CardHeader,
} from "reactstrap";

// axios({method: 'get', url: 'https://tts-bank.herokuapp.com/account'}).then(function (response) {
//         // db.push({
//         //         number: response.data.rows.account_number,
//         //         balance: response.data.rows.balance,
//         //         type: "Tài khoản thanh toán"
//         //     });
//         alert(response.data.rows.account_number)

//     }).catch(function (error) { //
//         if (error.name == 'TokenExpiredError') { // Axios
//             const reqBody = {
//                 accessToken: localStorage.getItem('accessToken'),
//                 refreshToken: localStorage.getItem('refreshToken')
//             }
//             axios({method: 'post', url: 'https://tts-bank.herokuapp.com/auth/refresh', data: reqBody}).then(function (response) {
//                 localStorage.setItem('accessToken', response.data.accessToken);
//                 // Redirect
//                 window.location.href = '/';
//             }).catch(function (error) {
//                 //
//                 //
//             })

//         }
//     })

const selectAccounts = () => {
  axios.defaults.header = {
    "x-access-token": localStorage.getItem("accesstToken"),
  };
  axios({ method: "get", url: "https://tts-bank.herokuapp.com/account" })
    .then(function (response) {
      const db = [
        {
          number: response.data.rows.account_number,
          balance: response.data.rows.balance,
          type: "Tài khoản thanh toán",
        },
      ];
      const listAccounts = db.map((item, index) => {
        return (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{item.number}</td>
            <td>{item.balance}</td>
            <td>{item.type}</td>
          </tr>
        );
      });
      return (
        <div className="animated fadeIn">
          <Card style={{ borderStyle: "none" }}>
            <CardHeader
              style={{
                backgroundColor: "#435d7d",
                textAlign: "center",
                color: "white",
                fontSize: "18px",
              }}
            >
              <strong>Danh sách tài khoản</strong>
            </CardHeader>
            <CardBody style={{ borderStyle: "ridge", borderColor: "#435d7d" }}>
              <Row>
                <Col>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Số tài khoản</th>
                        <th>Số dư</th>
                        <th>Loại tài khoản</th>
                      </tr>
                    </thead>
                    <tbody>{listAccounts}</tbody>
                  </Table>
                  {/* <Pagination >
                          <PaginationItem >
                            <PaginationLink previous tag="button">
                              Trước
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem active>
                            <PaginationLink tag="button">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem className="page-item">
                            <PaginationLink tag="button">2</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink tag="button">3</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink next tag="button">
                              Sau
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination> */}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      );
    })
    .catch(function (error) {
      //
      if (error.name == "TokenExpiredError") {
        // Axios
        const reqBody = {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken"),
        };
        axios({
          method: "post",
          url: "https://tts-bank.herokuapp.com/auth/refresh",
          data: reqBody,
        })
          .then(function (response) {
            localStorage.setItem("accessToken", response.data.accessToken);
            // Redirect
            window.location.href = "/";
          })
          .catch(function (error) {
            //
            //
          });
      }
    });
};

export default selectAccounts;
