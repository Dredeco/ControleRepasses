import { getRegisterByNumber, getRegisters } from '@/api/RegisterService'
import RegisterFormSupervisor from '@/components/RegisterFormSupervisor'
import React, { useEffect } from 'react'


export async function generateStaticParams() {
  const incidents = await getRegisters()
  
  return incidents.map((incident: IRegister) => ({
    incidentNumber: incident.number,
  }))
}

export const dynamicParams = true

const IncidentInfo = ({ params }: any) => {
  
  return (
    <RegisterFormSupervisor incidentNumber={params.incidentNumber} />
  )
}

export default IncidentInfo