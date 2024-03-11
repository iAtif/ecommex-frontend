import React from "react";
import Meta from "./../Components/Meta";
import BreadCrumb from "./../Components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";

const Contact = () => {
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact" />
      <div className="contact-wrapper home-wrapper-2 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53066.48310992907!2d72.7150845850891!3d33.7695749562094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa7aad7f40f8b%3A0xdba7a19323c50e32!2sWah%20Cantt%2C%20Rawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1704457548034!5m2!1sen!2s"
                title="Location"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="fast"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact </h3>
                  <form className="d-flex flex-column gap-15">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        row="4"
                        placeholder="Comments"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button className="button border-0">Submit</button>
                    </div>
                  </form>
                </div>
                <div className="h-50">
                  <h3 className="contact-title mb-4">Get in touch with Us</h3>
                  <div>
                    <ul className="p-0">
                      <li className="mb-3 d-flex gap-15 align-item-center">
                        <AiOutlineHome className="fs-5" />
                        <address className="mb-0">
                          Hno:100, Near village Ghari, Punjab, Pakistan
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-item-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel:+923157201705">+923157201705</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-item-center">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto:shaheermehmood25@gmail.com">
                          shaheermehmood25@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-item-center">
                        <BiInfoCircle className="fs-5" />
                        <p className="mb-0">Monday - Friday 10 AM - 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
