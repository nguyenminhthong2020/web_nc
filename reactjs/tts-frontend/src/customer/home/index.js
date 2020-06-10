import React from 'react';
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


function ListAccount() {
  const list = [
    {
      number: "660255001",
      balance: "1,500,500",
    },
    {
      number: "660255002",
      balance: "700,000",
    },
  ]

  const listAccounts = list    
    .map((item, index) => {
      return (
        <tr>
          <th scope="row">{index+1}</th>
          <td>{item.number}</td>
          <td>{item.balance}</td>
        </tr>
      );
    });

  return (
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Số tài khoản</th>
      <th scope="col">Số dư</th>
    </tr>
  </thead>
  <tbody>{listAccounts}
  </tbody>
</table>
  )
  
}

export default class Home extends React.Component {
    render() {
        return (
          <div>
      <title>Account Info</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*===============================================================================================*/}	
        <link rel="icon" type="image/png" href="images/icons/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />        
        {/*===============================================================================================*/}
        <div className="limiter">
          <div className="container-pages">
            <div className="wrap-body-left p-l-25 p-r-25 p-t-55 p-b-55" style={{textAlign: 'center'}}>
            <ul className="list-group">
              <li className="list-group-item" style={{background: 'green'}}><span class="fa fa-home"></span> Trang chủ</li>
              <li className="list-group-item">Danh sách tài khoản</li>
              <li className="list-group-item">Chuyển tiền ngân hàng</li>
              <li className="list-group-item">Chuyển tiền liên ngân hàng</li>
              <li className="list-group-item">Mở tài khoản tiết kiệm</li>
            </ul>
              </div>
              <div className="wrap-body-main p-l-85 p-r-85 p-t-55 p-b-55" style={{textAlign: 'center'}}>
              <div><b>Danh sách tài khoản</b><br /> <br /></div>
                <ListAccount/>
              </div>
          </div>
        </div>
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}      
    </div>
        )
    }
}
