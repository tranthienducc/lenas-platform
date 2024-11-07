import PipelinesPage from '@/pages/subaccount/pipelines/id/PipelinesPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/subaccount/$id/pipeline/$pipelineId')({
  component: PipelinesPage,
})
