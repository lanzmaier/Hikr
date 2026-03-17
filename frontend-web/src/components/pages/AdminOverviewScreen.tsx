import React from 'react';
import AdminLayout from '../organisms/AdminLayout';
import { useAuth } from '../../context/AuthContext';

interface FeedItem {
  initials: string;
  name: string;
  time: string;
  text: string;
  badge: string;
  badgeColor: string;
}

const FEED_ITEMS: FeedItem[] = [
  {
    initials: 'SM',
    name: 'Sarah Müller',
    time: 'Vor 5 Min',
    text: '"Wunderschöne Aussicht vom Watzmann heute!"',
    badge: 'Foto geteilt',
    badgeColor: 'bg-green-50 text-green-700',
  },
  {
    initials: 'LB',
    name: 'Lukas Berg',
    time: 'Vor 18 Min',
    text: 'Hat die Tour "Schwarzwald-Trail" abgeschlossen.',
    badge: 'Tour-Abschluss',
    badgeColor: 'bg-blue-50 text-blue-700',
  },
  {
    initials: 'HM',
    name: 'HikeMaster99',
    time: 'Vor 1 Std',
    text: 'Frage zur Wegbeschaffenheit am Wilden Kaiser...',
    badge: 'Frage',
    badgeColor: 'bg-amber-50 text-amber-700',
  },
];

const CHART_HEIGHTS = [25, 50, 50, 75, 67, 83, 100];
const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export const AdminOverviewScreen: React.FC = () => {
  const { user } = useAuth();
  const greeting = user?.firstName ? `Willkommen zurück, ${user.firstName}` : 'Willkommen zurück, Admin';

  return (
    <AdminLayout pageTitle="Übersicht">
      <div className="p-4 md:p-8">

        {/* Page Heading (mobile only – desktop shows in AdminLayout header) */}
        <div className="mb-6 md:hidden">
          <h1 className="text-2xl font-bold text-forest-dark">Übersicht</h1>
          <p className="text-sm text-slate-500">{greeting}</p>
        </div>

        {/* ── Stat Cards ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-green-100 text-green-700 p-3 rounded-xl flex-shrink-0">
              <span className="material-symbols-outlined">hiking</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aktive Wanderer</p>
              <p className="text-2xl font-bold text-slate-800">12.482</p>
              <span className="text-[11px] text-green-600 font-medium">+5.2% heute</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-amber-100 text-amber-700 p-3 rounded-xl flex-shrink-0">
              <span className="material-symbols-outlined">map</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Neue Touren</p>
              <p className="text-2xl font-bold text-slate-800">154</p>
              <span className="text-[11px] text-amber-600 font-medium">32 warten auf Freigabe</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-red-100 text-red-700 p-3 rounded-xl flex-shrink-0">
              <span className="material-symbols-outlined">report</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gemeldete Gruppen</p>
              <p className="text-2xl font-bold text-slate-800">8</p>
              <span className="text-[11px] text-red-600 font-medium">Dringend prüfen</span>
            </div>
          </div>
        </div>

        {/* ── Chart ───────────────────────────────────────────── */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-forest-dark">Nutzerwachstum</h3>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 font-medium outline-none cursor-pointer">
              <option>Letzte 7 Tage</option>
              <option>Letzter Monat</option>
            </select>
          </div>

          <div className="h-40 w-full flex items-end justify-between px-2 gap-2">
            {CHART_HEIGHTS.map((pct, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end" style={{ height: '100%' }}>
                <div
                  className="rounded-t-sm bg-forest-green transition-all"
                  style={{ height: `${pct}%`, opacity: 0.3 + i * 0.1 }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-1">
            {DAYS.map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>

        {/* ── Community Feed ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-forest-dark">Community-Beiträge</h3>
            <button className="text-xs font-bold text-forest-green uppercase tracking-wide hover:opacity-70 transition-opacity">
              Alle zeigen
            </button>
          </div>

          <div className="divide-y divide-slate-50">
            {FEED_ITEMS.map((item) => (
              <div key={item.name} className="p-4 flex gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-600 font-bold text-xs">
                  {item.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold truncate">{item.name}</p>
                    <span className="text-[10px] text-slate-400 ml-2 flex-shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.text}</p>
                  <div className="mt-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminOverviewScreen;
