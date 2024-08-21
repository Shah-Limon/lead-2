import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCopyright = () => {
  const [footerCopyright, setFooterCopyright] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/footer-copyright/${id}`)
      .then((res) => res.json())
      .then((info) => setFooterCopyright(info));
  }, [id]);

  const handleCopyright = (event) => {
    event.preventDefault();
    const copyright = event.target.copyright.value;

    const footerCopyright = {
      copyright,
    };

    const url = `http://localhost:5000/footer-copyright/${id}`;
    fetch(url, {
      method: "PUT",
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
    <div>
      <h2>Copyright Setting</h2>

      <form onSubmit={handleCopyright}>
        <input
          type="text"
          name="copyright"
          defaultValue={footerCopyright.copyright}
        ></input>
        <br></br>

        <input type="submit" value="Update"></input>
      </form>
    </div>
  );
};

export default EditCopyright;
