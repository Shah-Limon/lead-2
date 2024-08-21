import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [contact, setContact] = useState({});
    const [currentDate, setCurrentDate] = useState(getCurrentDate());


    useEffect(() => {
        fetch(`http://localhost:5000/contact/`)
            .then((res) => res.json())
            .then((info) => setContact(info[0]));
    }, []);

    const UserContactMessage = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const message = event.target.message.value;
        const subject = event.target.subject.value;
        const date = event.target.date.value;
        const messageStatus = event.target.messageStatus.value;

        const contact = {
            name,
            email,
            message,
            subject,
            date,
            messageStatus,
        };

        const url = `http://localhost:5000/add-contact-message`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(contact),
        })
            .then((res) => res.json())
            .then((result) => {
                toast.success("Message sent successfully!");
                event.target.reset();
            });
    };

    // Function to get the current date in yyyy-MM-dd format
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <>
                <div className="inner_banner-section">
                    <img
                        className="inner_banner-background-image"
                        src="/image/common/inner-bg.png"
                        alt="images alt"
                    />
                    <div className="container">
                        <div className="inner_banner-content-block">
                            <h3 className="inner_banner-title">{contact.titleOne}</h3>
                            <p>{contact.titleDescription}</p>
                        </div>
                    </div>
                </div>
                <div className="contact-2_form-section padding-bottom-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="contact_main-comment-box-wrapper border-none">
                                    <div className="contact_main-comment-box__inner">
                                        <div className="form-box-style__form-wrapper">
                                            <form className="form-box-style" onSubmit={UserContactMessage}>
                                                <input
                                                    type="date"
                                                    hidden
                                                    className="form-control"
                                                    name="date"
                                                    value={currentDate}
                                                    onChange={(e) => setCurrentDate(e.target.value)}
                                                />

                                                <input
                                                    hidden
                                                    type="text"
                                                    className="form-control"
                                                    name="messageStatus"
                                                    value="UnRead"
                                                />
                                                <div className="row form--row-custom form-box-style__form-inner">
                                                    <div className="col-lg-6 col-12">
                                                        <div className="form-box-style__form-input">
                                                            <h3 className="form-box-style-title">Your name</h3>
                                                            <input
                                                                className="form-control bg-light-2"
                                                                type="text"
                                                                name="name"
                                                                required
                                                                placeholder="Enter your full name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-12">
                                                        <div className="form-box-style__form-input">
                                                            <h3 className="form-box-style-title">Email address</h3>
                                                            <input
                                                                className="form-control bg-light-2"
                                                                type="text"
                                                                name="email"
                                                                required
                                                                placeholder="Enter your email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-box-style__form-input">
                                                            <h3 className="form-box-style-title">Subject</h3>
                                                            <input
                                                                className="form-control bg-light-2"
                                                                type="text"
                                                                name="subject"
                                                                required
                                                                placeholder="Enter subject"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-box-style__form-input">
                                                            <h3 className="form-box-style-title">
                                                                Write your message
                                                            </h3>
                                                            <textarea
                                                                className="form-control bg-light-2 textarea"
                                                                placeholder="Write us your questions here..."
                                                                required
                                                                name="message"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-box-style__form-input-button">
                                                    <button type="submit" className="btn-masco rounded-pill">
                                                        Submit Message
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center gutter-y-default">
                        <div
                            className="col-lg-4 col-md-6 aos-init aos-animate"
                         
                        >
                            <div className="feature-card">
                                <div className="feature-card__icon">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/5654/5654521.png"
                                        alt="images alt"
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <div className="feature-card__body">
                                    <h3 className="feature-card__title">Address</h3>
                                    <p>
                                        {contact.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="col-lg-4 col-md-6 aos-init aos-animate padding-bottom-120"
                          
                        >
                            <div className="feature-card">
                                <div className="feature-card__icon">
                                    <img
                                        src="./image/contact-details/feature-icon-2.svg"
                                        alt="image alt"
                                    />
                                </div>
                                <div className="feature-card__body">
                                    <h3 className="feature-card__title">Give us a call</h3>
                                    <p>
                                        <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-4 col-md-6 aos-init aos-animate"
                            
                        >
                            <div className="feature-card">
                                <div className="feature-card__icon">
                                    <img
                                        src="./image/contact-details/feature-icon-3.svg"
                                        alt="image alt"
                                    />
                                </div>
                                <div className="feature-card__body">
                                    <h3 className="feature-card__title">Email Us</h3>
                                    <p>
                                        <a href={`mailto:${contact.email}`}>
                                            {contact.email}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        </>
    );
};

export default ContactUs;