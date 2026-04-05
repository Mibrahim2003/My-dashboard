/**
 * Centralized utility for mapping course impact levels to Neo-Brutalist Tailwind styles.
 */

export type ImpactLevel = 'heavy' | 'standard' | 'minimal';

export const getImpactStyles = (impactLevel: ImpactLevel = 'standard'): string => {
  if (impactLevel === 'heavy') return 'bg-secondary-container text-white border-on-background';
  if (impactLevel === 'standard') return 'bg-primary-container text-on-background border-on-background';
  return 'bg-white text-on-background border-on-background';
};

export const getDashboardImpactStyles = (impactLevel: ImpactLevel): string => {
  // Legacy dashboard variants (using standard primary/secondary vs container variants)
  if (impactLevel === 'heavy') return 'bg-secondary';
  if (impactLevel === 'standard') return 'bg-primary';
  return 'bg-gray-200';
};
