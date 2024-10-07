import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import {StatusCodes} from 'http-status-codes'
import {NotFoundError} from '../errors/customError.js'

let jobs = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "google", position: "backend" },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.user.userId})
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => { 
  req.body.createdBy = req.user.userId
  const { company, position } = req.body;
 const job = await Job.create({
  company, position
 }); console.log(job);
 
 res.status(StatusCodes.CREATED).json({job})
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id)
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true
  })
  res.status(200).json({ msg: "job modified", job: updatedJob });

};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id)

  res.status(200).json({ msg: "job modified", removedJob });
};
