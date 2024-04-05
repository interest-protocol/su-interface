import { FC } from 'react';

import { SVGProps } from './svg.types';

const Info: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11ZM12 5V7H10V5H12ZM12 17V9H10V17H12Z"
      fill="currentColor"
    />
  </svg>
);

export default Info;
