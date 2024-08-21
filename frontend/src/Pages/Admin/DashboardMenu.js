import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const DashboardMenu = () => {
  const [user] = useAuthState(auth);
  const handleSignout = () => {
    signOut(auth);
  };

  return (
    <>
      <section className="project s2 ">
        <div className="shape right" />
        <div className="container">
          <div className="row">
            <div className="row mb-5">
              <div
                className="col"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <div className="mt-5">
                  {user ? (
                    <Link
                      className="btn-masco btn-masco--header rounded-pill btn-fill--up"
                      onClick={handleSignout}
                    >
                      <span>Sign Out</span>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center gutter-y-default">

            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
            
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2F3566511.png?alt=media&token=aa74408c-623a-47ee-9a2c-f440e0dff059" width={75} height={75} alt="image alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title"> <Link to="/admin/packages/">
                    Packages (edit)
                  </Link></h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2F1162456.png?alt=media&token=bc9978fb-2d4a-49b8-9eb0-92d86114bf6f" width={75} height={75} alt="image alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <Link to="/admin/orders/">
                      Total Orders
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2F3940201.png?alt=media&token=e408758f-ddc0-4161-a065-a3e842c36854" height={75} width={75} alt="image alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <Link to="/admin/setting">
                      Setting Option
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2F2571010.png?alt=media&token=bc2c0b7b-66c7-4d8b-a023-e474b24ebde9" width={75} height={75} alt="image alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <Link to="/admin/contact-messages/">
                      Contact Messages
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2F1256650.png?alt=media&token=7855d8cf-b3f0-4368-b4fd-8374955f2caf" width={75} height={75} alt="image alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <Link to="/admin/manage-users/">
                      Manage Users
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2F5003738.png?alt=media&token=0884637f-8807-4422-a0fa-dd4ef2d2dda6" width={75} height={75} alt="profiles" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <Link to="/admin/manage-profiles/">
                      Manage All Profile
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </section>
    </>
  );
};

export default DashboardMenu;
