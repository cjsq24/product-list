import React from "react";

const Footer = ({
  onUpdateRowBreak,
  rowBreak,
  setCurrentPage,
  pagesToShow,
}) => {
  return (
    <footer className="footer-container">
      <div className="group" style={{ marginRight: 15 }}>
        <label>Productos por fila</label>
        <input
          value={rowBreak}
          onChange={(e) => onUpdateRowBreak(e.target.value)}
        />
      </div>
      <div className="group" style={{ marginRight: 15 }}>
        <label>Página</label>
        <select onChange={(e) => setCurrentPage(e.target.value)}>
          {pagesToShow?.map((value, idx) => (
            <option key={idx} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </footer>
  );
};

export default Footer;
