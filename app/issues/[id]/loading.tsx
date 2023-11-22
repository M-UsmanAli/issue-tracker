import { Skeleton } from '@/app/components'
import { Box, Card, Flex } from '@radix-ui/themes'

const loadingIssueDetailsPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gap='5' my='2'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose' mt='4'>
        <Skeleton count={5} />
      </Card>
    </Box>
  )
}

export default loadingIssueDetailsPage