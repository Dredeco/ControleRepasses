export const dynamicParams = true
export const revalidate = 60

import { getRegisters } from '@/api/RegisterService'
import RegisterFormSupervisor from '@/components/RegisterFormSupervisor'
import React from 'react'


export async function generateStaticParams() {
  const incidents = await getRegisters()
  
  return incidents.map((incident: IRegister) => ({
    incidentNumber: incident.number,
  }))
}


const IncidentInfo = async ({ params }: { params: { incidentNumber: string }}) => {
  
  return (
    <RegisterFormSupervisor incidentNumber={params.incidentNumber} />
  )
}

export default IncidentInfo