export enum FormTypeEnum {
  Mint,
  Redeem,
}

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
  formType: FormTypeEnum;
}

export interface FormInputDollarProps {
  label: 'iSui' | 'fSui' | 'xSui';
}
