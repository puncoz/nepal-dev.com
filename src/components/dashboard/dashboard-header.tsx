"use client"

import { Bell, LogOut, Menu, MessageSquare, Search, Settings, User } from "lucide-react"
import { FunctionComponent, useState } from "react"

const DashboardHeader: FunctionComponent = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const notifications = [
    { id: 1, text: "New mentorship match found!", time: "2 min ago", unread: true },
    { id: 2, text: "Job alert: React Developer position", time: "1 hour ago", unread: true },
    { id: 3, text: "Your profile was viewed 5 times", time: "3 hours ago", unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl">🏔️</span>
              <h1 className="text-xl font-bold text-gray-900 ml-2">
                Nepal Dev Hub
              </h1>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <nav className="hidden md:flex space-x-6">
              <a href="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </a>
              <a href="/mentorship" className="text-gray-600 hover:text-gray-900">
                Mentorship
              </a>
              <a href="/jobs" className="text-gray-600 hover:text-gray-900">
                Jobs
              </a>
              <a href="/projects" className="text-gray-600 hover:text-gray-900">
                Projects
              </a>
              <a href="/community" className="text-gray-600 hover:text-gray-900">
                Community
              </a>
            </nav>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-lg mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
              <input
                type="text"
                placeholder="Search developers, jobs, projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
              <Search className="w-5 h-5"/>
            </button>

            {/* Messages */}
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <MessageSquare className="w-5 h-5"/>
              <span
                className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 relative"
              >
                <Bell className="w-5 h-5"/>
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                          notification.unread ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-900">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white"/>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  John Doe
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                  <div className="py-2">
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4 mr-3"/>
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-3"/>
                      Settings
                    </a>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="w-4 h-4 mr-3"/>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
              <Menu className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
