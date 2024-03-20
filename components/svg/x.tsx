import { FC } from 'react';

import { SVGProps } from './svg.types';

const X: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 19"
    fill="none"
    {...props}
  >
    <path
      d="M0.048701 0L7.77048 10.3247L-6.10352e-05 18.7192H1.74878L8.55187 11.3697L14.0486 18.7192H19.9999L11.8437 7.8137L19.0765 0H17.3276L11.0623 6.76872L6.00006 0H0.048701Z"
      fill="currentColor"
    />
  </svg>
);

export default X;
