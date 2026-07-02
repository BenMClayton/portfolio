import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const ArrowUpRight = (props: IconProps) => (
  <svg {...base} {...props}><path d="M7 17 17 7M7 7h10v10" /></svg>
);
export const Github = (props: IconProps) => (
  <svg {...base} {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1 0S17.9-.4 15 1.5a14 14 0 0 0-6 0C6.1-.4 4.9 0 4.9 0a5.4 5.4 0 0 0-.2 3A5.8 5.8 0 0 0 3.2 7.1c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 9 18v4" /><path d="M9 19c-3 .9-3-1.5-4.2-2" /></svg>
);
export const Moon = (props: IconProps) => (
  <svg {...base} {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /></svg>
);
export const Sun = (props: IconProps) => (
  <svg {...base} {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" /></svg>
);
export const Menu = (props: IconProps) => (
  <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = (props: IconProps) => (
  <svg {...base} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>
);
export const Code = (props: IconProps) => (
  <svg {...base} {...props}><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></svg>
);
export const Server = (props: IconProps) => (
  <svg {...base} {...props}><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><path d="M7 7h.01M7 17h.01" /></svg>
);
export const Network = (props: IconProps) => (
  <svg {...base} {...props}><rect x="9" y="2" width="6" height="6" rx="1" /><rect x="3" y="16" width="6" height="6" rx="1" /><rect x="15" y="16" width="6" height="6" rx="1" /><path d="M12 8v4M6 16v-2h12v2" /></svg>
);
export const Device = (props: IconProps) => (
  <svg {...base} {...props}><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M9 18h6M9 6h6" /></svg>
);
export const MapPin = (props: IconProps) => (
  <svg {...base} {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Briefcase = (props: IconProps) => (
  <svg {...base} {...props}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></svg>
);
export const Activity = (props: IconProps) => (
  <svg {...base} {...props}><path d="M3 12h4l2-7 4 14 2-7h6" /></svg>
);
export const Mountain = (props: IconProps) => (
  <svg {...base} {...props}><path d="m3 20 7-12 4 7 2-3 5 8H3Z" /><path d="m8.5 10.5 1.5 1.2 1.2-1.1" /></svg>
);
export const Graduation = (props: IconProps) => (
  <svg {...base} {...props}><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11.5V16c3 3 9 3 12 0v-4.5M22 9v6" /></svg>
);
export const Download = (props: IconProps) => (
  <svg {...base} {...props}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>
);
