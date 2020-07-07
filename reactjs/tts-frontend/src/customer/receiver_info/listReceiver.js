import React from "react";
import {
  AiOutlineDelete
} from "react-icons/ai";
import {
  FaRegEdit
} from "react-icons/fa";
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
import DB from './../database/index';

const receiversComponent = () => {
  function ActionEdit(e) {
    e.preventDefault();
    alert('Chỉnh sửa thông tin');
  }

  function ActionDelete(e) {
    e.preventDefault();
    alert('Xóa người nhận');
  }
  const selectReceivers = DB.listReceivers()  
    .map((item, index) => {
      return (
        <tr>
          <th scope="row">{index+1}</th>
          <td>{item.number}</td>
          <td>{item.name}</td>
          <td>{item.bankCode}</td>
          <td style = {{textAlign: 'center'}}>
              <button onClick = {ActionEdit} style = {{fontSize: '24px', marginRight: '10px'}}><FaRegEdit/></button>
              <button onClick = {ActionDelete} style = {{fontSize: '24px', marginLeft: '10px'}}><AiOutlineDelete/></button>
            </td>
        </tr>
      );
    });
  return (
    <div className="animated fadeIn">
      <Card style={{borderStyle: 'none'}}>
        <CardHeader style={{backgroundColor: '#435d7d', textAlign: 'center', color: 'white', fontSize: '18px'}}>
          <strong>Danh sách tài khoản người nhận</strong>
        </CardHeader>
        <CardBody style={{borderStyle: 'ridge', borderColor: '#435d7d'}}>
          <Row>
            <Col>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Số tài khoản</th>
                    <th>Tên gợi nhớ</th>
                    <th>Ngân hàng</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {selectReceivers}
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

export default receiversComponent;
