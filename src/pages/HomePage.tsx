import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Library, ChevronRight, Upload } from 'lucide-react';
import { getRecentResources, getTotalResourceCount, getContributorCount, prefetchCoursesData } from '../lib/supabase.js';
import ResourceCard from '../components/ResourceCard.js';
import ResourceDetailModal from '../components/ResourceDetailModal.js';
import { Reveal } from '../components/Reveal.js';
import { ScrollProgress } from '../components/ScrollProgress.js';
import { Helmet } from 'react-helmet-async';
import {
  CivilIcon,
  EnvironmentalIcon,
  ElectricalIcon,
  ElectronicsIcon,
  MechanicalIcon,
  MechatronicsIcon,
  IndustrialIcon,
  ComputerIcon,
  AIIcon,
  SoftwareIcon,
  TelecomIcon,
  CSIcon,
  MathIcon,
  PhysicsIcon,
} from '../components/DepartmentIcons.js';

interface DeptData {
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
  glow: string;
}

export const deptData: Record<string, DeptData> = {
  'Civil Engineering (BSc)': { Icon: CivilIcon, accent: '#F59E0B', glow: 'rgba(251,191,36,0.18)' },
  'Environmental Engineering (BSc)': { Icon: EnvironmentalIcon, accent: '#10B981', glow: 'rgba(52,211,153,0.18)' },
  'Electrical Engineering (BSc)': { Icon: ElectricalIcon, accent: '#EAB308', glow: 'rgba(250,204,21,0.18)' },
  'Electronics Engineering (BSc)': { Icon: ElectronicsIcon, accent: '#3B82F6', glow: 'rgba(96,165,250,0.18)' },
  'Mechanical Engineering (BSc)': { Icon: MechanicalIcon, accent: '#94A3B8', glow: 'rgba(148,163,184,0.18)' },
  'Mechatronics Engineering (BSc)': { Icon: MechatronicsIcon, accent: '#A855F7', glow: 'rgba(192,132,252,0.18)' },
  'Industrial & Manufacturing Engineering (BSc)': { Icon: IndustrialIcon, accent: '#FB923C', glow: 'rgba(251,146,60,0.18)' },
  'Computer Engineering (BSc)': { Icon: ComputerIcon, accent: '#38BDF8', glow: 'rgba(56,189,248,0.18)' },
  'Artificial Intelligence (BS)': { Icon: AIIcon, accent: '#F472B6', glow: 'rgba(244,114,182,0.18)' },
  'Software Engineering (BSc)': { Icon: SoftwareIcon, accent: '#22D3EE', glow: 'rgba(34,211,238,0.18)' },
  'Telecommunication Engineering (BSc)': { Icon: TelecomIcon, accent: '#A78BFA', glow: 'rgba(167,139,250,0.18)' },
  'Computer Science (BSc)': { Icon: CSIcon, accent: '#818CF8', glow: 'rgba(129,140,248,0.18)' },
  'Mathematics (BS)': { Icon: MathIcon, accent: '#FB7185', glow: 'rgba(251,113,133,0.18)' },
  'Physics (BS)': { Icon: PhysicsIcon, accent: '#A855F7', glow: 'rgba(168,85,247,0.18)' },
};

// Backwards-compatible export for SubmitPage (renders the Icon as ReactNode)
export const deptIcons: Record<string, React.ReactNode> = Object.fromEntries(
  Object.entries(deptData).map(([key, { Icon }]) => [key, <Icon className="w-6 h-6" />])
);

