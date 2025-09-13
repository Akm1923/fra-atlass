import React from 'react';
import { CheckBadgeIcon } from '../components/icons/CheckBadgeIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { DocumentCheckIcon } from '../components/icons/DocumentCheckIcon';
import { ScaleBalanceIcon } from '../components/icons/ScaleBalanceIcon';
import { BrainCircuitIcon } from '../components/icons/BrainCircuitIcon';
import StarsBackground from '../components/effects/StarsBackground';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <div className="relative bg-slate-800 text-white overflow-hidden">
        <StarsBackground />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format=fit=crop')" }}
        ></div>
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Our Mission
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300">
            Leveraging technology to correct historical injustices and empower India's forest-dwelling communities.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1: Historical Context */}
          <section className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">A Legacy of Exclusion</h2>
              <p className="text-lg text-slate-600 mb-4">
                For centuries, forest-dwelling communities in India lived in a symbiotic relationship with their natural surroundings. This balance was shattered during colonial rule. Acts like the Indian Forest Act of 1878 systematically converted forests into state-owned commercial resources.
              </p>
              <p className="text-lg text-slate-600">
                This process criminalized the traditional practices of the very people who had protected these ecosystems for generations, labeling them as 'encroachers' on their own ancestral lands. This historical injustice persisted for over a century, systematically alienating Adivasi and other traditional communities from their homes, livelihoods, and cultural heritage.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1590244636283-e83712b84a9e?q=80&w=1961&auto=format=fit=crop" 
                alt="Historical map" 
                className="rounded-lg shadow-2xl object-cover w-full h-full"
              />
            </div>
          </section>

          {/* Section 2: The FRA 2006 */}
          <section className="bg-white p-12 rounded-lg shadow-xl mb-24">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">The Forest Rights Act (FRA), 2006: A Paradigm Shift</h2>
              <p className="mt-4 max-w-4xl mx-auto text-lg text-slate-600">
                The Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006, was a watershed moment. It was enacted to undo this 'historical injustice' by formally recognizing and vesting forest rights in communities who have resided there for generations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RightInfoCard
                Icon={CheckBadgeIcon}
                title="Individual Forest Rights (IFR)"
                description="Recognizes the right to hold, live in, and cultivate forest land occupied by an individual or a family, providing tenure security."
              />
              <RightInfoCard
                Icon={CheckBadgeIcon}
                title="Community Forest Rights (CFR)"
                description="Empowers the Gram Sabha (village council) to manage, protect, and sustainably use 'community forest resources' within their traditional boundaries."
              />
              <RightInfoCard
                Icon={CheckBadgeIcon}
                title="Right to Development"
                description="Ensures access to essential public services and facilities such as schools, health centers, roads, and drinking water projects."
              />
              <RightInfoCard
                Icon={CheckBadgeIcon}
                title="Relief and Rehabilitation Rights"
                description="Protects against forced displacement and ensures proper rehabilitation and compensation if displacement is unavoidable for wildlife conservation."
              />
            </div>
          </section>

          {/* Section 3: Maps */}
          <section className="text-center mb-24">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">The Scale of Impact: Forests and Communities</h2>
             <p className="mt-4 max-w-4xl mx-auto text-lg text-slate-600 mb-10">
                The FRA applies to vast areas of India, impacting the lives of millions. These maps illustrate the geographical context of our work.
             </p>
             <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <img src="https://images.unsplash.com/photo-1619468129361-605ebea04b44?q=80&w=2071&auto=format=fit=crop" alt="Map of India's forest cover" className="rounded-md object-cover w-full h-80"/>
                    <h3 className="text-xl font-semibold mt-4">India's Forest Cover</h3>
                    <p className="text-slate-600 mt-2">Over 21% of India's land is under forest cover, forming critical ecosystems and homelands.</p>
                </div>
                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <img src="https://images.unsplash.com/photo-1598488053911-20a05a19b884?q=80&w=1969&auto=format=fit=crop" alt="Map showing tribal population distribution" className="rounded-md object-cover w-full h-80"/>
                    <h3 className="text-xl font-semibold mt-4">Scheduled Tribe Population</h3>
                    <p className="text-slate-600 mt-2">India is home to over 104 million tribal people, many of whom reside in and around forest areas.</p>
                </div>
             </div>
          </section>

          {/* Section 4: Challenges */}
          <section className="bg-slate-800 text-white p-12 rounded-lg shadow-xl mb-24 relative overflow-hidden">
            <StarsBackground />
            <div className="relative z-10">
             <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Persistent Challenges in Implementation</h2>
              <p className="mt-4 max-w-4xl mx-auto text-lg text-slate-300">
                Despite its progressive intent, the implementation of the FRA has been fraught with challenges, hindering its full potential.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ChallengeCard Icon={BrainCircuitIcon} title="Lack of Data" description="Official records are often fragmented, non-digitized, and hard to access, making it difficult to verify historical claims." />
                <ChallengeCard Icon={ScaleBalanceIcon} title="Complex Bureaucracy" description="The multi-level claim process is slow and confusing, leading to delays and high rejection rates on minor technicalities." />
                <ChallengeCard Icon={DocumentCheckIcon} title="Geospatial Ambiguity" description="The absence of proper land surveys makes it difficult to demarcate and record the exact boundaries of individual and community claims." />
                <ChallengeCard Icon={UsersIcon} title="Convergence Gap" description="A major failure lies in linking FRA beneficiaries with other government development schemes they are legally entitled to." />
            </div>
            </div>
          </section>

          {/* Section 5: Our Mission */}
          <section className="flex flex-col-reverse md:flex-row items-center gap-12">
             <div className="md:w-1/2">
               <img 
                src="https://images.unsplash.com/photo-1524850011238-e32145e5d482?q=80&w=2070&auto=format=fit=crop" 
                alt="Forest community" 
                className="rounded-lg shadow-2xl object-cover w-full h-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission: Bridging the Gap with Technology</h2>
              <p className="text-lg text-slate-600 mb-4">
                The FRA Atlas and Decision Support System was born from the conviction that modern technology can overcome these implementation hurdles. By using AI to digitize legacy documents, GIS to visualize land data, and a powerful DSS to link beneficiaries with schemes, we aim to:
              </p>
              <ul className="space-y-3 text-lg text-slate-700">
                  <li className="flex items-start"><span className="text-orange-500 font-bold mr-3 mt-1">✓</span> Accelerate the rights recognition process.</li>
                  <li className="flex items-start"><span className="text-orange-500 font-bold mr-3 mt-1">✓</span> Ensure transparency and accountability in land governance.</li>
                  <li className="flex items-start"><span className="text-orange-500 font-bold mr-3 mt-1">✓</span> Empower communities with clear data on their rights and entitlements.</li>
                  <li className="flex items-start"><span className="text-orange-500 font-bold mr-3 mt-1">✓</span> Enable government agencies to make informed development decisions.</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

const RightInfoCard: React.FC<{ Icon: React.ElementType, title: string, description: string }> = ({ Icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500 text-white">
        <Icon className="h-6 w-6" />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 text-slate-600">{description}</p>
    </div>
  </div>
);

const ChallengeCard: React.FC<{ Icon: React.ElementType, title: string, description: string }> = ({ Icon, title, description }) => (
    <div className="bg-slate-700 p-6 rounded-lg text-center">
        <div className="text-orange-400 bg-slate-800 p-3 inline-flex items-center justify-center w-16 h-16 mb-4 shadow-lg rounded-full">
            <Icon className="w-8 h-8"/>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300 text-sm">{description}</p>
    </div>
);


export default AboutUsPage;