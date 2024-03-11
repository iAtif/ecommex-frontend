import React from "react";
import { Link } from "react-router-dom";
import { BsWhatsapp, BsInstagram, BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-2">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="footer-top-data d-flex gap-15 align-items-center">
                <img src="images/newsletter.png" alt="newsletter" />
                <h4 className="mb-0 text-white">Sign Up for Newsletter</h4>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group">
                <input
                  type="email"
                  id="emailInput"
                  name="userEmail"
                  className="form-control"
                  placeholder="Your Email Here.."
                  aria-label="Your Email Here.."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  House No. 1 Near Barrier 3 <br /> Wah Cantt, Punjab, <br />
                  Pakistan
                </address>
                <a
                  href="tel:+92 333 5641345"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +92 333 5641345
                </a>
                <a
                  href="mailto:atifnadeem630@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  atifnadeem630@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="/">
                    <BsWhatsapp className="fs-4" />
                  </a>
                  <a className="text-white" href="/">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="/">
                    <BsFacebook className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Privacy Policy</Link>
                <Link className="text-white py-2 mb-1">Refund Policy</Link>
                <Link className="text-white py-2 mb-1">Shipping Policy</Link>
                <Link className="text-white py-2 mb-1">Terms & Conditions</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="" className="text-white py-2 mb-1">
                  About Us
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  FAQ
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="" className="text-white py-2 mb-1">
                  Accessories
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Headphones
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Mobile Gadgets
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Smart Watches
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
