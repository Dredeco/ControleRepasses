import { getRegisterByNumber, getRegisters } from '@/api/RegisterService'
import RegisterFormSupervisor from '@/components/RegisterFormSupervisor'
import { revalidatePath } from 'next/cache'
import React, { useEffect } from 'react'


export async function generateStaticParams() {
  const incidents = await getRegisters()
  
  return incidents.map((incident: IRegister) => ({
    incidentNumber: incident.number,
  }))
}

export const dynamicParams = true
export const revalidate = 60

const IncidentInfo = async ({ params }: { params: { incidentNumber: string }}) => {
  
  return (
    <RegisterFormSupervisor incidentNumber={() => params.incidentNumber} />
  )
}

export default IncidentInfo