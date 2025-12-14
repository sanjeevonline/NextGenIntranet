import { Priority, Task, TaskType, User, UserProfile, QuickStat, Announcement, KnowledgeDoc, FeedbackRequest, Consultant, Engagement, EngagementStatus, PricingModel, StaffingNeed } from './types';

export const CURRENT_USER: User = {
  id: 'u-123',
  name: 'Alex Chen',
  role: 'Senior Consultant',
  department: 'Digital Transformation',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

export const USER_PROFILE: UserProfile = {
  ...CURRENT_USER,
  email: 'alex.chen@nexus.com',
  phone: '+1 (555) 012-3456',
  location: 'New York - 3WTC',
  timezone: 'EST (UTC-5)',
  tenure: '5 Years, 3 Months',
  path: 'Product Engineering',
  guild: 'Software, Cloud, Cyber and Architecture',
  languages: ['English (Native)', 'Mandarin (Fluent)', 'Spanish (Conversational)'],
  expertise: ['Digital Strategy', 'Cloud Architecture', 'React/Node.js', 'Enterprise AI', 'Agile Leadership'],
  bio: 'Senior digital consultant with a focus on modernizing legacy enterprise systems. Proven track record in leading cross-functional teams for Fortune 500 clients in FinTech and Healthcare sectors.',
  workExperience: [
    {
      id: 'w-1',
      company: 'Nexus Corp',
      role: 'Senior Consultant',
      startDate: 'Jan 2022',
      endDate: 'Present',
      location: 'New York, NY',
      description: 'Leading digital transformation initiatives for key accounts. Spearheaded the internal "Nexus AI" adoption program.'
    },
    {
      id: 'w-2',
      company: 'Nexus Corp',
      role: 'Associate Consultant',
      startDate: 'Aug 2018',
      endDate: 'Dec 2021',
      location: 'Boston, MA',
      description: 'Worked on cloud migration projects and developed custom analytics dashboards for retail clients.'
    },
    {
      id: 'w-3',
      company: 'TechFlow Solutions',
      role: 'Software Engineer',
      startDate: 'Jun 2016',
      endDate: 'Jul 2018',
      location: 'San Francisco, CA',
      description: 'Full-stack development for a high-growth SaaS startup. Focused on scalability and API design.'
    }
  ],
  education: [
    {
      id: 'e-1',
      institution: 'Massachusetts Institute of Technology',
      degree: 'Master of Science',
      field: 'Computer Science',
      year: '2016'
    },
    {
      id: 'e-2',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Electrical Engineering & CS',
      year: '2014'
    }
  ],
  certifications: [
    { id: 'c-1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023' },
    { id: 'c-2', name: 'Certified Scrum Master', issuer: 'Scrum Alliance', date: '2022' },
    { id: 'c-3', name: 'Google Professional Cloud Architect', issuer: 'Google Cloud', date: '2021' }
  ],
  officeHistory: [
    { location: 'New York - 3WTC', period: 'Jan 2022 - Present' },
    { location: 'Boston - Seaport', period: 'Aug 2018 - Dec 2021' }
  ]
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Mandatory Security Review',
    description: 'Annual cybersecurity awareness training. Required for system access renewal.',
    dueDate: '2023-11-17', // End of week
    priority: Priority.HIGH,
    type: TaskType.TRAINING,
    progress: 15
  },
  {
    id: 't-2',
    title: 'Year-End Peer Evaluations',
    description: 'Provide 360 feedback for Sarah Jones and Mike Ross.',
    dueDate: '2023-11-20',
    priority: Priority.HIGH,
    type: TaskType.EVALUATION,
    progress: 0
  },
  {
    id: 't-3',
    title: 'Project Alpha Prep',
    description: 'Review client background and technical requirements for the upcoming assignment.',
    dueDate: '2023-11-25',
    priority: Priority.MEDIUM,
    type: TaskType.PROJECT_PREP,
    progress: 45
  },
  {
    id: 't-4',
    title: 'Expense Report: Q3 Travel',
    description: 'Submit receipts for the NYC onsite visit.',
    dueDate: '2023-11-18',
    priority: Priority.LOW,
    type: TaskType.ADMIN,
    progress: 0
  }
];

