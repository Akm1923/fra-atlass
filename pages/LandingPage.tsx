import React from 'react';
// FIX: The error indicates a version mismatch for react-router-dom.
// Ensuring the Link component is correctly imported.
import { Link } from 'react-router-dom';
import { TargetIcon } from '../components/icons/TargetIcon';
import { DocumentCheckIcon } from '../components/icons/DocumentCheckIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { BrainCircuitIcon } from '../components/icons/BrainCircuitIcon';
import { MapTrifoldIcon } from '../components/icons/MapTrifoldIcon';
import { PresentationChartLineIcon } from '../components/icons/PresentationChartLineIcon';
import { ScaleBalanceIcon } from '../components/icons/ScaleBalanceIcon';
import { BuildingLibraryIcon } from '../components/icons/BuildingLibraryIcon';
import { AcademicCapIcon } from '../components/icons/AcademicCapIcon';
import { ArchiveBoxXMarkIcon } from '../components/icons/ArchiveBoxXMarkIcon';
import { EyeSlashIcon } from '../components/icons/EyeSlashIcon';
import { LinkSlashIcon } from '../components/icons/LinkSlashIcon';
import StarsBackground from '../components/effects/StarsBackground';
import AnimateOnScroll from '../components/effects/AnimateOnScroll';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white relative">
      <StarsBackground />
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 flex content-center items-center justify-center min-h-[85vh]">
        <div 
          className="absolute top-0 w-full h-full bg-center bg-cover" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2512&auto=format&fit=crop')" }}
        >
          <span className="w-full h-full absolute opacity-60 bg-black"></span>
        </div>
        <div className="container relative mx-auto text-center">
          <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-tight animate-[fadeIn_1s_ease-in-out]">
            Digitizing Rights, Empowering Communities.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-3xl mx-auto animate-[fadeIn_1s_ease-in-out_0.5s]">
            A unified WebGIS platform leveraging AI to streamline the Forest Rights Act, ensuring transparent land governance and targeted development for tribal communities.
          </p>
          <Link to="/atlas" className="mt-12 inline-block bg-orange-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105 animate-[fadeIn_1s_ease-in-out_1s]">
            Explore the Live Atlas
          </Link>
        </div>
      </div>

      {/* Problem Section - Redesigned */}
      <section id="problem" className="py-20 bg-slate-100 text-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-orange-500 uppercase">The Challenge</span>
            <h2 className="text-3xl font-bold mt-2">Why This Matters: The Cycle of Inefficiency</h2>
            <p className="text-slate-600 mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
              The path from recognizing forest rights to enabling community development is broken by critical, systemic roadblocks. We address these issues step by step.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimateOnScroll animationClass="animate-flip-in-x" delay={100}>
              <ProblemStepCard
                Icon={ArchiveBoxXMarkIcon}
                title="Fragmented & Analog Data"
                description="Legacy FRA records are paper-based, scattered across various departments, and lack a standard format, making verification a slow, error-prone, and often impossible task."
              />
            </AnimateOnScroll>
            <AnimateOnScroll animationClass="animate-flip-in-x" delay={300}>
              <ProblemStepCard
                Icon={EyeSlashIcon}
                title="Lack of Geospatial Visibility"
                description="Without being mapped, the location and boundaries of land claims are ambiguous. This prevents effective monitoring, creates disputes, and makes regional planning difficult."
              />
            </AnimateOnScroll>
            <AnimateOnScroll animationClass="animate-flip-in-x" delay={500}>
              <ProblemStepCard
                Icon={LinkSlashIcon}
                title="Blocked Development Pathways"
                description="The inability to verify land ownership digitally means FRA beneficiaries cannot be systematically linked to Central Sector Schemes, cutting them off from vital support and opportunities."
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-orange-500 uppercase">Our Process</span>
            <h2 className="text-3xl font-bold text-white mt-2">Our Step-by-Step Solution</h2>
            <p className="text-slate-300 mt-4 max-w-3xl mx-auto">
              We've developed a four-stage process to transform fragmented historical data into an actionable, intelligent system for sustainable development.
            </p>
          </div>
          <div className="relative">
             {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-600 -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimateOnScroll animationClass="animate-slide-in-stagger" delay={0}>
                <SolutionStepCard
                  Icon={BrainCircuitIcon}
                  step="Step 1"
                  title="AI Document Digitization"
                  description="Our AI models process scanned FRA documents, automatically extracting and structuring critical data like claimant names, land area, and boundary descriptions into a standardized digital format."
                />
              </AnimateOnScroll>
               <AnimateOnScroll animationClass="animate-slide-in-stagger" delay={150}>
                <SolutionStepCard
                  Icon={MapTrifoldIcon}
                  step="Step 2"
                  title="Geospatial Mapping"
                  description="The extracted data is converted into geospatial formats and plotted onto a high-resolution map, creating precise digital boundaries for each FRA claim."
                />
              </AnimateOnScroll>
               <AnimateOnScroll animationClass="animate-slide-in-stagger" delay={300}>
                <SolutionStepCard
                  Icon={PresentationChartLineIcon}
                  step="Step 3"
                  title="Decision Support System"
                  description="Our DSS engine cross-references each land plot with government scheme eligibility criteria, identifying and prioritizing development opportunities for patta holders."
                />
              </AnimateOnScroll>
               <AnimateOnScroll animationClass="animate-slide-in-stagger" delay={450}>
                <SolutionStepCard
                  Icon={ScaleBalanceIcon}
                  step="Step 4"
                  title="Empowerment & Transparency"
                  description="The platform provides dedicated dashboards for officials and beneficiaries, ensuring transparent data access and streamlining the delivery of benefits."
                />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
              <span className="text-sm font-semibold text-orange-500 uppercase">Stakeholders</span>
              <h2 className="text-3xl font-bold text-white mt-2">Who We Serve</h2>
              <p className="text-slate-300 mt-4 max-w-3xl mx-auto">
                Our platform is designed to create value for all key participants in the FRA ecosystem.
              </p>
          </div>
          <div className="flex flex-wrap -m-4">
             <AnimateOnScroll className="w-full md:w-1/3 p-4" animationClass="animate-zoom-in-reveal" delay={100}>
                <FeatureCard
                Icon={UsersIcon}
                title="Forest Dwelling Communities"
                description="Provides a clear, accessible record of their land rights and helps them discover and apply for beneficial government schemes they are eligible for."
                />
            </AnimateOnScroll>
            <AnimateOnScroll className="w-full md:w-1/3 p-4" animationClass="animate-zoom-in-reveal" delay={300}>
                <FeatureCard
                Icon={BuildingLibraryIcon}
                title="Government Agencies"
                description="Offers a unified, data-rich dashboard for monitoring FRA implementation, planning development projects, and ensuring transparent delivery of schemes."
                />
            </AnimateOnScroll>
            <AnimateOnScroll className="w-full md:w-1/3 p-4" animationClass="animate-zoom-in-reveal" delay={500}>
                <FeatureCard
                Icon={AcademicCapIcon}
                title="Researchers & NGOs"
                description="Creates a valuable, open data source for studying the impact of the FRA, tracking ecological changes, and advocating for policy improvements."
                />
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
};


