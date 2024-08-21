import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
const FaqsList = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [title, setTitle] = useState([]);
  const [user] = useAuthState(auth);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/faqs`)
      .then((res) => res.json())
      .then((info) => setFaqs(info));
  }, []);
  const [faqTitle, setFaqTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/faqs-title`)
      .then((res) => res.json())
      .then((info) => setFaqTitle(info));
  }, []);

  const handleFaqs = (event) => {
    event.preventDefault();
    const question = event.target.question.value;
    const answer = event.target.answer.value;

    const faq = {
      question,
      answer,
    };

    const url = `http://localhost:5000/faq`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(faq),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/faqs/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  return (
    <div>
      <form class="form" onSubmit={handleFaqs}>
        <h4 className="mb-15">Add Faqs Question</h4>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">Enter Question</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Question"
                  name="question"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Answer</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Answer"
                  name="answer"
                />
              </div>
            </div>

            <div class="col-sm">
              <button
                type="submit"
                class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
              >
                <span>Add Faq</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div class="container">
        <div class="justify-content-center align-items-baseline"></div>
        <div class="col-sm">
          {faqTitle.map((e) => (
            <>
              <Link
                to={`/admin/faqs-title/${e._id}`}
                class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
              >
                <span>Update Faqs Title</span>
              </Link>
            </>
          ))}
        </div>
      </div>

      <div className="container">
        <table className="rwd-table">
          <h5>Faqs List</h5>
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Question</th>

              <th>Edit</th>
            </tr>
            {faqs.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.question}</td>

                <td>
                  <Link to={`/admin/faq-edit/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaqsList;
