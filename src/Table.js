import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          {/* Emmet */}
          <td>
            <strong>{country}</strong>
          </td>
          <td>
            <strong>{numeral(cases).format("+0.0a")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
