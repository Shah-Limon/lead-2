import React from "react";

const PrivacyPage = () => {
  const currentDomain = window.location.origin;
  return (
    <>
      <div
        className="breadcrumb-area shadow dark bg-cover text-center text-light"
        style={{ backgroundImage: "url(https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h1>Privacy Policy</h1>
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
                  <img src="https://img.freepik.com/free-vector/security-analysts-protect-internet-connected-systems-with-shield-cyber-security-data-protection-cyberattacks-concept_335657-1827.jpg" alt="Thumb" />
                </div>
                <h2> This Privacy Policy Of {currentDomain}</h2>
                <p>
                  This Privacy Policy ("Policy") governs the relationship between you and Snovio Inc. ("Snovio," "Company," "we," "us," "our"), the proprietor and provider of the website {currentDomain} ("Site"), the web application, and API methods accessible via the {currentDomain} hostname (collectively referred to as the "Platform").
                  <br></br>
                  <br></br>
                  It is applicable to the processing of any personal data by us in connection with the provision of our services and products, as well as your utilization of the Platform.
                  <br></br>
                  <br></br>

                  In the context of processing your personal data, Snovio may assume different roles under the GDPR and other relevant laws and regulations. Depending on the specific circumstances of the processing, our roles may include acting as a data controller, joint controller, or data processor under the GDPR, and as a business and service provider under the CCPA.</p>
                <br></br>
                <br></br>

                <div className="features">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="content">
                        <h4>INTERPRETATION AND DEFINITIONS
                        </h4>
                        <p>We use the following definitions in this Policy:</p>
                        <ul>
                          <li>The term "data controller" refers to the individual or legal entity, whether independently or in collaboration with others, that establishes the purposes and methods for processing any personal data.</li>
                          <li>The designation "data processor" pertains to the natural or legal entity responsible for handling personal data on behalf of the data controller.</li>
                          <li>"Processing" refers to any operation or series of operations conducted on personal data or sets of personal data, irrespective of whether it is done by automated means. These operations include activities like collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination, or otherwise making available, alignment or combination, restriction, erasure, or destruction.</li>
                          <li>"Services" denote the sourcing, lead generation, and sales automation services offered by the Company through its online platform and web application.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="content">
                        <h4>TYPES OF PERSONAL DATA WE COLLECT</h4>
                        <p>
                          We gather information about you in connection with our services, categorizing it into three fundamental types: client and website visitor data, prospect data, and business data related to clients, website visitors, prospects, and related persons, respectively. Specifically, we collect:</p>
                        <ul>
                          <li> Automatically Collected Information:
                            Upon the creation of an account, we automatically gather specific information about you and your device. This includes, but is not limited to, your IP address, referral link, registration date, account balance details, language preference, and browser type. Additionally, we may capture information related to your activities on the Platform, such as the timing of subscription purchases or plan renewals, progress in completing gamification tasks, and any other actions performed during the utilization of our services.</li>
                          <li> Cookies Information. On our Site, we use cookies and other tracking technologies for a variety of purposes: for analytics, marketing activities, remembering your preferences, and other purposes. Such use may involve the transmission of information from us to you and from you to a third party website or us. To learn more regarding our use of cookies please see our Cookie Policy.</li>
                        

                        </ul>
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

export default PrivacyPage;
