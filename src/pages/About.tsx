import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Building2, 
  LandPlot,
  Target,
  Leaf,
  Globe,
  Heart,
  Home,
  CloudSun
} from 'lucide-react';

const sdgs = [
  {
    number: 3,
    title: 'Health and Well-being',
    icon: Heart,
    description: 'Ensuring healthy lives and promoting well-being for all.'
  },
  {
    number: 11,
    title: 'Sustainable Cities',
    icon: Home,
    description: 'Making cities inclusive, safe, resilient and sustainable.'
  },
  {
    number: 13,
    title: 'Climate Action',
    icon: CloudSun,
    description: 'Taking urgent action to combat climate change and its impacts.'
  }
];

const userTypes = [
  {
    title: 'Regular Users',
    icon: Users,
    description: 'Access real-time air and water quality data to stay informed and healthy.'
  },
  {
    title: 'Businesses',
    icon: Building2,
    description: 'Monitor workplace environments, ensure compliance, and work toward sustainability.'
  },
  {
    title: 'Governments',
    icon: LandPlot,
    description: 'Gain actionable insights for policy-making and achieving environmental goals.'
  }
];

export function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-green-100/20">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#mission" className="inline-flex space-x-6">
                <span className="rounded-full bg-green-600/10 px-3 py-1 text-sm font-semibold leading-6 text-green-600 ring-1 ring-inset ring-green-600/10">
                  Our Vision
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transforming Environmental Insights into Action
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              EcoSense leverages IoT and AI to monitor air and water quality, providing real-time insights and actionable recommendations for individuals, businesses, and governments.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div id="mission" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Globe className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our mission is to empower users with accurate, real-time data on air and water quality to promote healthier living, safer workplaces, and sustainable communities worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How EcoSense Works</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              EcoSense collects data using IoT sensors and external sources, analyzes it with machine learning, and provides personalized insights and recommendations through a user-friendly app and website.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  name: 'Data Collection',
                  description: 'IoT sensors gather real-time environmental data including air quality metrics (NO₂, SO₂, CO₂, CO) and water quality indicators.'
                },
                {
                  icon: BarChart3,
                  name: 'Analysis',
                  description: 'Advanced machine learning algorithms process the data to identify patterns and predict future trends.'
                },
                {
                  icon: Users,
                  name: 'Insights',
                  description: 'Users receive personalized recommendations and alerts through our intuitive interface.'
                }
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-green-600" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Who We Serve */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Users className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Who We Serve</h2>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {userTypes.map((type) => (
                <div key={type.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <type.icon className="h-5 w-5 flex-none text-green-600" />
                    {type.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{type.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* SDGs */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Leaf className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              UN Sustainable Development Goals
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              EcoSense is committed to supporting global sustainability efforts by aligning with the United Nations Sustainable Development Goals.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {sdgs.map((sdg) => (
                <div key={sdg.title} className="flex flex-col items-center text-center">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <sdg.icon className="h-5 w-5 flex-none text-green-600" />
                    <span>SDG {sdg.number}: {sdg.title}</span>
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{sdg.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-green-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to make a difference?
              <br />
              Join EcoSense today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100">
              Start monitoring your environment and contribute to a sustainable future.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-50"
              >
                Get Started
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold leading-6 text-white"
              >
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}