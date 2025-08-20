import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

const client = new MongoClient(process.env.MONGO_URL)

// Mock data for demo purposes
const mockFleetData = {
  vehicles: [
    {
      id: 'MH-12-AB-1234',
      driver: 'Rajesh Kumar',
      status: 'active',
      location: { lat: 19.0760, lng: 72.8777, address: 'Mumbai, Maharashtra' },
      speed: 45,
      fuel: 75,
      lastUpdate: new Date().toISOString()
    },
    {
      id: 'GJ-01-CD-5678',
      driver: 'Amit Patel',
      status: 'active',
      location: { lat: 23.0225, lng: 72.5714, address: 'Ahmedabad, Gujarat' },
      speed: 60,
      fuel: 45,
      lastUpdate: new Date().toISOString()
    },
    {
      id: 'DL-03-EF-9012',
      driver: 'Priya Sharma',
      status: 'inactive',
      location: { lat: 28.7041, lng: 77.1025, address: 'Delhi' },
      speed: 0,
      fuel: 90,
      lastUpdate: new Date().toISOString()
    }
  ],
  analytics: {
    totalVehicles: 28,
    activeVehicles: 25,
    totalDistance: 1247,
    fuelEfficiency: 6.2,
    safetyScore: 94,
    monthlyFuelCost: 245000,
    accidentReduction: 40,
    costSavings: {
      monthly: 47500,
      annual: 570000
    }
  },
  drivers: [
    {
      id: 'D001',
      name: 'Rajesh Kumar',
      safetyScore: 98,
      totalDistance: 15420,
      violations: 0,
      rating: 4.9
    },
    {
      id: 'D002', 
      name: 'Amit Patel',
      safetyScore: 92,
      totalDistance: 12350,
      violations: 1,
      rating: 4.7
    },
    {
      id: 'D003',
      name: 'Priya Sharma', 
      safetyScore: 96,
      totalDistance: 8900,
      violations: 0,
      rating: 4.8
    }
  ],
  routes: [
    {
      id: 'R001',
      name: 'Mumbai to Pune Express',
      distance: 148,
      estimatedTime: '3h 30m',
      traffic: 'moderate',
      fuelCost: 2800
    },
    {
      id: 'R002',
      name: 'Delhi to Agra Highway',
      distance: 233,
      estimatedTime: '4h 15m', 
      traffic: 'heavy',
      fuelCost: 4200
    }
  ],
  compliance: {
    permits: {
      valid: 25,
      expiring: 3,
      expired: 0
    },
    insurance: {
      valid: 27,
      expiring: 1,
      expired: 0
    },
    maintenance: {
      upToDate: 24,
      due: 4,
      overdue: 0
    }
  }
}

// Helper function to simulate real-time updates
const addRandomVariation = (baseValue, variation = 0.1) => {
  const random = (Math.random() - 0.5) * 2 * variation
  return Math.round(baseValue * (1 + random))
}

