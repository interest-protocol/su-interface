import { QuoteFunctionName } from '@/interface';

export enum FormTypeEnum {
  Mint,
  Redeem,
}

interface GetFeeValueAndFunctionArgs {
  formType: FormTypeEnum;
  iSui: Field;
  xSui: SuField;
  fSui: SuField;
  dSui: SuField;
}

interface GetFeeValueAndFunctionReturn {
  functionName: QuoteFunctionName;
  value: string;
}

export type GetFeeValueAndFunction = (
  args: GetFeeValueAndFunctionArgs
) => GetFeeValueAndFunctionReturn;

interface Field {
  usdPrice: number;
  value: `${number}`;
}

interface SuField extends Field {
  active: boolean;
}

export interface SuForm {
  iSui: Field;
  fSui: SuField;
  xSui: SuField;
  dSui: SuField;
  formType: FormTypeEnum;
}

export interface FormInputDollarProps {
  label: 'iSui' | 'fSui' | 'xSui' | 'dSui';
}
