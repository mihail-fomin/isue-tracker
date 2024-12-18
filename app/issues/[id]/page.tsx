import prisma from '@/app/utils/connect'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'
import StatusSelect from './StatusSelect'
import CommentsBlock from '@/app/components/Comments/CommentsBlock'

interface Props {
  params: Promise<{ id: string }>
}

const fetchIssue = cache((issueId: string) => prisma.issue.findUnique({ where: { id: issueId } }))

const IssueDetailPage = async (props: Props) => {
  const params = await props.params;
  const session = await getServerSession(authOptions)

  const issue = await fetchIssue(params.id)
  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', md: '5' }} gap="5">
      {session && (
        <Box>
          <Flex gap="4">
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
          </Flex>
          <Flex gap="4" mt="2">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
      <Box className="md:col-span-5">
        <IssueDetails issue={issue} />
      </Box>
      <CommentsBlock issue={issue} />
    </Grid>
  )
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const issue = await fetchIssue(params.id)

  return {
    title: issue?.title,
    description: 'Описание к задаче ' + issue?.id,
  }
}

export default IssueDetailPage
