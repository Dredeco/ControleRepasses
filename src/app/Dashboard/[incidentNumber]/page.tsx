export const dynamicParams = true
export const revalidate = 60

import { getRegisters } from '@/api/RegisterService'
import { registers } from '@/api/db'
import RegisterFormSupervisor from '@/components/RegisterFormSupervisor'
import React from 'react'


export async function generateStaticParams() {
  return registers.map((incident: any) => ({
    incidentNumber: incident.numero,
  }))
}


const IncidentInfo = async ({ params }: { params: { incidentNumber: string }}) => {
  
  return (
    <RegisterFormSupervisor incidentNumber={params.incidentNumber} />
  )
}

export default IncidentInfo