import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const UserEmailTemplate = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const iframeRef = useRef(null);
    const [emailTemplate, setEmailTemplate] = useState({});
    const [showCodePreview, setShowCodePreview] = useState(false);

    // Fetch email template on component mount
    useEffect(() => {
        const fetchEmailTemplate = async () => {
            try {
                const response = await fetch(`http://localhost:5000/generate-email-templates`);
                const data = await response.json();
                if (data.length > 0) {
                    setEmailTemplate(data[0]);
                    setHtmlCode(data[0].htmlCode);
                    setIsEditing(true);
                }
            } catch (error) {
                console.error("Error fetching the email template:", error);
            }
        };

        fetchEmailTemplate();
    }, []);

    // Update iframe content whenever htmlCode changes
    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const document = iframe.contentDocument;
            if (document) {
                document.open();
                document.write(htmlCode);
                document.close();
            }
        }
    }, [htmlCode]);

    // Handle changes in the textarea
    const handleCodeChange = (event) => {
        setHtmlCode(event.target.value);
    };

    // Handle iframe input changes
    const handleIframeInput = () => {
        const iframe = iframeRef.current;
        if (iframe) {
            const document = iframe.contentDocument;
            if (document) {
                setHtmlCode(document.documentElement.outerHTML);
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = isEditing
                ? `http://localhost:5000/edit-generate-email-template/${emailTemplate._id}`
                : "http://localhost:5000/add-generate-email-template";
    
            const response = await axios.post(url, { generateEmailTemplate: htmlCode }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 201 || response.status === 200) {
                setMessage("Template saved successfully!");
            } else {
                setMessage("Failed to save the template.");
            }
        } catch (error) {
            console.error("Error saving the template:", error);
            setMessage("Failed to save the template.");
        }
    };

    // Copy HTML code to clipboard
    const handleCopyCode = () => {
        navigator.clipboard.writeText(htmlCode)
            .then(() => setMessage("HTML code copied!"))
            .catch((error) => {
                console.error("Error copying HTML code:", error);
                setMessage("Failed to copy HTML code.");
            });
    };

    // Toggle code preview modal
    const handleViewCodePreview = () => {
        setShowCodePreview(!showCodePreview);
    };

    // Add contentEditable to the iframe body
    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const document = iframe.contentDocument;
            if (document) {
                document.body.contentEditable = true;
                const handleInput = () => handleIframeInput();
                document.body.addEventListener('input', handleInput);
                return () => {
                    document.body.removeEventListener('input', handleInput);
                };
            }
        }
    }, [htmlCode]);

    return (
        <div className="contact-2_form-section padding-bottom-100 container">
            <form onSubmit={handleSubmit}>
               
                <div>
                    <h2>Email Template Preview</h2>
                    <iframe
                        ref={iframeRef}
                        style={{ width: "100%", height: "400px", border: "none" }}
                        title="Live Preview"
                    />
                </div>
                <div className="form-box-style__form-input-button d-flex justify-content-center" style={{ marginTop: "20px" }}>
                   
                    <button
                        type="button"
                        className="btn-masco rounded-pill"
                        onClick={handleCopyCode}
                        style={{ marginLeft: "10px" }}
                    >
                        Copy HTML Code
                    </button>
                    <button
                        type="button"
                        className="btn-masco rounded-pill"
                        onClick={handleViewCodePreview}
                        style={{ marginLeft: "10px" }}
                    >
                        {showCodePreview ? "Hide Template Preview" : "View Template Preview"}
                    </button>
                </div>
            </form>
            {message && <p>{message}</p>}

            {/* Modal for code preview */}
            {showCodePreview && (
                <div className="code-preview-modal" style={modalStyle}>
                    <button
                        onClick={handleViewCodePreview}
                        style={closeButtonStyle}
                    >
                        Close
                    </button>
                    <h2>Live Preview</h2>
                    <iframe
                        style={{ width: "100%", height: "100%", border: "none", borderRadius: "4px" }}
                        title="Live Preview"
                        srcDoc={htmlCode}
                    />
                </div>
            )}
        </div>
    );
};

// Modal styling
const modalStyle = {
    position: "fixed",
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
    overflow: "auto"
};

// Close button styling
const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
};

export default UserEmailTemplate;
