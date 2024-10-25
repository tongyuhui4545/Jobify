import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import { useLoaderData, redirect } from 'react-router-dom'
import customFetch from '../utils/customFetch.js';
import Wrapper from '../assets/wrappers/StatsContainer'
import StatItem from '../components/StatItem'
import { toast } from 'react-toastify'

export const loader = async () => { console.log(14344);

  try {
    const response = await customFetch.get('/users/admin/app-stats')
    return response.data
  } catch (error) {
    toast.error('You are not authorized to access this page')
    return redirect('/dashboard')
  }
}

const Admin = () => {
  const { users, jobs } = useLoaderData()
  return (
    <Wrapper>
      <StatItem title='current users' count={users} color="#e9b949" bcg='#fcefc7' icon={<FaSuitcaseRolling />}></StatItem>
      <StatItem title='total jobs' count={jobs} color="#647acb" bcg='#e0e8f9' icon={<FaCalendarCheck />}></StatItem>
    </Wrapper>
  )
}

export default Admin