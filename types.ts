export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum TaskType {
  TRAINING = 'TRAINING',
  EVALUATION = 'EVALUATION',
  PROJECT_PREP = 'PROJECT_PREP',
  ADMIN = 'ADMIN'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  type: TaskType;
  progress: number; // 0 to 100
  actionUrl?: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description?: string;
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface UserProfile extends User {
  email: string;
  phone: string;
  location: string;
  timezone: string;
  tenure: string;
  path: string; // e.g. Product Engineering
  guild: string; // e.g. Cloud Architecture
  languages: string[];
  expertise: string[];
  bio: string;
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  officeHistory: { location: string; period: string }[];
}

export interface QuickStat {
  label: string;
  value: string;
  trend?: string; // e.g. "+5%"
  trendUp?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Strategic' | 'HR' | 'Tech' | 'General';
  date: string;
  summary: string;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  type: 'Policy' | 'Guide' | 'Report' | 'Wiki';
  lastUpdated: string;
  content: string; // Used for AI grounding
  tags: string[];
}

export interface FeedbackRequest {
  id: string;
  from: User;
  type: 'Peer Review' | 'Project Review' | 'Year-End';
  status: 'Pending' | 'Completed';
  dueDate: string;
}

// --- Finance & Engagement Types ---

export enum EngagementStatus {
  PIPELINE = 'Pipeline',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  ON_HOLD = 'On Hold'
}

export enum PricingModel {
  FIXED_FEE = 'Fixed Fee',
  TIME_AND_MATERIALS = 'Time & Materials',
  RETAINER = 'Retainer'
}

export interface Consultant {
  id: string;
  name: string;
  role: string;
  rate: number; // Hourly rate
  avatar: string;
  specialty: string;
  availability: 'Available' | 'On Bench' | 'Assigned';
}

export interface StaffingNeed {
  id: string;
  role: string;
  skills: string[];
  filledBy?: string; // Consultant ID
}

export interface Engagement {
  id: string;
  clientName: string;
  projectName: string;
  status: EngagementStatus;
  startDate: string;
  endDate: string;
  pricingModel: PricingModel;
  budget: number;
  description: string;
  team: string[]; // Array of Consultant IDs
  staffingNeeds: StaffingNeed[];
}
