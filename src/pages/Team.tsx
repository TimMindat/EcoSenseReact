import React from 'react';
import { Users, Github, Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  { name: 'Abdelrahman Temraz', role: 'Full Stack Developer' },
  { name: 'Abdelrahman Mokhtar', role: 'IoT Specialist' },
  { name: 'Kholoud Ahmed', role: 'Machine Learning Engineer' },
  { name: 'Mariam Khamees', role: 'UI/UX Designer' },
  { name: 'Abdallah Salah', role: 'Backend Developer' },
  { name: 'Hamdy Sayed', role: 'Frontend Developer' }
];

export function Team() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Users className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The EcoSense project is developed by a passionate and dedicated team of individuals working together to deliver a cutting-edge platform for environmental monitoring.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {teamMembers.map((member) => (
            <li key={member.name} className="group relative">
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 transform transition duration-500 hover:scale-105">
                <div className="aspect-[3/2] bg-gray-50 object-cover group-hover:opacity-75" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="h-20 w-20 text-gray-400" />
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                {member.name}
              </h3>
              <p className="text-base leading-7 text-gray-600">{member.role}</p>
              <ul role="list" className="mt-6 flex gap-x-6">
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">GitHub</span>
                    <Github className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Email</span>
                    <Mail className="h-5 w-5" />
                  </a>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}