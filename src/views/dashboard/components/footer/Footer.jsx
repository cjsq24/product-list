import React from "react";

const Footer = ({
  onUpdateRowBreak,
  rowBreak,
  setCurrentPage,
  pagesToShow,
  currentPage,
}) => {
  return (
    <footer className="footer-container">
      <div className="group" style={{ marginRight: 15 }}>
        <label>Productos por fila</label>
        <input
          value={rowBreak}
          onChange={(e) => onUpdateRowBreak(e.target.value)}
          maxLength="1"
        />
      </div>
      <div className="group" style={{ marginRight: 15 }}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage == 1}
        >
          Prev
        </button>
        <select
          onChange={(e) => setCurrentPage(Number(e.target.value))}
          value={currentPage}
        >
          {pagesToShow?.map((value, idx) => (
            <option key={idx} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage == pagesToShow?.length}
        >
          Next
        </button>
      </div>
    </footer>
  );
};

export default Footer;
