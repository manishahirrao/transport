'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, 
  Shield, 
  BarChart3, 
  MapPin, 
  Users, 
  FileText, 
  ArrowRight, 
  Play,
  Star,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  Menu,
  X,
  Building,
  Utensils,
  HardHat,
  BookOpen,
  FileSpreadsheet,
  Zap,
  Award,
  Target,
  Phone,
  Mail,
  Settings,
  Eye,
  Activity,
  Route,
  FileCheck,
  PieChart,
  Calendar,
  User,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const FleetManagementApp = () => {
  const [currentView, setCurrentView] = useState('landing')
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // ROI Calculator state
  const [truckCount, setTruckCount] = useState([15])
  const [monthlyFuelCost, setMonthlyFuelCost] = useState([250000])
  const [accidentsPerYear, setAccidentsPerYear] = useState([3])
  
  const calculateROI = () => {
    const trucks = truckCount[0]
    const fuelCost = monthlyFuelCost[0]
    const accidents = accidentsPerYear[0]
    
    const fuelSavings = fuelCost * 0.15 // 15% fuel savings
    const accidentReduction = accidents * 50000 * 0.4 // 40% accident reduction
    const maintenanceSavings = trucks * 8000 // ₹8k per truck per month
    
    const totalMonthlySavings = fuelSavings + (accidentReduction / 12) + maintenanceSavings
    const annualSavings = totalMonthlySavings * 12
    const costPerTruck = 700
    const annualCost = trucks * costPerTruck * 12
    const netSavings = annualSavings - annualCost
    
    return {
      monthlySavings: Math.round(totalMonthlySavings),
      annualSavings: Math.round(annualSavings),
      netSavings: Math.round(netSavings),
      roi: Math.round((netSavings / annualCost) * 100)
    }
  }
  
  const roi = calculateROI()

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => { setCurrentView('landing'); setCurrentPage('home'); }}
            className="flex items-center space-x-2 hover:opacity-80"
          >
            <Truck className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">FleetPulse</span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <div className="relative group">
              <button className="text-foreground hover:text-primary">Products</button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <button 
                    onClick={() => setCurrentPage('vehicle-tracking')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Vehicle Tracking
                  </button>
                  <button 
                    onClick={() => setCurrentPage('driver-safety')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Shield className="inline h-4 w-4 mr-2" />
                    Driver Safety
                  </button>
                  <button 
                    onClick={() => setCurrentPage('equipment-monitoring')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Activity className="inline h-4 w-4 mr-2" />
                    Equipment Monitoring
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <button className="text-foreground hover:text-primary">Solutions</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <button 
                    onClick={() => setCurrentPage('trucking')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Truck className="inline h-4 w-4 mr-2" />
                    Trucking
                  </button>
                  <button 
                    onClick={() => setCurrentPage('construction')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <HardHat className="inline h-4 w-4 mr-2" />
                    Construction
                  </button>
                  <button 
                    onClick={() => setCurrentPage('food-beverage')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Utensils className="inline h-4 w-4 mr-2" />
                    Food & Beverage
                  </button>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setCurrentPage('pricing')}
              className="text-foreground hover:text-primary"
            >
              Pricing
            </button>
            
            <div className="relative group">
              <button className="text-foreground hover:text-primary">Resources</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <button 
                    onClick={() => setCurrentPage('blog')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <BookOpen className="inline h-4 w-4 mr-2" />
                    Blog
                  </button>
                  <button 
                    onClick={() => setCurrentPage('case-studies')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <FileSpreadsheet className="inline h-4 w-4 mr-2" />
                    Case Studies
                  </button>
                  <button 
                    onClick={() => setCurrentPage('guides')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <BookOpen className="inline h-4 w-4 mr-2" />
                    Guides
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setCurrentPage('login')}>Login</Button>
            <Button onClick={() => setCurrentView('dashboard')}>Get Started</Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-4">
              <button 
                onClick={() => { setCurrentPage('vehicle-tracking'); setMobileMenuOpen(false); }}
                className="block text-foreground hover:text-primary"
              >
                Vehicle Tracking
              </button>
              <button 
                onClick={() => { setCurrentPage('driver-safety'); setMobileMenuOpen(false); }}
                className="block text-foreground hover:text-primary"
              >
                Driver Safety
              </button>
              <button 
                onClick={() => { setCurrentPage('pricing'); setMobileMenuOpen(false); }}
                className="block text-foreground hover:text-primary"
              >
                Pricing
              </button>
              <button 
                onClick={() => { setCurrentPage('blog'); setMobileMenuOpen(false); }}
                className="block text-foreground hover:text-primary"
              >
                Blog
              </button>
              <div className="pt-4 border-t border-border">
                <Button variant="ghost" className="w-full mb-2" onClick={() => setCurrentPage('login')}>Login</Button>
                <Button className="w-full" onClick={() => setCurrentView('dashboard')}>Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  // Vehicle Tracking Page
  const VehicleTrackingPage = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Real-time GPS Tracking</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Track Every Vehicle in Real-Time
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get precise location data, route history, and instant alerts for all your vehicles with our advanced GPS tracking system.
            </p>
            <Button size="lg" onClick={() => setCurrentView('dashboard')}>
              Start Tracking <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Live Location Updates",
                description: "Track vehicles every 30 seconds with precise GPS coordinates and address details."
              },
              {
                icon: Route,
                title: "Route History",
                description: "Complete trip history with timestamps, stops, and route visualization."
              },
              {
                icon: AlertTriangle,
                title: "Geofence Alerts", 
                description: "Set virtual boundaries and get instant notifications when vehicles enter or exit zones."
              },
              {
                icon: Clock,
                title: "Trip Reports",
                description: "Detailed reports on trip duration, distance covered, and idle time analysis."
              },
              {
                icon: TrendingUp,
                title: "Route Optimization",
                description: "AI-powered suggestions to reduce fuel costs and improve delivery times."
              },
              {
                icon: Shield,
                title: "Anti-theft Protection",
                description: "Immediate alerts for unauthorized movement and vehicle recovery assistance."
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Track Your Fleet?</h2>
          <p className="text-xl text-muted-foreground mb-8">Start with a 30-day free trial</p>
          <Button size="lg" onClick={() => setCurrentView('dashboard')}>
            Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )

  // Driver Safety Page
  const DriverSafetyPage = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Driver Safety Hub</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Protect Your Drivers & Reduce Accidents
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Monitor driver behavior, provide safety coaching, and prevent accidents with our comprehensive safety management system.
            </p>
            <Button size="lg" onClick={() => setCurrentView('dashboard')}>
              Improve Safety <Shield className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Real-time Safety Monitoring</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Speed Monitoring</h3>
                    <p className="text-muted-foreground">Track and alert on speed violations with customizable limits for different routes.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Harsh Driving Detection</h3>
                    <p className="text-muted-foreground">Identify sudden braking, rapid acceleration, and sharp turns automatically.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Driver Scoring</h3>
                    <p className="text-muted-foreground">Comprehensive safety scores based on driving patterns and behaviors.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Top Drivers This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Rajesh Kumar", score: 98, improvement: "+5" },
                    { name: "Priya Sharma", score: 96, improvement: "+3" },
                    { name: "Amit Patel", score: 94, improvement: "+7" }
                  ].map((driver, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{driver.name}</div>
                        <div className="text-sm text-muted-foreground">Safety Score: {driver.score}/100</div>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {driver.improvement}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )

  // Pricing Page
  const PricingPage = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              No setup fees. No hidden costs. Cancel anytime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "₹699",
                period: "per truck/month",
                description: "Perfect for small fleets (5-15 trucks)",
                features: [
                  "Real-time GPS tracking",
                  "Basic reports",
                  "Mobile app access",
                  "Email support",
                  "Geofencing (5 zones)"
                ],
                cta: "Start Free Trial",
                popular: false
              },
              {
                name: "Professional", 
                price: "₹999",
                period: "per truck/month",
                description: "Most popular for growing fleets (15-35 trucks)",
                features: [
                  "Everything in Starter",
                  "Driver safety monitoring",
                  "Route optimization",
                  "Advanced analytics",
                  "Phone support",
                  "Unlimited geofencing",
                  "Maintenance alerts"
                ],
                cta: "Start Free Trial",
                popular: true
              },
              {
                name: "Enterprise",
                price: "₹1,499",
                period: "per truck/month", 
                description: "For large fleets (35+ trucks)",
                features: [
                  "Everything in Professional",
                  "AI-powered insights",
                  "Custom integrations",
                  "Dedicated support",
                  "Compliance management",
                  "Multi-location support",
                  "Custom reporting"
                ],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setCurrentView('dashboard')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />30-day free trial</span>
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />No setup fees</span>
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />Cancel anytime</span>
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />24/7 monitoring</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  // Blog Page
  const BlogPage = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Fleet Management Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Latest trends, tips, and best practices for Indian fleet operators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "5 Ways to Reduce Fuel Costs in 2025",
                excerpt: "Discover proven strategies that helped Indian fleet operators save up to 20% on fuel expenses.",
                author: "Rahul Gupta",
                date: "January 15, 2025",
                readTime: "5 min read",
                category: "Cost Optimization"
              },
              {
                title: "New RTO Compliance Requirements",
                excerpt: "Everything you need to know about the latest regulatory changes affecting commercial vehicles.",
                author: "Priya Sharma",
                date: "January 10, 2025", 
                readTime: "8 min read",
                category: "Compliance"
              },
              {
                title: "Driver Safety Best Practices",
                excerpt: "How to implement effective safety programs that reduce accidents by 40%.",
                author: "Amit Patel",
                date: "January 8, 2025",
                readTime: "6 min read",
                category: "Safety"
              },
              {
                title: "AI in Fleet Management: A Complete Guide",
                excerpt: "Understanding how artificial intelligence is transforming fleet operations in India.",
                author: "Sonia Kapoor",
                date: "January 5, 2025",
                readTime: "10 min read",
                category: "Technology"
              },
              {
                title: "Route Optimization for Indian Roads",
                excerpt: "Navigate traffic, tolls, and road conditions to optimize delivery routes.",
                author: "Vikram Singh",
                date: "January 3, 2025",
                readTime: "7 min read",
                category: "Operations"
              },
              {
                title: "Maintenance Scheduling Made Simple",
                excerpt: "Predictive maintenance strategies to reduce breakdowns and extend vehicle life.",
                author: "Meera Joshi",
                date: "December 28, 2024",
                readTime: "4 min read",
                category: "Maintenance"
              }
            ].map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{article.category}</Badge>
                  <CardTitle className="text-xl hover:text-primary cursor-pointer">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{article.date}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </div>
      </section>
    </div>
  )

  // Enhanced Dashboard with All Modules
  const EnhancedDashboard = () => {
    const [activeModule, setActiveModule] = useState('overview')
    
    const sidebarItems = [
      { id: 'overview', icon: BarChart3, label: 'Overview', active: activeModule === 'overview' },
      { id: 'tracking', icon: MapPin, label: 'Fleet Tracking', active: activeModule === 'tracking' },
      { id: 'safety', icon: Shield, label: 'Safety Hub', active: activeModule === 'safety' },
      { id: 'operations', icon: TrendingUp, label: 'Operations', active: activeModule === 'operations' },
      { id: 'compliance', icon: FileText, label: 'Compliance', active: activeModule === 'compliance' },
      { id: 'reports', icon: PieChart, label: 'Reports', active: activeModule === 'reports' }
    ]

    return (
      <div className="min-h-screen bg-background">
        {/* Dashboard Header */}
        <header className="bg-white border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setCurrentView('landing')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <Truck className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold text-foreground">FleetPulse</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">Demo Mode</Badge>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-border min-h-screen">
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    item.active 
                      ? 'bg-primary text-white' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Overview Module */}
            {activeModule === 'overview' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Fleet Overview</h1>
                  <p className="text-muted-foreground">Welcome back! Here's what's happening with your fleet today.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { title: 'Active Vehicles', value: '28', change: '+2 from yesterday', icon: Truck, color: 'text-green-600' },
                    { title: 'Total Distance', value: '1,247 km', change: 'Today', icon: MapPin, color: 'text-blue-600' },
                    { title: 'Fuel Efficiency', value: '6.2 km/L', change: '+0.3 from last week', icon: TrendingUp, color: 'text-green-600' },
                    { title: 'Safety Score', value: '94/100', change: '+5 points', icon: Shield, color: 'text-green-600' }
                  ].map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                          </div>
                          <stat.icon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Demo Fleet Map */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Live Fleet Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 text-center">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map Coming Soon</h3>
                      <p className="text-muted-foreground mb-4">
                        Real-time vehicle tracking with Google Maps integration will be displayed here.
                      </p>
                      <Badge>Demo Mode - Placeholder</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { icon: CheckCircle, title: 'Vehicle MH-12-AB-1234 completed route', time: '2 minutes ago', color: 'text-green-600' },
                        { icon: AlertTriangle, title: 'Speed alert for vehicle GJ-01-CD-5678', time: '15 minutes ago', color: 'text-yellow-600' },
                        { icon: Clock, title: 'Driver Rahul Kumar started shift', time: '1 hour ago', color: 'text-blue-600' },
                        { icon: TrendingUp, title: 'Fuel efficiency improved by 5%', time: '2 hours ago', color: 'text-green-600' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50">
                          <activity.icon className={`h-5 w-5 ${activity.color}`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Safety Hub Module */}
            {activeModule === 'safety' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Safety Hub</h1>
                  <p className="text-muted-foreground">Monitor driver behavior and safety metrics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-green-500" />
                        Overall Safety Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">94/100</div>
                      <p className="text-sm text-muted-foreground">+5 points this month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                        Active Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-yellow-600">3</div>
                      <p className="text-sm text-muted-foreground">2 speed violations, 1 harsh braking</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-blue-500" />
                        Safe Drivers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">25/28</div>
                      <p className="text-sm text-muted-foreground">89% of fleet driving safely</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Driver Performance Rankings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Rajesh Kumar", score: 98, violations: 0, trend: "up" },
                        { name: "Priya Sharma", score: 96, violations: 0, trend: "up" },
                        { name: "Amit Patel", score: 92, violations: 1, trend: "down" },
                        { name: "Suresh Yadav", score: 89, violations: 2, trend: "up" }
                      ].map((driver, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-sm text-muted-foreground">{driver.violations} violations this month</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-bold text-lg">{driver.score}/100</div>
                              <div className={`text-sm ${driver.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {driver.trend === 'up' ? '↗ Improving' : '↘ Declining'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Operations Module */}
            {activeModule === 'operations' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Operations</h1>
                  <p className="text-muted-foreground">Route optimization and operational efficiency</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Route Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { route: "Mumbai to Pune", savings: "₹2,400", time: "45 min saved" },
                          { route: "Delhi to Agra", savings: "₹1,800", time: "30 min saved" },
                          { route: "Bangalore to Chennai", savings: "₹3,200", time: "1.2 hr saved" }
                        ].map((route, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <div className="font-medium">{route.route}</div>
                              <div className="text-sm text-muted-foreground">Optimized route available</div>
                            </div>
                            <div className="text-right">
                              <div className="text-green-600 font-semibold">{route.savings}</div>
                              <div className="text-sm text-muted-foreground">{route.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Fuel Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-foreground">6.2 km/L</div>
                          <div className="text-sm text-muted-foreground">Average fuel efficiency</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Best performing vehicle</span>
                            <span className="text-sm font-medium">7.8 km/L</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Worst performing vehicle</span>
                            <span className="text-sm font-medium">4.2 km/L</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Monthly fuel cost</span>
                            <span className="text-sm font-medium">₹2,45,000</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Compliance Module */}
            {activeModule === 'compliance' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Compliance Management</h1>
                  <p className="text-muted-foreground">Stay compliant with Indian regulations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileCheck className="h-5 w-5 mr-2 text-green-500" />
                        RTO Permits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Valid</span>
                          <span className="text-sm font-medium text-green-600">25</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Expiring (30 days)</span>
                          <span className="text-sm font-medium text-yellow-600">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Expired</span>
                          <span className="text-sm font-medium text-red-600">0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-blue-500" />
                        Insurance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Valid</span>
                          <span className="text-sm font-medium text-green-600">27</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Expiring (30 days)</span>
                          <span className="text-sm font-medium text-yellow-600">1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Expired</span>
                          <span className="text-sm font-medium text-red-600">0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-purple-500" />
                        Maintenance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Up to date</span>
                          <span className="text-sm font-medium text-green-600">24</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Due soon</span>
                          <span className="text-sm font-medium text-yellow-600">4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Overdue</span>
                          <span className="text-sm font-medium text-red-600">0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Renewals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { vehicle: "MH-12-AB-1234", type: "Insurance", expires: "Feb 15, 2025", days: 26 },
                        { vehicle: "GJ-01-CD-5678", type: "RTO Permit", expires: "Feb 20, 2025", days: 31 },
                        { vehicle: "DL-03-EF-9012", type: "Pollution Check", expires: "Feb 25, 2025", days: 36 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium">{item.vehicle}</div>
                            <div className="text-sm text-muted-foreground">{item.type}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{item.expires}</div>
                            <div className={`text-sm ${item.days <= 30 ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                              {item.days} days left
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Reports Module */}
            {activeModule === 'reports' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Reports & Analytics</h1>
                  <p className="text-muted-foreground">Comprehensive insights and custom reports</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Fuel Efficiency</span>
                            <span className="text-sm font-medium">6.2 km/L</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Safety Score</span>
                            <span className="text-sm font-medium">94/100</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '94%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">On-time Delivery</span>
                            <span className="text-sm font-medium">96%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '96%'}}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Cost Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">₹47,500</div>
                          <div className="text-sm text-muted-foreground">Monthly savings</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Fuel optimization</span>
                            <span className="text-sm font-medium text-green-600">₹28,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Maintenance reduction</span>
                            <span className="text-sm font-medium text-green-600">₹12,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Insurance savings</span>
                            <span className="text-sm font-medium text-green-600">₹7,000</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Generate Custom Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Report Type</Label>
                        <select className="w-full mt-1 p-2 border border-border rounded-md">
                          <option>Fleet Performance</option>
                          <option>Safety Analysis</option>
                          <option>Cost Breakdown</option>
                          <option>Compliance Status</option>
                        </select>
                      </div>
                      <div>
                        <Label>Date Range</Label>
                        <select className="w-full mt-1 p-2 border border-border rounded-md">
                          <option>Last 30 days</option>
                          <option>Last 3 months</option>
                          <option>Last 6 months</option>
                          <option>Custom range</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <Button className="w-full">
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Fleet Tracking Module */}
            {activeModule === 'tracking' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Fleet Tracking</h1>
                  <p className="text-muted-foreground">Real-time location and status of all vehicles</p>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Live Fleet Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-12 text-center">
                      <MapPin className="h-20 w-20 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-foreground mb-4">Interactive Map Integration</h3>
                      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        This section will display a live Google Maps integration showing real-time vehicle locations, 
                        routes, traffic conditions, and geofences. Vehicles will be represented with status indicators 
                        and clickable info windows.
                      </p>
                      <Badge className="mb-4">Demo Mode - Placeholder for Google Maps API</Badge>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">25</div>
                          <div className="text-xs text-muted-foreground">Active</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">2</div>
                          <div className="text-xs text-muted-foreground">Idle</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">1</div>
                          <div className="text-xs text-muted-foreground">Maintenance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">0</div>
                          <div className="text-xs text-muted-foreground">Alerts</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: "MH-12-AB-1234", driver: "Rajesh Kumar", status: "En Route", location: "Mumbai-Pune Highway", speed: "65 km/h", fuel: "75%" },
                        { id: "GJ-01-CD-5678", driver: "Amit Patel", status: "Delivered", location: "Ahmedabad Central", speed: "0 km/h", fuel: "45%" },
                        { id: "DL-03-EF-9012", driver: "Priya Sharma", status: "Loading", location: "Delhi Warehouse", speed: "0 km/h", fuel: "90%" },
                        { id: "KA-05-MN-3456", driver: "Suresh Yadav", status: "En Route", location: "Bangalore-Chennai Highway", speed: "70 km/h", fuel: "60%" }
                      ].map((vehicle, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              vehicle.status === 'En Route' ? 'bg-green-500' : 
                              vehicle.status === 'Delivered' ? 'bg-blue-500' : 'bg-yellow-500'
                            }`}></div>
                            <div>
                              <div className="font-medium">{vehicle.id}</div>
                              <div className="text-sm text-muted-foreground">{vehicle.driver}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div>
                              <div className="font-medium">{vehicle.status}</div>
                              <div className="text-muted-foreground">{vehicle.location}</div>
                            </div>
                            <div className="text-right">
                              <div>{vehicle.speed}</div>
                              <div className="text-muted-foreground">{vehicle.fuel} fuel</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    )
  }

  // Login Page
  const LoginPage = () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card>
          <CardHeader className="text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <Truck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">FleetPulse</span>
            </Link>
            <CardTitle>Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" placeholder="Enter your password" />
              </div>
              <Button className="w-full" onClick={() => setCurrentView('dashboard')}>
                <Lock className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <div className="text-center">
                <Button variant="link" className="text-sm">Forgot password?</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Landing Page Component (Original)
  const LandingPage = () => (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">India's #1 Fleet Management Platform</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                AI-Powered Fleet Management for 
                <span className="text-primary"> Indian SMEs</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Save costs, improve safety, and automate compliance. Starting at just ₹700/truck/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => setCurrentView('dashboard')}>
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="mr-2 h-4 w-4" /> Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  30-day free trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  24/7 support
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1720127601642-7c3a7ba88f5f" 
                  alt="Modern Fleet Management"
                  className="w-full h-64 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-bold">500+ Fleets</div>
                  <div className="text-sm opacity-90">Trust FleetPulse across India</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Complete Fleet Management Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your fleet efficiently, safely, and profitably
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Real-time Tracking",
                description: "Track all vehicles in real-time with GPS precision. Get instant alerts for route deviations.",
                image: "https://images.unsplash.com/photo-1522674149721-b0191358dc5c"
              },
              {
                icon: Shield,
                title: "Driver Safety Hub",
                description: "Monitor driver behavior, safety scores, and dash cam footage to prevent accidents.",
                image: "https://images.unsplash.com/photo-1601912552080-0fb89fd08042"
              },
              {
                icon: TrendingUp,
                title: "Route Optimization",
                description: "AI-powered route planning to reduce fuel costs and delivery times by up to 25%.",
                image: "https://images.unsplash.com/photo-1720014429543-8e3c46d2d5a7"
              },
              {
                icon: FileText,
                title: "Compliance Management",
                description: "Stay compliant with Indian RTO regulations, GST, and digital inspection reports.",
                image: "https://images.unsplash.com/photo-1540238245942-3931e9f66c7d"
              },
              {
                icon: BarChart3,
                title: "Analytics & Reports",
                description: "Comprehensive insights with customizable dashboards and automated reports.",
                image: "https://images.unsplash.com/photo-1720127601642-7c3a7ba88f5f"
              },
              {
                icon: DollarSign,
                title: "Cost Management",
                description: "Track fuel usage, maintenance costs, and get predictive maintenance alerts.",
                image: "https://images.unsplash.com/photo-1592891056565-d035c022bfdb"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/20"></div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Calculate Your ROI
              </h2>
              <p className="text-xl text-muted-foreground">
                See how much you can save with FleetPulse
              </p>
            </div>
            
            <Card className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Number of Trucks</Label>
                    <div className="mt-4">
                      <Slider
                        value={truckCount}
                        onValueChange={setTruckCount}
                        max={50}
                        min={5}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>5</span>
                        <span className="font-medium">{truckCount[0]} trucks</span>
                        <span>50</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Monthly Fuel Cost (₹)</Label>
                    <div className="mt-4">
                      <Slider
                        value={monthlyFuelCost}
                        onValueChange={setMonthlyFuelCost}
                        max={500000}
                        min={50000}
                        step={10000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>₹50k</span>
                        <span className="font-medium">₹{(monthlyFuelCost[0]/1000).toFixed(0)}k</span>
                        <span>₹500k</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Accidents Per Year</Label>
                    <div className="mt-4">
                      <Slider
                        value={accidentsPerYear}
                        onValueChange={setAccidentsPerYear}
                        max={10}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>0</span>
                        <span className="font-medium">{accidentsPerYear[0]} accidents</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">Your Savings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Monthly Savings</span>
                      <span className="text-2xl font-bold text-green-600">₹{roi.monthlySavings.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Annual Savings</span>
                      <span className="text-2xl font-bold text-green-600">₹{roi.annualSavings.toLocaleString()}</span>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">ROI</span>
                        <span className="text-3xl font-bold text-primary">{roi.roi}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-sm text-muted-foreground">
                    <p>Based on industry averages:</p>
                    <ul className="mt-2 space-y-1">
                      <li>• 15% fuel cost reduction</li>
                      <li>• 40% accident reduction</li>
                      <li>• ₹8k monthly maintenance savings per truck</li>
                    </ul>
                  </div>
                  
                  <Button className="w-full mt-6" size="lg" onClick={() => setCurrentView('dashboard')}>
                    Start Saving Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Trusted by Fleet Operators Across India
            </h2>
            <p className="text-xl text-muted-foreground">
              See how FleetPulse is transforming businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                company: "Kumar Transport Services",
                location: "Mumbai",
                trucks: 35,
                savings: "₹4.2L",
                quote: "FleetPulse reduced our fuel costs by 18% and accidents by half. The ROI was visible within 3 months.",
                rating: 5
              },
              {
                name: "Priya Sharma",
                company: "Sharma Logistics",
                location: "Delhi",
                trucks: 12,
                savings: "₹1.8L",
                quote: "The AI assistant helps me make quick decisions. Customer complaints dropped by 60% since we started using FleetPulse.",
                rating: 5
              },
              {
                name: "Amit Patel",
                company: "Gujarat Freight Corp",
                location: "Ahmedabad",
                trucks: 28,
                savings: "₹3.5L",
                quote: "Compliance management is a game-changer. No more RTO issues and our drivers love the safety features.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-foreground">"{testimonial.quote}"</blockquote>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground">{testimonial.trucks} trucks</span>
                        <span className="text-sm font-medium text-green-600">Saved {testimonial.savings}/year</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Fleet?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 500+ fleet operators who trust FleetPulse. Start your 30-day free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => setCurrentView('dashboard')}>
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Schedule Demo
            </Button>
          </div>
          <p className="text-white/80 text-sm mt-4">No credit card required • Setup in 5 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Truck className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">FleetPulse</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered fleet management solution for Indian SMEs.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Products</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => setCurrentPage('vehicle-tracking')} className="hover:text-primary">Vehicle Tracking</button></li>
                <li><button onClick={() => setCurrentPage('driver-safety')} className="hover:text-primary">Driver Safety</button></li>
                <li><button onClick={() => setCurrentPage('equipment-monitoring')} className="hover:text-primary">Equipment Monitoring</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">API Documentation</a></li>
                <li><a href="#" className="hover:text-primary">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 FleetPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )

  // Main render function
  if (currentView === 'dashboard') {
    return <EnhancedDashboard />
  }

  if (currentPage === 'vehicle-tracking') {
    return <VehicleTrackingPage />
  }

  if (currentPage === 'driver-safety') {
    return <DriverSafetyPage />
  }

  if (currentPage === 'pricing') {
    return <PricingPage />
  }

  if (currentPage === 'blog') {
    return <BlogPage />
  }

  if (currentPage === 'login') {
    return <LoginPage />
  }

  return <LandingPage />
}

export default FleetManagementApp