import { TokenField, TokenFieldProps } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const FormInput: FC<TokenFieldProps> = (props) => (
  <TokenField
    {...props}
    variant="outline"
    textAlign="right"
    fieldProps={{
      borderRadius: 's',
      border: '1px solid',
      borderColor: 'outlineVariant',
      nHover: {
        border: '1px solid',
        borderColor: 'onSurface',
      },
      nFocus: {
        border: '1px solid',
        borderColor: 'onSurface',
      },
    }}
  />
);

export default FormInput;
