import express from "express";
import cors from "cors";
import {
  createResumeQuery,
  updateResumeQuery,
  getResumeByIdQuery,
  getResumeByNameQuery,
  getResumesByFirstNameQuery,
  getResumesByLastNameQuery,
} from "./queries.js";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
};

app.post("/api/uploadResumeDetails", async (req, res, next) => {
  const { first_name, last_name } = req.body;
  try {
    const result = await createResumeQuery({
      first_name,
      last_name,
      job_title: "Job Title",
      job_description: "Job Decription",
      job_company: "Job Company",
    });

    if (!result || !result.id) {
      return res.status(400).json({ error: "Could not update user details" });
    }

    return res.status(200).json({ id: result.id });
  } catch (error) {
    next(error);
  }
});

app.put("/api/updateResumeDetails", async (req, res, next) => {
  const { id, first_name, last_name, job_title, job_description, job_company } =
    req.body;
  if (!first_name || !last_name) {
    return res
      .status(400)
      .json({ error: "First name and last name are required." });
  }
  if (!job_title && !job_description && !job_company) {
    return res
      .status(400)
      .json({ error: "At least one field to update must be provided." });
  }

  try {
    const result = await updateResumeQuery({
      id,
      first_name,
      last_name,
      job_title,
      job_description,
      job_company,
    });

    if (!result) {
      return res.status(400).json({ error: "Could not update resume" });
    }

    return res.status(200).json({
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
      job_title: result.job_title,
      job_description: result.job_description,
      job_company: result.job_company,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/getResumeById/:id", async (req, res, next) => {
  try {
    const resumeId = parseInt(req.params.id, 10);
    if (isNaN(resumeId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await getResumeByIdQuery(resumeId);

    if (!result) {
      return res.status(400).json({ error: "Could not get resume by id" });
    }

    const {
      id,
      first_name,
      last_name,
      job_title,
      job_description,
      job_company,
    } = result;

    return res.status(200).json({
      id,
      first_name,
      last_name,
      job_title,
      job_description,
      job_company,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/getResumeByName/:name", async (req, res, next) => {
  try {
    const nameParam = req.params.name;

    if (!nameParam || !nameParam.includes("+")) {
      return res.status(400).json({
        error: "Name must be in format 'firstname+lastname' (e.g., john+doe)",
      });
    }

    const [first_name, last_name] = nameParam
      .split("+")
      .map(
        (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      );

    const result = await getResumeByNameQuery({ first_name, last_name });

    if (!result) {
      return res.status(404).json({
        error: `No resume found for ${first_name} ${last_name}`,
      });
    }

    return res.status(200).json({
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
      job_title: result.job_title,
      job_description: result.job_description,
      job_company: result.job_company,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/getResumesByFirstName/:first_name", async (req, res, next) => {
  try {
    const { first_name } = req.params;

    if (!first_name) {
      return res.status(400).json({ error: "First name is required." });
    }

    const result = await getResumesByFirstNameQuery({ first_name });

    if (!result || result.length === 0) {
      return res.status(404).json({
        error: `No resumes found for first name: ${first_name}`,
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

app.get("/api/getResumesByLastName/:last_name", async (req, res, next) => {
  try {
    const { last_name } = req.params;

    if (!last_name) {
      return res.status(400).json({ error: "Last name is required." });
    }

    const result = await getResumesByLastNameQuery({ last_name });

    if (!result || result.length === 0) {
      return res.status(404).json({
        error: `No resumes found for last name: ${last_name}`,
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
