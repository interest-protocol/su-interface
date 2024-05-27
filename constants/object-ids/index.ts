import { Type } from '@/context/web3/web3.types';

export const OBJECT_IDS = {
  SU: '0xdb466ec68471df830c313ea1d22de7572e12f0565a27a01d0baf2a7b9cd11300',
  SUITEARS:
    '0xbd097359082272fdef8e9ce53815264d0142d6209f3f0cb48ee31c10aaf846d5',
  SWITCHBOARD_AGGREGATOR:
    '0x84d2b7e435d6e6a5b137bf6f78f34b2c5515ae61cd8591d5ff6cd121a21aa6b7',
  COIN_X_ORACLE:
    '0x667df8861d3b005d9c16b30d451c539a53cef961c75951686c095c011e4a7050',
  VAULT: '0xd531d4c34c4808c39252ca28fe7b74bda215ce65231bbcb8a6312f337ec8e3ba',
  TREASURY:
    '0x1380a6aa6f3ab4953c54839105840270d988baaba4ee2cdd6417381856015eda',
  SU_ORACLE:
    '0xe9da66287ae46f6458af969b399d451adba5616e78bbb66977bdea921340fdea',
  I_SUI_TREASURY:
    '0xf6c403b69a614ecd7a81ad73790cba950d8421da23ea1d04092ce383dd49210c',
  SU_STATE:
    '0xd170b5992d0fefe433cc54ced489b33a32cb3268364804da1c7d223f778dba0a',
  F_SUI_TREASURY_CAP:
    '0x1c1ae9b80d32d3f50a06dca57d42594f00f0eef7b074ffd01ca030ee53c9648a',
  X_SUI_TREASURY_CAP:
    '0xd9baddab6aec8e3da594b0f0dfe256cb1c7197f10913f3a188ff7c850543a46d',
};

export const SUI_CMC_ID = 20947;

export const ISUI_TYPE = `${OBJECT_IDS.SU}::i_sui::I_SUI` as Type;
export const FSUI_TYPE = `${OBJECT_IDS.SU}::f_sui::F_SUI` as Type;
export const XSUI_TYPE = `${OBJECT_IDS.SU}::x_sui::X_SUI` as Type;
export const DSUI_TYPE = `${OBJECT_IDS.SU}::d_sui::D_SUI` as Type;
