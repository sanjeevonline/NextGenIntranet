import Dexie, { Table } from 'dexie';
import { 
  Task, 
  Announcement, 
  KnowledgeDoc, 
  Consultant, 
  Engagement, 
  FeedbackRequest 
} from '../types';
import { 
  INITIAL_TASKS, 
  ANNOUNCEMENTS, 
  KNOWLEDGE_DOCS, 
  AVAILABLE_CONSULTANTS, 
  INITIAL_ENGAGEMENTS, 
  FEEDBACK_REQUESTS 
} from '../constants';

export class NexusDatabase extends Dexie {
  tasks!: Table<Task>;
  announcements!: Table<Announcement>;
  knowledgeDocs!: Table<KnowledgeDoc>;
  consultants!: Table<Consultant>;
  engagements!: Table<Engagement>;
  feedbackRequests!: Table<FeedbackRequest>;

  constructor() {
    super('NexusDatabase');
  }
}

export const db = new NexusDatabase();

// Define schema and hooks on the instance to avoid TypeScript inheritance issues
db.version(2).stores({
  tasks: '++id, priority, type, status',
  announcements: '++id, category, date',
  knowledgeDocs: '++id, type, title',
  consultants: 'id, role, availability, name',
  engagements: 'id, status, clientName',
  feedbackRequests: '++id, status, type'
});

db.on('populate', () => {
  console.log('Seeding Database...');
  db.tasks.bulkAdd(INITIAL_TASKS);
  db.announcements.bulkAdd(ANNOUNCEMENTS);
  db.knowledgeDocs.bulkAdd(KNOWLEDGE_DOCS);
  db.consultants.bulkAdd(AVAILABLE_CONSULTANTS);
  db.engagements.bulkAdd(INITIAL_ENGAGEMENTS);
  db.feedbackRequests.bulkAdd(FEEDBACK_REQUESTS);
});