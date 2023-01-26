import React from "react";

const FillCards = ({ rowBreak, rowCount }) => {
  return (
    <>
      {rowBreak - rowCount - 1 > 0 && (
        <>
          {(rowBreak - rowCount - 1)
            .toString()
            .repeat(rowBreak - rowCount - 1 || 0)
            .split("")
            .map((value, idx) => (
              <div key={idx} style={{ flex: 1 }}></div>
            ))}
        </>
      )}
    </>
  );
};

export default FillCards;
