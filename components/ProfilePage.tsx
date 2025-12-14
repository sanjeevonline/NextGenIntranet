import React from 'react';
import { UserProfile } from '../types';
import { 
  EnvelopeIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  TrophyIcon,
  PencilSquareIcon,
  PlusIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface ProfilePageProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
  onBack?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, isOwnProfile = true, onBack }) => {
  // Profile Completion Gauge Helper
  const completionPercentage = isOwnProfile ? 85 : 92; // Just mock variance
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="animate-fade-in max-w-7xl mx-auto space-y-6">
      
      {/* Navigation Header for non-own profiles */}
      {!isOwnProfile && onBack && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-2 transition-colors group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Directory</span>
        </button>
      )}

      {/* HEADER SECTION */}
      <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl overflow-hidden shadow-xl">
        {/* Banner/Background */}
        <div className="h-32 bg-gradient-to-r from-nexus-900 via-nexus-800 to-nexus-900 relative">
           <div className="absolute inset-0 bg-hero-glow opacity-30"></div>
        </div>
        
        <div className="px-8 pb-8 flex flex-col md:flex-row items-start gap-6 -mt-12 relative">
          {/* Avatar */}
          <div className="relative">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-32 h-32 rounded-full border-4 border-nexus-800 shadow-2xl object-cover"
            />
            {isOwnProfile && (
              <button className="absolute bottom-1 right-1 p-2 bg-nexus-accent rounded-full text-white shadow-lg hover:bg-nexus-accent/90 transition-colors">
                <PencilSquareIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 mt-14 md:mt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-white">{profile.name}</h1>
                <p className="text-nexus-accent font-medium text-lg">{profile.role}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" /> {profile.location}
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span>{profile.timezone}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-all">
                  <EnvelopeIcon className="w-4 h-4" /> Email
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-all">
                  <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" /> Slack
                </button>
                {isOwnProfile && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-nexus-accent hover:bg-nexus-accent/90 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-nexus-accent/20">
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT SIDEBAR */}
        <div className="space-y-6">
          {/* Completion Widget */}
          <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-6 text-center">
            <h3 className="text-sm font-semibold text-white mb-4">Profile Completion</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64" cy="64" r={radius}
                  stroke="currentColor" strokeWidth="8"
                  fill="transparent" className="text-nexus-900"
                />
                <circle
                  cx="64" cy="64" r={radius}
                  stroke="currentColor" strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-nexus-accent transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{completionPercentage}%</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              {isOwnProfile ? 'A complete profile helps colleagues discover you.' : 'Profile completeness score.'}
            </p>
            {isOwnProfile && (
              <button className="text-xs font-medium text-nexus-accent border border-nexus-accent/30 rounded-full px-4 py-1.5 hover:bg-nexus-accent hover:text-white transition-all">
                Complete Profile
              </button>
            )}
          </div>

          {/* Badges */}
          <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-6">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-semibold text-white">Credentials & Badges</h3>
               <span className="text-xs text-slate-500 cursor-pointer hover:text-white">View All</span>
             </div>
             <div className="flex justify-around">
               <div className="text-center group cursor-pointer">
                 <div className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform">
                   <TrophyIcon className="w-6 h-6 text-white" />
                 </div>
                 <p className="text-[10px] font-medium text-yellow-500">Innovation Gold</p>
               </div>
               <div className="text-center group cursor-pointer">
                 <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform">
                   <AcademicCapIcon className="w-6 h-6 text-white" />
                 </div>
                 <p className="text-[10px] font-medium text-blue-400">Certified Arch</p>
               </div>
             </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Position Grid */}
          <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-8">
            <h2 className="text-lg font-display font-semibold text-white mb-6 pb-4 border-b border-white/5">
              {isOwnProfile ? 'My Position in the Firm' : 'Position in the Firm'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Role</p>
                <p className="text-base text-white font-medium">{profile.role}</p>
                <p className="text-xs text-nexus-accent mt-1 hover:underline cursor-pointer">View Role Description</p>
              </div>
              
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Department</p>
                <p className="text-base text-white font-medium">{profile.department}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Firm Tenure</p>
                <p className="text-base text-white font-medium">{profile.tenure}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Location</p>
                <p className="text-base text-white font-medium">{profile.location}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Path</p>
                <p className="text-base text-white font-medium">{profile.path}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Guild</p>
                <p className="text-base text-white font-medium">{profile.guild}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs text-slate-500 italic">This information is populated by Firm HR systems.</p>
            </div>
          </div>

          {/* Expertise */}
          <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-8">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-semibold text-white">Expertise & Skills</h2>
                {isOwnProfile && (
                  <button className="text-xs flex items-center gap-1 text-nexus-accent border border-nexus-accent/30 px-3 py-1.5 rounded-lg hover:bg-nexus-accent hover:text-white transition-colors">
                    <PencilSquareIcon className="w-3 h-3" /> Edit Topics
                  </button>
                )}
             </div>
             
             <div className="flex flex-wrap gap-2">
               {profile.expertise.map((skill, idx) => (
                 <span key={idx} className="bg-nexus-900 border border-nexus-700 text-slate-300 px-3 py-1.5 rounded-full text-sm hover:border-nexus-accent hover:text-white transition-colors cursor-default">
                   {skill}
                 </span>
               ))}
               {isOwnProfile && (
                 <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-slate-600 text-slate-500 hover:text-white hover:border-slate-400 transition-colors text-sm">
                   <PlusIcon className="w-3 h-3" /> Add Topic
                 </button>
               )}
             </div>
             
             <div className="mt-6">
               <h3 className="text-sm font-semibold text-white mb-2">Executive Summary</h3>
               <p className="text-sm text-slate-400 leading-relaxed bg-nexus-900/50 p-4 rounded-lg border border-white/5">
                 {profile.bio}
               </p>
             </div>
          </div>

          {/* Work Experience */}
          <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-lg font-display font-semibold text-white">Work Experience</h2>
               {isOwnProfile && (
                 <button className="flex items-center gap-2 text-xs font-medium text-white bg-nexus-700 hover:bg-nexus-600 px-3 py-1.5 rounded-lg transition-colors">
                   <PlusIcon className="w-3 h-3" /> Add Experience
                 </button>
               )}
            </div>

            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-0.5 before:bg-nexus-700">
              {profile.workExperience.map((job) => (
                <div key={job.id} className="relative pl-12 group">
                  <div className="absolute left-0 top-1.5 w-10 h-10 bg-nexus-900 border border-nexus-600 rounded-full flex items-center justify-center z-10 group-hover:border-nexus-accent transition-colors">
                     <BriefcaseIcon className="w-5 h-5 text-slate-400 group-hover:text-nexus-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-nexus-accent transition-colors">{job.company}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500 mb-2">
                      <span className="text-slate-300 font-medium">{job.role}</span>
                      <span>•</span>
                      <span>{job.startDate} – {job.endDate}</span>
                      {job.location && (
                        <>
                          <span>•</span>
                          <span>{job.location}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-6">
               <h2 className="text-lg font-display font-semibold text-white mb-6">Education</h2>
               <div className="space-y-6">
                 {profile.education.map(edu => (
                   <div key={edu.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded bg-nexus-900 flex items-center justify-center flex-shrink-0">
                        <AcademicCapIcon className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{edu.institution}</h4>
                        <p className="text-xs text-slate-300">{edu.degree}, {edu.field}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Class of {edu.year}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Certifications */}
            <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-6">
               <h2 className="text-lg font-display font-semibold text-white mb-6">Certifications</h2>
               <div className="space-y-6">
                 {profile.certifications.map(cert => (
                   <div key={cert.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded bg-nexus-900 flex items-center justify-center flex-shrink-0">
                        <TrophyIcon className="w-5 h-5 text-nexus-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                        <p className="text-xs text-slate-300">{cert.issuer}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Issued {cert.date}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Office History */}
          <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-6">
            <h2 className="text-lg font-display font-semibold text-white mb-6">Office History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-white/5 text-xs font-semibold text-slate-500 uppercase">
                  <tr>
                    <th className="pb-3 pl-2">Location</th>
                    <th className="pb-3">Period</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {profile.officeHistory.map((office, i) => (
                    <tr key={i} className="text-sm">
                      <td className="py-3 pl-2 font-medium text-white">{office.location}</td>
                      <td className="py-3 text-slate-400">{office.period}</td>
                      <td className="py-3 text-right">
                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Verified</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
