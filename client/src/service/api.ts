const API_BASE_URL = "http://localhost:8080/api";

interface ResumeData {
  id: number;
  first_name: string;
  last_name: string;
  job_title: string;
  job_description: string;
  job_company: string;
}

export const uploadResumeDetails = async (
  firstName: string,
  lastName: string
): Promise<{ id: string }> => {
  const response = await fetch(`${API_BASE_URL}/uploadResumeDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: { first_name: firstName, last_name: lastName },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to upload resume details");
  }

  return response.json();
};

export const updateResumeDetails = async (
  id: number,
  firstName: string,
  lastName: string,
  jobTitle: string,
  jobDescription: string,
  jobCompany: string
): Promise<{
  id: number;
  first_name: string;
  last_name: string;
  job_title: string;
  job_description: string;
  job_company: string;
}> => {
  const response = await fetch(`${API_BASE_URL}/updateResumeDetails`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      first_name: firstName,
      last_name: lastName,
      job_title: jobTitle,
      job_description: jobDescription,
      job_company: jobCompany,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update resume details");
  }

  return response.json();
};

export const getResumeById = async (id: number): Promise<ResumeData> => {
  const response = await fetch(`${API_BASE_URL}/getResumeById/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch resume by ID");
  }

  return response.json();
};

export const getResumeByName = async (
  firstName: string,
  lastName: string
): Promise<ResumeData> => {
  const response = await fetch(
    `${API_BASE_URL}/getResumeByName/${firstName}+${lastName}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch resume by name");
  }

  return response.json();
};

export const getResumesByFirstName = async (
  firstName: string
): Promise<ResumeData[]> => {
  const response = await fetch(
    `${API_BASE_URL}/getResumesByFirstName/${firstName}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch resumes by first name: ${firstName}`);
  }

  return response.json();
};

export const getResumesByLastName = async (
  lastName: string
): Promise<ResumeData[]> => {
  const response = await fetch(
    `${API_BASE_URL}/getResumesByLastName/${lastName}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch resumes by last name: ${lastName}`);
  }

  return response.json();
};
