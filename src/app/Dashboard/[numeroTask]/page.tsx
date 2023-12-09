export const dynamicParams = true
export const revalidate = 60

import { registers } from '@/api/db'
import RegisterFormSupervisor from '@/components/RegisterFormSupervisor'
import React from 'react'


export async function generateStaticParams() {
  return registers.map((incident: any) => ({
    numeroTask: incident.task,
  }))
}


const IncidentInfo = async ({ params }: { params: { numeroTask: string }}) => {
  
  return (
    <RegisterFormSupervisor numeroTask={params.numeroTask} />
  )
}

export default IncidentInfo