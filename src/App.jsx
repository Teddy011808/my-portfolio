import ContactLink from '@/components/ContactLink'
import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import StatusBadge from '@/components/StatusBadge'

const projects = [
  {
    title: 'Developer Portfolio',
    description: 'This site: a responsive profile page built with React, Tailwind CSS, and shadcn/ui.',
    status: 'In progress',
    tech: ['React', 'Tailwind CSS', 'shadcn/ui'],
    href: 'https://github.com/Teddy011808/my-portfolio',
  },
  {
    title: 'StatusBadge Component',
    description: 'A reusable badge that switches between "Open to work" and "Busy learning" from a single prop.',
    status: 'Completed',
    tech: ['React', 'JSX', 'Props'],
    href: 'https://github.com/Teddy011808/my-portfolio/blob/main/src/components/StatusBadge.jsx',
  },
]

const skills = ['React', 'JSX', 'Tailwind CSS', 'shadcn/ui', 'Git & GitHub']

const links = [
  { label: 'GitHub', value: '@Teddy011808', href: 'https://github.com/Teddy011808' },
  { label: 'Source code', value: 'my-portfolio', href: 'https://github.com/Teddy011808/my-portfolio' },
]

function App() {
  const name = 'Panhasotharith Sok'
  const goal = 'Build real React apps and become a job-ready frontend developer.'
  const isOpenToWork = true

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        <header className="flex flex-col gap-6 rounded-xl bg-white p-6 ring-1 ring-gray-200 md:flex-row md:items-center md:p-8">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xl font-semibold text-white">
            PS
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-emerald-700">Frontend developer in training</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{name}</h1>
            <p className="mt-2 text-lg text-gray-700">{goal}</p>
          </div>
          <div>
            <StatusBadge isOpenToWork={isOpenToWork} />
          </div>
        </header>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <main className="flex flex-col gap-6 md:col-span-2">
            <Section title="About me">
              <p className="text-gray-700">
                I'm working through a hands-on React course and building this portfolio one lesson at a time.
                Version 1 was a hand-built profile page; version 2 adds Tailwind CSS, a responsive layout, and
                components from shadcn/ui.
              </p>
            </Section>

            <Section title="Projects">
              <div className="grid gap-4 lg:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.title} {...project} />
                ))}
              </div>
            </Section>
          </main>

          <aside className="flex flex-col gap-6">
            <Section title="Learning now">
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                    {skill}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Find me online">
              <div className="-mx-3 flex flex-col gap-1">
                {links.map((link) => (
                  <ContactLink key={link.label} {...link} />
                ))}
              </div>
            </Section>
          </aside>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {name} · Built with React, Tailwind CSS, and shadcn/ui
        </footer>
      </div>
    </div>
  )
}

export default App
