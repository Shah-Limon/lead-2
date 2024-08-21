import React, { useEffect, useState } from "react";

const Faqs = () => {
  const [faqData, setFaqData] = useState([]);
  const [faqTitle, setFaqTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/faqs`)
      .then((res) => res.json())
      .then((info) => setFaqData(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/faqs-title`)
      .then((res) => res.json())
      .then((info) => setFaqTitle(info));
  }, []);

  return (
    <>
      <section className="faq">
        <div className="shape right" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              {faqTitle.map((e) => (
                <>
                  <div
                    className="block-text center"
                  
                  >
                    <h6 className="sub-heading">
                      <span>{e.titleTopText}</span>
                    </h6>
                    <h3 className="heading">
                      {e.titleOne}
                      <br />
                      {e.titleTwo}
                    </h3>
                  </div>
                </>
              ))}
              <div className="faq__main flat-tabs">
                <div className="content-tab">
                  <div className="content-inner">
                    <div className="flat-accordion row">
                      <div className="col-md-12 col-sm-12">
                        {faqData.map((e) => (
                          <div className="flat-toggle">
                            <h6 className="toggle-title">
                              <span>01.</span> When the musics over turn off the
                              light? <span className="icon-plus" />
                            </h6>
                            <div className="toggle-content">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Tellus aliquam parturient erat
                                id vel, condimentum a, hendrerit egestas. Auctor
                                cras diam, dui pulvinar elit. Egestas feugiat
                                gravida in imperdiet facilisi tortor ac ultrices
                                venenatis.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;
