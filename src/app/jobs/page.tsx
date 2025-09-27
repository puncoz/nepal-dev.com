"use client"

import Layout from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Clock, DollarSign, Filter, MapPin, Search, Star, Users } from "lucide-react"
import { useState } from "react"

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedAt: string;
  applicants: number;
  featured: boolean;
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Nepal",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    salary: "NPR 80,000 - 120,000",
    description: "We are looking for a skilled Frontend Developer to join our team and work on cutting-edge web applications.",
    requirements: ["React", "TypeScript", "Next.js", "3+ years experience"],
    postedAt: "2 days ago",
    applicants: 24,
    featured: true,
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "StartupHub",
    location: "Pokhara, Nepal",
    type: "Full-time",
    salary: "NPR 60,000 - 90,000",
    description: "Join our backend team to build scalable APIs and microservices for our growing platform.",
    requirements: ["Node.js", "Express", "MongoDB", "2+ years experience"],
    postedAt: "1 week ago",
    applicants: 18,
    featured: false,
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Contract",
    salary: "NPR 40,000 - 60,000",
    description: "Create beautiful and intuitive user interfaces for web and mobile applications.",
    requirements: ["Figma", "Adobe Creative Suite", "User Research", "2+ years experience"],
    postedAt: "3 days ago",
    applicants: 31,
    featured: true,
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesType = typeFilter === "all" || job.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesLocation && matchesType
  })

  return (
    <Layout isAuthenticated={true} user={{ name: "John Doe", email: "john@example.com" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb
            items={[{ label: "Jobs" }]}
            className="mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Board</h1>
          <p className="text-gray-600">Find your next opportunity in Nepal's tech ecosystem</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="kathmandu">Kathmandu</SelectItem>
                  <SelectItem value="pokhara">Pokhara</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4"/>
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredJobs.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600"/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Companies Hiring</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Users className="h-8 w-8 text-green-600"/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New This Week</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600"/>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id}
                  className={`hover:shadow-lg transition-shadow ${job.featured ? "ring-2 ring-blue-200" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      {job.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg font-medium text-blue-600 mb-2">{job.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4"/>
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4"/>
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4"/>
                        {job.salary}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary">
                          {req}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Posted {job.postedAt}</span>
                      <span>{job.applicants} applicants</span>
                    </div>
                  </div>
                  <div className="ml-6 flex flex-col gap-2">
                    <Button>Apply Now</Button>
                    <Button variant="outline">Save Job</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </Layout>
  )
}
