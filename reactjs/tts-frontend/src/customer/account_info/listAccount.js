import React from "react";
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

const selectAccounts = () => {
  const listAccounts = DB.listAccounts()    
    .map((item, index) => {
      return (
        <tr>
          <th scope="row">{index+1}</th>
          <td>{item.number}</td>
          <td>{item.balance}</td>
          <td>{item.type}</td>
        </tr>
      );
    });
  return (
    <div className="animated fadeIn">
      <Card style={{borderStyle: 'none'}}>
        <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
          <strong>Danh sách tài khoản</strong>
        </CardHeader>
        <CardBody style={{borderStyle: 'ridge', borderColor: '#435d7d'}}>
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
                <tbody>
                  {listAccounts}
                </tbody>
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
};

export default selectAccounts;
