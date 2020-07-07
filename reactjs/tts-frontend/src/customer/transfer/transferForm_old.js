import React from "react";
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

export default class TransferForm extends React.Component {
  render() {
    const list = [
      {
        number: "660255001",
        balance: "1,500,500",
        type: "Tài khoản thanh toán"
      },
      {
        number: "660255002",
        balance: "700,000",
        type: "Tài khoản tiết kiệm"
      },
      {
        number: "660255003",
        balance: "2,500,000",
        type: "Tài khoản tiết kiệm"
      }
    ]
  
    const listAccounts = list    
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
        <Card>
          <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
            <strong>Chuyển tiền</strong>
          </CardHeader>
          <CardBody>
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
  }
}