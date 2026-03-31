import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Copy, Flag, Check, User, Calendar, X, BookOpen, Home } from 'lucide-react';
import { reportResource } from '../lib/supabase.js';

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

interface ResourceDetailModalProps {
  resource: Resource;
  onClose: () => void;
}

const S = {
  bg:       '#d6dae8',
  fg:       '#1a1d2e',
  muted:    '#64748B',
  accent:   '#5B4FE9',
};

function fmtDate(d?: string) {
  if (!d) return 'Unknown';
  try {
    return new Date(d).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return 'Unknown';
  }
}

export default function ResourceDetailModal({ resource, onClose }: ResourceDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [reported, setReported] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Escape key to close
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(resource.link); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReport = async () => {
    if (reported) return;
    await reportResource(resource.id);
    setReported(true);
  };

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 animate-fadeIn"
      style={{ 
        background: 'rgba(26,29,46,0.3)', 
        backdropFilter: 'blur(10px)',
        animation: 'modalBackdropFade 0.4s ease-out forwards'
      }}
    >
      <style>{`
        @keyframes modalBackdropFade {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(10px); }
        }
        @keyframes modalContainerScale {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        className="w-full max-w-3xl max-h-[95vh] overflow-y-auto md:overflow-hidden rounded-[32px] flex flex-col md:flex-row p-0"
        style={{ 
          background: S.bg, 
          boxShadow: '9px 9px 18px #b0b8cc, -9px -9px 18px #ffffff',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          animation: 'modalContainerScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}
      >
        {/* Left Sidebar */}
        <div
          className="w-full md:w-[280px] md:shrink-0 flex flex-col gap-5 p-6 md:p-8 border-b md:border-b-0 border-[#b0b8cc]/40 z-10"
          style={{ background: S.bg }}
        >
          {/* BookOpen icon in extruded neumorphic square */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ boxShadow: '4px 4px 8px #b0b8cc, -4px -4px 8px #ffffff' }}
          >
            <BookOpen className="w-5 h-5 text-[#5B4FE9]" />
          </div>

          {/* Type badge pill */}
          <div 
            className="px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest text-[#5B4FE9] uppercase"
            style={{ 
              background: S.bg, 
              boxShadow: '4px 4px 8px #b0b8cc, -4px -4px 8px #ffffff' 
            }}
          >
            {resource.type}
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1d2e] mt-2 mb-1 leading-tight">
            {resource.title}
          </h2>

          {/* Course Name */}
          <span className="text-[13px] font-bold text-[#5B4FE9] mb-2 leading-snug">
            {resource.courseName}
          </span>

          {/* Course Code Pill */}
          <div className="flex">
            <div className="px-3 py-1 rounded-md text-[11px] font-mono font-bold text-[#5B4FE9] bg-[#5B4FE9]/10">
              {resource.courseCode}
            </div>
          </div>

          {/* Horizontal Divider */}
          <div 
            className="h-px w-full my-3" 
            style={{ background: 'linear-gradient(to right, rgba(176,184,204,0.6), transparent)' }} 
          />

          {/* Meta fields rendered individually */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-extrabold text-[#64748B]/50 uppercase tracking-widest flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                Department
              </span>
              <span className="text-[13px] font-bold text-[#1a1d2e] leading-snug">
                {resource.department.replace(/\s*\(BS[C]?\)$/i, '')}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-extrabold text-[#64748B]/50 uppercase tracking-widest flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Contributor
              </span>
              <span className="text-[13px] font-bold text-[#1a1d2e] leading-snug">
                {resource.uploadedBy || 'Anonymous'}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-extrabold text-[#64748B]/50 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Date Added
              </span>
              <span className="text-[13px] font-bold text-[#1a1d2e] leading-snug">
                {fmtDate(resource.uploadedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Divider (Desktop) */}
        <div className="hidden md:flex relative w-8 shrink-0 flex-col justify-center items-center -ml-4">
          <div className="absolute inset-y-8 w-px bg-gradient-to-b from-transparent via-[#b0b8cc]/80 to-transparent" />
          <div 
            className="relative w-2.5 h-2.5 rounded-full border border-[#b0b8cc]/80 z-10"
            style={{ background: S.bg }}
          />
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto md:max-h-[90vh] no-scrollbar justify-center relative bg-[#d6dae8]">
          {/* Close button - Absolute top-right */}
          <div className="absolute top-6 right-6 z-20">
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-2xl text-[#64748B] transition-all duration-300 hover:scale-105 active:scale-95 bg-[#d6dae8]"
              style={{ boxShadow: '4px 4px 8px #b0b8cc, -4px -4px 8px #ffffff' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col w-full max-w-lg mx-auto py-8">
            {/* Description */}
            {resource.description && (
              <div className="mb-8">
                <p className="text-[10px] font-extrabold text-[#64748B]/50 uppercase tracking-widest mb-3 px-1">
                  Description
                </p>
                <div 
                  className="text-[14px] leading-relaxed rounded-2xl p-5 text-[#1a1d2e] opacity-90"
                  style={{ boxShadow: 'inset 4px 4px 8px #b0b8cc, inset -4px -4px 8px #ffffff' }}
                >
                  {resource.description}
                </div>
              </div>
            )}

            {/* Resource Link Title */}
            <div className="mb-3 px-1">
              <span className="text-[10px] font-extrabold text-[#64748B]/50 uppercase tracking-widest">
                Resource Link
              </span>
            </div>

            {/* Link Field (Inset) */}
            <div 
              className="w-full px-5 py-4 rounded-2xl mb-8 overflow-hidden"
              style={{ boxShadow: 'inset 4px 4px 8px #b0b8cc, inset -4px -4px 8px #ffffff' }}
            >
              <span className="text-[13px] font-mono text-[#1a1d2e] break-all opacity-80">
                {resource.link}
              </span>
            </div>

            {/* Footer Actions */}
            <div className="w-full flex flex-col gap-4">
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-[20px] bg-[#5B4FE9] text-white text-[14px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[6px_6px_14px_rgba(91,79,233,0.3)] hover:shadow-[8px_8px_18px_rgba(91,79,233,0.4)]"
              >
                <ExternalLink className="w-5 h-5" />
                Download / View Resource
              </a>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 py-4 px-2 rounded-[20px] bg-[#d6dae8] text-[#1a1d2e] text-[14px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  style={{ boxShadow: '6px 6px 12px #b0b8cc, -6px -6px 12px #ffffff' }}
                >
                  {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy Link'}
                </button>

                <button
                  onClick={handleReport}
                  disabled={reported}
                  className="w-full flex items-center justify-center gap-2 py-4 px-2 rounded-[20px] bg-[#d6dae8] text-[14px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  style={{ 
                    boxShadow: '6px 6px 12px #b0b8cc, -6px -6px 12px #ffffff',
                    color: reported ? '#ef4444' : '#64748B'
                  }}
                >
                  <Flag className="w-4 h-4" />
                  {reported ? 'Reported' : 'Report'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
