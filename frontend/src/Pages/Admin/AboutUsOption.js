import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUsOption = () => {




  const navigate = useNavigate();





  const handleAddAbout = (event) => {
    event.preventDefault();
    const img = event.target.img.value;
    const title = event.target.title.value;
    const subText = event.target.subText.value;
    const btnText = event.target.btnText.value;
    const btnUrl = event.target.btnUrl.value;

    const about = {
        img,
        title,
        subText,
        btnText,
        btnUrl,
    };

    const url = `http://localhost:5000/add-about`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(about),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/report-sent");
      });
  };
  return (
    <>
      <form onSubmit={handleAddAbout}>
        <input
          required
          type="text"
          class="form-control"
          placeholder="Enter Image Url"
          name="img"
        />
        <input
          required
          type="text"
          class="form-control"
          placeholder="Your Title"
          name="title"
        />
        <input
          required
          type="text"
          class="form-control"
          placeholder="Your Sub Text"
          name="subText"
        />
        <input
          required
          type="text"
          class="form-control"
          placeholder="Your Button Text"
          name="btnText"
        />
        <input
          required
          type="text"
          class="form-control"
          placeholder="Your Button URL"
          name="btnUrl"
        />
        <input
          required
          type="submit"
          class="form-control"
       
        
        />
      </form>
    </>
  );
};

export default AboutUsOption;
