import Job from "../models/JobModel.js";
import { StatusCodes } from 'http-status-codes'
import mongoose from "mongoose";
import day from 'dayjs'

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ]
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position'
  }

  const sortKey = sortOptions[sort] || sortOptions.newest

  //setup pagination

  const page = Number(req.query.page) || 1
  const limit = 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);

  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const createJob = async (req, res) => {
  console.log(1110);


  req.body.createdBy = req.user.userId
  const { company, position } = req.body;

  const job = await Job.create({
    company, position, createdBy: req.user.userId

  });

  res.status(StatusCodes.CREATED).json({ job })
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

export const showStats = async (req, res) => {
  //filter for the jobs created by the user and group them by status
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } }
  ])
  //convert the stats to an object with the keys as the status and the values as the count
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  console.log('heyloaa', defaultStats);

  //filter for the jobs created by the user and group them by month and year
  //sort the results by year and month in descending order
  //limit the results to the last 6 months
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' }, month: {
            $month:
              '$createdAt'
          }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 }
  ])
  //convert the monthlyApplications to an array of objects with the keys as the date and the values as the count
  monthlyApplications = monthlyApplications.map(item => {
    const { _id: { year, month }, count } = item
    const date = day().month(month - 1).year(year).format('MM YY')
    return { date, count }
  }).reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

