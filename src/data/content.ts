export const profile = {
  name: 'Hussain Raza',
  tagline: 'Computer Science at the University of Virginia · Former AWS SDE Intern',
  about:
    "I'm a third-year CS student at UVA, graduating in May 2028. In summer 2025 I interned on the CloudWatch Agent team at AWS, where I worked on health monitoring for Kubernetes and got three pull requests merged into public AWS repositories. I like building software that people actually use, and a lot of my work lately involves AI coding tools like Claude Code and Kiro.",
  resume: '/Hussain_Raza_Resume_GitHub.pdf',
  email: 'mhraza2806@gmail.com',
  phone: { label: '703-313-1205', href: 'tel:+17033131205' },
  github: 'https://github.com/HussainRaza28',
  linkedin: 'https://www.linkedin.com/in/hussain-raza-16b696281',
}

export const navLinks = [
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills', hideSmall: true },
  { href: '#contact', label: 'Contact' },
]

export const education = {
  school: 'University of Virginia',
  when: 'Expected May 2028',
  degree: 'B.S. in Computer Science, AI Concentration · Minor in Data Science · Charlottesville, VA',
  coursework:
    'Relevant coursework: Data Structures & Algorithms I & II, Computer Systems & Organization I & II, Mobile Application Development, Software Engineering, Cybersecurity, Discrete Mathematics, and Data Science.',
  honors: 'Honors: APIA Scholar, Amazon Future Engineer Scholar, QuestBridge National College Match Finalist',
}

export type Link = { href: string; label: string }

export type Job = {
  company: string
  when: string
  role: string
  points: string[]
  pulls?: Link[]
  storyMap?: { label: string; title: string; src: string; frameTitle: string }
}

export const experience: Job[] = [
  {
    company: 'Amazon Web Services (AWS)',
    when: 'May 2025 – Aug 2025',
    role: 'Software Development Engineer Intern, CloudWatch Agent Team · Arlington, VA',
    points: [
      'Made failures visible for 3 agent and GPU monitoring components by emitting health events and status conditions through the Kubernetes API',
      'Enabled Kubernetes to automatically detect and restart failing pods across 4 CloudWatch Agent Operator components by implementing liveness and readiness probes in Go',
      'Merged 3 pull requests (about 700 lines of Go, including unit tests) into 2 public AWS open-source repositories after code review',
      "Used Kiro, AWS's AI coding IDE, to map an unfamiliar Go codebase and draft changes, then reviewed and tested all AI-generated code before review",
    ],
    pulls: [
      { href: 'https://github.com/aws/amazon-cloudwatch-agent-operator/pull/327', label: 'Liveness & readiness probes' },
      { href: 'https://github.com/aws/amazon-cloudwatch-agent-operator/pull/332', label: 'Status conditions & health events' },
      { href: 'https://github.com/aws/amazon-cloudwatch-agent/pull/1779', label: 'Health check extension' },
    ],
  },
  {
    company: 'MIT Introduction to Technology, Engineering, and Science (MITES)',
    when: 'Jun 2023 – Jan 2024',
    role: 'Student · Virtual',
    points: [
      "Selected as 1 of ~230 students from ~2,700 applicants for MIT's 6-month STEM program",
      'Used ArcGIS Online to analyze relationships between socioeconomic factors and healthcare access',
      'Presented geographic visualizations and findings at a research symposium',
    ],
    storyMap: {
      label: 'MITES research project',
      title: 'Healthcare access & socioeconomic factors',
      src: 'https://storymaps.arcgis.com/stories/aeddc204d4df4affaf2ee361efde081c',
      frameTitle: 'MITES StoryMap: healthcare access and socioeconomic factors',
    },
  },
]

export type Project = {
  name: string
  when: string
  description: string
  tags: string[]
  repo?: string
}

export const projects: Project[] = [
  {
    name: 'Skypane',
    when: 'Fall 2026',
    description:
      'A native macOS weather app with live conditions and window-aware particle animations. Apple Foundation Models create custom scenes from natural-language prompts, with validation that keeps generated effects within the request. Rendering optimizations reduced thunderstorm CPU use from 35% to 18% and idle memory use by 45%; rendering suspends when inactive.',
    tags: ['Swift', 'SwiftUI', 'SpriteKit', 'Apple Foundation Models'],
    repo: 'https://github.com/HussainRaza28/Skypane',
  },
  {
    name: 'CIO Manager',
    when: 'Spring 2026',
    description:
      'A Django web app that helps UVA student organizations message their members and track attendance, built by a 5-person Agile team. I built the messaging system, including direct messages with file attachments and per-team group chats using data models, views, and a JavaScript UI that sends messages without page reloads. As QA lead, I triaged findings from 11 external beta testers across 3 roles into GitHub issues, fixed tester-reported bugs and a Google sign-in bug that overwrote profiles, and resolved a failing CI build.',
    tags: ['Python', 'Django', 'PostgreSQL', 'AWS S3', 'GitHub Actions'],
    repo: 'https://github.com/HussainRaza28/uva-cio-platform',
  },
  {
    name: 'College Tuition Analysis App',
    when: 'Spring 2026',
    description:
      'An R Shiny app that tests whether private colleges cost significantly more than public ones, using U.S. College Scorecard data on about 7,800 schools. I built the hypothesis testing and confidence interval features, including two-sample t-tests with an adjustable significance level.',
    tags: ['R', 'Shiny', 'Statistics'],
    repo: 'https://github.com/HussainRaza28/uva-shiny-app',
  },
  {
    name: 'Missile Booster Optimization Simulator',
    when: 'Spring 2025',
    description:
      'A Python simulator built for a U.S. Navy client that compares 3-stage and pop-out booster designs by delta-V and range. It reached under 2% simulation error across 24 validated test cases, and a Tkinter GUI with matplotlib charts lets users compare designs without writing code.',
    tags: ['Python', 'Tkinter', 'matplotlib'],
  },
]

export const skills: [string, string][] = [
  ['Languages', 'Python, Java, Go, Swift, JavaScript, SQL, C, R'],
  ['Frameworks', 'SwiftUI, SpriteKit, Django, R Shiny'],
  ['Developer tools', 'AWS, CloudWatch, Bedrock, Docker, Kubernetes, Git, GitHub Actions, Linux, Xcode'],
  ['Libraries', 'pandas, NumPy, Matplotlib'],
  ['AI tools', 'Claude Code, Codex, Kiro, Apple Foundation Models'],
]
