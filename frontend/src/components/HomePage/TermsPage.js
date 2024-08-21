import React from "react";

const TermsPage = () => {
  const currentDomain = window.location.origin;
  return (
    <>
      <div
        className="breadcrumb-area shadow dark bg-cover text-center text-light"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h1>Terms & Condition</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="services-details-area default-padding">
        <div className="container">
          <div className="services-details-items">
            <div className="row">
              <div className="col-lg-12 services-single-content">
                <div className="thumb">
                  <img src="https://img.freepik.com/free-vector/terms-conditions-abstract-concept-illustration_335657-4920.jpg" alt="Thumb" />
                </div>
                <h2>Terms of Service for {currentDomain} - Lead Generation Tools</h2>

                <div className="features">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="content">
                        <h4 className="mt-2">1. Acceptance of Terms</h4>
                        <p>"Account Information" refers to the details you furnish for the purpose of establishing, facilitating, and managing an account that grants access to the Service.</p>


                        <h4 className="mt-2">2. Output Data</h4>
                        <p>“Output Data” means the information and other content or materials that are included in the Contributor Database or otherwise made available to you through the our Platform. Output Data is exclusive of the Submitted Data,</p>

                        <h4 className="mt-2">3. Order Form</h4>
                        <p>"Order Form" refers to an ordering document, which may include an order receipt, associated with your procurement of the Service. It outlines the specifics of your subscription and any corresponding fees to be remitted by you.</p>


                        <h4 className="mt-2">4. Personal Information</h4>
                        <p>"Personal Information" encompasses terms substantially similar to "personal information," including phrases like "personal data" or "personally identifiable information." In each case, the meaning of these terms corresponds to the definition provided under applicable law.</p>


                        <h4 className="mt-2">5. Service Metadata</h4>
                        <p>"Service Metadata" pertains to information gathered or deduced by us during the delivery of emails, including details about deliverability and system operations, or in the broader context of providing the Service.</p>


                        <h4 className="mt-2">6. Personal Information</h4>
                        <p>"Personal Information" encompasses terms substantially similar to "personal information," including phrases like "personal data" or "personally identifiable information." In each case, the meaning of these terms corresponds to the definition provided under applicable law.</p>


                        <h4 className="mt-2">7. Submitted Data</h4>
                        <p>
                          "Submitted Data" encompasses all data, information, text, recordings, and other content and materials collected, submitted, provided, or transmitted by you in relation to your use of the Service. The nature of Submitted Data may differ based on the products or features utilized and your specific usage thereof. For more detailed information specific to each product, please refer to the product documentation accessible at: {currentDomain}. Notably, Submitted Data excludes Output Data or Service Metadata.</p>


                        <h4 className="mt-2">8. General Data Protection Regulation</h4>
                        <p>"UK/EU GDPR" refers to the General Data Protection Regulation (Regulation (EU) 2016/679) and its equivalent requirements within the United Kingdom, encompassing the Data Protection Act 2018 and the United Kingdom General Data Protection Regulation.</p>





                        <h4 className="mt-2">9. Eligibility Restrictions:</h4>
                        <p>"Personal Information" encompasses terms substantially similar to "personal information," including phrases like "personal data" or "personally identifiable information." In each case, the meaning of these terms corresponds to the definition provided under applicable law.</p>

                        <h4 className="mt-2">10. Account Security:</h4>
                        <p>

                          <p>   While we make no assurances about the security of the Service, you acknowledge the possibility of unauthorized access to your information, including through prohibited methods like web-scraping tools. You accept liability for any activities conducted through your account and agree that you and your Authorized Users:</p>
                          <br></br>



                          <p>
                            Are solely responsible for maintaining the confidentiality and security of your Account Information and account credentials (e.g., username and password).
                            Must not share account credentials and must restrict access to your devices.
                            <br></br>
                            <br></br>

                            Should access the Service and our network, systems, or applications only through encrypted connections.
                            <br></br>
                            <br></br>

                            Must keep end-user devices used to connect to the Service or our environment up-to-date with operating system patches and active anti-malware.
                            Must promptly revoke access to the Service for terminated employees or users within 24 hours of termination.
                            <br></br>
                            <br></br>

                            Must promptly notify us (within 72 hours) of security incidents that could affect us (e.g., compromised credentials, lost or stolen devices with Service access, compromised networks or systems, malware, ransomware, etc.).</p>


                        </p>
                      </div>
                    </div>

                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
