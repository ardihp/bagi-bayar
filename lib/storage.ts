// lib/storage.ts
// LocalStorage Manager for Travel Expense App

/**
 * StorageManager - Utility module for managing localStorage operations
 * 
 * Features:
 * - Type-safe get/set operations with generics
 * - Automatic JSON serialization/deserialization
 * - Graceful error handling for all operations
 * - Availability check for localStorage
 */

/**
 * Check if localStorage is available in the current environment
 * Handles cases like private browsing, disabled storage, or SSR
 */
export function isAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Save data to localStorage with JSON serialization
 * @param key - Storage key
 * @param value - Value to store (must be JSON-serializable)
 * @returns boolean indicating success
 */
export function setItem<T>(key: string, value: T): boolean {
  try {
    if (!isAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      // Handle QuotaExceededError
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded');
      } else {
        console.error('Failed to save to localStorage:', error.message);
      }
    }
    return false;
  }
}

/**
 * Retrieve data from localStorage with JSON deserialization
 * @param key - Storage key
 * @returns Parsed value or null if not found/error
 */
export function getItem<T>(key: string): T | null {
  try {
    if (!isAvailable()) {
      console.warn('localStorage is not available');
      return null;
    }
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to retrieve from localStorage:', error.message);
    }
    return null;
  }
}

/**
 * Remove a specific item from localStorage
 * @param key - Storage key to remove
 * @returns boolean indicating success
 */
export function removeItem(key: string): boolean {
  try {
    if (!isAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to remove from localStorage:', error.message);
    }
    return false;
  }
}

/**
 * Clear all data from localStorage
 * @returns boolean indicating success
 */
export function clear(): boolean {
  try {
    if (!isAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }
    window.localStorage.clear();
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to clear localStorage:', error.message);
    }
    return false;
  }
}

/**
 * StorageManager object - Alternative API for those who prefer object-style access
 */
export const StorageManager = {
  isAvailable,
  setItem,
  getItem,
  removeItem,
  clear,
} as const;

export default StorageManager;
