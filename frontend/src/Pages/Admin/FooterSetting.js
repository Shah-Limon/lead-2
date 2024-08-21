import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FooterSetting = () => {
  const navigate = useNavigate();
  const [footerAbout, setFooterAbout] = useState([]);
  const [footerAddress, setFooterAddress] = useState([]);
  const [footerSocial, setFooterSocial] = useState([]);
  const [footerCopyright, setFooterCopyright] = useState([]);

  /* footer about */
  useEffect(() => {
    fetch(`http://localhost:5000/footer-about`)
      .then((res) => res.json())
      .then((info) => setFooterAbout(info));
  }, [footerAbout]);

  const handleFooterAbout = (event) => {
    event.preventDefault();
    const websiteName = event.target.websiteName.value;
    const aboutUs = event.target.aboutUs.value;

    const footerAbout = {
      websiteName,
      aboutUs,
    };

    const url = `http://localhost:5000/footer-about`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerAbout),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard/");
      });
  };

  /* footer Address */
  useEffect(() => {
    fetch(`http://localhost:5000/footer-address`)
      .then((res) => res.json())
      .then((info) => setFooterAddress(info));
  }, [footerAddress]);

  const handleFooterAddress = (event) => {
    event.preventDefault();
    const footerPhone = event.target.footerPhone.value;
    const footerEmail = event.target.footerEmail.value;
    const footerAdress = event.target.footerAdress.value;

    const footerAddress = {
      footerPhone,
      footerEmail,
      footerAdress,
    };

    const url = `http://localhost:5000/footer-address`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerAddress),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard/");
      });
  };
  /* Social Address */
  useEffect(() => {
    fetch(`http://localhost:5000/footer-social`)
      .then((res) => res.json())
      .then((info) => setFooterSocial(info));
  }, [footerSocial]);

  const handleFooterSocial = (event) => {
    event.preventDefault();
    const facebook = event.target.facebook.value;
    const youtube = event.target.youtube.value;
    const twitter = event.target.twitter.value;

    const footerSocial = {
      facebook,
      youtube,
      twitter,
    };

    const url = `http://localhost:5000/footer-social`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerSocial),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard/");
      });
  };
  /* Copy Right */
  useEffect(() => {
    fetch(`http://localhost:5000/footer-copyright`)
      .then((res) => res.json())
      .then((info) => setFooterCopyright(info));
  }, [footerCopyright]);

  const handleCopyright = (event) => {
    event.preventDefault();
    const copyright = event.target.copyright.value;

    const footerCopyright = {
      copyright,
    };

    const url = `http://localhost:5000/footer-copyright`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerCopyright),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard/");
      });
  };

  return (
    <div className="container mx-auto">
      <div>
        <h2>About Us Setting</h2>
        {footerAbout.filter((footer) => footer.websiteName).length === 0 && (
          <form onSubmit={handleFooterAbout}>
            <input
              type="text"
              name="websiteName"
              placeholder="Website Name"
            ></input>
            <br></br>
            <textarea
              className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="aboutUs"
              placeholder="Write About"
            ></textarea>
            <br></br>
            <input type="submit" value="Update"></input>
          </form>
        )}
        {footerAbout.filter((footer) => footer.websiteName).length === 1 && (
          <>
            {footerAbout.map((footer) => (
              <Link
                to={`/admin/footer-about-edit/${footer._id}`}
                className="btn"
              >
                Edit Footer About
              </Link>
            ))}
          </>
        )}
      </div>
      <div>
        <h2>Address</h2>
        {footerAddress.filter((footer) => footer.footerPhone).length === 0 && (
          <form onSubmit={handleFooterAddress}>
            <input
              type="text"
              name="footerPhone"
              placeholder="Enter Phone Number"
            ></input>
            <br></br>
            <input
              type="text"
              name="footerEmail"
              placeholder="Enter Email"
            ></input>
            <br></br>
            <input
              type="text"
              name="footerAdress"
              placeholder="Enter Address"
            ></input>
            <br></br>

            <input type="submit" value="Update"></input>
          </form>
        )}

        {footerAddress.filter((footer) => footer.footerPhone).length === 1 && (
          <>
            {footerAddress.map((footer) => (
              <Link
                to={`/admin/footer-address-edit/${footer._id}`}
                className="btn"
              >
                Edit Footer Address
              </Link>
            ))}
          </>
        )}
      </div>
      <div>
        <h2>Social Media Setup</h2>
        {footerSocial.filter((social) => social.facebook).length === 0 && (
          <form onSubmit={handleFooterSocial}>
            <input
              type="text"
              name="facebook"
              placeholder="Enter Facebook Link"
            ></input>
            <br></br>
            <input
              type="text"
              name="youtube"
              placeholder="Enter Youtube Link"
            ></input>
            <br></br>
            <input
              type="text"
              name="twitter"
              placeholder="Enter Twitter Link"
            ></input>
            <br></br>

            <input type="submit" value="Update"></input>
          </form>
        )}
       

        {footerSocial.filter((footer) => footer.facebook).length === 1 && (
          <>
            {footerSocial.map((footer) => (
              <Link
                to={`/admin/footer-social-edit/${footer._id}`}
                className="btn"
              >
                Edit Footer Social
              </Link>
            ))}
          </>
        )}
      </div>
      <div>
        <h2>Copyright Setting</h2>
        {footerCopyright.filter((social) => social.copyright).length === 0 && (
          <form onSubmit={handleCopyright}>
            <input
              type="text"
              name="copyright"
              placeholder="Write copyright text"
            ></input>
            <br></br>

            <input type="submit" value="Update"></input>
          </form>
        )}

        {footerCopyright.filter((footer) => footer.copyright).length === 1 && (
          <>
            {footerAddress.map((footer) => (
              <Link
                to={`/admin/footer-copyright-edit/${footer._id}`}
                className="btn"
              >
                Edit Footer Copyright
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FooterSetting;
