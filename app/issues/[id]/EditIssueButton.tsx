import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <Button>
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  )
}

export default EditIssueButton
