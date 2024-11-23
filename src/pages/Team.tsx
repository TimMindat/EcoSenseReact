import React from 'react';
import { Users, Github, Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  { 
    name: 'Abdelrahman Temraz', 
    role: 'TL & AI Specialist',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocIhoeo7CfYi3S4zQrqC5RTH55q7PhVlTgBv3cUlNbqu3oQD6zjUFw=s288-c-no',
    linkedin: 'https://www.linkedin.com/in/timmind',
    github: 'https://github.com/TimMindat/',
    email: 'mailto:temraz@ecosense.dev'
  },
  { name: 'Abdelrahman Mokhtar',
    role: 'UI/UX Designer & Flutter Developer',
    image: 'https://i.imgur.com/T0Lh28C.jpeg' },
  { name: 'Kholoud Ahmed', role: 'Kotlin Developer' },
  { name: 'Mariam Khamees', 
    role: 'Backend Specialist',
    image: 'https://scontent.fcai19-4.fna.fbcdn.net/v/t39.30808-6/295009032_2147215568781554_4718229097804074309_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XhRzVeyULX0Q7kNvgFyLtbP&_nc_zt=23&_nc_ht=scontent.fcai19-4.fna&_nc_gid=ApaxZGO_tXBPA6wfr9MCD2r&oh=00_AYDgz57h3mrVVavmnS5N1Y1NS5_pejrfxxmT2yUi6AWhuA&oe=674794D3'
  },
  { name: 'Abdallah Salah', role: 'Hardware Specialist' },
  { name: 'Hamdy Sayed',
    role: 'Frontend Developer',
    image: 'https://i.imgur.com/v3ZmxoW.jpeg'
  }
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
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="aspect-[3/2] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[3/2] bg-gray-50 flex items-center justify-center">
                    <Users className="h-20 w-20 text-gray-400" />
                  </div>
                )}
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                {member.name}
              </h3>
              <p className="text-base leading-7 text-gray-600">{member.role}</p>
              <ul role="list" className="mt-6 flex gap-x-6">
                {member.linkedin && (
                  <li>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </li>
                )}
                {member.github && (
                  <li>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">GitHub</span>
                      <Github className="h-5 w-5" />
                    </a>
                  </li>
                )}
                {member.email && (
                  <li>
                    <a href={member.email} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Email</span>
                      <Mail className="h-5 w-5" />
                    </a>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}