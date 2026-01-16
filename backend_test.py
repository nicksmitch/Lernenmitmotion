#!/usr/bin/env python3
"""
FocusFlow Backend API Testing Suite
Tests all API endpoints for the German learning app with timer and exercise functionality.
"""

import requests
import sys
import json
from datetime import datetime
import time

class FocusFlowAPITester:
    def __init__(self, base_url="https://repo-connector-5.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.session_token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            status = "✅ PASS"
        else:
            status = "❌ FAIL"
        
        result = {
            "test": name,
            "status": "PASS" if success else "FAIL",
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        print(f"{status} - {name}: {details}")
        return success

    def run_api_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.session_token:
            test_headers['Authorization'] = f'Bearer {self.session_token}'
        
        if headers:
            test_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if success and response.content:
                try:
                    response_data = response.json()
                    details += f", Response: {json.dumps(response_data, indent=2)[:200]}..."
                    return self.log_test(name, True, details), response_data
                except:
                    return self.log_test(name, True, details), {}
            elif not success:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Raw response: {response.text[:200]}"
                return self.log_test(name, False, details), {}
            
            return self.log_test(name, success, details), {}

        except Exception as e:
            return self.log_test(name, False, f"Exception: {str(e)}"), {}

    def setup_test_user(self):
        """Create test user and session using MongoDB directly"""
        print("\n🔧 Setting up test user and session...")
        
        # Create test user data
        timestamp = int(time.time())
        test_user_id = f"test-user-{timestamp}"
        test_session_token = f"test_session_{timestamp}"
        test_email = f"test.user.{timestamp}@example.com"
        
        # MongoDB commands to create test data
        mongo_commands = f"""
use('focusflow_db');
var userId = '{test_user_id}';
var sessionToken = '{test_session_token}';
var email = '{test_email}';

// Create user
db.users.insertOne({{
  id: userId,
  email: email,
  name: 'Test User',
  picture: 'https://via.placeholder.com/150',
  created_at: new Date().toISOString()
}});

// Create session
db.user_sessions.insertOne({{
  id: 'session-' + Date.now(),
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
  created_at: new Date().toISOString()
}});

// Create user stats
db.user_stats.insertOne({{
  id: 'stats-' + Date.now(),
  user_id: userId,
  total_study_minutes: 0,
  total_breaks: 0,
  last_timer_duration: 25,
  updated_at: new Date().toISOString()
}});

print('Test user created successfully');
"""
        
        try:
            import subprocess
            result = subprocess.run(['mongosh', '--eval', mongo_commands], 
                                  capture_output=True, text=True, timeout=30)
            
            if result.returncode == 0:
                self.session_token = test_session_token
                self.user_id = test_user_id
                print(f"✅ Test user created: {test_email}")
                print(f"✅ Session token: {test_session_token}")
                return True
            else:
                print(f"❌ MongoDB setup failed: {result.stderr}")
                return False
                
        except Exception as e:
            print(f"❌ Error setting up test user: {str(e)}")
            return False

    def test_auth_endpoints(self):
        """Test authentication endpoints"""
        print("\n🔐 Testing Authentication Endpoints...")
        
        # Test /auth/me with valid token
        success, data = self.run_api_test(
            "Get current user (/auth/me)",
            "GET", "auth/me", 200
        )
        
        if success and data:
            if data.get('email') and data.get('name'):
                self.log_test("User data validation", True, "Email and name present")
            else:
                self.log_test("User data validation", False, "Missing email or name")

        # Test /auth/me without token
        temp_token = self.session_token
        self.session_token = None
        self.run_api_test(
            "Get current user without auth",
            "GET", "auth/me", 401
        )
        self.session_token = temp_token

    def test_stats_endpoints(self):
        """Test statistics endpoints"""
        print("\n📊 Testing Statistics Endpoints...")
        
        # Test get stats
        success, data = self.run_api_test(
            "Get user stats (/stats)",
            "GET", "stats", 200
        )
        
        if success and data:
            required_fields = ['total_study_minutes', 'total_breaks', 'last_timer_duration']
            missing_fields = [field for field in required_fields if field not in data]
            if not missing_fields:
                self.log_test("Stats data validation", True, "All required fields present")
            else:
                self.log_test("Stats data validation", False, f"Missing fields: {missing_fields}")

        # Test update timer duration
        self.run_api_test(
            "Update timer duration (/stats/timer)",
            "PUT", "stats/timer", 200,
            data={"duration_minutes": 45}
        )

    def test_session_endpoints(self):
        """Test study session endpoints"""
        print("\n⏱️ Testing Study Session Endpoints...")
        
        # Test create session
        success, session_data = self.run_api_test(
            "Create study session (/sessions)",
            "POST", "sessions", 200,
            data={"duration_minutes": 25}
        )
        
        session_id = None
        if success and session_data:
            session_id = session_data.get('id')
            if session_id:
                self.log_test("Session ID validation", True, f"Session ID: {session_id}")
            else:
                self.log_test("Session ID validation", False, "No session ID returned")

        # Test update session if we have an ID
        if session_id:
            self.run_api_test(
                "Update study session (/sessions/{id})",
                "PUT", f"sessions/{session_id}", 200,
                data={"breaks_taken": 2, "status": "completed"}
            )

    def test_role_endpoints(self):
        """Test role management endpoints"""
        print("\n👥 Testing Role Management Endpoints...")
        
        # Test update role to teacher
        success, data = self.run_api_test(
            "Update role to teacher (/profile/role)",
            "PUT", "profile/role", 200,
            data={"role": "teacher"}
        )
        
        if success and data:
            if data.get('role') == 'teacher':
                self.log_test("Role update validation", True, "Role updated to teacher")
            else:
                self.log_test("Role update validation", False, f"Expected teacher, got {data.get('role')}")

        # Test invalid role
        self.run_api_test(
            "Update to invalid role",
            "PUT", "profile/role", 400,
            data={"role": "invalid_role"}
        )

        # Test update role back to individual
        self.run_api_test(
            "Update role to individual (/profile/role)",
            "PUT", "profile/role", 200,
            data={"role": "individual"}
        )

    def test_exercise_endpoints(self):
        """Test exercise endpoints with role-based filtering"""
        print("\n🏃 Testing Exercise Endpoints...")
        
        # Test exercises as individual user (default)
        success, individual_active = self.run_api_test(
            "Get active exercises as individual (/exercises/active)",
            "GET", "exercises/active", 200
        )
        
        if success:
            if isinstance(individual_active, list):
                individual_count = len(individual_active)
                self.log_test("Individual active exercises format", True, f"Returned {individual_count} exercises")
                
                # Check for group exercises (should not be present for individual users)
                group_exercises = [ex for ex in individual_active if ex.get('is_group_exercise', False)]
                if not group_exercises:
                    self.log_test("Individual user group exercise filtering", True, "No group exercises for individual user")
                else:
                    self.log_test("Individual user group exercise filtering", False, f"Found {len(group_exercises)} group exercises")
            else:
                self.log_test("Individual active exercises format", False, "Response is not a list")

        # Test exercises as individual user (relaxed)
        success, individual_relaxed = self.run_api_test(
            "Get relaxed exercises as individual (/exercises/relaxed)",
            "GET", "exercises/relaxed", 200
        )
        
        if success:
            if isinstance(individual_relaxed, list):
                individual_relaxed_count = len(individual_relaxed)
                self.log_test("Individual relaxed exercises format", True, f"Returned {individual_relaxed_count} exercises")
            else:
                self.log_test("Individual relaxed exercises format", False, "Response is not a list")

        # Switch to teacher role and test exercises
        self.run_api_test(
            "Switch to teacher role for exercise testing",
            "PUT", "profile/role", 200,
            data={"role": "teacher"}
        )

        # Test exercises as teacher user
        success, teacher_active = self.run_api_test(
            "Get active exercises as teacher (/exercises/active)",
            "GET", "exercises/active", 200
        )
        
        if success:
            if isinstance(teacher_active, list):
                teacher_count = len(teacher_active)
                self.log_test("Teacher active exercises format", True, f"Returned {teacher_count} exercises")
                
                # Teachers should see more or equal exercises than individuals
                if teacher_count >= individual_count:
                    self.log_test("Teacher exercise access", True, f"Teacher sees {teacher_count} vs individual {individual_count}")
                else:
                    self.log_test("Teacher exercise access", False, f"Teacher sees fewer exercises than individual")
                    
                # Check for group exercises (should be present for teachers)
                group_exercises = [ex for ex in teacher_active if ex.get('is_group_exercise', False)]
                if group_exercises:
                    self.log_test("Teacher group exercise access", True, f"Found {len(group_exercises)} group exercises")
                else:
                    self.log_test("Teacher group exercise access", False, "No group exercises found for teacher")
            else:
                self.log_test("Teacher active exercises format", False, "Response is not a list")

        # Test invalid category
        self.run_api_test(
            "Get invalid category exercises",
            "GET", "exercises/invalid", 400
        )

        # Switch back to individual for cleanup
        self.run_api_test(
            "Switch back to individual role",
            "PUT", "profile/role", 200,
            data={"role": "individual"}
        )

    def test_exercise_generation(self):
        """Test exercise generation with AI"""
        print("\n🎨 Testing Exercise Generation...")
        
        # Test generate exercise (this might take longer due to AI image generation)
        print("⏳ Generating exercise with AI image (this may take 10-30 seconds)...")
        
        exercise_data = {
            "category": "active",
            "title": "Test Jumping Exercise",
            "description": "A simple jumping exercise for testing",
            "duration_minutes": 3,
            "prompt": "A person doing jumping jacks in a bright, modern room"
        }
        
        try:
            url = f"{self.api_url}/exercises/generate"
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.session_token}'
            }
            
            response = requests.post(url, json=exercise_data, headers=headers, timeout=60)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('image_url'):
                    self.log_test("Exercise generation with image", True, "Image generated successfully")
                else:
                    self.log_test("Exercise generation without image", True, "Exercise created but no image")
            else:
                self.log_test("Exercise generation", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("Exercise generation", False, f"Exception: {str(e)}")

    def cleanup_test_data(self):
        """Clean up test data from MongoDB"""
        print("\n🧹 Cleaning up test data...")
        
        if not self.user_id:
            return
            
        mongo_commands = f"""
use('focusflow_db');
var userId = '{self.user_id}';

// Remove test user data
db.users.deleteMany({{id: userId}});
db.user_sessions.deleteMany({{user_id: userId}});
db.user_stats.deleteMany({{user_id: userId}});
db.study_sessions.deleteMany({{user_id: userId}});

print('Test data cleaned up');
"""
        
        try:
            import subprocess
            result = subprocess.run(['mongosh', '--eval', mongo_commands], 
                                  capture_output=True, text=True, timeout=30)
            
            if result.returncode == 0:
                print("✅ Test data cleaned up successfully")
            else:
                print(f"⚠️ Cleanup warning: {result.stderr}")
                
        except Exception as e:
            print(f"⚠️ Cleanup error: {str(e)}")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting FocusFlow Backend API Tests")
        print(f"🌐 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Setup test user
        if not self.setup_test_user():
            print("❌ Failed to setup test user. Aborting tests.")
            return False
        
        try:
            # Run all test suites
            self.test_auth_endpoints()
            self.test_stats_endpoints()
            self.test_session_endpoints()
            self.test_role_endpoints()
            self.test_exercise_endpoints()
            self.test_exercise_generation()
            
        finally:
            # Always cleanup
            self.cleanup_test_data()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print(f"⚠️ {self.tests_run - self.tests_passed} tests failed")
            return False

    def get_test_report(self):
        """Get detailed test report"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_results": self.test_results,
            "timestamp": datetime.now().isoformat()
        }

def main():
    """Main test execution"""
    tester = FocusFlowAPITester()
    success = tester.run_all_tests()
    
    # Save detailed report
    report = tester.get_test_report()
    with open('/app/backend_test_report.json', 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"\n📄 Detailed report saved to: /app/backend_test_report.json")
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())