export async function GET(request) {
  try {
    const { pathname } = new URL(request.url)
    
    // Remove /api prefix
    const path = pathname.replace('/api', '') || '/'
    
    // Root endpoint
    if (path === '/') {
      return NextResponse.json({ 
        message: 'FleetPulse API is running!',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      })
    }
    
    // Fleet overview endpoint
    if (path === '/fleet/overview') {
      const dynamicAnalytics = {
        ...mockFleetData.analytics,
        totalDistance: addRandomVariation(mockFleetData.analytics.totalDistance, 0.05),
        activeVehicles: Math.min(mockFleetData.analytics.totalVehicles, 
          addRandomVariation(mockFleetData.analytics.activeVehicles, 0.1))
      }
      
      return NextResponse.json({
        analytics: dynamicAnalytics,
        vehicles: mockFleetData.vehicles,
        lastUpdated: new Date().toISOString()
      })
    }
    
    // Vehicles endpoint
    if (path === '/fleet/vehicles') {
      // Add some dynamic elements to vehicle data
      const dynamicVehicles = mockFleetData.vehicles.map(vehicle => ({
        ...vehicle,
        speed: vehicle.status === 'active' ? addRandomVariation(vehicle.speed, 0.2) : 0,
        fuel: Math.max(10, addRandomVariation(vehicle.fuel, 0.1)),
        lastUpdate: new Date().toISOString()
      }))
      
      return NextResponse.json({
        vehicles: dynamicVehicles,
        count: dynamicVehicles.length
      })
    }
    
    // Drivers endpoint
    if (path === '/fleet/drivers') {
      return NextResponse.json({
        drivers: mockFleetData.drivers,
        count: mockFleetData.drivers.length
      })
    }
    
    // Routes endpoint  
    if (path === '/fleet/routes') {
      return NextResponse.json({
        routes: mockFleetData.routes,
        count: mockFleetData.routes.length
      })
    }
    
    // Compliance endpoint
    if (path === '/fleet/compliance') {
      return NextResponse.json(mockFleetData.compliance)
    }
    
    // Analytics endpoint with time-series data
    if (path === '/fleet/analytics') {
      const timeSeriesData = {
        fuelEfficiency: [
          { date: '2025-01-01', value: 5.8 },
          { date: '2025-01-02', value: 6.1 },
          { date: '2025-01-03', value: 6.0 },
          { date: '2025-01-04', value: 6.3 },
          { date: '2025-01-05', value: 6.2 },
          { date: '2025-01-06', value: 6.4 },
          { date: '2025-01-07', value: 6.2 }
        ],
        safetyScores: [
          { date: '2025-01-01', value: 89 },
          { date: '2025-01-02', value: 91 },
          { date: '2025-01-03', value: 93 },
          { date: '2025-01-04', value: 92 },
          { date: '2025-01-05', value: 94 },
          { date: '2025-01-06', value: 95 },
          { date: '2025-01-07', value: 94 }
        ],
        costSavings: {
          monthly: mockFleetData.analytics.costSavings.monthly,
          breakdown: {
            fuel: 28500,
            maintenance: 12000,
            insurance: 7000
          }
        }
      }
      
      return NextResponse.json({
        ...mockFleetData.analytics,
        timeSeries: timeSeriesData,
        lastUpdated: new Date().toISOString()
      })
    }
    
    // AI Assistant endpoint
    if (path === '/ai/query') {
      const query = new URL(request.url).searchParams.get('q') || ''
      
      // Simple mock responses based on query keywords
      let response = "I'm a demo AI assistant. I can help you with fleet analytics, but I need real AI integration to provide detailed insights."
      
      if (query.toLowerCase().includes('top driver')) {
        response = "Based on current data, Rajesh Kumar is your top driver with a safety score of 98/100 and zero violations this month."
      } else if (query.toLowerCase().includes('fuel')) {
        response = "Your fleet's current fuel efficiency is 6.2 km/L, which is 5% better than last month. Vehicle MH-12-AB-1234 has the best efficiency at 7.1 km/L."
      } else if (query.toLowerCase().includes('safety') || query.toLowerCase().includes('accident')) {
        response = "Your fleet safety score is 94/100. There have been 40% fewer accidents compared to last year, saving approximately ₹2.1L in insurance costs."
      } else if (query.toLowerCase().includes('route')) {
        response = "The Mumbai to Pune Express route is most efficient with moderate traffic. I recommend scheduling deliveries during 10 AM - 2 PM for optimal fuel savings."
      }
      
      return NextResponse.json({
        query,
        response,
        suggestions: [
          "Show me top drivers this week",
          "How is our fuel efficiency?", 
          "What's our safety score?",
          "Recommend optimal routes"
        ],
        timestamp: new Date().toISOString()
      })
    }
    
    // Route not found
    return NextResponse.json(
      { error: 'Endpoint not found', path },
      { status: 404 }
    )
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const { pathname } = new URL(request.url)
    const path = pathname.replace('/api', '') || '/'
    const body = await request.json()
    
    // AI Query endpoint
    if (path === '/ai/query') {
      const { query } = body
      
      // Mock AI responses based on query content
      let response = "I'm a demo AI assistant for FleetPulse. Ask me about your fleet performance, drivers, routes, or safety metrics."
      
      if (query?.toLowerCase().includes('top driver')) {
        response = "Your top performing drivers this week are:\n1. Rajesh Kumar - 98 safety score, 0 violations\n2. Priya Sharma - 96 safety score, 0 violations\n3. Amit Patel - 92 safety score, 1 minor violation"
      } else if (query?.toLowerCase().includes('fuel')) {
        response = "Fuel Analysis:\n• Current efficiency: 6.2 km/L (+5% from last month)\n• Monthly fuel cost: ₹2,45,000\n• Potential savings: ₹28,500/month with route optimization\n• Best performing vehicle: MH-12-AB-1234 (7.1 km/L)"
      } else if (query?.toLowerCase().includes('cost') || query?.toLowerCase().includes('saving')) {
        response = "Cost Savings Summary:\n• Monthly savings: ₹47,500\n• Annual savings: ₹5,70,000\n• ROI: 285%\n• Main contributors: Fuel efficiency (60%), Accident reduction (25%), Maintenance optimization (15%)"
      }
      
      return NextResponse.json({
        query,
        response,
        suggestions: [
          "Show me fuel efficiency trends",
          "Which routes need optimization?",
          "How are driver safety scores?",
          "Calculate cost savings this month"
        ],
        timestamp: new Date().toISOString()
      })
    }
    
    // ROI Calculator endpoint
    if (path === '/calculate-roi') {
      const { trucks, monthlyFuelCost, accidentsPerYear } = body
      
      const fuelSavings = monthlyFuelCost * 0.15 // 15% fuel savings
      const accidentReduction = accidentsPerYear * 50000 * 0.4 // 40% accident reduction
      const maintenanceSavings = trucks * 8000 // ₹8k per truck per month
      
      const totalMonthlySavings = fuelSavings + (accidentReduction / 12) + maintenanceSavings
      const annualSavings = totalMonthlySavings * 12
      const costPerTruck = 700
      const annualCost = trucks * costPerTruck * 12
      const netSavings = annualSavings - annualCost
      
      return NextResponse.json({
        monthlySavings: Math.round(totalMonthlySavings),
        annualSavings: Math.round(annualSavings),
        netSavings: Math.round(netSavings),
        roi: Math.round((netSavings / annualCost) * 100),
        breakdown: {
          fuelSavings: Math.round(fuelSavings),
          accidentSavings: Math.round(accidentReduction / 12),
          maintenanceSavings: Math.round(maintenanceSavings),
          totalCost: Math.round(annualCost)
        },
        timestamp: new Date().toISOString()
      })
    }
    
    return NextResponse.json(
      { error: 'POST endpoint not found', path },
      { status: 404 }
    )
    
  } catch (error) {
    console.error('POST API Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}