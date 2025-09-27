"use client"

import Layout from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Calendar, Clock, Eye, Heart, MessageCircle, Search, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable React Applications: Lessons from the Field",
    excerpt: "Learn how to structure and optimize React applications for scale, based on real-world experience from Nepal's growing tech scene.",
    content: "Full article content here...",
    author: {
      name: "Rajesh Hamal",
      avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20male%20developer%20portrait&image_size=square",
      role: "Senior Frontend Developer",
    },
    publishedAt: "2024-01-15",
    readTime: 8,
    views: 1250,
    likes: 89,
    comments: 23,
    category: "Frontend",
    tags: ["React", "JavaScript", "Performance", "Architecture"],
    featured: true,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=react%20application%20architecture%20diagram%20modern&image_size=landscape_16_9",
  },
  {
    id: "2",
    title: "The Rise of Remote Work in Nepal's Tech Industry",
    excerpt: "Exploring how remote work has transformed the Nepali tech landscape and opened new opportunities for developers.",
    content: "Full article content here...",
    author: {
      name: "Priya Sharma",
      avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20female%20tech%20writer%20portrait&image_size=square",
      role: "Tech Writer & Community Manager",
    },
    publishedAt: "2024-01-12",
    readTime: 6,
    views: 980,
    likes: 67,
    comments: 18,
    category: "Career",
    tags: ["Remote Work", "Career", "Nepal Tech", "Opportunities"],
    featured: false,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=remote%20work%20nepal%20mountains%20laptop%20developer&image_size=landscape_16_9",
  },
  {
    id: "3",
    title: "Getting Started with Node.js: A Beginner's Guide",
    excerpt: "Complete guide for beginners to start their backend development journey with Node.js and Express.",
    content: "Full article content here...",
    author: {
      name: "Amit Thapa",
      avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20male%20backend%20developer%20portrait&image_size=square",
      role: "Backend Developer",
    },
    publishedAt: "2024-01-10",
    readTime: 12,
    views: 1580,
    likes: 124,
    comments: 31,
    category: "Backend",
    tags: ["Node.js", "Express", "JavaScript", "Tutorial"],
    featured: true,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=nodejs%20backend%20development%20code%20tutorial&image_size=landscape_16_9",
  },
  {
    id: "4",
    title: "UI/UX Design Trends in 2024: What Developers Should Know",
    excerpt: "Stay updated with the latest design trends and learn how to implement them in your development projects.",
    content: "Full article content here...",
    author: {
      name: "Sita Rai",
      avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20female%20ux%20designer%20portrait&image_size=square",
      role: "UX Designer",
    },
    publishedAt: "2024-01-08",
    readTime: 7,
    views: 890,
    likes: 76,
    comments: 15,
    category: "Design",
    tags: ["UI/UX", "Design Trends", "User Experience", "2024"],
    featured: false,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20ui%20ux%20design%20trends%202024%20interface&image_size=landscape_16_9",
  },
  {
    id: "5",
    title: "Contributing to Open Source: A Developer's Journey",
    excerpt: "Personal story and practical tips on how to start contributing to open source projects as a Nepali developer.",
    content: "Full article content here...",
    author: {
      name: "Krishna Maharjan",
      avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20male%20open%20source%20developer%20portrait&image_size=square",
      role: "Open Source Contributor",
    },
    publishedAt: "2024-01-05",
    readTime: 10,
    views: 1120,
    likes: 95,
    comments: 27,
    category: "Open Source",
    tags: ["Open Source", "GitHub", "Community", "Contribution"],
    featured: false,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=open%20source%20contribution%20github%20collaboration&image_size=landscape_16_9",
  },
]

const categories = ["All", "Frontend", "Backend", "Design", "Career", "Open Source", "Tutorial"]
const popularTags = ["React", "Node.js", "JavaScript", "UI/UX", "Career", "Remote Work", "Open Source", "Tutorial"]

const trendingPosts = [
  { id: "1", title: "Building Scalable React Applications", views: 1250 },
  { id: "3", title: "Getting Started with Node.js", views: 1580 },
  { id: "5", title: "Contributing to Open Source", views: 1120 },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("latest")

  const filteredPosts = mockPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.views - a.views
        case "liked":
          return b.likes - a.likes
        case "latest":
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
    })

  const featuredPost = mockPosts.find(post => post.featured)

  return (
    <Layout isAuthenticated={true} user={{ name: "John Doe", email: "john@example.com" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[{ label: "Blog" }]}
          className="mb-8"
        />
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nepal Dev Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and stories from Nepal&apos;s developer community
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center gap-2">
              <BookOpen className="h-4 w-4"/>
              Write Article
            </Button>
            <Button variant="outline">
              My Drafts
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="liked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-12 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 mb-4">
                  Featured Article
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">{featuredPost.author.name}</p>
                      <p className="text-xs text-gray-600">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4"/>
                      {new Date(featuredPost.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4"/>
                      {featuredPost.readTime} min read
                    </span>
                  </div>
                </div>

                <Button>Read Full Article</Button>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category"/>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Articles Grid */}
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        {post.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-sm">{post.author.name}</p>
                            <p className="text-xs text-gray-600">{post.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4"/>
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4"/>
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4"/>
                            {post.comments}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4"/>
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4"/>
                            {post.readTime} min read
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-4">
                        {post.tags.slice(0, 4).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5"/>
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <div key={post.id} className="flex items-start gap-3">
                    <div
                      className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-600">{post.views} views</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Stay Updated</h3>
                <p className="text-sm mb-4 opacity-90">
                  Get the latest articles and updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <Button variant="secondary" size="sm" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Write for Us */}
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3"/>
                <h3 className="font-semibold mb-2">Write for Us</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Share your knowledge with the community
                </p>
                <Button size="sm" className="w-full">
                  Submit Article
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
