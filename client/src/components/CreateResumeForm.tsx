import React, { useState } from "react";
import { uploadResumeDetails } from "../service/api.ts";

interface FormProps {
  onBack: () => void;
}

export default function CreateResumeForm({ onBack }: FormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await uploadResumeDetails(firstName, lastName);
      setId(data.id);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error fetching resume data. Please try again."
      );
      setId(null);
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
              setFirstName(() => e.target.value);
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
              setLastName(() => e.target.value);
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
          {isLoading ? "Loading..." : "Create Resume"}
        </button>
      </form>

      <div>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        {id && (
          <p
            style={{ color: "black", marginTop: "1rem" }}
          >{`Resume created, id: ${id}`}</p>
        )}
      </div>

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
