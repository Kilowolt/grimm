import React from 'react';

/**
 * Vietnamese traditional lotus flower motif (Hoa sen)
 */
export const LotusMotif: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Center petal */}
    <path
      d="M24 6C24 6 20 18 20 28C20 33.5 24 37 24 37C24 37 28 33.5 28 28C28 18 24 6 24 6Z"
      fill="#E9BFA5"
      stroke="#D99A72"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left petal */}
    <path
      d="M21 16C21 16 11 22 11 31C11 36 15 39 20 38C19 33 21 24 21 16Z"
      fill="#F5D5C5"
      stroke="#D99A72"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Right petal */}
    <path
      d="M27 16C27 16 37 22 37 31C37 36 33 39 28 38C29 33 27 24 27 16Z"
      fill="#F5D5C5"
      stroke="#D99A72"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Outer left petal */}
    <path
      d="M14 26C14 26 6 30 7 36C8 39 12 40 17 38.5C14 34 14 26 14 26Z"
      fill="#EED0C0"
      stroke="#D99A72"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Outer right petal */}
    <path
      d="M34 26C34 26 42 30 41 36C40 39 36 40 31 38.5C34 34 34 26 34 26Z"
      fill="#EED0C0"
      stroke="#D99A72"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Lotus base leaf / calyx */}
    <path
      d="M17 39C21 41 27 41 31 39C30 42 27 44 24 44C21 44 18 42 17 39Z"
      fill="#A8B89A"
      stroke="#7D936F"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Traditional Vietnamese stylized cloud swirl motif (Mây cuộn truyền thống)
 */
export const CloudMotif: React.FC<{ className?: string; width?: number; height?: number }> = ({
  className = '',
  width = 64,
  height = 32
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M8 24C4 24 2 20 4 16C6 12 11 12 14 14C16 8 24 6 29 10C32 6 40 5 44 9C48 7 54 9 56 13C60 14 62 19 59 23C56 26 50 25 47 24C45 28 39 29 34 27C30 30 22 30 18 26C14 28 9 27 8 24Z"
      fill="#E9BFA5"
      fillOpacity="0.25"
      stroke="#D99A72"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 22C24 24 30 22 31 18C32 14 27 12 24 14"
      stroke="#D99A72"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Traditional Vietnamese folding paper fan motif (Quạt giấy)
 */
export const PaperFanMotif: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M18 30L6 14C12 7 24 7 30 14L18 30Z"
      fill="#FFF0E5"
      stroke="#D99A72"
      strokeWidth="1.5"
    />
    <path d="M18 30L12 10.5" stroke="#D99A72" strokeWidth="1" />
    <path d="M18 30L18 8.5" stroke="#D99A72" strokeWidth="1" />
    <path d="M18 30L24 10.5" stroke="#D99A72" strokeWidth="1" />
    <circle cx="18" cy="30" r="2" fill="#D99A72" />
  </svg>
);

/**
 * Traditional Vietnamese hanging lantern motif (Đèn lồng)
 */
export const LanternMotif: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0V4" stroke="#D99A72" strokeWidth="1.5" />
    <rect x="7" y="4" width="10" height="2" rx="1" fill="#D99A72" />
    <path
      d="M6 7C4 11 4 17 6 21H18C20 17 20 11 18 7H6Z"
      fill="#F5D0BC"
      stroke="#D99A72"
      strokeWidth="1.5"
    />
    <path d="M12 7V21" stroke="#D99A72" strokeWidth="1" strokeDasharray="2 1" />
    <rect x="8" y="21" width="8" height="2" rx="1" fill="#D99A72" />
    <path d="M12 23V29" stroke="#D99A72" strokeWidth="1.5" />
  </svg>
);
