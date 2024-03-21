import { FC } from 'react';

import { SVGProps } from './svg.types';

const ArrowRight: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 17 16"
    fill="none"
    {...props}
  >
    <path
      d="M9 0.585938L16.4142 8.00015L9 15.4144L7.58579 14.0002L12.5858 9.00015H0V7.00015H12.5858L7.58579 2.00015L9 0.585938Z"
      fill="currentColor"
    />
  </svg>
);

export default ArrowRight;
