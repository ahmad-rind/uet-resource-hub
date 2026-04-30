type IconProps = { className?: string };

export const CivilIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="civ" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <path d="M24 6L6 18v2h4v18h28V20h4v-2L24 6zm-6 28h-4V22h4v12zm8 0h-4V18h4v16zm8 0h-4V22h4v12z" fill="url(#civ)" />
    <rect x="6" y="38" width="36" height="4" rx="1" fill="url(#civ)" opacity="0.7" />
  </svg>
);

export const EnvironmentalIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="env" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <path d="M24 4C14 4 8 14 8 22c0 6 4 10 8 12v6c0 2 2 4 4 4h8c2 0 4-2 4-4v-6c4-2 8-6 8-12C40 14 34 4 24 4z" fill="url(#env)" opacity="0.3" />
    <path d="M24 8c-6 0-14 8-6 20M24 8c6 0 14 8 6 20M24 8v28" stroke="url(#env)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M18 18c2-2 6-2 6 2s-6 4-6 2z" fill="url(#env)" />
    <path d="M30 22c-2-2-6-2-6 2s6 4 6 2z" fill="url(#env)" />
  </svg>
);

export const ElectricalIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="elec" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
    </defs>
    <path d="M28 4L12 26h10l-4 18L42 22H30L28 4z" fill="url(#elec)" />
  </svg>
);

export const ElectronicsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="elecn" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect x="12" y="12" width="24" height="24" rx="4" fill="url(#elecn)" opacity="0.2" />
    <rect x="16" y="16" width="16" height="16" rx="2" fill="url(#elecn)" />
    <circle cx="24" cy="24" r="4" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
    {/* Pins */}
    <rect x="20" y="8" width="2" height="6" rx="1" fill="url(#elecn)" />
    <rect x="26" y="8" width="2" height="6" rx="1" fill="url(#elecn)" />
    <rect x="20" y="34" width="2" height="6" rx="1" fill="url(#elecn)" />
    <rect x="26" y="34" width="2" height="6" rx="1" fill="url(#elecn)" />
    <rect x="8" y="20" width="6" height="2" rx="1" fill="url(#elecn)" />
    <rect x="8" y="26" width="6" height="2" rx="1" fill="url(#elecn)" />
    <rect x="34" y="20" width="6" height="2" rx="1" fill="url(#elecn)" />
    <rect x="34" y="26" width="6" height="2" rx="1" fill="url(#elecn)" />
  </svg>
);

export const MechanicalIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="mech" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
    </defs>
    <path d="M24 8a16 16 0 110 32 16 16 0 010-32z" fill="url(#mech)" opacity="0.15" />
    <path d="M24 14v-6M24 40v-6M14 24H8M40 24h-6M16.9 16.9l-4.2-4.2M35.3 35.3l-4.2-4.2M16.9 31.1l-4.2 4.2M35.3 12.7l-4.2 4.2" stroke="url(#mech)" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="24" cy="24" r="8" fill="url(#mech)" />
    <circle cx="24" cy="24" r="3.5" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
  </svg>
);

export const MechatronicsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="mctr" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <rect x="14" y="8" width="20" height="14" rx="3" fill="url(#mctr)" opacity="0.3" />
    <rect x="16" y="10" width="16" height="10" rx="2" fill="url(#mctr)" />
    <path d="M18 22v6l-6 8h4l4-6 4 6h4l-6-8v-6" fill="url(#mctr)" opacity="0.5" />
    <path d="M24 22v6l6 8h-4l-4-6-4 6h-4l6-8v-6" stroke="url(#mctr)" strokeWidth="1.5" fill="none" />
    <circle cx="21" cy="15" r="1.5" fill="#fff" opacity="0.7" />
    <circle cx="27" cy="15" r="1.5" fill="#fff" opacity="0.7" />
    <rect x="12" y="40" width="8" height="3" rx="1.5" fill="url(#mctr)" />
    <rect x="28" y="40" width="8" height="3" rx="1.5" fill="url(#mctr)" />
  </svg>
);

