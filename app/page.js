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
  X
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  
  // ROI Calculator state
  const [truckCount, setTruckCount] = useState([15])
  const [monthlyFuelCost, setMonthlyFuelCost] = useState([250000])
  const [accidentsPerYear, setAccidentsPerYear] = useState([3])
  
  const calculateROI = () => {
    const trucks = truckCount[0]
    const fuelCost = monthlyFuelCost[0]
    const accidents = accidentsPerYear[0]
    
    const fuelSavings = fuelCost * 0.15 // 15% fuel savings
    const accidentReduction = accidents * 50000 * 0.4 // 40% accident reduction, ₹50k per accident
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

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">FleetPulse</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <div className="relative group">
                <button className="text-foreground hover:text-primary">Products</button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Vehicle Tracking</a>
                    <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Driver Safety</a>
                    <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Equipment Monitoring</a>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="text-foreground hover:text-primary">Solutions</button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Trucking</a>
                    <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Construction</a>
                    <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Food & Beverage</a>
                  </div>
                </div>
              </div>
              <button className="text-foreground hover:text-primary">Pricing</button>
              <button className="text-foreground hover:text-primary">Resources</button>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost">Login</Button>
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
                <button className="block text-foreground hover:text-primary">Products</button>
                <button className="block text-foreground hover:text-primary">Solutions</button>
                <button className="block text-foreground hover:text-primary">Pricing</button>
                <button className="block text-foreground hover:text-primary">Resources</button>
                <div className="pt-4 border-t border-border">
                  <Button variant="ghost" className="w-full mb-2">Login</Button>
                  <Button className="w-full" onClick={() => setCurrentView('dashboard')}>Get Started</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

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
                <li><a href="#" className="hover:text-primary">Vehicle Tracking</a></li>
                <li><a href="#" className="hover:text-primary">Driver Safety</a></li>
                <li><a href="#" className="hover:text-primary">Route Optimization</a></li>
                <li><a href="#" className="hover:text-primary">Compliance</a></li>
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

  // Dashboard Component (showing only the beginning - will be extended)
  const Dashboard = () => (
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

      {/* Dashboard Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-border min-h-screen">
          <nav className="p-4 space-y-2">
            {[
              { icon: BarChart3, label: 'Overview', active: true },
              { icon: MapPin, label: 'Fleet Tracking' },
              { icon: Shield, label: 'Safety Hub' },
              { icon: TrendingUp, label: 'Operations' },
              { icon: FileText, label: 'Compliance' },
              { icon: BarChart3, label: 'Reports' }
            ].map((item, index) => (
              <button
                key={index}
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Fleet Overview</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your fleet today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: 'Active Vehicles',
                value: '28',
                change: '+2 from yesterday',
                icon: Truck,
                color: 'text-green-600'
              },
              {
                title: 'Total Distance',
                value: '1,247 km',
                change: 'Today',
                icon: MapPin,
                color: 'text-blue-600'
              },
              {
                title: 'Fuel Efficiency',
                value: '6.2 km/L',
                change: '+0.3 from last week',
                icon: TrendingUp,
                color: 'text-green-600'
              },
              {
                title: 'Safety Score',
                value: '94/100',
                change: '+5 points',
                icon: Shield,
                color: 'text-green-600'
              }
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
                  Track all your vehicles, routes, and get live updates.
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
                  {
                    icon: CheckCircle,
                    title: 'Vehicle MH-12-AB-1234 completed route',
                    time: '2 minutes ago',
                    color: 'text-green-600'
                  },
                  {
                    icon: AlertTriangle,
                    title: 'Speed alert for vehicle GJ-01-CD-5678',
                    time: '15 minutes ago',
                    color: 'text-yellow-600'
                  },
                  {
                    icon: Clock,
                    title: 'Driver Rahul Kumar started shift',
                    time: '1 hour ago',
                    color: 'text-blue-600'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Fuel efficiency improved by 5%',
                    time: '2 hours ago',
                    color: 'text-green-600'
                  }
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
        </main>
      </div>
    </div>
  )

  return currentView === 'landing' ? <LandingPage /> : <Dashboard />
}

export default FleetManagementApp