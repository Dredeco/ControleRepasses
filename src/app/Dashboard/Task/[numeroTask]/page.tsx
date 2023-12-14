export const dynamicParams = true
export const revalidate = 60

import { registers } from '@/api/db'
import RegisterFormTask from '@/components/RegisterFormTask'
import React from 'react'


export async function generateStaticParams() {
  return registers.map((incident: any) => ({
    numeroTask: incident.tarefa,
  }))
}


const TaskInfo = async ({ params }: { params: { numeroTask: string }}) => {
  
  return (
    <RegisterFormTask numeroTask={params.numeroTask}/>
  )
}

export default TaskInfo