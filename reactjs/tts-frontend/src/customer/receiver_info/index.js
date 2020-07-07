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
// Import listExample
import ListShortcut from './../listShortcut';
import ListReceiver from './listReceiver';

export default class AccountInfo extends React.Component {
    logOut(e) {
      window.location.replace('/logout');
    }

    render() {
        return (
          <div>
      <title>Receiver Info</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*===============================================================================================*/}	
        <link rel="icon" type="image/png" href="images/icons/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />        
        {/*===============================================================================================*/}
        <div className="limiter">
          <div className="container-pages-accountinfo">
            <div className="wrap-body-left p-l-25 p-r-25 p-t-55 p-b-55">
            <ListShortcut/>
              </div>
            <div className="wrap-body-main p-l-85 p-r-85 p-t-55 p-b-55">
              <ListReceiver/>
            </div>
            <div className="wrap-body-right">
            <div>
            <button onClick = {this.logOut} style = {{position: 'absolute', right: '0px', fontSize: '40px', color: '#435d7d'}}><RiLogoutCircleRLine/></button>
            </div>
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
