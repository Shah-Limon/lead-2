import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const ReceivedPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [profile, setProfile] = useState([]);
  const [order, setOrder] = useState([]);

  // Helper function to find the correct profile to update
  const getProfileToUpdate = () => {
    return profile.find((e) => e.userEmail === user?.email) || {};
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch order details
        const orderResponse = await fetch(`http://localhost:5000/order/${id}`);
        const orderData = await orderResponse.json();
        setOrder(orderData);

        // Fetch user profile details
        const profileResponse = await fetch(`http://localhost:5000/profiles`);
        const profileData = await profileResponse.json();
        const updatedProfiles = profileData.map((profile) =>
          profile.userEmail === user?.email
            ? { ...profile, order: orderData }
            : profile
        );
        setProfile(updatedProfiles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, user]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const paymentStatus = event.target.paymentStatus.value;

    // Calculate total credits from the purchased package
    const totalCredits = parseFloat(order.totalCredits) || 0;

    // Retrieve user's current userPoint
    const currentUserPoint = parseFloat(getProfileToUpdate().userPoint) || 0;

    // Add total credits to userPoint
    const updatedUserPoint = currentUserPoint + totalCredits;

    try {
      // Update user profile
      await fetch(`http://localhost:5000/update-credit/${getProfileToUpdate()._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPoint: updatedUserPoint.toString() }),
      });

      // Update payment status
      await fetch(`http://localhost:5000/payment-received/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentStatus }),
      });

      navigate("/user-dashboard");
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  return (
    <section className="py-5 vh-100">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
              <h2 className="text-center mb-4">Payment Confirmation</h2>
              <form id="receivedPaymentForm" onSubmit={handleUpdate}>
                <input
                  type="hidden"
                  name="paymentStatus"
                  value="Received"
                />
                {profile.map(
                  (e) =>
                    e.userEmail === user?.email && (
                      <input
                        key={e._id}
                        type="hidden"
                        name="TotalUserPoint"
                        value={Math.floor(e.userPoint)}
                        readOnly
                      />
                    )
                )}
                <div className="text-center">
                  {order.paymentStatus === "Received" ? (
                    <div>
                      <p className="text-success">Payment has already been received.</p>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                    >
                      Confirm and Add the Credit to the Balance
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReceivedPayment;
