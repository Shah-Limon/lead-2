import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BannerOneEdit = () => {
    const [banner, setbanner] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(`http://localhost:5000/banner-one/${id}`)
          .then((res) => res.json())
          .then((info) => setbanner(info));
      }, [id]);

      const handleBannerOneEdit = (event) => {
        event.preventDefault();
        const bannerImageOne = event.target.bannerImageOne.value;
        const bannerOneEdit = { bannerImageOne };
    
        const url = `http://localhost:5000/banner-one-edit/${id}`;
        fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bannerOneEdit),
        })
          .then((res) => res.json())
          .then((result) => {
            navigate(`/admin/dashboard`);
          });
      };
     

    return (
        <div>
              
                <form onSubmit={handleBannerOneEdit}> 
                <input defaultValue={banner.bannerImageOne} type='text' name='bannerImageOne'></input>
                <input type='submit' value='Update'></input>
            </form>
            
        </div>
    );
};

export default BannerOneEdit;