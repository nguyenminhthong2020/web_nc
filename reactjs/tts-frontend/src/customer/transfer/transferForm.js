import React from 'react';
import {  } from 'reactstrap';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Card,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
    CardBody,
    CardHeader,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
  } from "reactstrap";

export default class TransferForm extends React.Component {
    render() {
        // Tài khoản nguồn
        const listAcc = [
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
      
        const listAccounts = listAcc    
          .map((item, index) => {
            return (
            <option>{item.number} - {item.type}</option>
            );
          });
        // Người nhận
        const listRec = [
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
        
          const listReceivers = listRec    
            .map((item, index) => {
              return (
                <option>{item.name} - {item.number}</option>
              );
            });
        // Thanh toán phí
        const listType = [
            {
                type: "Người chuyển trả"
            },
            {
                type: "Người nhận trả"

            }
          ]
        
          const listTypes = listType    
            .map((item, index) => {
              return (
                <option>{item.type}</option>
              );
            });
        return (
        <div>
            <Card>
                <CardHeader  style={{backgroundColor: 'coral', textAlign: 'center'}}>
                    <strong>Chuyển tiền</strong>
                </CardHeader>
                </Card>          
            <br/>      
            <Form>
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>TÀI KHOẢN NGUỒN</b></Label>
                            <Input type="select" name="select" id="exampleSelect" style = {{marginBottom: '5px'}}>
                            {listAccounts}
                            </Input>
                            <Label for="exampleSelect">* Số dư khả dụng: 500,000</Label>
                        </CardBody>
                    </Card>                    
                </FormGroup>                
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>THÔNG TIN NGƯỜI NHẬN</b></Label>
                            <Input type="select" name="select" id="exampleSelect" style = {{marginBottom: '5px'}}>
                            {listReceivers}
                            </Input>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Số tài khoản</InputGroupText>
                                </InputGroupAddon>
                                <Input value = "660255001"/>
                            </InputGroup>                            
                        </CardBody>
                    </Card>                  
                </FormGroup>
                
                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>THÔNG TIN CHUYỂN TIỀN</b></Label>
                            <InputGroup style = {{marginBottom: '5px'}}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Số tiền chuyển</InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup> 
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Nội dung chuyển</InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup>                            
                        </CardBody>
                    </Card>                  
                </FormGroup>

                <FormGroup>
                    <Card>
                        <CardBody>
                            <Label for="exampleSelect"><b style = {{color: 'green'}}>HÌNH THỨC THANH TOÁN PHÍ</b></Label>
                            <Input type="select" name="select" id="exampleSelect" style = {{marginBottom: '5px'}}>
                            {listTypes}
                            </Input>
                            <Label for="exampleSelect">* Phí thanh toán: 3,300</Label>
                        </CardBody>
                    </Card>                    
                </FormGroup>    
                {/* {Chuyển tiền}*/}
                <Button>XÁC NHẬN</Button>
            </Form>
        </div>      
        );
      }

}