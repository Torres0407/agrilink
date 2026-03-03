import React, { useState, useEffect } from 'react';
import card1 from "../assets/image3.png";
import card3 from "../assets/image2.png";
import card4 from "../assets/image1.png";
import card5 from "../assets/image4.png";
import card6 from "../assets/image5.png";
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Maximize, 
  Sparkles, 
  CheckSquare, 
  ArrowRight, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Facebook,
  MessageCircle,
  Camera,
  X,
  User,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  Check,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download
} from 'lucide-react';

// --- Types ---
type View = 'landing' | 'upload' | 'result' | 'submission_success' | 'login' | 'signup';

type UploadStep = {
  id: string;
  label: string;
  image: string | null;
  status: 'idle' | 'uploading' | 'complete' | 'failed';
  progress: number;
};

// --- Components ---

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, x: '-50%' }}
    animate={{ opacity: 1, y: 0, x: '-50%' }}
    exit={{ opacity: 0, y: 20, x: '-50%' }}
    className="fixed bottom-8 left-1/2 z-50 bg-brand-dark text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10"
  >
    <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center">
      <User size={16} />
    </div>
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
      <X size={16} />
    </button>
  </motion.div>
);

const AuthModal = ({ type, setView, onClose }: { type: 'login' | 'signup', setView: (v: string) => void, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/40 backdrop-blur-sm"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-[32px] w-full max-w-md p-10 relative shadow-2xl"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark transition-colors">
        <X size={24} />
      </button>

      <div className="text-center mb-10">
        <div className="w-12 h-12 bg-brand-purple rounded-2xl mx-auto mb-6 flex items-center justify-center text-white">
          {type === 'login' ? <Lock size={24} /> : <User size={24} />}
        </div>
        <h2 className="text-3xl font-bold mb-2">{type === 'login' ? 'Welcome back' : 'Create account'}</h2>
        <p className="text-gray-500 text-sm">Verify your purchases with confidence</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {type === 'signup' && (
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Full name" 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
            />
          </div>
        )}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
          />
        </div>

        <button className="w-full bg-brand-purple text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">
          {type === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        {type === 'login' ? (
          <>Don't have an account? <button onClick={() => setView('signup')} className="text-brand-purple font-bold hover:underline">Sign up</button></>
        ) : (
          <>Already have an account? <button onClick={() => setView('login')} className="text-brand-purple font-bold hover:underline">Sign in</button></>
        )}
      </div>
    </motion.div>
  </motion.div>
);

const VerdictPrompt = ({ onContinue, onSignup }: { onContinue: () => void, onSignup: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/40 backdrop-blur-sm"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-[32px] w-full max-w-md p-10 text-center shadow-2xl"
    >
      <div className="w-16 h-16 bg-brand-purple/10 rounded-full mx-auto mb-6 flex items-center justify-center text-brand-purple">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-4">Almost there!</h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Sign up now to save this verification result, get a detailed authenticity report, and access your history anytime.
      </p>
      
      <div className="space-y-3">
        <button 
          onClick={onSignup}
          className="w-full bg-brand-purple text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Sign up to see verdict
        </button>
        <button 
          onClick={onContinue}
          className="w-full bg-gray-50 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all"
        >
          Continue as guest
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const VerdictResult = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/40 backdrop-blur-sm"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-[32px] w-full max-w-md p-10 text-center shadow-2xl relative"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark">
        <X size={24} />
      </button>
      
      <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center text-green-600">
        <CheckSquare size={40} />
      </div>
      <h2 className="text-3xl font-bold mb-2">It's Original!</h2>
      <p className="text-gray-500 text-sm mb-8">
        Our AI analysis confirms this product matches verified manufacturer records with 99.4% confidence.
      </p>
      
      <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Analysis Report</span>
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Verified</span>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2 text-gray-600">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Packaging dimensions match
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Hologram pattern verified
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Batch number in database
          </li>
        </ul>
      </div>

      <button 
        onClick={onClose}
        className="w-full bg-brand-purple text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-purple/20"
      >
        Done
      </button>
    </motion.div>
  </motion.div>
);

const Navbar = ({ onLogin, onSignup }: { onLogin: () => void, onSignup: () => void }) => (
  <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-brand-purple rounded-full" />
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
      <a href="#" className="hover:text-brand-purple transition-colors">Play game</a>
      <a href="#" className="hover:text-brand-purple transition-colors">Contact</a>
      <button onClick={onLogin} className="hover:text-brand-purple transition-colors">Sign in</button>
    </div>
    <button 
      onClick={onSignup}
      className="px-6 py-2 border border-brand-purple text-brand-purple rounded-full text-sm font-medium hover:bg-brand-purple hover:text-white transition-all flex items-center gap-2"
    >
      Try it for free <ArrowRight size={16} />
    </button>
  </nav>
);

const Hero = ({ onUpload }: { onUpload: () => void }) => (
  <section className="pt-16 pb-24 px-6 text-center max-w-4xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-8"
    >
      <span className="text-sm">🇳🇬</span>
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Nigeria's #1 originality checker</span>
    </motion.div>
    
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
    >
      You just bought it? <br />
      Now check if it's <span className="text-brand-purple font-serif italic relative">original
        <motion.div 
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 12 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute -top-6 -right-16 border-2 border-brand-purple text-brand-purple text-[10px] font-black px-2 py-1 rounded-sm leading-none tracking-tighter"
        >
          QUALITY<br/>ORIGINAL<br/>QUALITY
        </motion.div>
      </span>
    </motion.h1>

    <motion.button 
      onClick={onUpload}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-brand-purple text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 mx-auto shadow-lg shadow-brand-purple/20"
    >
      <Upload size={20} />
      Upload image
    </motion.button>
  </section>
);

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    {
      title: "Snap & upload",
      desc: "Capture all sides of the product and submit it for review.",
      icon: <Maximize size={32} className="text-gray-300" />,
      img: card1
    },
    {
      title: "Smart AI analysis",
      desc: "Our AI analyzes packaging design, labels, NAFDAC data and other identifiers against verified records.",
      icon: <Sparkles size={32} className="text-gray-300" />,
      img: "https://picsum.photos/seed/scan2/800/1000"
    },
    {
      title: "Instant clarity",
      desc: "Know immediately if it's authentic or potentially fake.",
      icon: <CheckSquare size={32} className="text-gray-300" />,
      img: card3
    }
  ];

  return (
    <section className="bg-brand-purple py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-16">
          How it works in <br /> 3 simple steps
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-white rounded-3xl p-8 h-[400px] flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            >
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full border border-brand-purple/20 flex items-center justify-center text-brand-purple font-bold mb-6">
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
              
              <div className="flex justify-end relative z-10">
                {step.icon}
              </div>

              {/* Hover Image Overlay */}
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20"
                  >
                    <img 
                      src={step.img} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center">
                       {idx === 0 && (
                         <div className="border-2 border-white/50 w-32 h-48 rounded-lg flex items-center justify-center">
                            <Camera className="text-white" size={40} />
                         </div>
                       )}
                       {idx === 1 && (
                         <div className="space-y-4 w-full">
                            <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ x: '-100%' }}
                                 animate={{ x: '100%' }}
                                 transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                                 className="h-full bg-white w-1/3"
                               />
                            </div>
                            <div className="text-white font-mono text-[10px] opacity-70">ANALYZING_NAFDAC_RECORDS...</div>
                         </div>
                       )}
                       {idx === 2 && (
                         <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                               <CheckSquare className="text-white" />
                            </div>
                            <div className="text-white font-bold">99% ORIGINAL</div>
                         </div>
                       )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
      <span className="text-brand-purple font-serif italic">The numbers</span> of <br /> everyday life
    </h2>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-gray-50 rounded-3xl p-10 relative overflow-hidden">
        <h3 className="text-3xl font-bold mb-4">₦100 billion+</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Counterfeit and substandard products seized and destroyed across Nigeria in by NAFDAC & SON.
        </p>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-purple/5 rounded-full blur-3xl" />
      </div>
      
      <div className="bg-gray-50 rounded-3xl p-10 relative overflow-hidden">
        <h3 className="text-3xl font-bold mb-4">4,000+</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Illegal drug outlets sealed nationwide during enforcement drives.
        </p>
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <div className="w-24 h-24 border-t-2 border-r-2 border-brand-purple rotate-45" />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-3xl p-10 relative overflow-hidden md:col-span-2 lg:col-span-1">
        <h3 className="text-3xl font-bold mb-4">20+</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          States targeted in coordinated anti-counterfeit operations.
        </p>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-purple/5 to-transparent" />
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Amara, 23",
      text: "“I bought a popular skincare serum online and something felt off. I searched it here and saw the packaging differences immediately. It turned out to be fake. This platform saved my skin.”",
      img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Abdul, 42",
      text: "“I always worry about fake medicines for my kids. Being able to check the product before using it gives me peace of mind. Every parent in Nigeria needs this.”",
      img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Tunde, 29",
      text: "“I bought a phone charger that looked original but kept overheating. After checking here, I realized it wasn't authentic. Now I verify before I buy anything tech.”",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          How we are keeping <br /> <span className="text-brand-purple font-serif italic">Nigerians safe</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-white rounded-3xl p-10 h-[320px] flex flex-col justify-between relative overflow-hidden group cursor-pointer border border-gray-100"
            >
              <div className="relative z-10">
                <MessageCircle size={24} className="text-gray-300 mb-6" />
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  {t.text}
                </p>
              </div>
              
              <div className="relative z-10">
                <p className="font-bold text-gray-400 text-xs">{t.name}</p>
              </div>

              {/* Hover Image Overlay */}
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20"
                  >
                    <img 
                      src={t.img} 
                      alt={t.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                       <p className="text-white font-bold text-lg mb-1">{t.name}</p>
                       <p className="text-white/70 text-xs line-clamp-2">{t.text}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-purple py-20 px-6 text-white">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <div className="w-12 h-12 bg-white rounded-full mb-8" />
      </div>
      
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6">Quick Links</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><a href="#" className="hover:text-white/70 transition-colors">Play game</a></li>
          <li><a href="#" className="hover:text-white/70 transition-colors">Contact</a></li>
          <li><a href="#" className="hover:text-white/70 transition-colors">Terms</a></li>
          <li><a href="#" className="hover:text-white/70 transition-colors">Privacy policy</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6">Socials</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><a href="#" className="hover:text-white/70 transition-colors flex items-center gap-2"><Twitter size={14} /> Twitter</a></li>
          <li><a href="#" className="hover:text-white/70 transition-colors flex items-center gap-2"><Linkedin size={14} /> Linkedin</a></li>
          <li><a href="#" className="hover:text-white/70 transition-colors flex items-center gap-2"><Instagram size={14} /> Tiktok</a></li>
          <li><a href="#" className="hover:text-white/70 transition-colors flex items-center gap-2"><Facebook size={14} /> Facebook</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

// --- Components ---

const UploadPage = ({ onVerify, onBack }: { onVerify: () => void, onBack: () => void }) => {
  const [onlyTwoSides, setOnlyTwoSides] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [steps, setSteps] = useState<UploadStep[]>([
    { id: 'front', label: 'Front view', image: null, status: 'idle', progress: 0 },
    { id: 'left', label: 'Left view', image: null, status: 'idle', progress: 0 },
    { id: 'back', label: 'Back view', image: null, status: 'idle', progress: 0 },
    { id: 'right', label: 'Right view', image: null, status: 'idle', progress: 0 },
  ]);

  const activeSteps = onlyTwoSides 
    ? steps.filter(s => s.id === 'front' || s.id === 'back')
    : steps;

  const currentStep = activeSteps[currentStepIdx] || activeSteps[0];

  const handleUpload = (stepId: string) => {
    // Update status to uploading
    setSteps(prev => prev.map(s => s.id === stepId ? { ...s, status: 'uploading', progress: 0 } : s));

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Mark as complete
        setSteps(prev => prev.map(s => s.id === stepId ? { 
          ...s, 
          status: 'complete', 
          progress: 100, 
          image: 'https://images.unsplash.com/photo-1626544823126-666c5517033a?auto=format&fit=crop&w=800&q=80' // Placeholder product image
        } : s));

        // Automatic next after 2 seconds
        setTimeout(() => {
          setCurrentStepIdx(prev => {
            if (prev < activeSteps.length - 1) return prev + 1;
            return prev;
          });
        }, 2000);
      } else {
        setSteps(prev => prev.map(s => s.id === stepId ? { ...s, progress } : s));
      }
    }, 400);
  };

  const handleDelete = (stepId: string) => {
    setSteps(prev => prev.map(s => s.id === stepId ? { ...s, status: 'idle', progress: 0, image: null } : s));
  };

  const allDone = activeSteps.every(s => s.status === 'complete');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload your product</h1>
          <p className="text-gray-500">Upload clear photos of your product for a reliable analysis.</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Sidebar */}
          <div className="space-y-4">
            {activeSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setCurrentStepIdx(idx)}
                className={`w-full p-6 rounded-3xl text-left transition-all flex items-center justify-between border-2 ${
                  currentStepIdx === idx 
                    ? 'border-brand-purple bg-white shadow-lg' 
                    : 'border-transparent bg-gray-50 text-gray-400'
                }`}
              >
                <span className={`font-bold ${currentStepIdx === idx ? 'text-brand-dark' : ''}`}>
                  {step.label}
                </span>
                {step.status === 'complete' && (
                  <CheckSquare size={20} className="text-brand-purple" />
                )}
              </button>
            ))}
          </div>

          {/* Main Upload Area */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <Maximize size={18} className="text-gray-400" />
                </div>
                <span className="font-bold text-lg">{currentStep.label}</span>
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={onlyTwoSides}
                    onChange={(e) => {
                      setOnlyTwoSides(e.target.checked);
                      setCurrentStepIdx(0);
                    }}
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all ${onlyTwoSides ? 'bg-brand-purple border-brand-purple' : 'border-gray-300 group-hover:border-brand-purple'}`}>
                    {onlyTwoSides && <CheckSquare size={14} className="text-white" />}
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-500">My product only has 2 sides</span>
              </label>
            </div>

            <div className="relative aspect-[16/9] md:aspect-auto md:h-[500px] border-2 border-dashed border-gray-200 rounded-[40px] flex items-center justify-center overflow-hidden bg-gray-50">
              <AnimatePresence mode="wait">
                {currentStep.status === 'idle' && (
                  <motion.button
                    key="idle"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => handleUpload(currentStep.id)}
                    className="bg-brand-purple/5 text-brand-purple px-10 py-6 rounded-3xl flex flex-col items-center gap-3 hover:bg-brand-purple/10 transition-all"
                  >
                    <Upload size={24} />
                    <span className="font-bold">Click to upload</span>
                  </motion.button>
                )}

                {currentStep.status === 'uploading' && (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-sm px-8"
                  >
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-sm font-bold text-gray-400">Loading...</span>
                      <span className="text-sm font-bold text-gray-400">{Math.round(currentStep.progress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-brand-dark"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentStep.progress}%` }}
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep.status === 'complete' && currentStep.image && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative group"
                  >
                    <img 
                      src={currentStep.image} 
                      alt="Uploaded" 
                      className="w-full h-full object-contain p-8"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-8 right-8 flex gap-4">
                      <button 
                        onClick={() => handleDelete(currentStep.id)}
                        className="w-12 h-12 bg-white shadow-xl rounded-2xl flex items-center justify-center text-red-500 hover:bg-red-50 transition-all"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    
                    {/* Success Overlay */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-8">
                       <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
                          <div className="flex justify-between items-end mb-4">
                            <span className="text-sm font-bold text-gray-400">Complete</span>
                            <span className="text-sm font-bold text-gray-400">100%</span>
                          </div>
                          <div className="h-2 bg-brand-purple rounded-full" />
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {allDone && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onVerify}
                className="w-full bg-brand-purple text-white py-6 rounded-[32px] font-bold text-xl flex items-center justify-center gap-3 shadow-2xl shadow-brand-purple/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Verify now <ArrowRight size={24} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Types ---
type VerificationResult = {
  score: number;
  confidence: 'High' | 'Low' | 'None';
  status: 'found' | 'not_found';
  id: string;
  date: string;
  images: string[];
};

// --- Components ---

const AnalysisModal = ({ progress, stage }: { progress: number, stage: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-dark/60 backdrop-blur-md p-6"
  >
    <div className="bg-white rounded-[40px] p-12 text-center max-w-md w-full shadow-2xl">
      <h3 className="text-2xl font-bold mb-2">{stage}</h3>
      <p className="text-gray-500 text-sm mb-8">Just a moment, this usually takes 5–10 seconds.</p>
      
      <div className="w-full">
        <div className="flex justify-between items-end mb-4">
          <span className="text-sm font-bold text-gray-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-dark"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const SubmissionSuccessPage = ({ onReset }: { onReset: () => void }) => (
  <div className="min-h-screen bg-gray-50/30 py-24 px-6">
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Success Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] p-12 text-center shadow-sm border border-gray-100"
      >
        <h2 className="text-3xl font-bold mb-4">Thank you for your submission.</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-10 leading-relaxed">
          Our team will verify the official product version, and you'll be notified via email once it's added to our database.
        </p>
        
        <button 
          onClick={onReset}
          className="w-full bg-brand-purple text-white py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-brand-purple/20"
        >
          Verify another product <ArrowRight size={20} />
        </button>
      </motion.div>

      {/* Game Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-brand-purple rounded-[40px] p-12 text-center text-white relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
            <Sparkles size={32} />
          </div>
          <h3 className="text-4xl font-bold mb-4">Spot the original</h3>
          <p className="text-white/70 mb-10 max-w-sm">
            Think you can tell the real from the fake? Prove it and earn points.
          </p>
          
          <button className="bg-white text-brand-purple px-12 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-gray-100 transition-all">
            Play now <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  </div>
);

const ResultPage = ({ result, onBack, onSubmitReview }: { result: VerificationResult, onBack: () => void, onSubmitReview: () => void }) => {
  const isNotFound = result.status === 'not_found';
  const isHigh = result.score >= 85 && !isNotFound;
  const colorClass = isNotFound ? 'text-gray-600 bg-gray-50' : (isHigh ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50');
  const ringColor = isNotFound ? '#9CA3AF' : (isHigh ? '#10B981' : '#EF4444');

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isNotFound ? 'Product not found' : 'AI verification result'}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {isNotFound 
              ? "We couldn't find a matching product in our verified database. This could be a new product or a potential counterfeit."
              : "Your upload was verified against current and past approved packaging, NAFDAC records and other key authenticity markers."
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-16 items-start">
          {/* Left: Image Preview */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-[40px] p-8 aspect-square flex items-center justify-center relative overflow-hidden">
              <img 
                src={result.images[0]} 
                alt="Product" 
                className="w-full h-full object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-gray-400' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-12">
            {/* Score Circle */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke={ringColor}
                    strokeWidth="12"
                    strokeDasharray={552.92}
                    initial={{ strokeDashoffset: 552.92 }}
                    animate={{ strokeDashoffset: 552.92 - (552.92 * result.score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-full ${colorClass.split(' ')[1]}`}>
                  <span className={`text-5xl font-bold ${colorClass.split(' ')[0]}`}>{result.score}%</span>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Originality<br/>score</span>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold mb-2">
                  {isNotFound ? 'Confidence level: None' : `Confidence level: ${result.confidence}`}
                </h3>
                <p className="text-gray-500 text-sm max-w-md">
                  {isNotFound 
                    ? "Our AI could not find any matching product records. This product is not currently in our verified database."
                    : (isHigh 
                      ? "Scores of 85% and above indicate a strong match therefore this product matches verified authenticity records."
                      : "Scores below 85% indicate a weak match therefore this product does not match verified authenticity records."
                    )
                  }
                </p>
              </div>
            </div>

            {/* Summary Section */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Verification summary</h3>
              
              <div className="bg-gray-50 rounded-[40px] p-10 space-y-10">
                {isNotFound ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <AlertCircle size={48} className="text-gray-300 mb-4" />
                    <h4 className="font-bold text-lg mb-2">No database match</h4>
                    <p className="text-gray-500 text-sm max-w-sm">
                      We've cross-referenced your images with over 50,000 verified product records and couldn't find a definitive match for this packaging.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="font-bold mb-6">What was verified</h4>
                      <ul className="grid md:grid-cols-2 gap-4">
                        {[
                          "Packaging layout matches verified records",
                          "Logo placement and typography consistent",
                          "NAFDAC number format valid",
                          "Manufacturer details align with database",
                          "Security seal detected and correctly positioned",
                          "Batch and expiry formatting consistent"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                            <Check size={16} className="text-brand-purple" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {!isHigh && (
                      <div>
                        <h4 className="font-bold mb-6">Differences detected</h4>
                        <ul className="grid md:grid-cols-2 gap-4">
                          {[
                            "Color tone variation (may vary by batch)",
                            "Spacing difference in text alignment",
                            "Small packaging dimension variation",
                            "Hologram reflection angle slightly different",
                            "Print sharpness variation within acceptable range",
                            "Batch code placement slightly shifted"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                              <Check size={16} className="text-red-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Meaning Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">What this means for you</h3>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isHigh ? 'text-green-600' : (isNotFound ? 'text-gray-400' : 'text-red-600')}`}>
                  {isHigh ? <ThumbsUp size={24} /> : (isNotFound ? <AlertCircle size={24} /> : <ThumbsDown size={24} />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pt-2">
                  {isNotFound
                    ? "Exercise extreme caution. This product is unverified. We recommend checking with the manufacturer directly or purchasing from an authorized distributor."
                    : (isHigh 
                      ? "You can proceed with confidence, always purchase from trusted vendors and retain receipts for traceability."
                      : "Do not proceed without further verification. Confirm further with trusted authority/vendor before use."
                    )
                  }
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              {isNotFound ? (
                <button 
                  onClick={onSubmitReview}
                  className="w-full md:w-auto px-12 py-4 bg-brand-purple text-white rounded-full font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand-purple/20"
                >
                  Submit for manual review
                </button>
              ) : (
                <>
                  <button className="flex items-center gap-2 px-8 py-4 font-bold text-gray-600 hover:text-brand-dark transition-colors">
                    <Share2 size={20} /> Share
                  </button>
                  <button className="flex items-center gap-2 px-10 py-4 bg-brand-purple/5 text-brand-purple rounded-full font-bold hover:bg-brand-purple/10 transition-all">
                    <Download size={20} /> Download result
                  </button>
                </>
              )}
            </div>

            {/* Footer Info */}
            <div className="pt-8 border-t border-gray-100 space-y-4">
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Verification Id: {result.id}</span>
                <span>Date checked: {result.date}</span>
              </div>
              <p className="text-[10px] text-gray-400">
                Company Name can make mistakes. Check info with relevant authorities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);
  const [showVerdictPrompt, setShowVerdictPrompt] = useState(false);
  const [showVerdictResult, setShowVerdictResult] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [analysisState, setAnalysisState] = useState<{ active: boolean, progress: number, stage: string }>({
    active: false,
    progress: 0,
    stage: ''
  });
  const [toast, setToast] = useState<string | null>(null);

  // Random toast effect
  useEffect(() => {
    const messages = [
      "Amara just verified her skincare serum",
      "New verification from Lagos: Original",
      "Tunde saved ₦45,000 by detecting a fake charger",
      "Sign in to save your verification history",
      "Abdul verified his kids' medicine: Original"
    ];

    const showRandomToast = () => {
      const delay = Math.random() * 15000 + 10000; // 10-25 seconds
      setTimeout(() => {
        setToast(messages[Math.floor(Math.random() * messages.length)]);
        setTimeout(() => setToast(null), 5000);
        showRandomToast();
      }, delay);
    };

    showRandomToast();
  }, []);

  const handleStartUpload = () => {
    setView('upload');
  };

  const handleVerify = async () => {
    const stages = [
      "Checking packaging layout...",
      "Verifying labels and identifiers...",
      "Matching NAFDAC records...",
      "Generating verdict...",
      "Analysis complete."
    ];

    setAnalysisState({ active: true, progress: 0, stage: stages[0] });

    for (let i = 0; i < stages.length; i++) {
      setAnalysisState(prev => ({ ...prev, stage: stages[i], progress: i === stages.length - 1 ? 100 : 23 + (i * 15) }));
      await new Promise(r => setTimeout(r, 1500));
    }

    // Determine result (random for demo, but biased towards high score)
    const rand = Math.random();
    let score = 0;
    let status: 'found' | 'not_found' = 'found';
    let confidence: 'High' | 'Low' | 'None' = 'High';

    if (rand > 0.4) {
      score = Math.floor(Math.random() * 15) + 85;
      status = 'found';
      confidence = 'High';
    } else if (rand > 0.15) {
      score = Math.floor(Math.random() * 40) + 40;
      status = 'found';
      confidence = 'Low';
    } else {
      score = 0;
      status = 'not_found';
      confidence = 'None';
    }

    setVerificationResult({
      score,
      confidence,
      status,
      id: '8XJ29-KD72',
      date: '28 Feb 2026',
      images: ['https://images.unsplash.com/photo-1626544823126-666c5517033a?auto=format&fit=crop&w=800&q=80']
    });

    setAnalysisState(prev => ({ ...prev, active: false }));
    setShowVerdictPrompt(true);
  };

  return (
    <div className="min-h-screen selection:bg-brand-purple/10 selection:text-brand-purple">
      <Navbar 
        onLogin={() => setShowAuthModal('login')} 
        onSignup={() => setShowAuthModal('signup')} 
      />
      
      <main>
        {view === 'landing' && (
          <>
            <Hero onUpload={handleStartUpload} />
            <HowItWorks />
            <Stats />
            <Testimonials />
          </>
        )}
        {view === 'upload' && (
          <UploadPage 
            onVerify={handleVerify} 
            onBack={() => setView('landing')} 
          />
        )}
        {view === 'result' && verificationResult && (
          <ResultPage 
            result={verificationResult} 
            onBack={() => setView('landing')} 
            onSubmitReview={() => setView('submission_success')}
          />
        )}
        {view === 'submission_success' && (
          <SubmissionSuccessPage onReset={() => setView('landing')} />
        )}
      </main>
      
      <Footer />

      {/* Modals & Overlays */}
      <AnimatePresence>
        {analysisState.active && (
          <AnalysisModal progress={analysisState.progress} stage={analysisState.stage} />
        )}

        {showAuthModal && (
          <AuthModal 
            type={showAuthModal} 
            setView={(v) => setShowAuthModal(v as 'login' | 'signup')} 
            onClose={() => setShowAuthModal(null)} 
          />
        )}

        {showVerdictPrompt && (
          <VerdictPrompt 
            onContinue={() => {
              setShowVerdictPrompt(false);
              setView('result');
            }}
            onSignup={() => {
              setShowVerdictPrompt(false);
              setShowAuthModal('signup');
            }}
          />
        )}

        {toast && (
          <Toast message={toast} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
