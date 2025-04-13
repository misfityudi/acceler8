import React from "react";

interface ResumeDisplayProps {
  resume: {
    id: number;
    first_name: string;
    last_name: string;
    job_title: string;
    job_description: string;
    job_company: string;
  } | null;
}

export default function ResumeDisplay({ resume }: ResumeDisplayProps) {
  if (!resume) {
    return <div>No resume data available.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", gap: "8px", justifyContent: "space-between" }}
      >
        <p style={{ fontWeight: "bold" }}>Name:</p>
        <p>
          {resume.first_name} {resume.last_name}
        </p>
      </div>
      <div
        style={{ display: "flex", gap: "8px", justifyContent: "space-between" }}
      >
        <p style={{ fontWeight: "bold" }}>Title:</p>
        <p>{resume.job_title}</p>
      </div>
      <div
        style={{ display: "flex", gap: "8px", justifyContent: "space-between" }}
      >
        <p style={{ fontWeight: "bold" }}>Description:</p>
        <p>{resume.job_description}</p>
      </div>
      <div
        style={{ display: "flex", gap: "8px", justifyContent: "space-between" }}
      >
        <p style={{ fontWeight: "bold" }}>Company:</p>
        <p>{resume.job_company}</p>
      </div>
    </div>
  );
}
