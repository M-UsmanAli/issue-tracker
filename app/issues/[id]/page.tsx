import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'

interface Props {
    params: { id: string }
}
const IssuePagedetail = async ({ params }: Props) => {
    const session = await getServerSession(authOptions) //as this function gets current user sesson so we have to pass the object for intializing the next auth
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue)
        notFound();
    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && <Box>
                <Flex direction='column' gap='4'>
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}
        </Grid>
    )
}

export async function generateMetadata({ params }: Props) {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    return {
        title: issue?.title,
        description: "Details of Issue" + issue?.id
    }
}

export default IssuePagedetail