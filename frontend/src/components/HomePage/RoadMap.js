import React, { useEffect, useState } from "react";

const RoadMap = () => {
  const [road, SetRoad] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/road/`)
      .then((res) => res.json())
      .then((info) => SetRoad(info));
  }, []);
  return (
    <>
      <section className="roadmap">
        <img
          src="https://themesflat.co/html/cyfoniihtml/assets/images/background/line.png"
          alt=""
          className="img-line"
        />
        <div className="shape" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="block-text center">
                {road.map((e) => (
                  <>
                    <h6 className="sub-heading">
                      <span>{e.titleToptext}</span>
                    </h6>
                    <h3 className="heading wow" data-splitting="">
                      {e.bannerHeadingText1} <br />
                      {e.bannerHeadingText2}
                    </h3>
                  </>
                ))}
              </div>
              {road.map((e) => (
                <>
                  <div
                    className="roadmap__main"
                  
                  >
                    <div className="roadmap-box">
                      <div className="content">
                        <h5 className="title">{e.cardTitleOne}</h5>
                        <p className="text">{e.cardDescOne}</p>
                      </div>
                    </div>
                    <div className="roadmap-box right">
                      <div className="content">
                        <h5 className="title">{e.cardTitleTwo}</h5>
                        <p className="text">{e.cardDescTwo}</p>
                      </div>
                    </div>
                    <div className="roadmap-box">
                      <div className="content">
                        <h5 className="title">{e.cardTitleThree}</h5>
                        <p className="text">{e.cardDescThree}</p>
                      </div>
                    </div>
                    <div className="roadmap-box right">
                      <div className="content">
                        <h5 className="title">{e.cardTitleFour}</h5>
                        <p className="text">{e.cardDescFour}</p>
                      </div>
                    </div>
                    <div className="roadmap-box">
                      <div className="content">
                        <h5 className="title">{e.cardTitleFive}</h5>
                        <p className="text">{e.cardDescFive}</p>
                      </div>
                    </div>
                    <div className="icon" />
                    <div className="icon bottom" />
                  </div>
                  
                  
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoadMap;
