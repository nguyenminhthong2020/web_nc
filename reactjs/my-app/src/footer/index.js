import React from 'react';
import './css/style.css';
import './css/flaticon.css';
import './css/magnific-popup.css';
import './css/owl.theme.default.min.css';

function Footer() {
  return (
    <div>
    <footer className="ftco-footer">
    <div class="container">
        <div class="row mb-5">
          <div class="col-sm-12 col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2 logo"><a href="#"></a></h2>
              <p></p>
              <ul class="ftco-footer-social list-unstyled mt-2">
              </ul>
            </div>
          </div>
          <div class="col-sm-12 col-md">
            <div class="ftco-footer-widget mb-4 ml-md-4">
              <h2 class="ftco-heading-2"></h2>
              <ul class="list-unstyled">
              </ul>
            </div>
          </div>
          <div class="col-sm-12 col-md">
            <div class="ftco-footer-widget mb-2 ml-md-4">
              <h2 class="ftco-heading-2">Hướng dẫn</h2>
              <ul class="list-unstyled">
                <li><a href="#"><span class="fa fa-chevron-right mr-2"></span>Hướng dẫn sử dụng dịch vụ</a></li>
                <li><a href="#"><span class="fa fa-chevron-right mr-2"></span>Hướng dẫn giao dịch an toàn</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-12 col-md">
            <div class="ftco-footer-widget mb-2">
            	<h2 class="ftco-heading-2">Liên hệ</h2>
            	<div class="block-23 mb-3">
	              <ul>
	                <li><span class="icon fa fa-map marker"></span><span class="text">268 Lý Thái Tổ, phường 1, quận 3, TP.HCM</span></li>
	                <li><a href="#"><span class="icon fa fa-phone"></span><span class="text">0338219765</span></a></li>
	                <li><a href="#"><span class="icon fa fa-paper-plane pr-4"></span><span class="text">tts-banking@gmail.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid px-0 py-5 bg-black">
      	<div class="container">
      		<div class="row">
	          <div class="col-md-12">
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

