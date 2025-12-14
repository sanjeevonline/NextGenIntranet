import { db } from './db';
import { Task, Announcement, KnowledgeDoc, Consultant, Engagement, FeedbackRequest } from '../types';

// --- Tasks API ---
export const getTasks = async (): Promise<Task[]> => {
  return await db.tasks.toArray();
};

export const createTask = async (task: Task): Promise<void> => {
  await db.tasks.add(task);
};

export const deleteTask = async (id: string): Promise<void> => {
  await db.tasks.delete(id);
};

// --- Announcements API ---
export const getAnnouncements = async (): Promise<Announcement[]> => {
  return await db.announcements.orderBy('date').reverse().toArray();
};

export const createAnnouncement = async (announcement: Announcement): Promise<void> => {
  await db.announcements.add(announcement);
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  await db.announcements.delete(id);
};

// --- Knowledge Base API ---
export const getKnowledgeDocs = async (): Promise<KnowledgeDoc[]> => {
  return await db.knowledgeDocs.toArray();
};

export const createKnowledgeDoc = async (doc: KnowledgeDoc): Promise<void> => {
  await db.knowledgeDocs.add(doc);
};

export const deleteKnowledgeDoc = async (id: string): Promise<void> => {
  await db.knowledgeDocs.delete(id);
};

// --- Consultants API ---
export const getConsultants = async (): Promise<Consultant[]> => {
  return await db.consultants.toArray();
};

export const createConsultant = async (consultant: Consultant): Promise<void> => {
  await db.consultants.add(consultant);
};

export const deleteConsultant = async (id: string): Promise<void> => {
  await db.consultants.delete(id);
};

// --- Engagements API ---
export const getEngagements = async (): Promise<Engagement[]> => {
  return await db.engagements.toArray();
};

export const updateEngagement = async (engagement: Engagement): Promise<void> => {
  await db.engagements.put(engagement);
};

export const createEngagement = async (engagement: Engagement): Promise<void> => {
  await db.engagements.add(engagement);
};

export const deleteEngagement = async (id: string): Promise<void> => {
  await db.engagements.delete(id);
};

// --- Feedback API ---
export const getFeedbackRequests = async (): Promise<FeedbackRequest[]> => {
  return await db.feedbackRequests.toArray();
};

// --- Initialization ---
export const initializeData = async () => {
  // Simple check to trigger Dexie's open and populate if needed
  const count = await db.tasks.count();
  console.log(`Database connected. Found ${count} tasks.`);
};