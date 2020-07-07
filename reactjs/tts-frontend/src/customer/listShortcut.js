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
      <Card style={{borderStyle: 'none'}}>
        <CardHeader style={{backgroundColor: 'coral'}}>
          <strong>Truy cập nhanh</strong>
        </CardHeader>
        <CardBody style={{border: '1px solid', borderColor: 'coral'}}>
            <ListGroup style={{fontSize: '14px'}}>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/account_info" style={{color:'#6c757d'}}>Danh sách tài khoản</a></ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/receiver_info" style={{color:'#6c757d'}}>Người nhận</a></ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/transfer" style={{color:'#6c757d'}}>Chuyển tiền</a></ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/inter_transfer" style={{color:'#6c757d'}}>Chuyển tiền liên ngân hàng *</a></ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/debt" style={{color:'#6c757d'}}>Nhắc nợ</a></ListGroupItem>
            </ListGroup>   
        </CardBody>
      </Card>
      <br/>
      <br/>
      <Card style={{borderStyle: 'none'}}>
      <CardHeader style={{backgroundColor: 'coral'}}>
          <strong>TTS iB@anking của tôi</strong>
        </CardHeader>
        <CardBody style={{border: '1px solid', borderColor: 'coral'}}>
            <ListGroup style={{fontSize: '14px'}}>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/change_password" style={{color:'#6c757d'}}>Đổi mật khẩu</a></ListGroupItem>
              <ListGroupItem><Badge pill>{'>'} </Badge> <a href="/transaction" style={{color:'#6c757d'}}>Lịch sử giao dịch</a></ListGroupItem>
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
