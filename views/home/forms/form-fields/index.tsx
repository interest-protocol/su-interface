import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ArrowRightSVG, FSuiSVG, ISuiSVG, XSuiSVG } from '@/components/svg';

import { SuForm } from '../forms.types';
import FormInput from './form-input';

const FormFields: FC = () => {
  const { control, setValue } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });
  const fSuiActive = useWatch({ control, name: 'fSui.active' });
  const xSuiActive = useWatch({ control, name: 'xSui.active' });

  const handleMax = () => {
    console.log('MAX');
  };

  return (
    <Box gap="l" display="grid" gridTemplateColumns="1fr 3rem 1fr">
      <Box order={formType}>
        <FormInput
          active
          balance="200"
          tokenName="iSui"
          placeholder="100"
          {...(!formType && { handleMax: handleMax })}
          TokenIcon={
            <ISuiSVG
              width="100%"
              height="100%"
              maxWidth="2.5rem"
              maxHeight="2.5rem"
            />
          }
        />
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          p="0"
          width="2.5rem"
          height="2.5rem"
          variant="tonal"
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
        >
          <ArrowRightSVG maxWidth="1rem" maxHeight="1rem" height="100%" />
        </Button>
      </Box>
      <Box display="flex" gap="s" flexDirection="column" order={formType && -1}>
        <FormInput
          tokenName="fSui"
          placeholder="100"
          active={fSuiActive}
          balance={formType ? '200' : ''}
          activeBg="linear-gradient(46.55deg, rgba(244, 255, 115, 0.8) 4.39%, #01FDFF 96.96%)"
          onActivate={() => {
            if (!fSuiActive) {
              setValue('fSui.active', true);
              setValue('xSui.active', false);
            }
          }}
          TokenIcon={
            <FSuiSVG
              maxWidth="4rem"
              maxHeight="2.5rem"
              width="100%"
              height="100%"
            />
          }
        />
        <FormInput
          tokenName="xSui"
          placeholder="100"
          active={xSuiActive}
          balance={formType ? '200' : ''}
          activeBg="linear-gradient(222.71deg,  #FF6BD6 5.65%, rgba(244, 255, 115, 0.8) 99.55%)"
          onActivate={() => {
            if (!xSuiActive) {
              setValue('xSui.active', true);
              setValue('fSui.active', false);
            }
          }}
          TokenIcon={
            <XSuiSVG
              maxWidth="4rem"
              maxHeight="2.5rem"
              width="100%"
              height="100%"
            />
          }
        />
      </Box>
    </Box>
  );
};

export default FormFields;
