import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap:
    Record<Status, { label: String, color: 'red' | 'violet' | 'green' }> =
{
    OPEN: { label: 'open', color: 'red' },                   //with this annotation   
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },  //we can set this contant to an object with properties
    CLOSED: { label: 'closed', color: 'green' }
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge