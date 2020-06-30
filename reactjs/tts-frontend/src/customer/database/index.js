import React from 'react';
import { Button } from 'reactstrap';
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

const listReceivers = () => [
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
];

const listAccounts = () => [
  {
    number: "660255001",
    balance: "1,500,500",
    type: "Tài khoản thanh toán nè"
  },
  {
    number: "660255002",
    balance: "700,000",
    type: "Tài khoản tiết kiệm nà"
  },
  {
    number: "660255003",
    balance: "2,500,000",
    type: "Tài khoản tiết kiệm"
  }
];

export default {
  listReceivers,
  listAccounts
}