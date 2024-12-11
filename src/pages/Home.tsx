import React from 'react';
import { Link } from '../components/Link';
import { 
  Activity, 
  User,
  Building2,
  LandPlot,
  Target,
  Brain,
  Smartphone,
  Leaf,
  LineChart,
  ArrowRight,
  Bell,
  Shield,
  Globe
} from 'lucide-react';
import { UserTypeCard } from '../components/home/UserTypeCard';
import { FeatureCard } from '../components/home/FeatureCard';
import { PromotionalBanner } from '../components/home/PromotionalBanner';
import { HeroButton } from '../components/home/HeroButton';

const features = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Get instant access to air and water quality data through our advanced IoT sensor network.'
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Receive immediate notifications when environmental conditions exceed safe thresholds.'
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Advanced analytics and machine learning to predict environmental trends and provide actionable recommendations.'
  }
];

const userTypes = [
  {
    icon: User,
    title: 'Regular Users',
    description: 'Monitor your local environment and receive personalized health recommendations.',
    features: [
      'Real-time air quality monitoring',
      'Personalized health alerts',
      'Environmental impact tracking'
    ]
  },
  {
    icon: Building2,
    title: 'Businesses',
    description: 'Ensure workplace safety and compliance with environmental regulations.',
    features: [
      'Workplace safety monitoring',
      'Compliance reporting',
      'Employee health insights'
    ]
  },
  {
    icon: LandPlot,
    title: 'Governments',
    description: 'Make data-driven decisions for environmental policy and public health.',
    features: [
      'City-wide monitoring',
      'Policy impact analysis',
      'Public health management'
    ]
  }
];

export function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate">
        {/* Background gradient */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-200 to-green-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex">
              <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span className="font-semibold text-green-600">New</span>
                <span className="h-4 w-px bg-gray-900/10" aria-hidden="true" />
                <a href="#features" className="flex items-center gap-x-1">
                  <span>Just launched</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Monitor Your Environment with Precision
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              EcoSense provides real-time air and water quality monitoring, helping you make informed decisions about your environment and health.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <HeroButton />
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <img
              src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Environmental monitoring"
              className="mx-auto w-[22.875rem] max-w-full rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[38.875rem]"
            />
          </div>
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <PromotionalBanner />
      </div>

      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to monitor your environment
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Advanced features designed to give you the most accurate and actionable environmental insights.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Solutions for Everyone
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you're an individual, business, or government entity, EcoSense has the right solution for you.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {userTypes.map((userType) => (
                <UserTypeCard key={userType.title} {...userType} />
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-green-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
              <br />
              Join EcoSense today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100">
              Start monitoring your environment and contribute to a sustainable future.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-50"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}