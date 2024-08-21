import React from "react";

const websiteCheck = () => {
  return (
    <>
      <div className="container">
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Supplier Code</th>
              <th>Supplier Name</th>
              <th>Edit</th>
              <th>-</th>
            </tr>
            <tr>
              <td data-th="Supplier Code">UPS5005</td>
              <td data-th="Supplier Name">UPS</td>
              <td data-th="Invoice Number">ASDF19218</td>
              <td data-th="Invoice Date">06/25/2016</td>
              <td data-th="Invoice Date">06/25/2016</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default websiteCheck;
