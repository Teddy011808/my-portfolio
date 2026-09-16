import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function ProjectCard({ title, description, status, tech, href }) {
  const isCompleted = status === 'Completed'

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-gray-900">{title}</CardTitle>
        <CardAction>
          <Badge
            variant="secondary"
            className={isCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'}
          >
            {status}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700">{description}</CardDescription>
        <p className="mt-4 text-gray-500">{tech.join(' · ')}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild>
          <a href={href} target="_blank" rel="noreferrer">
            View project
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
