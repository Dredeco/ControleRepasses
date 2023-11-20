import { getRegisterByNumber, getRegisters } from '@/api/RegisterService'
import RegisterFormSupervisor from '@/components/RegisterFormSupervisor'
import React, { useEffect } from 'react'

export const dynamicParams = true
export const revalidate = 0

export async function generateStaticParams() {
  const incidents = await getRegisters()
  
  return incidents.map((incident: IRegister) => ({
    incidentNumber: incident.number,
  }))
}


const IncidentInfo = ({ params }: any) => {
  
  return (
    <RegisterFormSupervisor incidentNumber={params.incidentNumber} />
  )
}

export default IncidentInfo