import React, { useRef } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const DownloadSheet = (currentTableRef: any, filename: string, sheet: string) => {
    const tableRef = useRef(null)

    const { onDownload } = useDownloadExcel({
        currentTableRef: currentTableRef,
        filename: filename,
        sheet: sheet
    })
    return onDownload
}
