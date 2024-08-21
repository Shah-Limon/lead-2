import React, { useEffect, useState } from "react";

const ProcessArea = () => {
  const [choose, setChoose] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/why-choose`)
      .then((res) => res.json())
      .then((info) => setChoose(info[0]));
  }, []);

  return (
    <>
      <div id="process" className="process-area bg-gray default-padding">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-6 thumb">
              <img src={choose.image} alt="Thumb" />
            </div>
            <div className="col-lg-6 info ml-auto">
              <h2>{choose.title}</h2>
              <ul>
                <li>
                  <div className="icon">
                    <i className="fas">
                      <img
                        src={choose.ImageBoxOne}
                        class="img-fluid rounded-top"
                        alt=""
                        width={100}
                      />
                    </i>
                  </div>
                  <div className="content wow fadeInUp" data-wow-delay="300ms">
                    <h4>{choose.TitleBoxOne}</h4>
                    <p>{choose.ParaBoxOne}</p>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas">
                      <img
                        src={choose.ImageBoxTwo}
                        class="img-fluid rounded-top"
                        alt=""
                        width={100}
                      />
                    </i>
                  </div>
                  <div className="content wow fadeInUp" data-wow-delay="300ms">
                    <h4>{choose.TitleBoxTwo}</h4>
                    <p>{choose.ParaBoxTwo}</p>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas">
                      <img
                        src={choose.ImageBoxThree}
                        class="img-fluid rounded-top"
                        alt=""
                        width={100}
                      />
                    </i>
                  </div>
                  <div className="content wow fadeInUp" data-wow-delay="300ms">
                    <h4>{choose.TitleBoxThree}</h4>
                    <p>{choose.ParaBoxThree}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessArea;
