import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import IssuesAction from './IssuesActions'

import Pagination from '@/app/components/Pagination'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueQuery
}
const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status }
  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * 10,
    take: pageSize
  }) //this is how we get the issues
  const issueCount = await prisma.issue.count({ where })
  return (
    <Flex direction='column' gap='3'>
      <IssuesAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  )
}

export const metadata: Metadata ={
  title:'Issue Tracker - Issue List',
  description:"View all Project issues"
  
}



export default IssuesPage