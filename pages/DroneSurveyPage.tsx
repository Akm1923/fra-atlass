import React from 'react';
import { RouteIcon } from '../components/icons/RouteIcon';
import { CameraIcon } from '../components/icons/CameraIcon';
import { BrainCircuitIcon } from '../components/icons/BrainCircuitIcon';
import { UploadCloudIcon } from '../components/icons/UploadCloudIcon';
import { CogIcon } from '../components/icons/CogIcon';
import { ServerStackIcon } from '../components/icons/ServerStackIcon';
import StarsBackground from '../components/effects/StarsBackground';

const DroneSurveyPage: React.FC = () => {
  const processSteps = [
    {
      Icon: RouteIcon,
      title: "Path Planning",
      description: "We generate optimized, automated flight paths covering the entire survey area, ensuring comprehensive data collection while adhering to all safety and regulatory guidelines."
    },
    {
      Icon: CameraIcon,
      title: "Data Acquisition",
      description: "The H35 drone, equipped with high-resolution cameras and multispectral sensors, captures detailed imagery and crucial data points on soil moisture and water quality."
    },
    {
      Icon: BrainCircuitIcon,
      title: "AI-Powered Detection",
      description: "Onboard AI/ML models perform real-time analysis of the visual feed to detect and classify key features like ponds, vegetation types, forest cover, and man-made constructions."
    },
    {
      Icon: UploadCloudIcon,
      title: "Secure Cloud Upload",
      description: "Collected images and metadata are geotagged and securely transmitted to our cloud servers in real-time, ensuring data integrity and immediate availability for processing."
    },
    {
      Icon: CogIcon,
      title: "Image Processing & Segmentation",
      description: "Advanced algorithms on the cloud server process the imagery, performing segmentation to delineate boundaries and classify different land use types with high precision."
    },
    {
      Icon: ServerStackIcon,
      title: "Database Integration",
      description: "The final, structured data—including classified polygons and analytics—is saved to our geospatial database, ready to be visualized and analyzed on the GIS Atlas."
    }
  ];

  return (
    <div className="bg-slate-900 text-white relative">
      <StarsBackground />
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 flex content-center items-center justify-center min-h-[60vh]">
        <div 
          className="absolute top-0 w-full h-full bg-center bg-cover" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594994075838-8924a0818315?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <span className="w-full h-full absolute opacity-70 bg-black"></span>
        </div>
        <div className="container relative mx-auto text-center">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl leading-tight animate-[fadeIn_1s_ease-in-out]">
            Revolutionizing Land Analysis with Drone Surveys
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-3xl mx-auto animate-[fadeIn_1s_ease-in-out_0.5s]">
            High-precision aerial data collection and AI-driven insights for comprehensive land management and resource monitoring.
          </p>
        </div>
      </div>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our State-of-the-Art Equipment</h2>
            <p className="text-slate-300 mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
              We utilize industry-leading hardware to capture data with unparalleled accuracy and detail.
            </p>
          </div> 
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="w-full md:w-1/2 lg:w-2/5">
                <img src="/assets/umRa8f89.webp" alt="H35 Drone" className="rounded-xl shadow-2xl w-full" />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 space-y-8">
                <div>
                    <h3 className="text-2xl font-bold text-orange-400 mb-2">H35 Survey Drone</h3>
                    <p className="text-slate-300">A professional-grade drone featuring extended flight times, RTK precision for centimeter-level accuracy, and a versatile payload system for mounting various sensors.</p>
                </div>
                <div className="flex gap-4">
                    <div className="w-1/2 bg-slate-700 p-4 rounded-lg">
                        <img src="https://images.unsplash.com/photo-1628561101389-f463a4798939?q=80&w=1287&auto=format&fit=crop" alt="Soil Sensor" className="w-full h-32 object-cover rounded-md mb-3" />
                        <h4 className="font-bold text-lg">Soil Sensors</h4>
                        <p className="text-sm text-slate-400">Captures data on soil composition and moisture levels.</p>
                    </div>
                    <div className="w-1/2 bg-slate-700 p-4 rounded-lg">
                        <img src="https://images.unsplash.com/photo-1563968273615-03731d5e3c15?q=80&w=1173&auto=format&fit=crop" alt="Water Sensor" className="w-full h-32 object-cover rounded-md mb-3" />
                        <h4 className="font-bold text-lg">Water Sensors</h4>
                        <p className="text-sm text-slate-400">Measures water quality parameters like turbidity and temperature.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-orange-500 uppercase">Workflow</span>
            <h2 className="text-3xl font-bold mt-2">Our End-to-End Survey Process</h2>
            <p className="text-slate-300 mt-4 max-w-3xl mx-auto">
              A systematic, six-step process that transforms aerial photographs into actionable, geospatial intelligence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <ProcessCard 
                key={step.title}
                Icon={step.Icon}
                title={step.title}
                description={step.description}
                delay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Result Section */}
      <section className="py-20 bg-slate-800">
         <div className="container mx-auto px-4">
             <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">From Raw Data to Actionable Insights</h2>
                    <p className="text-lg text-slate-300 mb-6">
                        The result of our survey is not just a picture, but a detailed digital twin of the landscape. This orthomosaic image of a village, created by stitching together hundreds of individual drone photos, serves as the foundation for our analysis. From this, our AI can automatically identify and map:
                    </p>
                    <ul className="space-y-3 text-lg text-slate-200">
                        <li className="flex items-start"><span className="text-green-400 font-bold mr-3 mt-1">✓</span> Individual property boundaries and constructions.</li>
                        <li className="flex items-start"><span className="text-green-400 font-bold mr-3 mt-1">✓</span> Water bodies, including rivers, ponds, and reservoirs.</li>
                        <li className="flex items-start"><span className="text-green-400 font-bold mr-3 mt-1">✓</span> Vegetation health and forest cover density.</li>
                        <li className="flex items-start"><span className="text-green-400 font-bold mr-3 mt-1">✓</span> Road networks and other critical infrastructure.</li>
                    </ul>
                </div>
                <div className="lg:w-1/2">
                     <img 
                        src="https://images.unsplash.com/photo-1542036491-1648a1b5d624?q=80&w=2072&auto=format&fit=crop" 
                        alt="Drone image of a village"
                        className="rounded-xl shadow-2xl object-cover w-full h-full"
                    />
                </div>
             </div>
         </div>
      </section>

    </div>
  );
};

const ProcessCard: React.FC<{ Icon: React.ElementType; title: string; description: string; delay: number }> = ({ Icon, title, description, delay }) => (
    <div 
        className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 transition-transform transform hover:-translate-y-2 hover:shadow-orange-500/20 animate-slide-in-up"
        style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
        <div className="flex items-center mb-4">
            <div className="text-orange-400 bg-slate-700 p-3 rounded-full mr-4">
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-slate-300">{description}</p>
    </div>
);

export default DroneSurveyPage;