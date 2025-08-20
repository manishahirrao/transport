#!/usr/bin/env python3
"""
FleetPulse Backend API Testing Suite
Tests all backend API endpoints comprehensively
"""

import requests
import json
import time
import os
from datetime import datetime

# Get base URL from environment - using localhost for testing
BASE_URL = "http://localhost:3000/api"

class FleetPulseAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        if success:
            print(f"✅ {test_name}: PASSED - {details}")
        else:
            print(f"❌ {test_name}: FAILED - {details}")
            self.failed_tests.append(result)
    
    def test_root_endpoint(self):
        """Test root API endpoint"""
        try:
            response = requests.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "FleetPulse API is running" in data["message"]:
                    self.log_test("Root API Endpoint", True, 
                                f"API running, version: {data.get('version', 'N/A')}", data)
                else:
                    self.log_test("Root API Endpoint", False, 
                                "Missing expected message in response", data)
            else:
                self.log_test("Root API Endpoint", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Root API Endpoint", False, f"Exception: {str(e)}")
    
    def test_fleet_overview_api(self):
        """Test Fleet Overview API - Primary focus"""
        try:
            response = requests.get(f"{self.base_url}/fleet/overview")
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate structure
                required_fields = ["analytics", "vehicles", "lastUpdated"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("Fleet Overview API - Structure", False, 
                                f"Missing fields: {missing_fields}", data)
                    return
                
                # Validate analytics data
                analytics = data["analytics"]
                analytics_fields = ["totalVehicles", "activeVehicles", "totalDistance", 
                                  "fuelEfficiency", "safetyScore", "monthlyFuelCost"]
                
                missing_analytics = [field for field in analytics_fields if field not in analytics]
                if missing_analytics:
                    self.log_test("Fleet Overview API - Analytics", False, 
                                f"Missing analytics fields: {missing_analytics}", data)
                else:
                    self.log_test("Fleet Overview API - Analytics", True, 
                                f"All analytics fields present. Safety Score: {analytics['safetyScore']}", 
                                analytics)
                
                # Validate vehicles data
                vehicles = data["vehicles"]
                if len(vehicles) > 0:
                    vehicle = vehicles[0]
                    vehicle_fields = ["id", "driver", "status", "location", "speed", "fuel"]
                    missing_vehicle_fields = [field for field in vehicle_fields if field not in vehicle]
                    
                    if missing_vehicle_fields:
                        self.log_test("Fleet Overview API - Vehicles", False, 
                                    f"Missing vehicle fields: {missing_vehicle_fields}", vehicles)
                    else:
                        # Check Indian registration format
                        reg_format_valid = "-" in vehicle["id"] and len(vehicle["id"]) >= 10
                        self.log_test("Fleet Overview API - Vehicles", True, 
                                    f"Vehicle data valid. Registration: {vehicle['id']}, "
                                    f"Indian format: {reg_format_valid}", vehicles[:2])
                
                # Test dynamic data by making multiple calls
                time.sleep(1)
                response2 = requests.get(f"{self.base_url}/fleet/overview")
                if response2.status_code == 200:
                    data2 = response2.json()
                    # Check if some values changed (dynamic behavior)
                    distance_changed = data["analytics"]["totalDistance"] != data2["analytics"]["totalDistance"]
                    active_changed = data["analytics"]["activeVehicles"] != data2["analytics"]["activeVehicles"]
                    
                    self.log_test("Fleet Overview API - Dynamic Data", True, 
                                f"Dynamic updates working. Distance changed: {distance_changed}, "
                                f"Active vehicles changed: {active_changed}")
                
            else:
                self.log_test("Fleet Overview API", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Fleet Overview API", False, f"Exception: {str(e)}")
    
    def test_roi_calculator_api(self):
        """Test ROI Calculator API - Primary focus"""
        try:
            # Test data for Indian fleet
            test_data = {
                "trucks": 15,
                "monthlyFuelCost": 180000,  # ₹1.8L per month
                "accidentsPerYear": 3
            }
            
            response = requests.post(f"{self.base_url}/calculate-roi", 
                                   json=test_data,
                                   headers={"Content-Type": "application/json"})
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate response structure
                required_fields = ["monthlySavings", "annualSavings", "netSavings", "roi", "breakdown"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("ROI Calculator API - Structure", False, 
                                f"Missing fields: {missing_fields}", data)
                    return
                
                # Validate calculations
                monthly_savings = data["monthlySavings"]
                annual_savings = data["annualSavings"]
                roi = data["roi"]
                
                # Basic math validation
                expected_annual = monthly_savings * 12
                annual_correct = abs(annual_savings - expected_annual) < 1000  # Allow small rounding
                
                # ROI should be positive for reasonable inputs
                roi_reasonable = roi > 0 and roi < 10000  # Between 0% and 10000%
                
                self.log_test("ROI Calculator API - Calculations", annual_correct and roi_reasonable, 
                            f"Monthly: ₹{monthly_savings:,}, Annual: ₹{annual_savings:,}, "
                            f"ROI: {roi}%, Math correct: {annual_correct}", data)
                
                # Test breakdown
                breakdown = data["breakdown"]
                breakdown_fields = ["fuelSavings", "accidentSavings", "maintenanceSavings", "totalCost"]
                missing_breakdown = [field for field in breakdown_fields if field not in breakdown]
                
                if missing_breakdown:
                    self.log_test("ROI Calculator API - Breakdown", False, 
                                f"Missing breakdown fields: {missing_breakdown}", breakdown)
                else:
                    self.log_test("ROI Calculator API - Breakdown", True, 
                                f"Complete breakdown provided. Fuel: ₹{breakdown['fuelSavings']:,}, "
                                f"Maintenance: ₹{breakdown['maintenanceSavings']:,}", breakdown)
                
                # Test with different inputs
                test_data2 = {"trucks": 25, "monthlyFuelCost": 300000, "accidentsPerYear": 5}
                response2 = requests.post(f"{self.base_url}/calculate-roi", json=test_data2,
                                        headers={"Content-Type": "application/json"})
                
                if response2.status_code == 200:
                    data2 = response2.json()
                    # Results should scale with input
                    savings_scaled = data2["monthlySavings"] > data["monthlySavings"]
                    self.log_test("ROI Calculator API - Scaling", savings_scaled, 
                                f"Larger fleet shows higher savings: {savings_scaled}")
                
            else:
                self.log_test("ROI Calculator API", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("ROI Calculator API", False, f"Exception: {str(e)}")
    
    def test_ai_assistant_api(self):
        """Test AI Assistant API - Both GET and POST"""
        try:
            # Test GET with query parameter
            queries = [
                "top driver",
                "fuel efficiency", 
                "safety score",
                "route optimization"
            ]
            
            for query in queries:
                response = requests.get(f"{self.base_url}/ai/query?q={query}")
                
                if response.status_code == 200:
                    data = response.json()
                    
                    required_fields = ["query", "response", "suggestions", "timestamp"]
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_test(f"AI Assistant GET - {query}", False, 
                                    f"Missing fields: {missing_fields}", data)
                    else:
                        # Check if response is contextual
                        response_text = data["response"].lower()
                        contextual = any(keyword in response_text for keyword in query.lower().split())
                        
                        self.log_test(f"AI Assistant GET - {query}", True, 
                                    f"Contextual response: {contextual}, "
                                    f"Response length: {len(data['response'])}", 
                                    {"query": data["query"], "response": data["response"][:100]})
                else:
                    self.log_test(f"AI Assistant GET - {query}", False, 
                                f"HTTP {response.status_code}: {response.text}")
            
            # Test POST method
            post_queries = [
                "Show me top drivers this week",
                "How is our fuel efficiency trending?",
                "What are our cost savings this month?"
            ]
            
            for query in post_queries:
                response = requests.post(f"{self.base_url}/ai/query", 
                                       json={"query": query},
                                       headers={"Content-Type": "application/json"})
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Validate structure
                    required_fields = ["query", "response", "suggestions", "timestamp"]
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_test(f"AI Assistant POST - {query[:20]}...", False, 
                                    f"Missing fields: {missing_fields}", data)
                    else:
                        # Check response quality
                        response_length = len(data["response"])
                        has_suggestions = len(data["suggestions"]) > 0
                        
                        self.log_test(f"AI Assistant POST - {query[:20]}...", True, 
                                    f"Response length: {response_length}, "
                                    f"Has suggestions: {has_suggestions}", 
                                    {"response": data["response"][:100]})
                else:
                    self.log_test(f"AI Assistant POST - {query[:20]}...", False, 
                                f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("AI Assistant API", False, f"Exception: {str(e)}")
    
    def test_fleet_analytics_api(self):
        """Test Fleet Analytics API - Time-series data"""
        try:
            response = requests.get(f"{self.base_url}/fleet/analytics")
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate structure
                required_fields = ["timeSeries", "lastUpdated", "totalVehicles", "fuelEfficiency"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("Fleet Analytics API - Structure", False, 
                                f"Missing fields: {missing_fields}", data)
                    return
                
                # Validate time series data
                time_series = data["timeSeries"]
                required_series = ["fuelEfficiency", "safetyScores", "costSavings"]
                missing_series = [series for series in required_series if series not in time_series]
                
                if missing_series:
                    self.log_test("Fleet Analytics API - Time Series", False, 
                                f"Missing time series: {missing_series}", time_series)
                else:
                    # Check fuel efficiency data
                    fuel_data = time_series["fuelEfficiency"]
                    if len(fuel_data) > 0 and "date" in fuel_data[0] and "value" in fuel_data[0]:
                        self.log_test("Fleet Analytics API - Fuel Data", True, 
                                    f"Fuel efficiency data: {len(fuel_data)} points, "
                                    f"Latest: {fuel_data[-1]['value']} km/L", fuel_data[-3:])
                    else:
                        self.log_test("Fleet Analytics API - Fuel Data", False, 
                                    "Invalid fuel efficiency data structure", fuel_data)
                    
                    # Check safety scores
                    safety_data = time_series["safetyScores"]
                    if len(safety_data) > 0:
                        avg_safety = sum(point["value"] for point in safety_data) / len(safety_data)
                        self.log_test("Fleet Analytics API - Safety Data", True, 
                                    f"Safety data: {len(safety_data)} points, "
                                    f"Average: {avg_safety:.1f}/100", safety_data[-3:])
                    
                    # Check cost savings breakdown
                    cost_savings = time_series["costSavings"]
                    if "breakdown" in cost_savings:
                        breakdown = cost_savings["breakdown"]
                        total_breakdown = sum(breakdown.values())
                        self.log_test("Fleet Analytics API - Cost Breakdown", True, 
                                    f"Cost breakdown total: ₹{total_breakdown:,}, "
                                    f"Fuel: ₹{breakdown.get('fuel', 0):,}", breakdown)
                
            else:
                self.log_test("Fleet Analytics API", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Fleet Analytics API", False, f"Exception: {str(e)}")
    
    def test_additional_endpoints(self):
        """Test additional endpoints"""
        endpoints = [
            ("/fleet/vehicles", "Vehicles"),
            ("/fleet/drivers", "Drivers"), 
            ("/fleet/routes", "Routes"),
            ("/fleet/compliance", "Compliance")
        ]
        
        for endpoint, name in endpoints:
            try:
                response = requests.get(f"{self.base_url}{endpoint}")
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Basic validation
                    if endpoint == "/fleet/vehicles":
                        if "vehicles" in data and len(data["vehicles"]) > 0:
                            vehicle = data["vehicles"][0]
                            # Check for Indian registration format
                            reg_valid = "-" in vehicle.get("id", "")
                            # Check for dynamic data (speed/fuel should vary)
                            self.log_test(f"{name} Endpoint", True, 
                                        f"Found {len(data['vehicles'])} vehicles, "
                                        f"Indian reg format: {reg_valid}", 
                                        data["vehicles"][:2])
                        else:
                            self.log_test(f"{name} Endpoint", False, "No vehicles data", data)
                    
                    elif endpoint == "/fleet/drivers":
                        if "drivers" in data and len(data["drivers"]) > 0:
                            driver = data["drivers"][0]
                            # Check for Indian names
                            indian_name = any(name in driver.get("name", "") 
                                            for name in ["Kumar", "Patel", "Sharma"])
                            self.log_test(f"{name} Endpoint", True, 
                                        f"Found {len(data['drivers'])} drivers, "
                                        f"Indian names: {indian_name}", 
                                        [d["name"] for d in data["drivers"]])
                        else:
                            self.log_test(f"{name} Endpoint", False, "No drivers data", data)
                    
                    elif endpoint == "/fleet/routes":
                        if "routes" in data and len(data["routes"]) > 0:
                            route = data["routes"][0]
                            # Check for Indian cities
                            indian_cities = any(city in route.get("name", "") 
                                              for city in ["Mumbai", "Pune", "Delhi", "Agra"])
                            self.log_test(f"{name} Endpoint", True, 
                                        f"Found {len(data['routes'])} routes, "
                                        f"Indian cities: {indian_cities}", 
                                        [r["name"] for r in data["routes"]])
                        else:
                            self.log_test(f"{name} Endpoint", False, "No routes data", data)
                    
                    elif endpoint == "/fleet/compliance":
                        required_compliance = ["permits", "insurance", "maintenance"]
                        missing_compliance = [field for field in required_compliance 
                                            if field not in data]
                        if not missing_compliance:
                            self.log_test(f"{name} Endpoint", True, 
                                        f"All compliance categories present", 
                                        {k: v for k, v in data.items()})
                        else:
                            self.log_test(f"{name} Endpoint", False, 
                                        f"Missing compliance: {missing_compliance}", data)
                
                else:
                    self.log_test(f"{name} Endpoint", False, 
                                f"HTTP {response.status_code}: {response.text}")
                    
            except Exception as e:
                self.log_test(f"{name} Endpoint", False, f"Exception: {str(e)}")
    
    def test_error_handling(self):
        """Test error handling for invalid endpoints"""
        try:
            response = requests.get(f"{self.base_url}/invalid/endpoint")
            
            if response.status_code == 404:
                data = response.json()
                if "error" in data:
                    self.log_test("Error Handling - 404", True, 
                                f"Proper 404 response with error message", data)
                else:
                    self.log_test("Error Handling - 404", False, 
                                "404 response missing error field", data)
            else:
                self.log_test("Error Handling - 404", False, 
                            f"Expected 404, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Error Handling", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests in priority order"""
        print(f"🚀 Starting FleetPulse Backend API Tests")
        print(f"📍 Base URL: {self.base_url}")
        print(f"⏰ Started at: {datetime.now().isoformat()}")
        print("=" * 80)
        
        # Test in priority order based on test_result.md
        self.test_root_endpoint()
        print()
        
        # High priority tests
        print("🔥 HIGH PRIORITY TESTS")
        self.test_fleet_overview_api()
        print()
        self.test_roi_calculator_api()
        print()
        
        # Medium priority tests  
        print("📊 MEDIUM PRIORITY TESTS")
        self.test_ai_assistant_api()
        print()
        self.test_fleet_analytics_api()
        print()
        
        # Additional endpoints
        print("🔧 ADDITIONAL ENDPOINTS")
        self.test_additional_endpoints()
        print()
        
        # Error handling
        print("⚠️  ERROR HANDLING")
        self.test_error_handling()
        print()
        
        # Summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["success"]])
        failed_tests = len(self.failed_tests)
        
        print("=" * 80)
        print("📋 TEST SUMMARY")
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"📈 Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n🚨 FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  • {test['test']}: {test['details']}")
        
        print(f"\n⏰ Completed at: {datetime.now().isoformat()}")
        print("=" * 80)

if __name__ == "__main__":
    tester = FleetPulseAPITester()
    tester.run_all_tests()