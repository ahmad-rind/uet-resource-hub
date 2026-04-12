import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle, AlertTriangle, FileJson, Copy, Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/interfaces-select';
import { adminAddResource, adminBulkAddResources, getLiveCoursesData } from '../../lib/supabase.js';
import { resourceTypes } from '../../data/courses.js';
import { Reveal } from '../../components/Reveal.js';

// Design matching AdminDashboard
const S = {
  bg: '#d6dae8', fg: '#1a1d2e', muted: '#475569', accent: '#5B4FE9',
  extruded: '8px 8px 16px #b0b8cc, -8px -8px 16px #ffffff',
  insetDeep: 'inset 10px 10px 20px #b0b8cc, inset -10px -10px 20px #ffffff',
};

export default function AddResourceManager() {
  const [activeMode, setActiveMode] = useState<'single' | 'bulk'>('single');
  const [departments, setDepartments] = useState<any>({});
  const [departmentList, setDepartmentList] = useState<string[]>([]);
  const [loadingDepts, setLoadingDepts] = useState(true);

  // Single form state
  const [form, setForm] = useState({
    title: '', type: 'Past Paper', department: '', semester: '',
    courseCode: '', courseName: '', link: '', description: '',
  });
  const [singleSaving, setSingleSaving] = useState(false);
  const [singleResult, setSingleResult] = useState<{ success: boolean; msg: string } | null>(null);

  // Bulk state
  const [bulkData, setBulkData] = useState('');
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkResult, setBulkResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getLiveCoursesData().then(data => {
      setDepartments(data.departments || {});
      setDepartmentList(data.departmentList || []);
      setLoadingDepts(false);
    });
  }, []);

  const semesterOptions = form.department && departments[form.department]
    ? Object.keys(departments[form.department]).sort((a,b) => Number(a) - Number(b)) : [];
  
  const courseOptions = form.department && form.semester && departments[form.department]?.[form.semester]
    ? departments[form.department][form.semester] : [];

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSingleSaving(true);
    setSingleResult(null);
    try {
      const copy = { ...form };
      if (!copy.courseName && copy.courseCode) {
        const matching = courseOptions.find((c: any) => c.code === copy.courseCode);
        if (matching) copy.courseName = matching.name;
      }
      const res = await adminAddResource(copy);
      if (res.success) {
        setSingleResult({ success: true, msg: 'Resource added and Auto-Approved!' });
        setForm({ ...form, title: '', link: '', description: '' }); // keep dept/sem selection
      } else {
        setSingleResult({ success: false, msg: res.error || 'Failed to add resource' });
      }
    } catch (err: any) {
      setSingleResult({ success: false, msg: err.message || 'Unknown error' });
    } finally {
      setSingleSaving(false);
    }
  };

  const handleBulkSubmit = async () => {
    setBulkSaving(true);
    setBulkResult(null);
    try {
      let parsed = [];
      try {
        parsed = JSON.parse(bulkData);
        if (!Array.isArray(parsed)) throw new Error("JSON must be an array of objects");
      } catch (err: any) {
        setBulkResult({ success: false, total: 0, successful: 0, failed: 1, errors: ['Invalid JSON: ' + err.message] });
        setBulkSaving(false);
        return;
      }

      if (parsed.length === 0) {
        setBulkResult({ success: false, total: 0, successful: 0, failed: 0, errors: ['Empty array'] });
        setBulkSaving(false);
        return;
      }

      const res = await adminBulkAddResources(parsed);
      setBulkResult(res);
      if (res.failed === 0) {
        setBulkData('');
      }
    } catch(err: any) {
      setBulkResult({ success: false, total: 0, successful: 0, failed: 1, errors: [err.message] });
    } finally {
      setBulkSaving(false);
    }
  };

  const sampleJSON = `[
  {
    "title": "Data Structures Mid 2023",
    "type": "Past Paper",
    "department": "Computer Science",
    "semester": 3,
    "courseCode": "CS-201",
    "courseName": "Data Structures",
    "link": "https://drive.google.com/...",
    "description": "Midterm past paper"
  }
]`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Tab Selectors */}
      <div className="flex gap-4">
        <button onClick={() => setActiveMode('single')}
          className="flex-1 py-4 rounded-[24px] font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          style={{ background: S.bg, boxShadow: activeMode === 'single' ? S.insetDeep : S.extruded, color: activeMode === 'single' ? S.accent : S.muted }}
        >
          <UploadCloud className="w-5 h-5" /> Single Upload
        </button>
        <button onClick={() => setActiveMode('bulk')}
          className="flex-1 py-4 rounded-[24px] font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          style={{ background: S.bg, boxShadow: activeMode === 'bulk' ? S.insetDeep : S.extruded, color: activeMode === 'bulk' ? S.accent : S.muted }}
        >
          <FileJson className="w-5 h-5" /> Bulk JSON Upload
        </button>
      </div>

      <Reveal delay={0.1}>
        <div className="rounded-[32px] p-6 sm:p-8" style={{ background: S.bg, boxShadow: S.extruded }}>
          
          {/* SINGLE MODE */}
          {activeMode === 'single' && (
            <form onSubmit={handleSingleSubmit} className="space-y-5">
              <div className="mb-6 border-b border-[#b0b8cc]/40 pb-4">
                <h2 className="text-xl font-extrabold tracking-tight text-[#1a1d2e]">Add Single Resource</h2>
                <p className="text-sm text-[#475569]">Upload a resource directly without pending review.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#4A3FD8] mb-1.5">Resource Title</label>
                  <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    placeholder="Enter descriptive title"
                    className="w-full px-4 py-3 rounded-2xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#5B4FE9]/20"
                    style={{ background: S.bg, boxShadow: S.insetDeep, color: S.fg }} />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#4A3FD8] mb-1.5">Resource Type</label>
                  <div className="relative">
                    <Select
                      value={form.type}
                      onValueChange={val => setForm({...form, type: val})}
                    >
                      <SelectTrigger 
                        className="w-full px-4 py-3 rounded-2xl text-[13px] font-medium outline-none border-none h-auto focus:ring-2 focus:ring-[#5B4FE9]/20 transition-all duration-150"
                        style={{ background: S.bg, boxShadow: S.insetDeep, color: S.fg }}
                      >
                        <SelectValue placeholder="Resource Type" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ background: S.bg, color: S.fg, boxShadow: S.extruded, border: '1px solid #b0b8cc', borderRadius: '16px' }}
                      >
                        {(resourceTypes as string[]).map(t => (
                          <SelectItem key={t} value={t}
                            className="rounded-xl focus:bg-[#5B4FE9] focus:text-white cursor-pointer"
                          >
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#4A3FD8] mb-1.5">Department</label>
                  <div className="relative">
                    <Select
                      value={form.department}
                      onValueChange={val => setForm({...form, department: val === 'all' ? '' : val, semester: '', courseCode: '', courseName: ''})}
                      disabled={loadingDepts}
                    >
                      <SelectTrigger 
                        className="w-full px-4 py-3 rounded-2xl text-[13px] font-medium outline-none border-none h-auto focus:ring-2 focus:ring-[#5B4FE9]/20 transition-all duration-150 disabled:opacity-50"
                        style={{ background: S.bg, boxShadow: S.insetDeep, color: S.fg }}
                      >
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ background: S.bg, color: S.fg, boxShadow: S.extruded, border: '1px solid #b0b8cc', borderRadius: '16px' }}
                      >
                        <SelectItem value="all" className="rounded-xl focus:bg-[#5B4FE9] focus:text-white cursor-pointer">Select Department</SelectItem>
                        {departmentList.map(d => (
                          <SelectItem key={d} value={d} className="rounded-xl focus:bg-[#5B4FE9] focus:text-white cursor-pointer">{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#4A3FD8] mb-1.5">Semester</label>
                  <div className="relative">
                    <Select
                      value={form.semester}
                      onValueChange={val => setForm({...form, semester: val === 'all' ? '' : val, courseCode: '', courseName: ''})}
                      disabled={!form.department}
                    >
                      <SelectTrigger 
                        className="w-full px-4 py-3 rounded-2xl text-[13px] font-medium outline-none border-none h-auto focus:ring-2 focus:ring-[#5B4FE9]/20 transition-all duration-150 disabled:opacity-50"
                        style={{ background: S.bg, boxShadow: S.insetDeep, color: S.fg }}
                      >
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ background: S.bg, color: S.fg, boxShadow: S.extruded, border: '1px solid #b0b8cc', borderRadius: '16px' }}
                      >
                        <SelectItem value="all" className="rounded-xl focus:bg-[#5B4FE9] focus:text-white cursor-pointer">Select Semester</SelectItem>
                        {semesterOptions.map(sem => (
                          <SelectItem key={sem} value={sem} className="rounded-xl focus:bg-[#5B4FE9] focus:text-white cursor-pointer">Semester {sem}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#4A3FD8] mb-1.5">Course</label>
                  <div className="relative">
                    <Select
                      value={form.courseCode}
                      onValueChange={val => {
                        const code = val === 'all' ? '' : val;
                        const m = courseOptions.find((c: any) => c.code === code);
                        setForm({...form, courseCode: code, courseName: m?.name || ''});
                      }}
                      disabled={!form.semester}
                    >
                      <SelectTrigger 
                        className="w-full px-4 py-3 rounded-2xl text-[13px] font-medium outline-none border-none h-auto focus:ring-2 focus:ring-[#5B4FE9]/20 transition-all duration-150 disabled:opacity-50"
                        style={{ background: S.bg, boxShadow: S.insetDeep, color: S.fg }}
                      >
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ background: S.bg, color: S.fg, boxShadow: S.extruded, border: '1px solid #b0b8cc', borderRadius: '16px' }}
                      >
                        <SelectItem value="all" className="rounded-xl focus:bg-[#5B4FE9] focus:text-white cursor-pointer">Select Course</SelectItem>
                        {courseOptions.map((c: any) => (
                          <SelectItem key={c.code} value={c.code} className="rounded-xl focus:bg-[#5B4FE9] focus:text-white cursor-pointer">{c.code} — {c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#4A3FD8] mb-1.5">External Link</label>
                <input required type="url" value={form.link} onChange={e => setForm({...form, link: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-2xl text-[13px] font-mono outline-none focus:ring-2 focus:ring-[#5B4FE9]/20"
                  style={{ background: S.bg, boxShadow: S.insetDeep, color: S.fg }} />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#4A3FD8] mb-1.5">Description (Optional)</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  placeholder="Provide brief details about the resource..."
                  className="w-full px-4 py-3 rounded-2xl text-[13px] outline-none focus:ring-2 focus:ring-[#5B4FE9]/20 resize-none"
                  style={{ background: S.bg, boxShadow: S.insetDeep, color: S.fg }} />
              </div>

              {singleResult && (
                <div className={`p-4 rounded-xl text-[12px] font-bold border flex items-center gap-2 ${singleResult.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-100'}`}>
                  {singleResult.success ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {singleResult.msg}
                </div>
              )}

              <button type="submit" disabled={singleSaving}
                className="w-full py-4 rounded-2xl text-white font-extrabold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60"
                style={{ background: '#5B4FE9', boxShadow: '0 8px 16px rgba(91,79,233,0.2)' }}>
                {singleSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                Publish Resource
              </button>
            </form>
          )}

          {/* BULK MODE */}
          {activeMode === 'bulk' && (
            <div className="space-y-5">
              <div className="mb-6 border-b border-[#b0b8cc]/40 pb-4">
                <h2 className="text-xl font-extrabold tracking-tight text-[#1a1d2e] flex items-center justify-between">
                  Bulk JSON Upload
                  <button onClick={() => { navigator.clipboard.writeText(sampleJSON); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] rounded-lg tracking-widest uppercase transition-all bg-[#d6dae8] active:scale-95 text-[#4A3FD8]"
                    style={{ boxShadow: S.extruded }}>
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Sample format
                  </button>
                </h2>
                <p className="text-sm text-[#475569] mt-1">Paste a JSON array containing resource objects. All items will be auto-approved.</p>
              </div>

              <div>
                <textarea rows={12} value={bulkData} onChange={e => setBulkData(e.target.value)}
                  placeholder="[\n  {\n    &#34;title&#34;: &#34;...&#34;,\n    &#34;type&#34;: &#34;Past Paper&#34;\n  }\n]"
                  className="w-full p-5 rounded-2xl text-[12px] font-mono outline-none focus:ring-2 focus:ring-[#5B4FE9]/20 resize-none whitespace-pre"
                  style={{ background: S.bg, boxShadow: S.insetDeep, color: S.fg }} />
              </div>

              {bulkResult && (
                <div className="p-4 rounded-xl bg-white/50 border border-white space-y-2 text-[12px]">
                  <p className="font-bold text-[#1a1d2e]">Results ({bulkResult.total} items parsed):</p>
                  <p className="text-green-600 font-semibold flex items-center gap-2"><CheckCircle className="w-4 h-4" /> {bulkResult.successful} successfully added</p>
                  {bulkResult.failed > 0 && (
                    <div className="text-red-500 font-semibold space-y-1">
                      <p className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> {bulkResult.failed} failed</p>
                      <ul className="list-disc pl-5 mt-1 opacity-90 text-[11px] max-h-32 overflow-y-auto">
                        {bulkResult.errors.map((e: string, i: number) => <li key={i}>{e}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <button onClick={handleBulkSubmit} disabled={bulkSaving || !bulkData.trim()}
                className="w-full py-4 rounded-2xl bg-[#5B4FE9] text-white font-extrabold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60"
                style={{ boxShadow: '0 8px 16px rgba(91,79,233,0.2)' }}>
                {bulkSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                Upload Bulk Resources
              </button>
            </div>
          )}

        </div>
      </Reveal>
    </div>
  );
}
