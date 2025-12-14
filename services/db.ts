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

class NexusDatabase extends Dexie {
  tasks!: Table<Task>;
  announcements!: Table<Announcement>;
  knowledgeDocs!: Table<KnowledgeDoc>;
  consultants!: Table<Consultant>;
  engagements!: Table<Engagement>;
  feedbackRequests!: Table<FeedbackRequest>;

  constructor() {
    super('NexusDatabase');
    
    // Define schema
    this.version(1).stores({
      tasks: '++id, priority, type, status',
      announcements: '++id, category, date',
      knowledgeDocs: '++id, type, title',
      consultants: 'id, role, availability, name',
      engagements: 'id, status, clientName',
      feedbackRequests: '++id, status, type'
    });

    // Populate data if tables are empty
    this.on('populate', () => {
      console.log('Seeding Database...');
      this.tasks.bulkAdd(INITIAL_TASKS);
      this.announcements.bulkAdd(ANNOUNCEMENTS);
      this.knowledgeDocs.bulkAdd(KNOWLEDGE_DOCS);
      this.consultants.bulkAdd(AVAILABLE_CONSULTANTS);
      this.engagements.bulkAdd(INITIAL_ENGAGEMENTS);
      this.feedbackRequests.bulkAdd(FEEDBACK_REQUESTS);
    });
  }
}

export const db = new NexusDatabase();