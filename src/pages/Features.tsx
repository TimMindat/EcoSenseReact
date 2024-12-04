import React from 'react';
import { 
  Activity, 
  AlertCircle, 
  BarChart, 
  Bell, 
  Brain, 
  Building2, 
  BarChart2, 
  CloudRain, 
  FileText, 
  Globe, 
  Heart, 
  LineChart, 
  LandPlot,
  MessageCircle, 
  Shield, 
  Smartphone, 
  Target, 
  User, 
  Users
} from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface UserTypeSection {
  icon: React.ElementType;
  title: string;
  description: string;
  features: Feature[];
}

const userTypes: UserTypeSection[] = [
  {
    icon: User,
    title: "Regular Users",
    description: "Features designed for individuals to monitor and protect their personal environment",
    features: [
      {
        icon: Activity,
        title: "Real-Time Air and Water Quality Monitoring",
        description: "View live air quality metrics (PM2.5, CO₂, NO₂, CO) and water quality data (pH, turbidity, temperature) for your location."
      },
      {
        icon: Bell,
        title: "Health and Safety Alerts",
        description: "Receive personalized alerts when air or water quality reaches unsafe levels, with health recommendations."
      },
      {
        icon: BarChart2,
        title: "Interactive Data Visualizations",
        description: "Explore data through interactive charts, graphs, and maps to understand trends in air and water quality."
      },
      {
        icon: Heart,
        title: "Personalized Health Recommendations",
        description: "Get health tips and environmental actions based on real-time data."
      },
      {
        icon: Globe,
        title: "Environmental Impact Awareness",
        description: "Stay informed about how pollution affects health and the environment, with tips on reducing your carbon footprint."
      },
      {
        icon: Smartphone,
        title: "User-Friendly Mobile & Web Interface",
        description: "Access data and receive notifications through an intuitive web and mobile app experience."
      }
    ]
  },
  {
    icon: Building2,
    title: "Businesses",
    description: "Enterprise solutions for workplace safety and environmental compliance",
    features: [
      {
        icon: Activity,
        title: "Real-Time Air and Water Quality Monitoring",
        description: "Monitor air and water quality at your workplace to ensure a safe environment for employees."
      },
      {
        icon: AlertCircle,
        title: "Health and Safety Alerts",
        description: "Receive notifications when air quality is unsafe, with actionable recommendations for improving workplace conditions."
      },
      {
        icon: Shield,
        title: "Compliance Tracking",
        description: "Track compliance with environmental regulations, ensuring your business meets health and safety standards."
      },
      {
        icon: FileText,
        title: "Environmental Impact Reporting",
        description: "Generate detailed reports on air and water quality trends to evaluate mitigation measures and sustainability efforts."
      },
      {
        icon: Bell,
        title: "Customizable Alerts for Pollution Levels",
        description: "Set custom thresholds for pollutants and receive timely alerts to take preventive actions."
      },
      {
        icon: Users,
        title: "Employee Health Insights",
        description: "Analyze how environmental conditions affect employee productivity and well-being."
      },
      {
        icon: Globe,
        title: "Sustainability & CSR Integration",
        description: "Showcase your company's commitment to sustainability through environmental quality monitoring and reporting."
      }
    ]
  },
  {
    icon: LandPlot,
    title: "Governments",
    description: "Comprehensive tools for environmental policy and public health management",
    features: [
      {
        icon: Globe,
        title: "Nationwide Air and Water Quality Monitoring",
        description: "Track real-time air and water quality data across various regions to monitor pollution levels and health risks."
      },
      {
        icon: Brain,
        title: "Policy Development Support",
        description: "Use environmental data to help develop and enforce policies for managing air and water quality."
      },
      {
        icon: MessageCircle,
        title: "Public Health Alerts and Communication",
        description: "Send region-specific alerts to the public when air or water quality is hazardous."
      },
      {
        icon: BarChart,
        title: "Historical Data and Trend Analysis",
        description: "Access historical data for long-term trend analysis to inform public policies and sustainability initiatives."
      },
      {
        icon: Shield,
        title: "Compliance and Regulation Monitoring",
        description: "Monitor industrial emissions, water treatment standards, and regional pollution levels."
      },
      {
        icon: LineChart,
        title: "Data Visualization for Public Awareness",
        description: "Provide clear, interactive data visualizations on air and water quality for public awareness."
      },
      {
        icon: Target,
        title: "Sustainable Development Goals (SDGs) Alignment",
        description: "Track progress toward SDG targets related to clean air, clean water, and climate action."
      }
    ]
  }
];

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <Icon className="h-8 w-8 text-green-600 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Features for Every User
          </h1>
          <p className="text-xl text-gray-600">
            Discover how EcoSense can help you monitor and improve environmental quality
          </p>
        </div>

        {userTypes.map((userType, index) => (
          <div key={index} className="mb-20">
            <div className="flex items-center mb-8">
              <userType.icon className="h-10 w-10 text-green-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{userType.title}</h2>
                <p className="text-gray-600 mt-1">{userType.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userType.features.map((feature, featureIndex) => (
                <FeatureCard key={featureIndex} {...feature} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}