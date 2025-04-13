import React, { useState } from "react";
import {
  getResumeByName,
  getResumesByFirstName,
  getResumesByLastName,
} from "../service/api.ts";
import ResumeDisplay from "./ResumeDisplay.tsx";
import UpdateResumeForm from "./UpdateResumeForm.tsx";

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
}

export default function GetResumeByNameForm({ onBack }: FormProps) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [resumes, setResumes] = useState<ResumeData[] | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateResume, setUpdateResume] = useState<ResumeData | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setUpdateMessage("");
    setIsLoading(true);

    try {
      if (firstName && lastName) {
        const data = await getResumeByName(firstName, lastName);
        setResumes([data]);
      } else if (firstName) {
        const data = await getResumesByFirstName(firstName);
        setResumes(data);
      } else if (lastName) {
        const data = await getResumesByLastName(lastName);
        setResumes(data);
      } else {
        throw new Error("Please provide at least a first name or last name.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error fetching resume data. Please try again."
      );
      setResumes(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (updatedResume: ResumeData) => {
    if (resumes) {
      const updatedResumes = resumes.map((resume) =>
        resume.id === updatedResume.id ? updatedResume : resume
      );
      setResumes(updatedResumes);
    }
    setUpdateMessage("Resume updated successfully!");
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
      {updateResume ? (
        <UpdateResumeForm
          resume={updateResume}
          onBack={() => setUpdateResume(null)}
          onUpdate={(success: boolean, message: string, updatedResume) => {
            if (success && updatedResume) {
              handleUpdate(updatedResume);
            }
            setUpdateMessage(message);
            setUpdateResume(null);
          }}
        />
      ) : (
        <>
          {!resumes && (
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
                  justifyContent: "center",
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
                    setFirstName(e.target.value);
                  }}
                  disabled={isLoading}
                  style={{ padding: "8px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                    setLastName(e.target.value);
                  }}
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
                {isLoading ? "Loading..." : "Get Resume"}
              </button>
            </form>
          )}
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
          {resumes && !updateResume && (
            <>
              {updateMessage && (
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    marginTop: "1rem",
                    textAlign: "center",
                  }}
                >
                  {updateMessage}
                </p>
              )}
              {resumes.map((resume) => (
                <div key={resume.id}>
                  <ResumeDisplay resume={resume} />
                  <button
                    style={{
                      background: "pink",
                      color: "black",
                      padding: "8px",
                      fontWeight: "bold",
                      minWidth: "192px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setUpdateResume(resume);
                    }}
                  >
                    Edit Resume
                  </button>
                </div>
              ))}
            </>
          )}
        </>
      )}

      {!updateResume && (
        <button
          style={{
            background: "pink",
            color: "black",
            padding: "8px",
            fontWeight: "bold",
            minWidth: "192px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={onBack}
        >
          Go Back
        </button>
      )}
    </div>
  );
}
