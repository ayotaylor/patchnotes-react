export interface FilterButtonProps {
  label?: string;
  children?: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
  onPress?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'ghost';
}