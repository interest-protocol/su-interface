import { FC, useId } from 'react';

import { SVGProps } from './svg.types';

const XSui: FC<SVGProps & { rounded?: boolean }> = ({
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
        <rect width="40" height="40" rx="20" fill="#FF6BD6" />
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
            d="M38.3334 25.3333L32.6667 30.9999L31.6667 29.9999L37.3334 24.3333L38.3334 25.3333Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32.6667 24.3333L38.3334 29.9999L37.3334 30.9999L31.6667 25.3333L32.6667 24.3333Z"
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
            x1="38"
            y1="2.5"
            x2="2"
            y2="41.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FC928E" stopOpacity="0" />
            <stop offset="1" stopColor="#F4FF73" />
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
        <rect width="40" height="40" fill="#FF6BD6" />
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
          d="M39.3332 25.6667L33.6665 31.3334L32.6665 30.3334L38.3332 24.6667L39.3332 25.6667Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.6665 24.6667L39.3332 30.3334L38.3332 31.3334L32.6665 25.6667L33.6665 24.6667Z"
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
          x1="38"
          y1="2.5"
          x2="2"
          y2="41.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC928E" stopOpacity="0" />
          <stop offset="1" stopColor="#F4FF73" />
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

export default XSui;