export const IndustrialIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="ind" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <path d="M6 40V22l10-8v10l10-8v10l10-8v14H6z" fill="url(#ind)" opacity="0.25" />
    <path d="M6 40V22l10-8v10l10-8v10l10-8v14" stroke="url(#ind)" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <rect x="38" y="10" width="6" height="30" rx="1" fill="url(#ind)" />
    <path d="M38 10l3-6 3 6" fill="url(#ind)" opacity="0.6" />
    <rect x="6" y="40" width="38" height="3" rx="1" fill="url(#ind)" opacity="0.5" />
  </svg>
);

export const ComputerIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="comp" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    <rect x="6" y="8" width="36" height="24" rx="3" fill="url(#comp)" />
    <rect x="9" y="11" width="30" height="18" rx="1.5" fill="#0c1828" opacity="0.85" />
    <path d="M14 18h8M14 22h12M14 26h6" stroke="url(#comp)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M18 32h12l2 6H16l2-6z" fill="url(#comp)" opacity="0.5" />
    <rect x="14" y="38" width="20" height="2.5" rx="1.25" fill="url(#comp)" opacity="0.4" />
  </svg>
);

export const AIIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="ai" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="20" r="12" fill="url(#ai)" opacity="0.2" />
    <circle cx="24" cy="20" r="8" fill="url(#ai)" />
    <circle cx="20.5" cy="18.5" r="2" fill="#fff" opacity="0.7" />
    <circle cx="27.5" cy="18.5" r="2" fill="#fff" opacity="0.7" />
    <path d="M20 23c0 2 2 4 4 4s4-2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    {/* Neural connections */}
    <path d="M16 30l-4 6M24 32v6M32 30l4 6M12 36h6M26 38h8" stroke="url(#ai)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="36" r="2" fill="url(#ai)" />
    <circle cx="18" cy="36" r="2" fill="url(#ai)" />
    <circle cx="24" cy="38" r="2" fill="url(#ai)" />
    <circle cx="30" cy="38" r="2" fill="url(#ai)" />
    <circle cx="36" cy="36" r="2" fill="url(#ai)" />
  </svg>
);

export const SoftwareIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="sw" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="32" height="32" rx="6" fill="url(#sw)" opacity="0.15" />
    <path d="M16 18l-6 6 6 6" stroke="url(#sw)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 18l6 6-6 6" stroke="url(#sw)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 12L20 36" stroke="url(#sw)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const TelecomIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="tel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <rect x="21" y="20" width="6" height="22" rx="1" fill="url(#tel)" />
    <path d="M24 20l-12 8v14h6V30l6-4 6 4v12h6V28L24 20z" fill="url(#tel)" opacity="0.3" />
    <path d="M16 12a10 10 0 0116 0" stroke="url(#tel)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M12 8a16 16 0 0124 0" stroke="url(#tel)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
    <circle cx="24" cy="14" r="3" fill="url(#tel)" />
  </svg>
);

export const CSIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="cs" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="url(#cs)" opacity="0.15" />
    <rect x="10" y="14" width="28" height="20" rx="2" fill="url(#cs)" />
    <path d="M16 22h4v4h-4zM22 22h4v4h-4zM28 22h4v4h-4zM16 28h4v4h-4zM22 28h4v4h-4zM28 28h4v4h-4z" fill="#fff" opacity="0.25" />
    <path d="M18 24l-2 2 2 2M26 24l2 2-2 2M22 23l2 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

export const MathIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="math" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="100%" stopColor="#E11D48" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="18" fill="url(#math)" opacity="0.12" />
    {/* Sigma symbol */}
    <path d="M16 12h16v4l-10 8 10 8v4H16v-4h8l-8-8 8-8h-8v-4z" fill="url(#math)" />
  </svg>
);

export const PhysicsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="phy" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    {/* Atom orbits */}
    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="url(#phy)" strokeWidth="2" fill="none" opacity="0.5" />
    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="url(#phy)" strokeWidth="2" fill="none" opacity="0.5" transform="rotate(60 24 24)" />
    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="url(#phy)" strokeWidth="2" fill="none" opacity="0.5" transform="rotate(120 24 24)" />
    {/* Nucleus */}
    <circle cx="24" cy="24" r="4" fill="url(#phy)" />
    {/* Electrons */}
    <circle cx="42" cy="24" r="2.5" fill="url(#phy)" />
    <circle cx="15" cy="8.4" r="2.5" fill="url(#phy)" />
    <circle cx="15" cy="39.6" r="2.5" fill="url(#phy)" />
  </svg>
);
