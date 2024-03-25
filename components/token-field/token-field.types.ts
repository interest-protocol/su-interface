import { BoxProps } from '@interest-protocol/ui-kit';
import { StylinComponentProps } from '@stylin.js/react';
import { InputHTMLAttributes, ReactNode } from 'react';

export type TokenFieldElementProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'translate' | 'height' | 'width' | 'content'
>;

export interface TokenFieldProps
  extends StylinComponentProps,
    TokenFieldElementProps {
  active?: boolean;
  balance?: string;
  activeBg?: string;
  tokenName: string;
  disabled?: boolean;
  Bottom?: ReactNode;
  TokenIcon?: ReactNode;
  fieldProps?: BoxProps;
  handleMax?: () => void;
  onActivate?: () => void;
  variant?: 'filled' | 'outline';
  status?: 'error' | 'success' | 'none';
}
