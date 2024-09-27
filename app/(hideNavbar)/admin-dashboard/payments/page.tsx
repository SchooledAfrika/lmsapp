
import DashboardPagination from '@/components/DashboardPagination'
import PaymentsTable from '@/components/ui/admin-dashboard/teachers/payments/PaymentsTable'
import React from 'react'

const page = () => {
  return (
    <div>
        <PaymentsTable/>
        <DashboardPagination/>
    </div>
  )
}

export default page