export const QUICK_STATS: QuickStat[] = [
  { label: 'Utilization', value: '87%', trend: '+2%', trendUp: true },
  { label: 'PTO Balance', value: '12 Days', trend: '-3', trendUp: false },
  { label: 'Learning Hours', value: '34/40', trend: 'On Track', trendUp: true },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a-1',
    title: 'New Global Mobility Policy',
    category: 'HR',
    date: 'Today',
    summary: 'Updated guidelines for international transfers and remote work flexibility starting Q1 2024.'
  },
  {
    id: 'a-2',
    title: 'Q3 Financial Results Townhall',
    category: 'Strategic',
    date: 'Yesterday',
    summary: 'Join leadership for a review of Q3 performance. Revenue up 15% YoY.'
  },
  {
    id: 'a-3',
    title: 'GenAI Tool Rollout',
    category: 'Tech',
    date: '2 days ago',
    summary: 'Nexus Assistant is now available for all consultants to aid in research.'
  }
];

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  {
    id: 'k-1',
    title: 'Remote Work Policy 2024',
    type: 'Policy',
    lastUpdated: '2023-10-15',
    tags: ['HR', 'Remote', 'Benefits'],
    content: 'Employees are permitted to work remotely up to 3 days a week. Core hours are 10am-3pm EST. International remote work requires VP approval.'
  },
  {
    id: 'k-2',
    title: 'Expense Reimbursement Guidelines',
    type: 'Guide',
    lastUpdated: '2023-09-01',
    tags: ['Finance', 'Travel'],
    content: 'Meals are reimbursed up to $75/day. Flights must be booked via NexusTravel. Receipts required for expenses over $50.'
  },
  {
    id: 'k-5',
    title: 'The State of AI in 2024: Generative AI’s Breakout Year',
    type: 'Report',
    lastUpdated: '2024-01-10',
    tags: ['Strategy', 'AI', 'Technology'],
    content: 'Generative AI is poised to add $2.6 trillion to $4.4 trillion annually to the global economy. Key value drivers include customer operations, marketing and sales, software engineering, and R&D. 75% of value falls across these four use cases. Leaders must move from experimentation to scaling value.'
  },
  {
    id: 'k-6',
    title: 'CEO Excellence: The Six Mindsets',
    type: 'Guide',
    lastUpdated: '2023-11-05',
    tags: ['Leadership', 'Strategy', 'Management'],
    content: 'Based on interviews with 67 top-performing CEOs. The six mindsets are: 1. Be bold (Strategy), 2. Treat the soft stuff as the hard stuff (Organization), 3. Solve for the team psychology (Team & Processes), 4. Help directors help the business (Board Engagement), 5. Start with "Why?" (External Stakeholders), 6. Do what only you can do (Personal Effectiveness).'
  },
  {
    id: 'k-7',
    title: 'The Net-Zero Transition: Costs and Opportunities',
    type: 'Report',
    lastUpdated: '2023-12-01',
    tags: ['Sustainability', 'Energy', 'Global Economy'],
    content: 'Achieving net-zero emissions by 2050 would require $9.2 trillion in annual average spending on physical assets, $3.5 trillion more than today. This transition offers significant growth opportunities for first movers in low-emissions products and support services, despite the risks of stranded assets and economic dislocation.'
  },
  {
    id: 'k-8',
    title: 'The Future of Wellness: Connected and Data-Driven',
    type: 'Report',
    lastUpdated: '2024-02-15',
    tags: ['Healthcare', 'Consumer', 'Trends'],
    content: 'The wellness market is growing at 5-10% annually. Consumers are shifting from "clean" to "clinical" (efficacy-backed products). 5 trends: 1. Health at home, 2. Biomarkers & personalization, 3. Wearables integration, 4. GenAI in health coaching, 5. Rise of corporate wellness ROI metrics.'
  },
  {
    id: 'k-9',
    title: 'Reimagining E-commerce in the Age of Social Commerce',
    type: 'Report',
    lastUpdated: '2024-01-20',
    tags: ['Digital', 'Retail', 'Marketing'],
    content: 'Social commerce is expected to grow 3x faster than traditional e-commerce. Brands must leverage creator economies, live shopping (growing 76% CAGR), and seamless in-app checkout. The distinction between "media" and "store" is vanishing.'
  }
];

