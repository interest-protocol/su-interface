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
        <rect width="40" height="40" rx="20" fill="#F1F3F7" />
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
            d="M32.3334 30.9997V24.333H33.6667V30.9997H32.3334Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.6969 25.6943C35.4474 25.6673 35.1148 25.6663 34.6 25.6663H33V24.333H34.6C34.6116 24.333 34.6231 24.333 34.6346 24.333C35.105 24.333 35.5106 24.333 35.8405 24.3687C36.1911 24.4067 36.5344 24.4913 36.8422 24.715C37.012 24.8383 37.1613 24.9877 37.2847 25.1574C37.5084 25.4653 37.593 25.8086 37.631 26.1591C37.6667 26.4891 37.6667 26.8947 37.6667 27.365V27.9676C37.6667 28.438 37.6667 28.8436 37.631 29.1735C37.593 29.5241 37.5084 29.8674 37.2847 30.1752C37.1613 30.345 37.012 30.4944 36.8422 30.6177C36.5344 30.8414 36.1911 30.926 35.8405 30.964C35.5106 30.9997 35.105 30.9997 34.6346 30.9997L33 30.9997V29.6663H34.6C35.1148 29.6663 35.4474 29.6654 35.6969 29.6384C35.934 29.6127 36.0159 29.57 36.0585 29.539C36.1151 29.4979 36.1649 29.4481 36.206 29.3915C36.237 29.3489 36.2797 29.267 36.3054 29.0299C36.3324 28.7804 36.3333 28.4478 36.3333 27.933V27.3997C36.3333 26.8849 36.3324 26.5523 36.3054 26.3028C36.2797 26.0657 36.237 25.9838 36.206 25.9412C36.1649 25.8846 36.1151 25.8348 36.0585 25.7937C36.0159 25.7627 35.934 25.72 35.6969 25.6943Z"
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
            <stop stopColor="#F1F3F7" stopOpacity="0" />
            <stop offset="1" stopColor="#578FFF" />
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
      <g clipPath={`url(#clip0_${id})`}>
        <rect width="40" height="40" fill="#F1F3F7" />
        <rect
          width="40"
          height="40"
          fill={`url(#paint0_linear_${id})`}
          fillOpacity="0.8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 30.8332C17.293 30.8332 14.8687 29.4268 13.5151 27.0708C12.1616 24.7148 12.1616 21.9021 13.5151 19.5466L15.0647 16.8496C15.5972 19.4468 17.4759 21.5872 20.0214 22.4357L20.0878 22.4558C22.4105 23.0892 24.1522 25.0166 24.548 27.3914L24.8282 29.0723C23.5045 30.2003 21.816 30.8332 20 30.8332ZM26.8726 26.3006C27.8229 24.119 27.6937 21.6506 26.4849 19.5466L20.7813 9.61975C20.434 9.01542 19.5659 9.01542 19.2187 9.61975L17.1315 13.2525L17.4462 15.928C17.6702 17.8321 18.9689 19.4368 20.7822 20.0539C23.804 20.8922 26.12 23.2907 26.8726 26.3006Z"
          fill="black"
        />
      </g>
      <g clipPath={`url(#clip1_${id})`}>
        <rect
          width="24"
          height="24"
          transform="translate(24 16)"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.3333 31.3332V24.6665H34.6666V31.3332H33.3333Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36.6969 26.0278C36.4474 26.0008 36.1148 25.9998 35.6 25.9998H34V24.6665H35.6C35.6116 24.6665 35.6231 24.6665 35.6346 24.6665C36.105 24.6665 36.5106 24.6665 36.8405 24.7022C37.1911 24.7402 37.5344 24.8248 37.8422 25.0485C38.012 25.1718 38.1613 25.3211 38.2847 25.4909C38.5084 25.7988 38.593 26.1421 38.631 26.4926C38.6667 26.8226 38.6667 27.2282 38.6667 27.6985V28.3011C38.6667 28.7715 38.6667 29.1771 38.631 29.507C38.593 29.8576 38.5084 30.2009 38.2847 30.5087C38.1613 30.6785 38.012 30.8278 37.8422 30.9512C37.5344 31.1749 37.1911 31.2595 36.8405 31.2975C36.5106 31.3332 36.105 31.3332 35.6346 31.3332L34 31.3332V29.9998H35.6C36.1148 29.9998 36.4474 29.9989 36.6969 29.9719C36.934 29.9462 37.0159 29.9035 37.0585 29.8725C37.1151 29.8314 37.1649 29.7816 37.206 29.725C37.237 29.6824 37.2797 29.6005 37.3054 29.3634C37.3324 29.1139 37.3333 28.7813 37.3333 28.2665V27.7332C37.3333 27.2184 37.3324 26.8858 37.3054 26.6363C37.2797 26.3992 37.237 26.3173 37.206 26.2746C37.1649 26.2181 37.1151 26.1683 37.0585 26.1272C37.0159 26.0962 36.934 26.0535 36.6969 26.0278Z"
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
          id={`paint0_linear_${id}`}
          x1="38"
          y1="2.5"
          x2="2"
          y2="41.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1F3F7" stopOpacity="0" />
          <stop offset="1" stopColor="#578FFF" />
        </linearGradient>
        <clipPath id={`clip0_${id}`}>
          <rect width="40" height="40" rx="8" fill="white" />
        </clipPath>
        <clipPath id={`clip1_${id}`}>
          <rect x="24" y="16" width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FSui;
