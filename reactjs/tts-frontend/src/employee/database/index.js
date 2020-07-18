import React from 'react';
import { Button } from 'reactstrap';
import { RiLogoutCircleRLine } from "react-icons/ri";
import './vendor/bootstrap/css/bootstrap.min.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './vendor/animate/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/animsition/css/animsition.min.css';
import './vendor/select2/select2.min.css';
import './vendor/daterangepicker/daterangepicker.css';
import './css/util.css';
import './css/main.css';

// const listReceivers = 
// [
//   {
//     number: "660255001",
//     name: "Nguyễn Minh Thông",
//     bankCode: "VCB"
//   },
//   {
//     number: "660255002",
//     name: "Phan Văn Anh Tuấn",
//     bankCode: "ACB"
//   },
//   {
//     number: "660255003",
//     name: "Phạm Đình Sỹ",
//     bankCode: "TTS"
//   }
// ];

const listBanks = () => [
  {
    bankCode: "25Bank",
    name: "RSA 25Bank Banking",
    type: "RSA",
    secretKey: "Infymt"
  },
  {
    bankCode: "20PGP",
    name: "PGP Virtual Banking",
    type: "PGP",
    secretKey: "InfymtPGP"
  },{
    bankCode: "VCB",
    name: "RSA Vietcombank",
    type: "RSA",
    secretKey: "Vietcombank"
  }
];

const listReceivers = () => [
  {
    number: "660255001",
    name: "Nguyễn Minh Thông",
    bankCode: "GO"
  },
  {
    number: "660255002",
    name: "Phan Văn Anh Tuấn",
    bankCode: "GO"
  },
  {
    number: "660255003",
    name: "Phạm Đình Sỹ",
    bankCode: "GO"
  },
  {
    number: "880255001",
    name: "Nguyễn Tấn Trường",
    bankCode: "25Bank"
  },
  {
    number: "880255002",
    name: "Phan Tấn Sang",
    bankCode: "25Bank"
  },
  {
    number: "110255003",
    name: "Nguyễn Công Tuyền",
    bankCode: "20PGP"
  },
  {
    number: "110255003",
    name: "Trần Nhật Tân",
    bankCode: "20PGP"
  },
  {
    number: "520255003",
    name: "Đặng Tân",
    bankCode: "VCB"
  }
];

const listAccounts = () => [
  {
    number: "660255001",
    balance: 1500500,
    type: "Tài khoản thanh toán"
  },
  {
    number: "660255002",
    balance: 700000,
    type: "Tài khoản tiết kiệm"
  },
  {
    number: "660255003",
    balance: 2500000,
    type: "Tài khoản tiết kiệm"
  }
];

const listMethods = () => [
  {
      type: "Người chuyển trả"
  },
  {
      type: "Người nhận trả"
  }
]  

const listCreatedDebts = () => [
  {
      code: "1721554",
      number: "660255003",
      name: "Phan Tấn Trung",
      money: 1500000,
      content: "Mượn tiền shopping",
      time: Date("2015/03/25")
  },
  {
    code: "1721554",
    number: "660255001",
    name: "Lê Quang Duy",
    money: 2500000,
    content: "Mượn tiền sửa xe",
    time: Date("2015/03/25")
  },
  {
    code: "1721554",
    number: "660255002",
    name: "Phạm Minh Nhật",
    money: 3600000,
    content: "Không có gì",
    time: Date("2015/03/25")
  },
  {
    code: "1721554",
    number: "660255004",
    name: "Nguyễn Xuân Dần",
    money: 500000,
    content: "Mượn tiền",
    time: Date("2015/03/25")
  }
]

const listReceivedDebts = () => [  
  {
    code: "1721554",
    number: "660255002",
    name: "Phạm Minh Nhật",
    money: 3600000,
    content: "Không",
    time: "08/25/2015"
  },
  {
    code: "1721554",
    number: "660255004",
    name: "Nguyễn Xuân Dần",
    money: 500000,
    content: "Mượn tiền",
    time: "03/21/2015"
  },
  {
    code: "1721554",
    number: "660255003",
    name: "Phan Tấn Trung",
    money: 1500000,
    content: "Mượn tiền shopping",
    time: "04/25/2015"
  },
  {
    code: "1721554",
    number: "660255001",
    name: "Lê Quang Duy",
    money: 2500000,
    content: "Mượn tiền sửa xe",
    time: "03/25/2015"
  }
] 

const listTransactions = () => [  
  {
    code: "111255001",
    number: "660255001",
    type: "Nhận tiền",
    partnerAcconut: "660255002",
    money: 3500000,
    time: "08/25/2015",
    message: "",
  },
  {
    code: "222255006",
    number: "660255001",
    type: "Chuyển khoản",
    partnerAcconut: "660255003",
    money: 1200000,
    time: "01/15/2015",
    message: "",
  },{
    code: "333255001",
    number: "660255001",
    type: "Nhận tiền",
    partnerAcconut: "660255001",
    money: 3600000,
    time: "08/25/2015",
    message: "",
  },{
    code: "1221553",
    number: "660255003",
    type: "Nhận tiền",
    partnerAcconut: "660255001",
    money: 3600000,
    time: "08/25/2015",
    message: "",
  }
] 

export default {
  listBanks,
  listReceivers,
  listAccounts,
  listMethods,
  listCreatedDebts,
  listReceivedDebts,
  listTransactions
}