interface ProblemStepCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
}

const ProblemStepCard: React.FC<ProblemStepCardProps> = ({ Icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
    <div className="text-orange-500 bg-orange-100 p-4 inline-flex items-center justify-center w-20 h-20 mb-6 shadow-lg rounded-full">
        <Icon className="w-10 h-10"/>
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);


interface SolutionStepCardProps {
  Icon: React.ElementType;
  step: string;
  title: string;
  description: string;
}

const SolutionStepCard: React.FC<SolutionStepCardProps> = ({ Icon, step, title, description }) => (
  <div className="relative bg-slate-700 p-6 rounded-lg text-center h-full border border-slate-600 shadow-lg hover:border-orange-400 transition-colors duration-300">
     <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{step}</div>
    <div className="text-orange-400 bg-slate-800 p-3 inline-flex items-center justify-center w-16 h-16 mb-4 shadow-lg rounded-full">
      <Icon className="w-8 h-8"/>
    </div>
    <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
    <p className="text-slate-300 text-sm">{description}</p>
  </div>
);

interface FeatureCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => (
  <div className="bg-slate-800 p-8 rounded-lg text-center h-full border border-slate-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1">
    <div className="text-orange-400 bg-slate-900 p-4 inline-flex items-center justify-center w-20 h-20 mb-6 shadow-lg rounded-full">
      <Icon className="w-10 h-10"/>
    </div>
    <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
    <p className="text-slate-300">{description}</p>
  </div>
);

export default LandingPage;