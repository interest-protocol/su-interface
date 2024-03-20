import { FC, useId } from 'react';

import { SVGProps } from './svg.types';

const FSui: FC<SVGProps & { rounded?: boolean }> = ({
  rounded,
  maxWidth,
  maxHeight,
  ...props
}) => {
  const id = useId();

  if (rounded)
    return (
      <svg
        style={{ maxWidth, maxHeight }}
        viewBox="0 0 48 41"
        fill="none"
        {...props}
      >
        <rect width="40" height="40" rx="20" fill="#01FDFF" />
        <rect
          width="40"
          height="40"
          rx="20"
          fill={`url(#paint0_linear_${id})`}
          fillOpacity="0.8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 29.75C17.5637 29.75 15.3818 28.4843 14.1636 26.3639C12.9455 24.2435 12.9455 21.712 14.1636 19.5921L15.5582 17.1648C16.0375 19.5023 17.7283 21.4286 20.0192 22.1922L20.079 22.2103C22.1695 22.7805 23.737 24.5151 24.0932 26.6524L24.3453 28.1652C23.1541 29.1804 21.6344 29.75 20 29.75ZM26.1854 25.6707C27.0406 23.7072 26.9243 21.4857 25.8364 19.5921L20.7031 10.6579C20.3906 10.114 19.6093 10.114 19.2968 10.6579L17.4183 13.9274L17.7016 16.3353C17.9032 18.0491 19.072 19.4933 20.7039 20.0487C23.4236 20.8031 25.508 22.9618 26.1854 25.6707Z"
          fill="black"
        />
        <g clipPath={`url(#clip0_${id})`}>
          <rect
            width="24"
            height="24"
            transform="translate(23 15.6665)"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32.3333 30.9999V24.3333H33.6666V30.9999H32.3333Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M37.6667 25.6666H33V24.3333H37.6667V25.6666Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.3333 28.3333H33V27H36.3333V28.3333Z"
            fill="black"
          />
        </g>
        <rect
          x="23"
          y="15.6665"
          width="24"
          height="24"
          rx="12"
          stroke="black"
          strokeWidth="2"
        />
        <defs>
          <linearGradient
            id={`paint0_linear_${id}`}
            x1="2"
            y1="38.5"
            x2="40"
            y2="2.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4FF73" />
            <stop offset="1" stopColor="#01FDFF" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`clip0_${id}`}>
            <rect
              x="23"
              y="15.6665"
              width="24"
              height="24"
              rx="12"
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>
    );

  return (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 49 41"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#clip1_${id})`}>
        <rect width="40" height="40" fill="#01FDFF" />
        <rect
          width="40"
          height="40"
          fill={`url(#paint1_linear_${id})`}
          fillOpacity="0.8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 30.8334C17.293 30.8334 14.8687 29.427 13.5151 27.071C12.1616 24.7151 12.1616 21.9023 13.5151 19.5468L15.0647 16.8499C15.5972 19.4471 17.4759 21.5874 20.0214 22.4359L20.0878 22.456C22.4105 23.0895 24.1522 25.0168 24.548 27.3916L24.8282 29.0726C23.5045 30.2005 21.816 30.8334 20 30.8334ZM26.8726 26.3009C27.8229 24.1192 27.6937 21.6509 26.4849 19.5468L20.7813 9.62C20.434 9.01567 19.5659 9.01567 19.2187 9.62L17.1315 13.2527L17.4462 15.9282C17.6702 17.8324 18.9689 19.4371 20.7822 20.0542C23.804 20.8925 26.12 23.291 26.8726 26.3009Z"
          fill="black"
        />
      </g>
      <g clipPath={`url(#clip2_${id})`}>
        <rect
          width="24"
          height="24"
          transform="translate(24 16)"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.3335 31.3334V24.6667H34.6668V31.3334H33.3335Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.6667 26.0001H34V24.6667H38.6667V26.0001Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37.3333 28.6668H34V27.3335H37.3333V28.6668Z"
          fill="black"
        />
      </g>
      <rect
        x="24"
        y="16"
        width="24"
        height="24"
        rx="12"
        stroke="black"
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id={`paint1_linear_${id}`}
          x1="2"
          y1="38.5"
          x2="40"
          y2="2.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F4FF73" />
          <stop offset="1" stopColor="#01FDFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`clip1_${id}`}>
          <rect width="40" height="40" rx="8" fill="white" />
        </clipPath>
        <clipPath id={`clip2_${id}`}>
          <rect x="24" y="16" width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FSui;
