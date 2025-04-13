import React from "react";

interface CtasProps {
  onClick: (string) => void;
}

export default function Ctas({ onClick }: CtasProps) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "4px",
        }}
      >
        <button
          style={{
            background: "black",
            color: "pink",
            padding: "8px",
            fontWeight: "bold",
            minWidth: "192px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => onClick("createResumeForm")}
        >
          Add
        </button>
        <button
          style={{
            background: "black",
            color: "pink",
            padding: "8px",
            fontWeight: "bold",
            minWidth: "192px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => onClick("getResumeByIdForm")}
        >
          Find By Id
        </button>
        <button
          style={{
            background: "black",
            color: "pink",
            padding: "8px",
            fontWeight: "bold",
            minWidth: "192px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => onClick("getResumeByNameForm")}
        >
          Find By Name
        </button>
      </div>
    </div>
  );
}
