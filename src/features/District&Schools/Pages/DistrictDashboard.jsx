import React from 'react'
import DistrictDetails from '../Components/DistrictDetails'
import SchoolsList from '../Components/SchoolsList'

const DistrictDashboard = () => { 
  //Page component for district details & schools list for all roles
  return (
    <div>
    <DistrictDetails />
    <SchoolsList />

    </div>
  )
}

export default DistrictDashboard

