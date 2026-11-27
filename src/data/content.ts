/* Everything the site says lives here. Lists render in order, so adding
   a job, project, honor or group is one new entry in its array. */

export type Link = { href: string; label: string }

export const profile = {
  name: 'Hussain Raza',
  tagline: 'Computer Science at the University of Virginia · Former AWS SDE Intern',
  about:
    "I'm a third-year CS student at UVA, graduating in May 2028. In summer 2025 I interned on the CloudWatch Agent team at AWS, where I worked on health monitoring for Kubernetes and got three pull requests merged into public AWS repositories. I like building software that people actually use, and a lot of my work lately involves AI coding tools like Claude Code and Kiro.",
  resume: '/Hussain_Raza_Resume_GitHub.pdf',
  email: 'mhraza2806@gmail.com',
  phone: { label: '703-313-1205', href: 'tel:+17033131205' },
  github: 'https://github.com/HussainRaza28',
  linkedin: 'https://www.linkedin.com/in/hussainraza28',
  site: 'https://hussainraza.dev',
}

export const navLinks = [
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#honors', label: 'Honors' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export const education = {
  school: 'University of Virginia',
  location: 'Charlottesville, VA',
  when: 'Expected May 2028',
  degree: 'B.S. in Computer Science, AI Concentration · Minor in Data Science',
  gpa: '3.25',
  coursework: [
    'Data Structures & Algorithms I & II',
    'Computer Systems & Organization I & II',
    'Mobile Application Development',
    'Software Engineering',
    'Cybersecurity',
    'Discrete Mathematics',
    'Data Science',
  ],
}

export type Job = {
  company: string
  role: string
  location: string
  when: string
  points: string[]
  pulls?: Link[]
}

export const experience: Job[] = [
  {
    company: 'Amazon Web Services (AWS)',
    role: 'Software Development Engineer Intern, CloudWatch Agent Team',
    location: 'Arlington, VA',
    when: 'May 2025 – August 2025',
    points: [
      'Surfaced silent failures the EKS console showed as successful installs, cutting time to detect a broken agent or GPU monitor from never to under a minute with Kubernetes health events in Go',
      'Turned recovery of a hung component from manual to automatic in about 50 seconds by adding liveness and readiness probes to every monitoring component in the Amazon CloudWatch Observability EKS add-on',
      'Extended health monitoring to the NVIDIA GPU and AWS Trainium monitors and added a health check endpoint to the CloudWatch agent, a long-requested feature',
      'Reproduced the failures on EKS clusters, wrote the design doc, briefed the EKS Add-On team, and reworked the design after review caught a risk to another CloudWatch feature',
    ],
    pulls: [
      { href: 'https://github.com/aws/amazon-cloudwatch-agent-operator/pull/327', label: 'Liveness & readiness probes' },
      { href: 'https://github.com/aws/amazon-cloudwatch-agent-operator/pull/332', label: 'Status conditions & health events' },
      { href: 'https://github.com/aws/amazon-cloudwatch-agent/pull/1779', label: 'Health check extension' },
    ],
  },
]

export type Project = {
  name: string
  when: string
  role: string
  /** Team or context, e.g. "Personal project". */
  context: string
  stack: string[]
  points: string[]
  repo?: string
}

