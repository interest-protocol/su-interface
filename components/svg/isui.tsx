import { FC, useId } from 'react';

import { SVGProps } from './svg.types';

const ISui: FC<SVGProps & { rounded?: boolean }> = ({
  maxWidth,
  maxHeight,
  rounded,
  ...props
}) => {
  const id = useId();

  if (rounded)
    return (
      <svg
        style={{ maxWidth, maxHeight }}
        viewBox="0 0 40 40"
        fill="none"
        {...props}
      >
        <g clipPath={`url(#clip0_${id})`}>
          <rect width="40" height="40" rx="20" fill="#0053DB" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 29.75C17.5637 29.75 15.3818 28.4843 14.1636 26.3639C12.9455 24.2435 12.9455 21.712 14.1636 19.5921L15.5582 17.1648C16.0375 19.5023 17.7283 21.4286 20.0192 22.1922L20.079 22.2103C22.1695 22.7805 23.737 24.5151 24.0932 26.6524L24.3453 28.1652C23.1541 29.1804 21.6344 29.75 20 29.75ZM26.1854 25.6707C27.0406 23.7072 26.9243 21.4857 25.8364 19.5921L20.7031 10.6579C20.3906 10.114 19.6093 10.114 19.2968 10.6579L17.4183 13.9274L17.7016 16.3353C17.9032 18.0491 19.072 19.4933 20.7039 20.0487C23.4236 20.8031 25.508 22.9618 26.1854 25.6707Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id={`clip0_${id}`}>
            <rect width="40" height="40" rx="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );

  return (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#clip1_${id})`}>
        <rect width="40" height="40" fill="#0053DB" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.0001 30.8334C17.2931 30.8334 14.8688 29.427 13.5153 27.071C12.1617 24.7151 12.1617 21.9023 13.5153 19.5468L15.0648 16.8499C15.5973 19.4471 17.4761 21.5874 20.0215 22.4359L20.0879 22.456C22.4106 23.0895 24.1523 25.0168 24.5481 27.3916L24.8283 29.0726C23.5047 30.2005 21.8161 30.8334 20.0001 30.8334ZM26.8727 26.3009C27.823 24.1192 27.6938 21.6509 26.485 19.5468L20.7814 9.62C20.4341 9.01567 19.566 9.01567 19.2188 9.62L17.1316 13.2527L17.4464 15.9282C17.6704 17.8324 18.969 19.4371 20.7823 20.0542C23.8041 20.8925 26.1201 23.291 26.8727 26.3009Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id={`clip1_${id}`}>
          <rect width="40" height="40" rx="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ISui;
