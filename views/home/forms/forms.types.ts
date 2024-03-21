export enum FormTypeEnum {
  Mint,
  Redeem,
}

interface SuField {
  active: boolean;
}

export interface SuForm {
  fSui: SuField;
  xSui: SuField;
  formType: FormTypeEnum;
}
