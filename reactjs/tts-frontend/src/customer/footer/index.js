import React from 'react';
import './css/style.css';
import './css/flaticon.css';
import './css/magnific-popup.css';
import './css/owl.theme.default.min.css';

function Footer() {
  return (
    <div>
    <footer className="ftco-footer">
    <div className="container">
        <div className="row mb-5">
          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2 logo"><a href="#"></a></h2>
              <p></p>
              <ul className="ftco-footer-social list-unstyled mt-2">
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2"></h2>
              <ul className="list-unstyled">
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-2 ml-md-4">
              <h2 className="ftco-heading-2">Hướng dẫn</h2>
              <ul className="list-unstyled">
                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span>Hướng dẫn sử dụng dịch vụ</a></li>
                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span>Hướng dẫn giao dịch an toàn</a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-2">
            	<h2 className="ftco-heading-2">Liên hệ</h2>
            	<div className="block-23 mb-3">
	              <ul>
	                <li><span className="icon fa fa-map marker"></span><span className="text">268 Lý Thái Tổ, phường 1, quận 3, TP.HCM</span></li>
	                <li><a href="#"><span className="icon fa fa-phone"></span><span className="text">0338219765</span></a></li>
	                <li><a href="#"><span className="icon fa fa-paper-plane pr-4"></span><span className="text">tts-banking@gmail.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0 py-5 bg-black">
      	<div className="container">
      		<div className="row">
	          <div className="col-md-12">
            <p className="mb-0" style={{color: 'rgba(255,255,255,.5)'}}>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                      Copyright 2020 © All rights reserved 
                      {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
            </div>
	        </div>
      	</div>
      </div>
          </footer>
    </div>
  );
}

export default Footer;

