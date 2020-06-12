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

const ListReceiver = () => {
  const list = [
    {
      number: "660255001",
      name: "Nguyễn Minh Thông",
      bankCode: "VCB"
    },
    {
      number: "660255002",
      name: "Phan Văn Anh Tuấn",
      bankCode: "ACB"
    },
    {
      number: "660255003",
      name: "Phạm Đình Sỹ",
      bankCode: "TTS"
    }
  ]

  const listReceivers = list    
    .map((item, index) => {
      return (
        <tr>
          <th scope="row">{index+1}</th>
          <td>{item.number}</td>
          <td>{item.name}</td>
          <td>{item.bankCode}</td>
        </tr>
      );
    });
  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader  style={{backgroundColor: 'coral', textAlign: 'center'}}>
          <strong>Danh sách tài khoản người nhận</strong>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Số tài khoản</th>
                    <th>Tên gợi nhớ</th>
                    <th>Ngân hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {listReceivers}
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

export default ListReceiver;
