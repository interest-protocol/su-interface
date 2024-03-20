import { FC } from 'react';

import { SVGProps } from './svg.types';

const Discord: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 15"
    fill="none"
    {...props}
  >
    <path
      d="M16.9308 1.24342C15.6561 0.667894 14.2892 0.243873 12.8599 0.00101874C12.8339 -0.00366827 12.8079 0.00804483 12.7945 0.0314716C12.6187 0.339138 12.4239 0.740514 12.2876 1.05599C10.7503 0.829542 9.22099 0.829542 7.71527 1.05599C7.57887 0.733501 7.37707 0.339138 7.20048 0.0314716C7.18707 0.00882646 7.16107 -0.00288664 7.13504 0.00101874C5.70659 0.243097 4.33963 0.667118 3.06411 1.24342C3.05307 1.2481 3.04361 1.25592 3.03732 1.26606C0.444493 5.07759 -0.265792 8.79544 0.0826501 12.4672C0.0842267 12.4852 0.0944749 12.5023 0.108665 12.5133C1.81934 13.7494 3.47642 14.4998 5.10273 14.9973C5.12876 15.0051 5.15634 14.9957 5.1729 14.9746C5.55761 14.4577 5.90054 13.9126 6.19456 13.3394C6.21192 13.3059 6.19535 13.266 6.15989 13.2528C5.61594 13.0497 5.098 12.8022 4.59977 12.5211C4.56037 12.4984 4.55721 12.443 4.59347 12.4164C4.69831 12.3391 4.80318 12.2587 4.9033 12.1775C4.92141 12.1626 4.94665 12.1595 4.96794 12.1689C8.24107 13.6393 11.7846 13.6393 15.0191 12.1689C15.0404 12.1587 15.0657 12.1619 15.0846 12.1767C15.1847 12.2579 15.2895 12.3391 15.3952 12.4164C15.4314 12.443 15.4291 12.4984 15.3897 12.5211C14.8914 12.8076 14.3735 13.0497 13.8288 13.252C13.7933 13.2653 13.7775 13.3059 13.7949 13.3394C14.0952 13.9118 14.4381 14.4569 14.8157 14.9738C14.8315 14.9957 14.8599 15.0051 14.8859 14.9973C16.5201 14.4998 18.1772 13.7494 19.8879 12.5133C19.9028 12.5023 19.9123 12.4859 19.9139 12.468C20.3309 8.22302 19.2154 4.53566 16.9568 1.26684C16.9513 1.25592 16.9419 1.2481 16.9308 1.24342ZM6.68335 10.2315C5.69792 10.2315 4.88594 9.34128 4.88594 8.24802C4.88594 7.15476 5.68217 6.26456 6.68335 6.26456C7.69239 6.26456 8.49651 7.16258 8.48073 8.24802C8.48073 9.34128 7.68451 10.2315 6.68335 10.2315ZM13.329 10.2315C12.3435 10.2315 11.5316 9.34128 11.5316 8.24802C11.5316 7.15476 12.3278 6.26456 13.329 6.26456C14.338 6.26456 15.1421 7.16258 15.1264 8.24802C15.1264 9.34128 14.338 10.2315 13.329 10.2315Z"
      fill="currentColor"
    />
  </svg>
);

export default Discord;
