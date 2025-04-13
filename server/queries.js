import pool from "./db.js";

async function createResumeQuery({
  first_name,
  last_name,
  job_title,
  job_description,
  job_company,
}) {
  const res = await pool.query(
    "INSERT INTO resumes (first_name, last_name, job_title, job_description, job_company) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [first_name, last_name, job_title, job_description, job_company]
  );
  return res.rows[0];
}

async function updateResumeQuery({
  id,
  first_name,
  last_name,
  job_title,
  job_description,
  job_company,
}) {
  if (!id) {
    throw new Error("Resume ID is required to update a resume.");
  }

  const fieldsToUpdate = [];
  const values = [];

  if (first_name) {
    fieldsToUpdate.push(`first_name = $${fieldsToUpdate.length + 1}`);
    values.push(first_name);
  }
  if (last_name) {
    fieldsToUpdate.push(`last_name = $${fieldsToUpdate.length + 1}`);
    values.push(last_name);
  }
  if (job_title) {
    fieldsToUpdate.push(`job_title = $${fieldsToUpdate.length + 1}`);
    values.push(job_title);
  }
  if (job_description) {
    fieldsToUpdate.push(`job_description = $${fieldsToUpdate.length + 1}`);
    values.push(job_description);
  }
  if (job_company) {
    fieldsToUpdate.push(`job_company = $${fieldsToUpdate.length + 1}`);
    values.push(job_company);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("At least one field to update must be provided.");
  }

  values.push(id);

  const query = `
    UPDATE resumes
    SET ${fieldsToUpdate.join(", ")}
    WHERE id = $${values.length}
    RETURNING id, first_name, last_name, job_title, job_description, job_company
  `;

  const res = await pool.query(query, values);

  if (!res.rows[0]) {
    throw new Error("Resume not found or could not be updated.");
  }

  return res.rows[0];
}

async function getResumeByIdQuery(id) {
  const res = await pool.query(
    "SELECT id, first_name, last_name, job_title, job_description, job_company FROM resumes WHERE id = $1",
    [id]
  );
  if (!res.rows[0]) return null;

  console.log(res.rows[0]);

  return {
    id: res.rows[0].id,
    first_name: res.rows[0].first_name,
    last_name: res.rows[0].last_name,
    job_title: res.rows[0].job_title,
    job_description: res.rows[0].job_description,
    job_company: res.rows[0].job_company,
  };
}

async function getResumeByNameQuery({ first_name, last_name }) {
  const res = await pool.query(
    "SELECT id, first_name, last_name, job_title, job_description, job_company FROM resumes WHERE first_name = $1 AND last_name = $2",
    [first_name, last_name]
  );

  if (!res.rows[0]) return null;

  return {
    id: res.rows[0].id,
    first_name: res.rows[0].first_name,
    last_name: res.rows[0].last_name,
    job_title: res.rows[0].job_title,
    job_description: res.rows[0].job_description,
    job_company: res.rows[0].job_company,
  };
}

async function getResumesByFirstNameQuery({ first_name }) {
  const res = await pool.query(
    "SELECT id, first_name, last_name, job_title, job_description, job_company FROM resumes WHERE first_name = $1",
    [first_name]
  );

  if (!res.rows[0]) return null;

  return res.rows.map((row) => ({
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    job_title: row.job_title,
    job_description: row.job_description,
    job_company: row.job_company,
  }));
}

async function getResumesByLastNameQuery({ last_name }) {
  const res = await pool.query(
    "SELECT id, first_name, last_name, job_title, job_description, job_company FROM resumes WHERE last_name = $1",
    [last_name]
  );

  if (!res.rows[0]) return null;

  return res.rows.map((row) => ({
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    job_title: row.job_title,
    job_description: row.job_description,
    job_company: row.job_company,
  }));
}

export {
  createResumeQuery,
  updateResumeQuery,
  getResumeByIdQuery,
  getResumeByNameQuery,
  getResumesByFirstNameQuery,
  getResumesByLastNameQuery,
};
