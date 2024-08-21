import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTopBanner = () => {
    const [topBanner, setTopBanner] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/top-banner/${id}`)
          .then((res) => res.json())
          .then((info) => setTopBanner(info));
      }, [id]);

      const handleTopBanner = (event) => {
        event.preventDefault();
        const bannerTitle = event.target.bannerTitle.value;
        const bannerText = event.target.bannerText.value;
        const bannerButtonText = event.target.bannerButtonText.value;
        const bannerButtonTextLink = event.target.bannerButtonTextLink.value;
        const bannerImage = event.target.bannerImage.value;
        const bannerBackgroundImage = event.target.bannerBackgroundImage.value;

        const editTopBanner = { bannerTitle, bannerText, bannerButtonText,bannerButtonTextLink, bannerImage, bannerBackgroundImage };
    
        const url = `http://localhost:5000/top-banner-edit/${id}`;
        fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(editTopBanner),
        })
          .then((res) => res.json())
          .then((result) => {
            navigate(`/admin/dashboard`);
          });
      };
    

    return (
        <div>
            
        <form onSubmit={handleTopBanner}>
          <span className="label-text">Your Banner Title</span><br></br>
          <input required defaultValue={topBanner.bannerTitle} type="text" placeholder="Your Banner Title" name="bannerTitle"></input>
          <br></br>
          <span className="label-text">Your Banner Text</span><br></br>
          <input type="text" defaultValue={topBanner.bannerText} name="bannerText" placeholder="Type your Banner Text"></input>
          <br></br>
          <span className="label-text">Your Banner banner Button Text </span><br></br>
          <input type="text" defaultValue={topBanner.bannerButtonText} name="bannerButtonText" placeholder="Type Banner banner Button Text Link"></input>
          <br></br>
          <span className="label-text">Your Banner banner Button Text Link</span><br></br>
          <input type="text" defaultValue={topBanner.bannerButtonTextLink} name="bannerButtonTextLink" placeholder="Type Banner banner Button Text Link"></input>
          <br></br>
          <span className="label-text">Banner Image Link</span><br></br>
          <input type="text" defaultValue={topBanner.bannerImage} name="bannerImage" placeholder="Type Banner Image link"></input>
          <br></br>
          <span className="label-text">Banner Background Image</span><br></br>
          <input type="text" defaultValue={topBanner.bannerBackgroundImage} name="bannerBackgroundImage" placeholder="Banner Background Image"></input>
          <br></br>
        
          <input type="submit" value="Update"></input>
        </form>
      
        </div>
    );
};

export default EditTopBanner;