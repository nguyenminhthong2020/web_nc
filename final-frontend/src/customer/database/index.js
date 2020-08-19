import axios from 'axios';
import {connector} from "./../../callAxios";
import './../../vendor/bootstrap/css/bootstrap.min.css';
import './../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './../../fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './../../vendor/animate/animate.css';
import './../../vendor/css-hamburgers/hamburgers.min.css';
import './../../vendor/animsition/css/animsition.min.css';
import './../../vendor/select2/select2.min.css';
import './../../vendor/daterangepicker/daterangepicker.css';
import './../../css/util.css';
import './../../css/main.css';

/* Hàm dùng để refresh token */
const refreshToken = async () => {

    const reqBody = {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    }
    const response = await connector.post("/auth/refresh", reqBody).then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
    }, (error) => {
        console.log("Error! Infor: ", error.response);
    });

    // axios({method: 'post', url: 'https://tts-bank.herokuapp.com/auth/refresh', data: reqBody}).then(function (response) {
    //     localStorage.setItem('accessToken', response.data.accessToken);
    // }).catch(function (error) {
    //     // Handle error
    // })
}

const moneyToString = (money) => {
    let _money = money;
    let moneyString = '';
    if (_money < 1000) {
        moneyString = `${_money}`;           
    }
    else {
        while(_money >= 1000) {
            // Chia 1 nghìn
            const end = _money % 1000;
            let stringEnd = `.${end}`;
            if (end<100) stringEnd = `.0${end}`;
            if (end<10) stringEnd = `.00${end}`;
            moneyString = stringEnd.concat(moneyString);
            _money = parseInt(_money/1000);
        }
        moneyString = `${_money}`.concat(moneyString);
    }
    return moneyString;
}

const listBanks = () => [
    {
        bankCode: "25Bank",
        name: "RSA 25Bank Banking",
        type: "RSA",
        secretKey: "Infymt"
    }, {
        bankCode: "partner34",
        name: "Banking34",
        type: "PGP",
        secretKey: "banking34"
    }, {
        bankCode: "GO",
        name: "RSA GO",
        type: "RSA",
        secretKey: "Infymt"
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
    }, {
        number: "880255002",
        name: "Phan Tấn Sang",
        bankCode: "25Bank"
    }, {
        number: "110255003",
        name: "Nguyễn Công Tuyền",
        bankCode: "20PGP"
    }, {
        number: "110255003",
        name: "Trần Nhật Tân",
        bankCode: "20PGP"
    }, {
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



/* listAccounts from real DB */
const listAccountss = async () => {
    const db = [{
            number: "660255001",
            balance: 1500500,
            type: "Tài khoản thanh toán"
        }];
    let db2 = [
        {
            number: "660255001",
            balance: 1500500,
            type: "Tài khoản thanh toán"
        }, {
            number: "660255002",
            balance: 700000,
            type: "Tài khoản tiết kiệm"
        }
    ];
    const response = await connector.get("/account", {}).then((response) => {
        console.log("response", response);
        const result = JSON.stringify(response.data.rows.account_number);
        // alert(result);
        db2 = [
            {
                number: "66025500sy",
                balance: 1500500,
                type: "Tài khoản thanh toán"
            }, {
                number: "66025500sy",
                balance: 700000,
                type: "Tài khoản tiết kiệm"
            }
        ];
        // alert(JSON.stringify(db2));
        alert('load db2 successfully');

    }, (error) => {
        console.log("err123", error.response);
        alert('error occur!');
    });
    // axios.defaults.headers = {
    //     'x-access-token': localStorage.getItem('accessToken')
    // }
    // axios({method: 'get', url: 'https://tts-bank.herokuapp.com/account'}).then(function (response) {
    //     str = '12345';
    //     alert(str);
    //     const db2 = [
    //         {
    //             number: "660255009",
    //             balance: 1500500,
    //             type: "Tài khoản thanh toán"
    //         }, {
    //             number: "660255003",
    //             balance: 2500000,
    //             type: "Tài khoản tiết kiệm"
    //         }
    //     ];
    //     return db2;

    // }).catch(function (error) { //
    //     alert('error');
    //     if (error.name == 'TokenExpiredError') { // Axios
    //         const reqBody = {
    //             accessToken: localStorage.getItem('accessToken'),
    //             refreshToken: localStorage.getItem('refreshToken')
    //         }
    //         axios({method: 'post', url: 'https://tts-bank.herokuapp.com/auth/refresh', data: reqBody}).then(function (response) {
    //             localStorage.setItem('accessToken', response.data.accessToken);
    //             // Redirect
    //             window.location.href = '/';
    //         }).catch(function (error) {
    //             //
    //             //
    //         })

    //     }
    // })

    return db2;
}


const listMethods = () => [
    {
        type: "Người chuyển trả"
    }, {
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
    }, {
        code: "1721554",
        number: "660255001",
        name: "Lê Quang Duy",
        money: 2500000,
        content: "Mượn tiền sửa xe",
        time: Date("2015/03/25")
    }, {
        code: "1721554",
        number: "660255002",
        name: "Phạm Minh Nhật",
        money: 3600000,
        content: "Không có gì",
        time: Date("2015/03/25")
    }, {
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
    }, {
        code: "1721554",
        number: "660255004",
        name: "Nguyễn Xuân Dần",
        money: 500000,
        content: "Mượn tiền",
        time: "03/21/2015"
    }, {
        code: "1721554",
        number: "660255003",
        name: "Phan Tấn Trung",
        money: 1500000,
        content: "Mượn tiền shopping",
        time: "04/25/2015"
    }, {
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
        message: ""
    }, {
        code: "222255006",
        number: "660255001",
        type: "Chuyển khoản",
        partnerAcconut: "660255003",
        money: 1200000,
        time: "01/15/2015",
        message: ""
    }, {
        code: "333255001",
        number: "660255001",
        type: "Nhận tiền",
        partnerAcconut: "660255001",
        money: 3600000,
        time: "08/25/2015",
        message: ""
    }, {
        code: "1221553",
        number: "660255003",
        type: "Nhận tiền",
        partnerAcconut: "660255001",
        money: 3600000,
        time: "08/25/2015",
        message: ""
    }
]

export default {
    refreshToken,
    moneyToString,
    listBanks,
    listReceivers,
    listAccounts,
    listMethods,
    listCreatedDebts,
    listReceivedDebts,
    listTransactions
}
