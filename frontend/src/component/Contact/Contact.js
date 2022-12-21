import React, { useState } from "react";
import './contact.css'

const Contact = () => {
  const [data , setData] = useState({
    fullname: "",
    phone : "" ,
    email : "",
    meessage: "",

  });

const InputEvent = (event)=>{
  const {name , value} = event.target;

  setData((preVal) =>{
    return{
      ...preVal,
      [name]: value,
    }

  })

}


  const formSubmit = (e)=>{
    e.preventDefault();
    alert(
      `my name is ${data.fullname} . my mobile number is ${data.phone}  my email  is ${data.email}  here is my  ${data.meessage}`
    )

  }
  return (
    <>
      <div className="my-5">
        <h1 className=" text-center">Contact</h1>
      </div>

      <div className="continer contact_div">
        <div className="row">
          <div className=" data col-md-6 col-10 mx-auto">
            <form onSubmit={formSubmit}>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  FullName
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="fullname"
                  value={data.fullname}
                  onChange = {InputEvent}
                  placeholder="Enter Your Name "
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Phone
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="phone"
                  value={data.phone}
                  onChange = {InputEvent}
                  placeholder="Enter Mobile Number"
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="email"
                  value={data.email}
                  onChange = {InputEvent}
                  placeholder="name@example.com"
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Message
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="message"
                  value={data.meessage}
                  onChange = {InputEvent}
                ></textarea>
              </div>

              <button type="submit" class="btn btn-outline-primary  ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
