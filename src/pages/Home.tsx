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
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/Button';
import { AirQualityCard } from '../components/AirQualityCard';
import { QualityGuide } from '../components/QualityGuide';

function UserTypeCard({ icon: Icon, title, description, features }: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="h-8 w-8 text-green-600" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <div className="mt-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
      <Icon className="h-8 w-8 text-green-600 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function Home() {
  const userTypes = [
    {
      icon: User,
      title: "Regular Users",
      description: "Everyday individuals looking to ensure their immediate environment is safe and healthy.",
      features: [
        "Real-Time Air Quality Insights",
        "Personalized Health Recommendations",
        "Community Action Ideas"
      ]
    },
    {
      icon: Building2,
      title: "Businesses",
      description: "Companies and factories aiming to ensure employee safety, meet legal standards, and reduce environmental impact.",
      features: [
        "Workplace Safety Insights",
        "Regulatory Compliance Guidance",
        "Sustainability Tips"
      ]
    },
    {
      icon: LandPlot,
      title: "Governments",
      description: "Local and national authorities responsible for ensuring environmental safety and aligning with UN SDGs.",
      features: [
        "Nationwide Monitoring Insights",
        "Policy Recommendations",
        "UN SDG Compliance Strategies"
      ]
    }
  ];

  const features = [
    {
      icon: Activity,
      title: "Comprehensive Environmental Monitoring",
      description: "Monitor air quality using IoT sensors and advanced analytics with real-time insights."
    },
    {
      icon: Target,
      title: "Tailored to Every User",
      description: "Customized recommendations for individuals, businesses, and governments based on their specific needs."
    },
    {
      icon: Brain,
      title: "Predictive Analytics",
      description: "Machine learning models predict future trends, allowing proactive measures to mitigate risks."
    },
    {
      icon: Smartphone,
      title: "User-Friendly Design",
      description: "Easy-to-use website and mobile app with interactive graphs and personalized dashboards."
    },
    {
      icon: LineChart,
      title: "Data-Driven Insights",
      description: "Advanced analytics provide actionable insights for informed decision-making."
    },
    {
      icon: Leaf,
      title: "SDG Alignment",
      description: "Active support in helping organizations achieve their sustainability goals and UN SDG targets."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#features" className="inline-flex space-x-6">
                <span className="rounded-full bg-green-600/10 px-3 py-1 text-sm font-semibold leading-6 text-green-600 ring-1 ring-inset ring-green-600/10">
                  What's new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Just shipped v1.0</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Empowering You to Protect Your Environment
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Monitor air quality in real-time with IoT sensors and get personalized insights for a healthier environment.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Get started
              </Link>
              <Link href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="App screenshot"
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Air Quality Card */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <AirQualityCard />
        </div>
        <div className="mt-12">
          <QualityGuide />
        </div>
      </div>

      {/* User Types Section */}
      <div className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Our Users</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tailored Solutions for Every Need
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you're an individual, business, or government entity, EcoSense provides specialized environmental monitoring solutions.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {userTypes.map((type, index) => (
              <UserTypeCard key={index} {...type} />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Makes EcoSense Different?
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start monitoring?
              <br />
              Join EcoSense today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100">
              Get started with our platform and take control of your environmental impact.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </Link>
              <Link href="#features" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}