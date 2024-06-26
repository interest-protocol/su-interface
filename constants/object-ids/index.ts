import { Type } from '@/utils/types';

export const OBJECT_IDS = {
  SU: '0xbb6e10d57c6bb1d2f0b33933e02cb128b2f6a386a8f8d4a50034eed4bceb4d9b',
  SUITEARS:
    '0xbd097359082272fdef8e9ce53815264d0142d6209f3f0cb48ee31c10aaf846d5',
  SWITCHBOARD_AGGREGATOR:
    '0x84d2b7e435d6e6a5b137bf6f78f34b2c5515ae61cd8591d5ff6cd121a21aa6b7',
  COIN_X_ORACLE:
    '0x667df8861d3b005d9c16b30d451c539a53cef961c75951686c095c011e4a7050',
  VAULT: '0xb8db2f10d83427da080e9525a13af9bcd77f2a942e8a7cc5ca5d7604688872f2',
  TREASURY:
    '0xe82c24162e348b48ca587e3ee572821164718416cbbe21400e248861b29ceadb',
  SU_ORACLE:
    '0xac54a5196667dc8041d845f9fadb2bc999d2607a2acfe239a0c690d424972bdb',
  I_SUI_TREASURY:
    '0x904845ee460e4e1fd5666eca33167f13cf24c92fc0bf2bbc22026efc6ddfd28d',
  SU_STATE:
    '0xb2d8bb6ace07ca6fbf8f53028d4dcdb38854c3eaf5cc2f7ee0d15b6fa7ac53ac',
  D_SUI_TREASURY_CAP:
    '0x297999a5b7070f3241be4ef14075baad45351f177aaefaa686d5a26e6171bac0',
  F_SUI_TREASURY_CAP:
    '0x9ae17118997a0eacf24db09587dda299823d70942f1533dda0a07c08c4b81d20',
  X_SUI_TREASURY_CAP:
    '0x26d68894d253d953f7bf713f6f7b0a354a5d4a578015165001ee5848c440203a',
};

export const SUI_CMC_ID = 20947;

export const ISUI_TYPE = `${OBJECT_IDS.SU}::i_sui::I_SUI` as Type;
export const FSUI_TYPE = `${OBJECT_IDS.SU}::f_sui::F_SUI` as Type;
export const XSUI_TYPE = `${OBJECT_IDS.SU}::x_sui::X_SUI` as Type;
export const SUI_DOLLAR_TYPE =
  `${OBJECT_IDS.SU}::sui_dollar::SUI_DOLLAR` as Type;
