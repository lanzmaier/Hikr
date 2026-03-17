import React, { useState } from 'react';
import AdminLayout from '../organisms/AdminLayout';

type UserStatus = 'Aktiv' | 'Inaktiv' | 'Gesperrt';

interface MockUser {
  id: string;
  initials: string;
  username: string;
  email: string;
  status: UserStatus;
  registeredAt: string;
}

const MOCK_USERS: MockUser[] = [
  { id: 'u-1', initials: 'LH', username: 'Lukas_Hiker92',  email: 'lukas.mueller@example.com', status: 'Aktiv',    registeredAt: '12. Okt 2023' },
  { id: 'u-2', initials: 'ST', username: 'Sarah_Trail',    email: 's.tannenbaum@web.de',        status: 'Inaktiv',  registeredAt: '05. Sep 2023' },
  { id: 'u-3', initials: 'BK', username: 'BergKönig_88',  email: 'kalle88@gmail.com',          status: 'Gesperrt', registeredAt: '22. Aug 2023' },
  { id: 'u-4', initials: 'EF', username: 'Elena_Forest',  email: 'elena.f@hikr.com',           status: 'Aktiv',    registeredAt: '14. Aug 2023' },
  { id: 'u-5', initials: 'MN', username: 'MountainNomad', email: 'nomad@hiking-world.org',     status: 'Aktiv',    registeredAt: '02. Aug 2023' },
];

const STATUS_STYLES: Record<UserStatus, string> = {
  Aktiv:    'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Inaktiv:  'bg-slate-100 text-slate-600 border border-slate-200',
  Gesperrt: 'bg-red-100 text-red-700 border border-red-200',
};

const INITIALS_STYLES: Record<UserStatus, string> = {
  Aktiv:    'bg-moss/10 text-moss',
  Inaktiv:  'bg-slate-200 text-slate-500',
  Gesperrt: 'bg-red-100 text-red-600',
};

export const AdminUsersScreen: React.FC = () => {
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState<'Alle' | UserStatus>('Alle');

  const filtered = MOCK_USERS.filter((u) => {
    const matchesSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Alle' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout pageTitle="Benutzerverwaltung">
      <div className="p-4 md:p-8">

        {/* ── Filter Bar ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suche nach Name, E-Mail..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-moss/50 focus:border-moss transition-all outline-none text-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-sm text-slate-600 outline-none cursor-pointer"
            >
              <option value="Alle">Alle Status</option>
              <option value="Aktiv">Aktiv</option>
              <option value="Inaktiv">Inaktiv</option>
              <option value="Gesperrt">Gesperrt</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl transition-all text-sm">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span className="hidden lg:inline">Filter</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-forest text-white rounded-xl text-sm font-semibold hover:bg-forest-light transition-colors ml-auto md:ml-0">
              <span className="material-symbols-outlined text-sm">person_add</span>
              <span className="hidden sm:inline">Neuer Benutzer</span>
            </button>
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Benutzername</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">E-Mail-Adresse</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Registrierungsdatum</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">
                      Keine Benutzer gefunden.
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${INITIALS_STYLES[u.status]}`}>
                            {u.initials}
                          </div>
                          <span className="font-semibold text-slate-700">{u.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[u.status]}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{u.registeredAt}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-forest transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Zeige <span className="font-semibold text-slate-700">1–{filtered.length}</span> von{' '}
              <span className="font-semibold text-slate-700">{filtered.length}</span> Benutzern
            </p>
            <div className="flex gap-2">
              <button disabled className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-moss bg-moss/10 text-moss font-bold text-xs">
                1
              </button>
              <button disabled className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminUsersScreen;