export const FEEDBACK_REQUESTS: FeedbackRequest[] = [
  {
    id: 'f-1',
    from: { id: 'u-2', name: 'Sarah Jones', role: 'Associate', department: 'Strategy', avatar: 'https://i.pravatar.cc/150?u=2' },
    type: 'Peer Review',
    status: 'Pending',
    dueDate: '2023-11-20'
  },
  {
    id: 'f-2',
    from: { id: 'u-3', name: 'Mike Ross', role: 'Partner', department: 'Legal', avatar: 'https://i.pravatar.cc/150?u=3' },
    type: 'Project Review',
    status: 'Pending',
    dueDate: '2023-11-22'
  }
];

// --- Procedural Generation Helpers ---

const ROLES = ['Associate', 'Senior Consultant', 'Manager', 'Associate Partner', 'Partner', 'Principal', 'Analyst'];
const SPECIALTIES = ['Digital Strategy', 'Data Analytics', 'Supply Chain', 'Change Management', 'M&A', 'Cloud Architecture', 'Sustainability', 'Marketing', 'Legal'];
const FIRST_NAMES = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
const CLIENTS = ['Acme Corp', 'Globex Inc', 'Soylent Corp', 'Initech', 'Umbrella Corp', 'Stark Ind', 'Wayne Ent', 'Cyberdyne', 'Massive Dynamic', 'Hooli'];
const PROJECTS = ['Transformation', 'Optimization', 'Growth Strategy', 'Due Diligence', 'Implementation', 'Migration', 'Audit', 'Launch'];

// Generate 100 Consultants
export const AVAILABLE_CONSULTANTS: Consultant[] = Array.from({ length: 100 }, (_, i) => {
  const role = ROLES[Math.floor(Math.random() * ROLES.length)];
  const specialty = SPECIALTIES[Math.floor(Math.random() * SPECIALTIES.length)];
  return {
    id: `c-gen-${i}`,
    name: `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`,
    role,
    rate: role === 'Partner' || role === 'Principal' ? 800 + Math.floor(Math.random() * 400) : role === 'Manager' ? 400 + Math.floor(Math.random() * 200) : 200 + Math.floor(Math.random() * 150),
    avatar: `https://i.pravatar.cc/150?u=${i + 10}`,
    specialty,
    availability: Math.random() > 0.3 ? 'Available' : Math.random() > 0.5 ? 'On Bench' : 'Assigned'
  };
});

// Generate 50 Engagements
export const INITIAL_ENGAGEMENTS: Engagement[] = Array.from({ length: 50 }, (_, i) => {
  const client = CLIENTS[Math.floor(Math.random() * CLIENTS.length)];
  const projectType = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
  const status = Math.random() > 0.7 ? EngagementStatus.PIPELINE : Math.random() > 0.3 ? EngagementStatus.ACTIVE : EngagementStatus.COMPLETED;
  
  // Generate Staffing Needs
  const needsCount = Math.floor(Math.random() * 4) + 1; // 1 to 5 needs per project
  const staffingNeeds: StaffingNeed[] = [];
  const team: string[] = [];

  for (let j = 0; j < needsCount; j++) {
    const needRole = ROLES[Math.floor(Math.random() * ROLES.length)];
    const isFilled = Math.random() > 0.6; // 40% chance of being open
    let fillerId: string | undefined = undefined;
    
    if (isFilled && status === EngagementStatus.ACTIVE) {
       const filler = AVAILABLE_CONSULTANTS[Math.floor(Math.random() * AVAILABLE_CONSULTANTS.length)];
       fillerId = filler.id;
       team.push(filler.id);
    }

    staffingNeeds.push({
      id: `need-${i}-${j}`,
      role: needRole,
      skills: [SPECIALTIES[Math.floor(Math.random() * SPECIALTIES.length)]],
      filledBy: fillerId
    });
  }

  return {
    id: `e-gen-${i}`,
    clientName: client,
    projectName: `${projectType} Phase ${Math.floor(Math.random() * 3) + 1}`,
    status: status,
    startDate: '2024-01-15',
    endDate: '2024-06-15',
    pricingModel: Math.random() > 0.5 ? PricingModel.FIXED_FEE : PricingModel.TIME_AND_MATERIALS,
    budget: Math.floor(Math.random() * 1000000) + 50000,
    description: `Strategic ${projectType.toLowerCase()} initiative for ${client}.`,
    team: team,
    staffingNeeds: staffingNeeds
  };
});


