import React, { useState } from "react";
import { updateResumeDetails } from "../service/api.ts";

interface ResumeData {
  id: number;
  first_name: string;
  last_name: string;
  job_title: string;
  job_description: string;
  job_company: string;
}

interface FormProps {
  onBack: () => void;
  onUpdate: (
    success: boolean,
    message: string,
    updatedResume: ResumeData
  ) => void;
  resume: ResumeData;
}

export default function UpdateResumeForm({
  onBack,
  onUpdate,
  resume,
}: FormProps) {
  const [firstName, setFirstName] = useState(resume.first_name);
  const [lastName, setLastName] = useState(resume.last_name);
  const [jobTitle, setJobTitle] = useState(resume.job_title);
  const [jobDescription, setJobDecription] = useState(resume.job_description);
  const [jobCompany, setJobCompany] = useState(resume.job_company);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!resume) {
        setError("Resume data is missing.");
        setIsLoading(false);
        return;
      }

      const updatedResume = await updateResumeDetails(
        resume.id,
        firstName || resume.first_name,
        lastName || resume.last_name,
        jobTitle || resume.job_title,
        jobDescription || resume.job_description,
        jobCompany || resume.job_company
      );

      console.log("upda", updatedResume);

      onUpdate(true, "Resume updated successfully", {
        id: updatedResume.id,
        first_name: updatedResume.first_name,
        last_name: updatedResume.last_name,
        job_title: updatedResume.job_title,
        job_description: updatedResume.job_description,
        job_company: updatedResume.job_company,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error fetching resume data. Please try again."
      );
      onUpdate(false, "Failed to update resume.", {
        id: resume.id,
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle,
        job_description: jobDescription,
        job_company: jobCompany,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
        alignItems: "center",
        gap: "8px",
        width: "100%",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifySelf: "center",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "320px",
            width: "100%",
            gap: "16px",
          }}
        >
          <label htmlFor="firstName" style={{ fontWeight: "bold" }}>
            First Name:
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => {
              setError("");
              setFirstName(() => e.target.value);
            }}
            disabled={isLoading}
            style={{ padding: "8px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "320px",
            width: "100%",
            gap: "16px",
          }}
        >
          <label htmlFor="lastName" style={{ fontWeight: "bold" }}>
            Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => {
              setError("");
              setLastName(() => e.target.value);
            }}
            disabled={isLoading}
            style={{ padding: "8px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "320px",
            width: "100%",
            gap: "16px",
          }}
        >
          <label htmlFor="jobTitle" style={{ fontWeight: "bold" }}>
            Job Title:
          </label>
          <input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => {
              setError("");
              setJobTitle(() => e.target.value);
            }}
            required
            disabled={isLoading}
            style={{ padding: "8px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "320px",
            width: "100%",
            gap: "16px",
          }}
        >
          <label htmlFor="jobDescription" style={{ fontWeight: "bold" }}>
            Job Description:
          </label>
          <input
            id="jobDescription"
            type="text"
            value={jobDescription}
            onChange={(e) => {
              setError("");
              setJobDecription(() => e.target.value);
            }}
            required
            disabled={isLoading}
            style={{ padding: "8px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "320px",
            width: "100%",
            gap: "16px",
          }}
        >
          <label htmlFor="jobCompany" style={{ fontWeight: "bold" }}>
            Job Company:
          </label>
          <input
            id="jobCompany"
            type="text"
            value={jobCompany}
            onChange={(e) => {
              setError("");
              setJobCompany(() => e.target.value);
            }}
            required
            disabled={isLoading}
            style={{ padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            background: "black",
            color: "pink",
            padding: "8px",
            fontWeight: "bold",
            minWidth: "192px",
            borderRadius: "8px",
            cursor: "pointer",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "16px",
          }}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      <button
        style={{
          background: "pink",
          color: "black",
          padding: "8px",
          fontWeight: "bold",
          minWidth: "192px",
          borderRadius: "8px",
          cursor: "pointer",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onClick={() => onBack()}
      >
        Go Back
      </button>
    </div>
  );
}
