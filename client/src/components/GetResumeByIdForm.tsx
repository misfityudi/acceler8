import React, { useState } from "react";
import { getResumeById } from "../service/api.ts";
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

export default function GetResumeByIdForm({ onBack }: FormProps) {
  const [id, setId] = useState<number | undefined>(undefined);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateResume, setUpdateResume] = useState<ResumeData | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setUpdateMessage("");
    setIsLoading(true);

    try {
      if (id === undefined || id === null) {
        throw new Error("Please enter an ID.");
      }

      const data = await getResumeById(id);

      setResume(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error fetching resume data. Please try again."
      );
      setResume(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (updatedResume: ResumeData) => {
    setResume(updatedResume);
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
          onBack={() => setUpdateResume(null)}
          resume={updateResume}
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
          {!resume && (
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
                  Enter Id:
                </label>
                <input
                  id="id"
                  type="number"
                  value={id}
                  onChange={(e) => {
                    setError("");
                    setId(
                      e.target.value ? parseInt(e.target.value, 10) : undefined
                    );
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
                {isLoading ? "Loading..." : "Get Resume"}
              </button>
            </form>
          )}
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
          {resume && !updateResume && (
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
                onClick={() => setUpdateResume(resume)}
              >
                Edit Resume
              </button>
              {error && (
                <p
                  style={{
                    color: "red",
                    marginTop: "1rem",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}
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
