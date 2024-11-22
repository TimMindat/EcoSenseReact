import React from 'react';
import { Link } from '../components/Link';
import { 
  Activity, 
  BarChart3, 
  Users, 
  ArrowRight, 
  MapPin, 
  Wind, 
  Droplets,
  User,
  Building2,
  LandPlot,
  Target,
  Brain,
  Smartphone,
  Leaf,
  LineChart
} from 'lucide-react';
import { Button } from '../components/Button';

// ... AirQualityCard and WaterQualityCard components remain the same ...

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
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const userTypes = [
    {
      icon: User,
      title: "Regular Users",
      description: "Everyday individuals looking to ensure their immediate environment is safe and healthy.",
      features: [
        "Real-Time Air & Water Quality Insights",
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
      description: "Monitor both air and water quality using IoT sensors and advanced analytics with real-time insights."
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
      {/* Hero Section - remains the same */}
      <div className="relative isolate">
        {/* ... existing hero section code ... */}
      </div>

      {/* Demo Cards - remains the same */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <AirQualityCard />
          <WaterQualityCard />
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

      {/* CTA Section - remains the same */}
      <div className="bg-green-600">
        {/* ... existing CTA section code ... */}
      </div>
    </div>
  );
}