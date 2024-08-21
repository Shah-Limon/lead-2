import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NewPricing = () => {
  const { id } = useParams();

  const [speciality, SetSpeciality] = useState([]);
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/speciality/${id}`)
      .then((res) => res.json())
      .then((info) => SetSpeciality(info));
  }, [id]);

  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/package-titles/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/packages`)
      .then((res) => res.json())
      .then((info) => setPackages(info));
  }, []);
  const margin0 = {
    marginBottom: "0",
    marginRight: "10px",
  };
  return (
    <>
      <section
        className="speciality"
      
      >
        <div className="shape right" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              {title.map((e) => (
                <div className="block-text center">
                  <h6 className="sub-heading">
                    <span>{e.titleTop}</span>
                  </h6>
                  <h3 className="heading wow" data-splitting="">
                    {e.titleOne} <br />
                    {e.titleTwo}
                  </h3>
                  <p className="">{e.description}</p>
                </div>
              ))}
            </div>
            {packages.map((e) => (
              <div className="col-xl-4 col-md-6">
                <div
                  className="speciality-box"
                  
                >
                  <div className="icon">
                    <img
                      src={e.img}
                      width={96}
                      height={96}
                      alt={e.packageName}
                    ></img>
                  </div>

                  <>
                    <h5 className="title">{e.price} $</h5>
                  </>

                  <h4 className="number">{e.packageName}</h4>
                  <ul>
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureOne}</span>
                    </li>
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureTwo}</span>
                    </li>{" "}
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureThree}</span>
                    </li>{" "}
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureFour}</span>
                    </li>{" "}
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureFive}</span>
                    </li>{" "}
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureSix}</span>
                    </li>{" "}
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureSeven}</span>
                    </li>{" "}
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureEight}</span>
                    </li>{" "}
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureNine}</span>
                    </li>
                    <li className="text1">
                      <img
                        style={margin0}
                        src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                        alt="images"
                      ></img>
                      <span>{e.featureTen}</span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewPricing;
