import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Search, LogOut, FileText, X, Users, Calendar, Download, CalendarDays } from 'lucide-react';

import toast from 'react-hot-toast';


const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, else redirect
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin');
      } else {
        // Prefer displayName, fallback to email prefix (before @)
        const name = user.displayName || (user.email ? user.email.split('@')[0] : 'Admin');
        setUserName(name);
        fetchData();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const q = query(collection(db, 'registrations'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const records = [];
      querySnapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() });
      });
      setData(records);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/admin');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  // Returns a greeting based on current time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Formats a Firestore timestamp into separate date & 12-hour AM/PM time
  const formatDateTime = (timestamp) => {
    if (!timestamp?.toDate) return { date: 'N/A', time: '' };
    const d = timestamp.toDate();
    const date = d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const time = d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return { date, time };
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.mobile.includes(searchTerm);

    // dateFilter is a "YYYY-MM-DD" string from the <input type="date" />
    let matchesDate = true;
    if (dateFilter && item.timestamp?.toDate) {
      const itemDate = item.timestamp.toDate();
      const itemDateStr = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}-${String(itemDate.getDate()).padStart(2, '0')}`;
      matchesDate = itemDateStr === dateFilter;
    }

    return matchesSearch && matchesDate;
  });


  // Exports the currently filtered records to a downloadable Excel (.xlsx) file
  const handleExportExcel = async () => {
    if (filteredData.length === 0) {
      toast.error('No records to export');
      return;
    }

    const toastId = toast.loading('Preparing Excel file...');
    try {
      // Dynamically import xlsx so it doesn't block initial page load (fixes Mobile PageSpeed 0 score)
      const XLSX = await import('xlsx');

      const rows = filteredData.map((record, index) => {
        const { date, time } = formatDateTime(record.timestamp);
        return {
          'S.No.': index + 1,
          Name: record.name || '',
          'Mobile Number': record.mobile || '',
          'Parlour Name': record.parlour || '',
          City: record.city || '',
          Date: date,
          Time: time,
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(rows);
      // Reasonable column widths so the sheet is readable out of the box
      worksheet['!cols'] = [
        { wch: 8 },  // S.No.
        { wch: 22 }, // Name
        { wch: 16 }, // Mobile Number
        { wch: 30 }, // Parlour Name
        { wch: 18 }, // City
        { wch: 14 }, // Date
        { wch: 12 }, // Time
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

      const fileDate = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(workbook, `Registrations_${fileDate}.xlsx`);
      toast.success('Excel file downloaded', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Failed to create Excel file', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-brand-pink/10 flex items-center justify-center">
              <FileText className="text-brand-pink h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white leading-tight">
                Registrations
              </h1>
              {userName && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {getGreeting()}, <span className="font-medium text-slate-700 dark:text-slate-300">{userName}</span> 👋
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">

            <button
              onClick={handleExportExcel}
              className="flex items-center justify-center gap-2 bg-brand-pink text-white px-3.5 sm:px-4 py-2.5 rounded-xl hover:bg-brand-pink/90 active:scale-95 transition-all font-medium text-sm shadow-sm shadow-brand-pink/30 flex-1 sm:flex-none"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export Excel</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3.5 sm:px-4 py-2.5 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 transition-all font-medium text-sm flex-1 sm:flex-none"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 flex items-center gap-4 shadow-sm">
            <div className="h-11 w-11 rounded-xl bg-brand-pink/10 flex items-center justify-center shrink-0">
              <Users className="text-brand-pink h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Registrations
              </p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">{data.length}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 flex items-center gap-4 shadow-sm">
            <div className="h-11 w-11 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
              <Calendar className="text-brand-gold h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Showing
              </p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">{filteredData.length} results</p>
            </div>
          </div>
        </div>

        {/* Table / cards card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by mobile number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink outline-none transition-all dark:text-white text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="relative sm:w-56">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <CalendarDays className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-10 pr-9 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink outline-none transition-all dark:text-white text-sm [color-scheme:light] dark:[color-scheme:dark]"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {(searchTerm || dateFilter) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setDateFilter('');
                  }}
                  className="text-sm font-medium text-brand-pink hover:underline whitespace-nowrap self-center sm:self-auto"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="p-10 flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
              <div className="h-8 w-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Loading records...</span>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center gap-2 text-center">
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mb-1">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium">No records found</p>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                {searchTerm || dateFilter
                  ? 'Try a different mobile number or date'
                  : 'Registrations will appear here'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop / tablet: table view (sm and up) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      <th className="p-4 px-6 w-16">S.No.</th>
                      <th className="p-4 px-6">Name</th>
                      <th className="p-4 px-6">Mobile Number</th>
                      <th className="p-4 px-6">Parlour Name</th>
                      <th className="p-4 px-6">City</th>
                      <th className="p-4 px-6">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {filteredData.map((record, index) => {
                      const { date, time } = formatDateTime(record.timestamp);
                      return (
                        <tr key={record.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-700/20 transition-colors">
                          <td className="p-4 px-6">
                            <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                              {index + 1}
                            </span>
                          </td>
                          <td className="p-4 px-6">
                            <span className="text-slate-800 dark:text-slate-200 font-medium">
                              {record.name}
                            </span>
                          </td>
                          <td className="p-4 px-6 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                            {record.mobile}
                          </td>
                          <td className="p-4 px-6 max-w-[140px] sm:max-w-[200px] md:max-w-[260px] lg:max-w-[340px] align-top">
                            <span className="inline-block max-w-full px-3 py-1.5 rounded-lg text-sm font-medium bg-brand-pink/10 text-brand-pink whitespace-normal break-words leading-relaxed">
                              {record.parlour}
                            </span>
                          </td>
                          <td className="p-4 px-6 text-slate-600 dark:text-slate-400">
                            {record.city}
                          </td>
                          <td className="p-4 px-6">
                            <div className="text-sm text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                              {date}
                            </div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                              {time}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile: card view (below sm) */}
              {/* Mobile: card view (below sm) */}
              <div className="sm:hidden p-3 space-y-3 bg-slate-50 dark:bg-slate-900/50">
                {filteredData.map((record, index) => {
                  const { date, time } = formatDateTime(record.timestamp);
                  return (
                    <div
                      key={record.id}
                      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-4 active:scale-[0.99] transition-transform"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm truncate">
                            {record.name}
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                            {record.mobile}
                          </p>
                        </div>
                      </div>

                      {(record.parlour || record.city) && (
                        <div className="flex flex-wrap gap-2 mt-3 pl-[44px]">
                          {record.parlour && (
                            <span className="max-w-full px-2.5 py-1.5 rounded-lg text-xs font-medium bg-brand-pink/10 text-brand-pink break-all whitespace-normal leading-relaxed">
                              {record.parlour}
                            </span>
                          )}
                          {record.city && (
                            <span className="max-w-full px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 break-words whitespace-normal">
                              {record.city}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;