import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaUser,
  FaGraduationCap,
  FaMoneyBillWave,
  FaClipboardList,
  FaStar,
  FaChartLine,
  FaSpinner,
  FaChartPie,
  FaChartBar,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const Overview = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    users: [],
    scholarships: [],
    applications: [],
    reviews: [],
    analytics: {},
  });

  const userRole = role?.toLowerCase().replace(/"/g, "").trim();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userRole === "admin") {
          const [usersRes, scholarshipsRes, analyticsRes] = await Promise.all([
            axiosSecure.get("/users"),
            axiosSecure.get("/scholarships"),
            axiosSecure.get("/analytics"),
          ]);
          setData({
            users: Array.isArray(usersRes.data) ? usersRes.data : usersRes.data?.result || [],
            scholarships: Array.isArray(scholarshipsRes.data) ? scholarshipsRes.data : scholarshipsRes.data?.result || [],
            analytics: analyticsRes.data || {},
            applications: [],
            reviews: [],
          });
        } else if (userRole === "moderator") {
          const [applicationsRes, reviewsRes] = await Promise.all([
            axiosSecure.get("/applications"),
            axiosSecure.get("/reviews"),
          ]);
          setData({
            applications: Array.isArray(applicationsRes.data) ? applicationsRes.data : [],
            reviews: Array.isArray(reviewsRes.data) ? reviewsRes.data : [],
            users: [],
            scholarships: [],
            analytics: {},
          });
        } else if (userRole === "student" && user?.email) {
          const [myApplicationsRes, myReviewsRes] = await Promise.all([
            axiosSecure.get(`/applications/user/${user.email}`),
            axiosSecure.get(`/reviews/${user.email}`),
          ]);
          setData({
            applications: Array.isArray(myApplicationsRes.data) ? myApplicationsRes.data : [],
            reviews: Array.isArray(myReviewsRes.data) ? myReviewsRes.data : [],
            users: [],
            scholarships: [],
            analytics: {},
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!roleLoading && userRole) {
      if (userRole === 'student' && !user?.email) {
        setLoading(false);
      } else {
        fetchData();
      }
    }
  }, [userRole, roleLoading, user?.email, axiosSecure]);

  if (roleLoading || loading) {
    return <LoadingDashboard />;
  }

  const StatCard = ({ title, count, icon: Icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-transform hover:-translate-y-1 hover:shadow-md">
      <div className={`p-4 rounded-xl ${color} text-white shadow-lg`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
    </div>
  );

  const renderAdminView = () => {
    const categoryCounts = data.scholarships.reduce((acc, curr) => {
      const cat = curr.scholarshipCategory || "Other";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    const barChartData = Object.keys(categoryCounts).map(key => ({
      name: key,
      value: categoryCounts[key]
    })).slice(0, 5);
    const roleCounts = data.users.reduce((acc, curr) => {
      const role = curr.role ? curr.role.toLowerCase() : "student";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});
    const pieChartData = Object.keys(roleCounts).map((key, index) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: roleCounts[key],
      color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4]
    }));

    const lineChartData = [...data.scholarships]
      .sort((a, b) => (b.applicationFees || 0) - (a.applicationFees || 0))
      .slice(0, 7)
      .map(s => ({
        name: s.universityName?.substring(0, 10) + '...',
        fees: parseInt(s.applicationFees) || 0,
        stipend: parseInt(s.stipend) || 0
      }));

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Users" count={data.users.length} icon={FaUser} color="bg-gradient-to-r from-blue-500 to-blue-600" subtext="Active platform users" />
          <StatCard title="Total Scholarships" count="29" icon={FaGraduationCap} color="bg-gradient-to-r from-purple-500 to-purple-600" subtext="Available opportunities" />
          <StatCard title="Total Revenue" count={`$${data.analytics?.totalFeesCollected || 0}`} icon={FaMoneyBillWave} color="bg-gradient-to-r from-green-500 to-green-600" subtext="Application fees collected" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartBar className="text-blue-500" /> Scholarship Categories</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" fontSize={10} stroke="#888" interval={0} angle={-15} textAnchor="end" />
                  <YAxis fontSize={12} stroke="#888" />
                  <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartPie className="text-green-500" /> User Roles</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartLine className="text-purple-500" /> Top Scholarship Fees</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" fontSize={12} stroke="#888" />
                  <YAxis fontSize={12} stroke="#888" />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="fees" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} name="Application Fee ($)" />
                  <Line type="monotone" dataKey="stipend" stroke="#82ca9d" strokeWidth={3} dot={{ r: 4 }} name="Stipend ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaUser className="text-purple-500" /> Recent Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-400 border-b border-gray-100"><th className="py-3 font-medium">Name</th><th className="py-3 font-medium">Email</th><th className="py-3 font-medium">Role</th></tr>
              </thead>
              <tbody>
                {data.users.slice(0, 5).map((u, i) => (
                  <tr key={u._id || i} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-sm font-medium text-gray-700 flex items-center gap-2"><img src={u.photo || "https://i.ibb.co/2y9YpJH/user-placeholder.png"} className="w-8 h-8 rounded-full object-cover" alt="" />{u.name}</td>
                    <td className="py-3 text-sm text-gray-500">{u.email}</td>
                    <td className="py-3 text-sm"><span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">{u.role || "student"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderModeratorView = () => {
    const statusCounts = data.applications.reduce((acc, curr) => {
      const status = curr.status || "pending";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    const pieChartData = Object.keys(statusCounts).map((key, index) => ({
      name: key,
      value: statusCounts[key],
      color: ['#FBBF24', '#10B981', '#EF4444', '#3B82F6'][index % 4]
    }));

    const ratingCounts = data.reviews.reduce((acc, curr) => {
      const rating = curr.rating || 0;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});
    const barChartData = [1, 2, 3, 4, 5].map(r => ({
      name: `${r} Stars`,
      value: ratingCounts[r] || 0
    }));
    const timelineData = data.applications
      .map(app => ({ date: app.date ? new Date(app.date).toLocaleDateString() : 'Unknown', val: 1 }))
      .reduce((acc, curr) => {

        const existing = acc.find(item => item.date === curr.date);
        if (existing) existing.count += 1;
        else acc.push({ date: curr.date, count: 1 });
        return acc;
      }, [])
      .slice(0, 7);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard title="Total Applications" count={data.applications.length} icon={FaClipboardList} color="bg-gradient-to-r from-orange-500 to-orange-600" subtext="Submissions to review" />
          <StatCard title="Total Reviews" count={data.reviews.length} icon={FaStar} color="bg-gradient-to-r from-yellow-500 to-amber-500" subtext="Feedback from students" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartPie className="text-orange-500" /> Application Status</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
              {pieChartData.length === 0 && <div className="text-center text-gray-400 py-10">No data</div>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartBar className="text-yellow-500" /> Review Ratings</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" fontSize={12} stroke="#888" />
                  <YAxis fontSize={12} stroke="#888" allowDecimals={false} />
                  <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartLine className="text-blue-500" /> Applications Timeline</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData.length > 0 ? timelineData : [{ date: 'Today', count: 0 }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" fontSize={12} stroke="#888" />
                  <YAxis fontSize={12} stroke="#888" allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} name="New Applications" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaClipboardList className="text-blue-500" /> Recent Applications</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-400 border-b border-gray-100"><th className="py-3 font-medium">Applicant</th><th className="py-3 font-medium">Date</th><th className="py-3 font-medium">Status</th></tr>
              </thead>
              <tbody>
                {data.applications.slice(0, 5).map((app, i) => (
                  <tr key={app._id || i} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-sm font-medium text-gray-700">{app.userName || "Applicant"}<div className="text-xs text-gray-400 font-normal">{app.universityName}</div></td>
                    <td className="py-3 text-sm text-gray-500">{app.date ? new Date(app.date).toLocaleDateString() : 'N/A'}</td>
                    <td className="py-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${app.status === 'approved' ? 'bg-green-100 text-green-600' : app.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>{app.status || "pending"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderStudentView = () => {
    const statusCounts = data.applications.reduce((acc, curr) => {
      const status = curr.status || "pending";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    const barChartData = Object.keys(statusCounts).map(key => ({
      name: key,
      value: statusCounts[key]
    }));

    const subjectCounts = data.applications.reduce((acc, curr) => {
      const sub = curr.subjectCategory || "General";
      acc[sub] = (acc[sub] || 0) + 1;
      return acc;
    }, {});
    const pieChartData = Object.keys(subjectCounts).map((key, index) => ({
      name: key,
      value: subjectCounts[key],
      color: ['#10B981', '#3B82F6', '#8B5CF6', '#F472B6'][index % 4]
    }));

    const activityData = [...data.applications.map(a => ({ date: a.date, type: 'App' })), ...data.reviews.map(r => ({ date: r.date, type: 'Review' }))]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reduce((acc, curr) => {
        const d = curr.date ? new Date(curr.date).toLocaleDateString() : 'Unknown';
        const existing = acc.find(x => x.name === d);
        if (existing) existing.activity += 1;
        else acc.push({ name: d, activity: 1 });
        return acc;
      }, [])
      .slice(-10);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard title="My Applications" count={data.applications.length} icon={FaClipboardList} color="bg-gradient-to-r from-emerald-500 to-green-600" subtext="Scholarships applied for" />
          <StatCard title="My Reviews" count={data.reviews.length} icon={FaStar} color="bg-gradient-to-r from-teal-500 to-cyan-600" subtext="Feedbacks shared" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartBar className="text-emerald-500" /> Application Status</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" fontSize={12} stroke="#888" hide />
                  <YAxis dataKey="name" type="category" fontSize={12} stroke="#888" width={80} />
                  <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} barSize={30}>
                    {barChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.name === 'rejected' ? '#EF4444' : entry.name === 'completed' ? '#10B981' : '#FBBF24'} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>


          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartPie className="text-teal-500" /> Applied Subjects</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
              {pieChartData.length === 0 && <div className="text-center text-gray-400 py-10">No applications</div>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaChartLine className="text-cyan-500" /> Recent Activity</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData.length > 0 ? activityData : [{ name: 'None', activity: 0 }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" fontSize={12} stroke="#888" />
                  <YAxis fontSize={12} stroke="#888" allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="activity" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4 }} name="Actions" />
                </LineChart>
              </ResponsiveContainer>
              {activityData.length === 0 && <div className="text-center text-gray-400 py-10">No recent activity</div>}
            </div>
          </div>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaClipboardList className="text-teal-500" /> My Recent Applications</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-400 border-b border-gray-100"><th className="py-3 font-medium">University</th><th className="py-3 font-medium">Subject</th><th className="py-3 font-medium">Status</th></tr>
              </thead>
              <tbody>
                {data.applications.slice(0, 5).map((app, i) => (
                  <tr key={app._id || i} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-sm font-medium text-gray-700">{app.universityName}</td>
                    <td className="py-3 text-sm text-gray-500">{app.subjectCategory}</td>
                    <td className="py-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${app.status === 'approved' || app.status === 'completed' ? 'bg-green-100 text-green-600' : app.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>{app.status || "pending"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="w-full md:w-11/12 mx-auto space-y-8 pb-10">
      <title>Overview | {userRole}</title>

      <div className="bg-linear-to-r from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 capitalize">
            {userRole} Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome back, <span className="font-semibold text-white">{user?.displayName}</span>. Here's what's happening.
          </p>
        </div>
      </div>

      {userRole === "admin" && renderAdminView()}
      {userRole === "moderator" && renderModeratorView()}
      {userRole === "student" && renderStudentView()}
    </div>
  );
};

export default Overview;