import { FC } from 'react';

import { TokenField, TokenFieldProps } from '@/components/token-field';

const FormInput: FC<TokenFieldProps> = (props) => (
  <TokenField {...props} variant="outline" textAlign="right" />
);

export default FormInput;