export default function HomePage() {

  const [recentResources, setRecentResources] = useState<any[]>([]);
  const [stats, setStats] = useState(() => {
    const cached = localStorage.getItem('uet_site_stats');
    return cached ? JSON.parse(cached) : { total: 0, contributors: 0 };
  });
  const [loading, setLoading] = useState(true);
  const departmentList = Object.keys(deptIcons);
  const [previewResource, setPreviewResource] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const [recent, totalCount, contributorCount] = await Promise.all([
          getRecentResources(4),
          getTotalResourceCount(),
          getContributorCount(),
        ]);

        const newStats = { total: totalCount, contributors: contributorCount };

        setRecentResources(recent);
        setStats(newStats);

        localStorage.setItem('uet_site_stats', JSON.stringify(newStats));
        prefetchCoursesData();
      } catch (err) {
        console.error('HomePage load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);



  return (
    <div className="min-h-screen" style={{ background: 'var(--neu-bg)' }}>
      <Helmet>
        <title>UET Taxila Resource Hub | Free Past Papers, Notes & Study Materials</title>
        <meta name="description" content="Free past papers, notes, assignments, and study materials for UET Taxila students. Browse by department, semester, and subject. Community-driven academic hub." />
        <link rel="canonical" href="https://uetresourcehub.app/" />
        <meta property="og:title" content="UET Taxila Resource Hub | Free Past Papers & Notes" />
        <meta property="og:description" content="Access free past papers, notes, and study materials for all UET Taxila departments." />
        <meta property="og:url" content="https://uetresourcehub.app/" />
      </Helmet>
      <ScrollProgress />
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-8 max-w-5xl mx-auto flex flex-col items-center">
        <div className="text-center w-full mb-20">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-10"
              style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-extruded-sm)', border: '1px solid var(--neu-border)', fontFamily: "'Inter', sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--neu-accent)' }} />
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--neu-muted)' }}>
                UET Taxila
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[2.75rem] md:text-[4.25rem] font-bold leading-[1.08] tracking-[-0.025em] mb-8"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--neu-fg)' }}>
              The Ultimate{' '}
              <span className="text-transparent bg-clip-text drop-shadow-sm" style={{ backgroundImage: 'var(--neu-gradient-accent)' }}>Resource Hub</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg mx-auto mb-0 leading-[1.7] font-normal"
              style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: '580px', color: 'var(--neu-muted)' }}>
              Access past papers, notes, lab manuals &amp; study materials — curated by students, for students.
            </p>
          </div>

        {/* Stat Cards */}
        <Reveal delay={0.1} yOffset={20}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            {[
              { icon: <Library className="w-[18px] h-[18px]" style={{ color: 'var(--neu-accent)' }} />, value: stats.total, label: 'Resources', glow: 'rgba(91, 79, 233, 0.15)' },
              { icon: <BookOpen className="w-[18px] h-[18px] text-[#0EA5E9]" />, value: departmentList.length, label: 'Departments', glow: 'rgba(14, 165, 233, 0.15)' },
              { icon: <Users className="w-[18px] h-[18px] text-[#8B5CF6]" />, value: stats.contributors, label: 'Contributors', glow: 'rgba(139, 92, 246, 0.15)' },
            ].map((stat, i) => (
              <div key={i}
                className="flex items-center gap-4 rounded-[24px] px-6 py-5"
                style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-extruded)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden"
                  style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset-sm)' }}>
                  <div className="absolute inset-0 opacity-20 blur-xl scale-150" style={{ backgroundColor: stat.glow }}></div>
                  <div className="relative z-10">{stat.icon}</div>
                </div>
                <div>
                  <p className="font-bold text-2xl tabular-nums leading-none mb-1"
                    style={{ fontFamily: "'Inter', sans-serif", color: 'var(--neu-fg)' }}>{stat.value}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif", color: 'var(--neu-muted)' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Departments Grid */}
      <Reveal delay={0.06}>
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-10 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--neu-fg)' }}>
              Browse by Department
            </h2>
            <Link to="/browse"
              className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all duration-200 focus:outline-none whitespace-nowrap shrink-0"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--neu-accent)' }}>
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            /* Skeleton Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-6 animate-pulse"
                  style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-extruded)' }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl"
                      style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset-sm)' }} />
                    <div className="w-9 h-9 rounded-full"
                      style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-extruded-sm)' }} />
                  </div>
                  <div className="space-y-2 mt-auto">
                    <div className="h-4 rounded-full w-3/4" style={{ background: 'var(--neu-shadow-dark)', opacity: 0.4 }} />
                    <div className="h-3 rounded-full w-8 mt-3" style={{ background: 'var(--neu-shadow-dark)', opacity: 0.25 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departmentList.map((dept) => {
                const d = deptData[dept];
                if (!d) return null;
                const DeptIcon = d.Icon;
                return (
                  <Link
                    key={dept}
                    to={`/browse?department=${encodeURIComponent(dept)}`}
                    className="group relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-500 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#5B4FE9]"
                    style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-extruded)' }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
                      style={{ background: d.glow }}
                    />
                    {/* Top accent line */}
                    <div
                      className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, transparent, ${d.accent}, transparent)` }}
                    />

                    <div className="relative flex flex-col gap-6 min-h-[150px]">
                      <div className="flex items-start justify-between">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                          style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset-sm)' }}
                        >
                          <DeptIcon className="w-11 h-11" />
                        </div>
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500"
                          style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-extruded-sm)' }}
                        >
                          <ArrowRight
                            className="w-4 h-4 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            style={{ color: 'var(--neu-muted)' }}
                          />
                        </div>
                      </div>

                      <div className="mt-auto">
                        <h3
                          className="leading-snug tracking-tight"
                          style={{ fontSize: '16px', fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--neu-fg)' }}
                        >
                          {dept.replace(/\s*\(BS[C]?\)$/i, '')}
                        </h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div
                            className="h-[3px] w-8 rounded-full transition-all duration-500 group-hover:w-14"
                            style={{ background: `linear-gradient(90deg, ${d.accent}, transparent)` }}
                          />
                          <div className="w-1 h-1 rounded-full" style={{ background: d.accent, opacity: 0.5 }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </Reveal>

      {/* Recent Submissions */}
      <Reveal delay={0.06}>
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-10 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--neu-fg)' }}>
              Recent Submissions
            </h2>
            <Link to="/browse"
              className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all duration-200 focus:outline-none whitespace-nowrap shrink-0"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--neu-accent)' }}>
              Browse all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-[24px] h-[130px] animate-pulse"
                  style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-extruded)' }}
                />
              ))}
            </div>
          ) : recentResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} onPreview={setPreviewResource} />
              ))}
            </div>
          ) : (
            <div
              className="rounded-[24px] p-12 text-center"
              style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset)' }}
            >
              <BookOpen className="w-12 h-12 mx-auto mb-5" style={{ color: 'var(--neu-accent)' }} />
              <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--neu-fg)' }}>
                No approved resources yet
              </h3>
              <p className="text-sm mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--neu-muted)' }}>
                Be the first to share academic resources with your fellow students!
              </p>
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white text-sm font-bold transition-all duration-150 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#5B4FE9]"
                style={{ background: 'var(--neu-btn)', boxShadow: 'var(--neu-shadow-extruded)', fontFamily: "'DM Sans', sans-serif" }}
              >
                Submit First Resource
              </Link>
            </div>
          )}
        </section>
      </Reveal>

      {/* CTA Banner */}
      <Reveal delay={0.06} yOffset={16}>
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto pb-0">
          <div
            className="rounded-[24px] p-10 md:p-16 text-center"
            style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-extruded-lg)' }}
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-8"
              style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset)' }}
            >
              <Upload className="w-10 h-10" style={{ color: 'var(--neu-accent)' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--neu-fg)' }}>
              Have study materials?
            </h2>
            <p className="mb-10 max-w-md mx-auto text-base md:text-lg" style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--neu-muted)' }}>
              Help your fellow students by sharing past papers, notes, lab manuals, and more.
            </p>
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 px-9 py-4.5 rounded-2xl text-white font-bold text-sm transition-transform duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(91,79,233,0.5)] active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#5B4FE9]"
              style={{ background: 'var(--neu-btn)', boxShadow: 'var(--neu-shadow-extruded)', fontFamily: "'DM Sans', sans-serif" }}
            >
              Submit a Resource <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </Reveal>
      {previewResource && (
        <ResourceDetailModal resource={previewResource} onClose={() => setPreviewResource(null)} />
      )}
    </div>
  );
}
