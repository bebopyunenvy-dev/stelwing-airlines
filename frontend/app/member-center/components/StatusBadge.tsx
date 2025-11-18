// components/StatusBadge.tsx

export type StatusBadgeVariant =
  | 'success'
  | 'disabled'
  | 'refunding'
  | 'refunded';

export interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  label: string;
}

const variantStyles: Record<StatusBadgeVariant, string> = {
  success: 'bg-green-100 text-green-700',
  disabled: 'bg-gray-200 text-gray-600',
  refunding: 'bg-yellow-100 text-yellow-700',
  refunded: 'bg-blue-100 text-blue-700',
};

export default function StatusBadge({ variant, label }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
