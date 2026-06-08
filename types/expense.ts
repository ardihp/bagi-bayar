// types/expense.ts
// Expense-related type definitions for the Expense Tracker module

import { BaseEntity, UUID, Timestamp } from './index';

/**
 * Represents a single expense entry within a trip.
 * Contains all information about who paid, how much, and who participated.
 */
export interface Expense extends BaseEntity {
  tripId: UUID;
  description: string;
  amount: number;
  payerId: UUID;
  date: string; // ISO date string (YYYY-MM-DD)
  participantIds: UUID[];
  splits: Split[];
}

/**
 * Represents a single participant's share of an expense.
 * Amount is rounded to 2 decimal places.
 */
export interface Split {
  participantId: UUID;
  amount: number;
}

/**
 * Represents a participant's financial balance within a trip.
 * Positive net means the participant is owed money.
 * Negative net means the participant owes money.
 */
export interface Balance {
  participantId: UUID;
  participantName: string;
  totalPaid: number;
  totalOwed: number;
  net: number; // totalPaid - totalOwed
}

/**
 * Represents a recommended transfer to settle debts between participants.
 */
export interface Settlement {
  fromId: UUID;
  fromName: string;
  toId: UUID;
  toName: string;
  amount: number;
}

/**
 * Input data for creating or updating an expense.
 * Does not include computed fields like splits or base entity fields.
 */
export interface ExpenseInput {
  description: string;
  amount: number;
  payerId: UUID;
  date: string;
  participantIds: UUID[];
}

/**
 * Represents a data modification made while offline that needs to be synced.
 * Pending changes are stored in localStorage and processed chronologically.
 */
export interface PendingChange {
  id: UUID;
  timestamp: Timestamp;
  type: 'create' | 'update' | 'delete';
  entity: 'expense';
  data: Expense | { id: UUID };
  tripId: UUID;
}

/**
 * Sync status indicator for the application's connectivity state.
 */
export type SyncStatus = 'synced' | 'pending' | 'syncing';
