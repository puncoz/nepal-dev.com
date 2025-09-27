'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import SocialButton from '@/components/ui/SocialButton';
import Checkbox from '@/components/ui/Checkbox';
import Divider from '@/components/ui/Divider';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login form submitted:', formData);
      // Handle successful login here
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back! 👋"
      subtitle="Sign in to continue your journey"
      gradient="blue"
      footer={
        <p className="text-xs text-gray-500">
          Connecting Nepal's developer community since 2024
        </p>
      }
    >

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Credentials Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg">🔐</span>
            <h3 className="text-lg font-semibold text-gray-800">Sign In</h3>
          </div>
          
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            icon="📧"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
            className="focus:ring-blue-500 focus:border-blue-500"
            required
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            icon="🔒"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="focus:ring-blue-500 focus:border-blue-500"
            showPasswordToggle
            required
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="text-blue-600 focus:ring-blue-500"
            label="Remember me"
          />
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={isLoading}
          className="w-full shadow-lg"
        >
          {isLoading ? 'Signing In...' : 'Sign In 🚀'}
        </Button>

        <Divider />

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <SocialButton
            provider="google"
            className="focus:ring-blue-500"
          >
            Continue with Google
          </SocialButton>
          <SocialButton
            provider="github"
            className="focus:ring-blue-500"
          >
            Continue with GitHub
          </SocialButton>
          <SocialButton
            provider="linkedin"
            className="focus:ring-blue-500"
          >
            Continue with LinkedIn
          </SocialButton>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default LoginPage;