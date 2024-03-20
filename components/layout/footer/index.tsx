import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import unikey from 'unikey';

import { SOCIAL_MEDIA } from '@/constants';

const Footer: FC = () => (
  <Box variant="container" width="100%">
    <Box
      p="l"
      gap="l"
      as="footer"
      display="flex"
      gridColumn="1/-1"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="label" size="large">
        Follow us
      </Typography>
      <Box display="flex" gap="s">
        {SOCIAL_MEDIA.map(({ title, Icon, link }) => (
          <a
            href={link}
            title={title}
            key={unikey()}
            target="_blank"
            rel="noopener, noreferrer"
          >
            <Box
              display="flex"
              width="2.5rem"
              height="2.5rem"
              border="1px solid"
              borderRadius="full"
              alignItems="center"
              justifyContent="center"
              borderColor="outlineVariant"
            >
              <Icon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
            </Box>
          </a>
        ))}
      </Box>
    </Box>
  </Box>
);

export default Footer;