export const COMPANY_CONTEXT = `
You are NOVA, the intelligent assistant for Nexus Corp.
Nexus Corp is a top-tier global consulting firm.

Key Documents & Policies available in the Knowledge Base:
${KNOWLEDGE_DOCS.map(doc => `- ${doc.title}: ${doc.content}`).join('\n')}

Key Information for Employees:
1. **Security Training**: Mandatory for all staff by Nov 17th. Failure to complete results in account lockout.
2. **Evaluations**: The 360 feedback cycle is open. Focus on "Impact" and "Collaboration".
3. **Finance**: Expense reports are due by the 25th of each month. Receipts >$50 required.
4. **Benefits**: Open enrollment starts Dec 1st. New vision plan added this year.
5. **IT Support**: Located on Level 4. Remote support via ticket system.
6. **Remote Work**: Hybrid policy. 2 days in office recommended, but flexible for Consultants.

Current User: ${CURRENT_USER.name}, ${CURRENT_USER.role}.
`;

// Helper to get or generate a full profile for any user ID
export const getProfileById = (id: string, consultants: Consultant[]): UserProfile => {
  if (id === USER_PROFILE.id) {
    return USER_PROFILE;
  }

  const consultant = consultants.find(c => c.id === id);
  
  if (!consultant) {
    // Fallback for unknown ID, shouldn't happen often in this mock
    return {
      ...USER_PROFILE,
      id: 'unknown',
      name: 'Unknown User',
      role: 'Staff',
      avatar: 'https://i.pravatar.cc/150?u=999'
    };
  }

  // Generate procedural data for the consultant
  return {
    id: consultant.id,
    name: consultant.name,
    role: consultant.role,
    department: 'Consulting Services',
    avatar: consultant.avatar,
    email: `${consultant.name.toLowerCase().replace(' ', '.')}@nexus.com`,
    phone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
    location: Math.random() > 0.5 ? 'New York - 3WTC' : 'Chicago - Loop',
    timezone: 'EST (UTC-5)',
    tenure: `${Math.floor(Math.random() * 10) + 1} Years`,
    path: 'Strategy & Operations',
    guild: consultant.specialty,
    languages: ['English (Native)', Math.random() > 0.5 ? 'French (Basic)' : 'German (Fluent)'],
    expertise: [consultant.specialty, 'Project Management', 'Client Relations'],
    bio: `${consultant.name} is a dedicated ${consultant.role} specializing in ${consultant.specialty}. They have been with Nexus for several years and have delivered high-impact results across multiple industries.`,
    workExperience: [
      {
        id: `w-${consultant.id}-1`,
        company: 'Nexus Corp',
        role: consultant.role,
        startDate: '2021',
        endDate: 'Present',
        location: 'New York',
        description: `Driving ${consultant.specialty} initiatives.`
      },
      {
        id: `w-${consultant.id}-2`,
        company: 'Previous Firm Inc',
        role: 'Consultant',
        startDate: '2018',
        endDate: '2021',
        location: 'Chicago',
        description: 'Managed mid-market client transformations.'
      }
    ],
    education: [
      {
        id: `e-${consultant.id}-1`,
        institution: 'State University',
        degree: 'MBA',
        field: 'Business Administration',
        year: '2018'
      }
    ],
    certifications: [
      { id: `c-${consultant.id}-1`, name: 'PMP Certification', issuer: 'PMI', date: '2020' }
    ],
    officeHistory: [
      { location: 'New York', period: '2021 - Present' }
    ]
  };
};
