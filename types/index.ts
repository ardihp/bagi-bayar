// types/index.ts
// Base TypeScript type definitions for Travel Expense App

/**
 * Unique identifier type using UUID format
 */
export type UUID = string;

/**
 * Timestamp type representing Unix timestamp in milliseconds
 */
export type Timestamp = number;

/**
 * Base entity interface that all data models should extend
 */
export interface BaseEntity {
  id: UUID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Storage wrapper interface for data versioning
 * Used to wrap data stored in localStorage with version info
 */
export interface StorageData<T> {
  version: number;
  data: T;
  lastModified: Timestamp;
}

/**
 * Constants for localStorage keys
 * Using 'as const' for type safety and autocomplete
 */
export const STORAGE_KEYS = {
  TRIPS: 'travel_app_trips',
  PARTICIPANTS: 'travel_app_participants',
  EXPENSES: 'travel_app_expenses',
  SETTINGS: 'travel_app_settings',
} as const;

/**
 * Type for valid storage key values
 */
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
