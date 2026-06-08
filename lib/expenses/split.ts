import { Split } from '@/types/expense';

/**
 * Calculates an equal split of an expense amount among participants.
 *
 * Each participant's share is amount / participantCount rounded to 2 decimal places.
 * Any rounding remainder is assigned to the payer's share to ensure the splits
 * sum to exactly the original amount.
 *
 * @param amount - The total expense amount (must be positive)
 * @param participantCount - Number of participants sharing the expense
 * @param payerId - ID of the participant who paid
 * @param participantIds - List of participant IDs involved in the expense
 * @returns Array of Split objects, one per participant
 */
export function calculateSplit(
  amount: number,
  participantCount: number,
  payerId: string,
  participantIds: string[]
): Split[] {
  if (participantCount <= 0 || participantIds.length === 0) {
    return [];
  }

  // Calculate base share rounded to 2 decimal places
  const baseShare = Math.round((amount / participantCount) * 100) / 100;

  // Calculate total distributed with base shares
  const totalDistributed = Math.round(baseShare * participantCount * 100) / 100;

  // Calculate remainder due to rounding
  const remainder = Math.round((amount - totalDistributed) * 100) / 100;

  return participantIds.map((participantId) => ({
    participantId,
    amount:
      participantId === payerId
        ? Math.round((baseShare + remainder) * 100) / 100
        : baseShare,
  }));
}
