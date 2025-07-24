import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MessageSquare, Clock } from 'lucide-react';

const SupportDashboard = () => {
  // Mock data for demonstration
  const categoryData = [
    { name: 'Setup', value: 35, color: '#3B82F6' },
    { name: 'Connectivity', value: 28, color: '#10B981' },
    { name: 'Voice Control', value: 20, color: '#F59E0B' },
    { name: 'Mobile App', value: 12, color: '#EF4444' },
    { name: 'Automation', value: 5, color: '#8B5CF6' }
  ];

  const responseTimeData = [
    { time: '9 AM', responses: 45 },
    { time: '10 AM', responses: 52 },
    { time: '11 AM', responses: 48 },
    { time: '12 PM', responses: 61 },
    { time: '1 PM', responses: 55 },
    { time: '2 PM', responses: 67 },
    { time: '3 PM', responses: 58 }
  ];

  const stats = [
    {
      title: 'Total Inquiries Today',
      value: '247',
      change: '+12%',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      title: 'AI Resolution Rate',
      value: '96%',
      change: '+2%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8%',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Avg Response Time',
      value: '2.1s',
      change: '-0.3s',
      icon: Clock,
      color: 'orange'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Support Dashboard</h1>
          <p className="text-gray-600 mt-2">SmartHome+ AI Customer Support Analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from yesterday
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Response Volume Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Volume Today</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="responses" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inquiry Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent AI Interactions</h3>
          </div>
          <div className="divide-y">
            {[
              { time: '2:34 PM', query: 'How do I reset my SmartHome+ device?', category: 'Setup', resolved: true },
              { time: '2:31 PM', query: 'Voice commands not working', category: 'Voice Control', resolved: true },
              { time: '2:28 PM', query: 'App keeps crashing on my phone', category: 'Mobile App', resolved: false },
              { time: '2:25 PM', query: 'Automation schedule not running', category: 'Automation', resolved: true },
              { time: '2:22 PM', query: 'Device won\'t connect to WiFi', category: 'Connectivity', resolved: true }
            ].map((interaction, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{interaction.query}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{interaction.time}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {interaction.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        interaction.resolved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {interaction.resolved ? 'AI Resolved' : 'Escalated'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;

