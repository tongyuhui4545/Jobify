import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";

let jobs = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "google", position: "backend" },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => { console.log(1111);

  const { company, position } = req.body;
 const job = await Job.create({
  company, position
 }); console.log(job);
 
 res.status(201).json({job})
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id)
  if (!job) {
    throw new Error("no job with this id");
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true
  })
  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ msg: "job modified", job: updatedJob });

};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id)
  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ msg: "job modified", removedJob });
};
