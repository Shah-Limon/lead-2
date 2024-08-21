import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TopBannerSetting = () => {
  const navigate = useNavigate();
  const [topBanners, setTopBanners] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/top-banner`)
      .then((res) => res.json())
      .then((info) => setTopBanners(info));
  }, []);

  const handleTopBanner = (event) => {
    event.preventDefault();
    const bannerTitle = event.target.bannerTitle.value;
    const bannerText = event.target.bannerText.value;
    const bannerButtonText = event.target.bannerButtonText.value;
    const bannerButtonTextLink = event.target.bannerButtonTextLink.value;
    const bannerImage = event.target.bannerImage.value;
    const bannerBackgroundImage = event.target.bannerBackgroundImage.value;

    const topBanner = {
      bannerTitle,
      bannerText,
      bannerButtonText,
      bannerButtonTextLink,
      bannerImage,
      bannerBackgroundImage,
    };

    const url = `http://localhost:5000/top-banner`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(topBanner),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard");
      });
  };

  return (
    <div className="container mx-auto">
      {topBanners.filter((topBanner) => topBanner.bannerTitle).length === 0 && (
        <form onSubmit={handleTopBanner}>
          <span className="label-text">Your Banner Title</span>
          <br></br>
          <input
            required
            type="text"
            placeholder="Your Banner Title"
            name="bannerTitle"
          ></input>
          <br></br>
          <span className="label-text">Your Banner Text</span>
          <br></br>
          <input
            type="text"
            name="bannerText"
            placeholder="Type your Banner Text"
          ></input>
          <br></br>
          <span className="label-text">Your Banner banner Button Text </span>
          <br></br>
          <input
            type="text"
            name="bannerButtonText"
            placeholder="Type Banner banner Button Text Link"
          ></input>
          <br></br>
          <span className="label-text">
            Your Banner banner Button Text Link
          </span>
          <br></br>
          <input
            type="text"
            name="bannerButtonTextLink"
            placeholder="Type Banner banner Button Text Link"
          ></input>
          <br></br>
          <span className="label-text">Banner Image Link</span>
          <br></br>
          <input
            type="text"
            name="bannerImage"
            placeholder="Type Banner Image link"
          ></input>
          <br></br>
          <span className="label-text">Banner Background Image</span>
          <br></br>
          <input
            type="text"
            name="bannerBackgroundImage"
            placeholder="Banner Background Image"
          ></input>
          <br></br>

          <input type="submit" value="Update"></input>
        </form>
      )}
      {topBanners.filter((topBanner) => topBanner.bannerTitle).length === 1 && (
        <>
          {topBanners.map((topBanner) => (
            <Link className="btn" to={`/admin/topbanner/${topBanner._id}`}>
              Edit This Banner
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default TopBannerSetting;
