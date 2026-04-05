import { ArrowUpRight } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: string;
  department: string;
  semester: number;
  courseCode: string;
  courseName: string;
  link: string;
  uploadedBy?: string;
  uploadedAt?: string;
  description?: string;
  reportCount?: number;
}

interface ResourceCardProps {
  resource: Resource;
  onPreview?: (resource: Resource) => void;
}

function FileIcon({ className, style }: { className?: string, style?: React.CSSProperties }) { return (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path 
      d="M13 2H9C5 2 3 4 3 8V16C3 20 5 22 9 22H15C19 22 21 20 21 16V10L13 2Z" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M13 2V7C13 9 14 10 16 10H21" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M7 13H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 17H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
}

export default function ResourceCard({ resource, onPreview }: ResourceCardProps) {

  // Color mapping based on resource type
  const getTypeStyles = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('past paper')) return { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444' };
    if (t.includes('template')) return { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B' };
    if (t.includes('lab')) return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981' };
    return { bg: 'rgba(91, 79, 233, 0.15)', text: '#5B4FE9' }; // Default (Study Material / Notes)
  };

  const typeStyle = getTypeStyles(resource.type);

  return (
    <div
      onClick={() => onPreview?.(resource)}
      className="relative rounded-[32px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_12px_24px_#b0b8cc,-12px_-12px_24px_#ffffff] group bg-[#d6dae8] flex flex-row h-full cursor-pointer"
      style={{ boxShadow: '8px 8px 16px #b0b8cc, -8px -8px 16px #ffffff' }}
    >
      {/* Left Sidebar */}
      <div 
        className="w-[90px] md:w-[100px] shrink-0 flex flex-col items-center justify-center gap-3 py-5 px-2"
        style={{ backgroundColor: typeStyle.bg }}
      >
        <div 
          className="w-11 h-11 rounded-[20px] flex items-center justify-center shrink-0 bg-[#d6dae8]"
          style={{ boxShadow: 'inset 4px 4px 8px #b0b8cc, inset -4px -4px 8px #ffffff' }}
        >
          <FileIcon className="w-5 h-5 opacity-90" style={{ color: typeStyle.text }} />
        </div>

        <span 
          className="text-[10px] font-extrabold uppercase tracking-widest"
          style={{ color: typeStyle.text }}
        >
          SEM {resource.semester}
        </span>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col p-4 md:p-5 min-w-0">
        <h3
          className="font-extrabold text-[#1a1d2e] text-[15px] leading-[1.3] mb-2.5 line-clamp-2 pr-4"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {resource.title}
        </h3>
        
        <div className="flex flex-col gap-0.5 mb-2">
          <span className="text-[12px] font-medium text-[#475569] line-clamp-2 leading-snug">
            {resource.courseName}
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-3">

          <div className="flex items-center">
            <div 
              className="px-3 py-1 rounded-full text-[9px] font-extrabold whitespace-nowrap uppercase tracking-wider"
              style={{ 
                backgroundColor: typeStyle.bg, 
                color: typeStyle.text,
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              {resource.type}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Arrow Overlay */}
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
        <ArrowUpRight className="w-4 h-4 text-[#4A3FD8]" />
      </div>
    </div>
  );
}