export const projects: Project[] = [
  {
    name: 'Tailor',
    when: 'Fall 2026',
    role: 'Creator',
    context: 'Personal project',
    stack: ['Python', 'React', 'TypeScript', 'Chrome Extension'],
    points: [
      'Built a desktop app for Mac and Windows that scores a LaTeX resume against a job posting, rewrites only the bullets that need it using 5 swappable AI providers, and exports a one-page PDF',
      "Wrote a Python check that blocks any AI rewrite containing a number, name, or skill not found in the original resume, so models like Claude and Gemini can't invent experience",
      'Built a Chrome extension that autofills job applications on major hiring sites, cutting a typical application from 10–15 minutes to 3–4 minutes',
    ],
    // TODO: repo or download link for Tailor, if it should be public
  },
  {
    name: 'Skypane',
    when: 'Fall 2026',
    role: 'Creator',
    context: 'Personal project',
    stack: ['Swift', 'SwiftUI', 'SpriteKit', 'Apple Foundation Models'],
    points: [
      'A native macOS weather app with live conditions and window-aware particle animations',
      'Apple Foundation Models create custom scenes from natural-language prompts, with validation that keeps generated effects within the request',
      'Rendering optimizations reduced thunderstorm CPU use from 35% to 18% and idle memory use by 45%; rendering suspends when inactive',
    ],
    repo: 'https://github.com/HussainRaza28/Skypane',
  },
  {
    name: 'UVA CIO Management Platform',
    when: 'Spring 2026',
    role: 'Software Engineer and QA Lead',
    context: '5-person team project',
    stack: ['Python', 'Django', 'JavaScript', 'PostgreSQL', 'AWS S3'],
    points: [
      'Built direct messaging with file attachments and per-team group chat for a Django platform for UVA student organizations, with a JavaScript UI that sends messages without page reloads',
      'Led beta testing with 11 external testers across 3 user roles, triaging feedback into GitHub issues and fixing a Google sign-in bug that overwrote profiles, 2 tester-reported bugs, and a failing CI build',
    ],
    repo: 'https://github.com/HussainRaza28/uva-cio-platform',
  },
  {
    name: 'College Tuition Analysis App',
    when: 'Spring 2026',
    role: 'Developer',
    context: 'Team project',
    stack: ['R', 'Shiny', 'Statistics'],
    points: [
      'An R Shiny app that tests whether private colleges cost significantly more than public ones, using U.S. College Scorecard data on about 7,800 schools',
      'Built the hypothesis testing and confidence interval features, including two-sample t-tests with an adjustable significance level',
    ],
    repo: 'https://github.com/HussainRaza28/uva-shiny-app',
  },
  {
    name: 'Missile Booster Optimization Simulator',
    when: 'Spring 2025',
    role: 'Software Developer',
    context: '5-person team, U.S. Navy client',
    stack: ['Python', 'Tkinter', 'Matplotlib'],
    points: [
      'Built a Python simulator for a U.S. Navy client to test whether a shorter missile booster, designed to reduce wear on ship launch systems, would cost speed or range',
      "Added a Tkinter GUI with charts, CSV export, and a sweep optimizer that finds the best booster size, with results within 2% of the client's benchmarks and 24 passing input tests",
    ],
  },
]

export type StoryMap = { label: string; title: string; src: string; frameTitle: string }

export type Honor = {
  name: string
  /** One line under the name: what it is or how selective it was. */
  detail: string
  /** Optional embedded work that goes with the honor. */
  storyMap?: StoryMap
}

export const honors: Honor[] = [
  {
    name: 'MIT MITES Semester Scholar',
    detail: "1 of ~230 selected from ~2,700 applicants for MIT's 6-month STEM program",
    storyMap: {
      label: 'MITES research project',
      title: 'Healthcare access & socioeconomic factors',
      src: 'https://storymaps.arcgis.com/stories/aeddc204d4df4affaf2ee361efde081c',
      frameTitle: 'MITES StoryMap: healthcare access and socioeconomic factors',
    },
  },
  { name: 'Amazon Future Engineer Scholar', detail: '1 of 400 students nationwide awarded a scholarship of up to $40,000' },
  { name: 'APIA Scholar', detail: '1 of 634 selected from 12,302 applicants for a national scholarship' },
  { name: 'QuestBridge National College Match Finalist', detail: 'Selected from 20,800+ applicants for a national scholarship' },
  { name: 'Tri-Alpha', detail: 'First-generation honor society, inducted 2026' },
]

export type Involvement = {
  org: string
  role: string
  /** One line under the name describing the group. */
  detail: string
  href?: string
}

export const involvement: Involvement[] = [
  // TODO: confirm this description and add a chapter link if wanted
  { org: 'Google Developer Group', role: 'Member', detail: 'Student developer community for building with Google technologies' },
  // TODO: confirm this description and add a link if wanted
  { org: 'Claude Builders Club', role: 'Member', detail: 'Student club for building projects with Claude' },
]

export const skills: [string, string[]][] = [
  ['Languages', ['Python', 'Java', 'Go', 'TypeScript', 'JavaScript', 'Swift', 'SQL', 'C', 'R']],
  ['Frameworks & Libraries', ['React', 'Node.js', 'Django', 'SwiftUI', 'SpriteKit', 'R Shiny', 'pandas', 'NumPy', 'Matplotlib']],
  ['Tools & AI', ['AWS (CloudWatch, Bedrock)', 'Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'Linux', 'Xcode', 'Apple Foundation Models', 'Claude Code', 'Codex', 'Kiro']],
]

export const contact = {
  lead: 'Feel free to reach out.',
}
