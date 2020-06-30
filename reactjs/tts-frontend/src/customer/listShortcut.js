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
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";

const listShortcut = () => {
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
        <CardHeader style={{backgroundColor: 'coral'}}>
          <strong>Truy cập nhanh</strong>
        </CardHeader>
        <CardBody>
            <ListGroup style={{fontSize: '14px'}}>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/account_info" style={{color:'#6c757d'}}>Danh sách tài khoản</a></ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/receiver_info" style={{color:'#6c757d'}}>Người nhận</a></ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/transfer" style={{color:'#6c757d'}}>Chuyển tiền</a></ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> Chuyển tiền liên ngân hàng *</ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> Mở tài khoản</ListGroupItem>
            </ListGroup>   
        </CardBody>
      </Card>
      <br/>
      <br/>
      <Card>
        <CardHeader style={{backgroundColor: 'coral'}}>
          <strong>TTS iB@anking của tôi</strong>
        </CardHeader>
        <CardBody>
            <ListGroup style={{fontSize: '14px'}}>
              <ListGroupItem><Badge pill>{'>'} </Badge> Thông tin cá nhân</ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> Cài đặt người dùng</ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> Cài đặt hạn mức</ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> Hỗ trợ</ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> Khác</ListGroupItem>
            </ListGroup>   
        </CardBody>
      </Card>
    </div>
  );
};

export default listShortcut;
