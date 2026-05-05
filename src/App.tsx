/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { NeuralField } from './components/NeuralField';
import { Sparkles, Cpu, BrainCircuit } from 'lucide-react';

export default function App() {
  return (
    <main id="app-container" className="relative h-screen w-full flex items-center justify-center overflow-hidden selection:bg-io-blue/30">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(15,23,42,1)_0%,_rgba(2,6,23,1)_100%)]" />
      
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Interactive Particles */}
      <NeuralField />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 flex items-center justify-center gap-4 text-io-blue font-display font-medium tracking-widest uppercase text-sm"
        >
          <BrainCircuit className="w-5 h-5" />
          <span>Intelligence Refined</span>
        </motion.div>

        <div className="relative group">
          {/* Outer Glows */}
          <div className="absolute inset-0 bg-io-blue/20 blur-[120px] rounded-full scale-150 animate-pulse" />
          <div className="absolute inset-0 bg-io-red/10 blur-[80px] rounded-full animate-bounce-slow" />
          
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2
            }}
            id="countdown-timer-display"
            className="relative font-display text-[22rem] leading-none font-bold select-none cursor-default"
            style={{
              textShadow: '0 0 20px rgba(66, 133, 244, 0.5), 0 0 40px rgba(66, 133, 244, 0.2)',
              background: 'linear-gradient(to bottom, #fff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            3
          </motion.h1>

          <AnimatePresence>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-io-blue to-transparent"
            />
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <h2 className="text-4xl font-display font-light text-slate-300 tracking-tight">
            Google I/O <span className="font-bold bg-gradient-to-r from-io-blue via-io-red to-io-yellow bg-clip-text text-transparent">2026</span>
          </h2>
          <p className="text-slate-500 font-sans tracking-widest uppercase text-xs">
            Connecting the dots across the AI landscape
          </p>
        </motion.div>
      </div>

      {/* Side HUD Elements */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-6 opacity-40">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-io-green animate-ping" />
          <span className="font-mono text-[10px] tracking-tighter">AI_CORE_ACTIVE: 100%</span>
        </div>
        <div className="flex items-center gap-3">
          <Cpu className="w-4 h-4 text-io-yellow" />
          <span className="font-mono text-[10px] tracking-tighter capitalize">Neural Engine: V3.2.0</span>
        </div>
      </div>

      <div className="absolute top-10 right-10 flex items-center gap-4 opacity-40">
        <span className="font-mono text-[10px] tracking-tighter">LATENCY: 4ms</span>
        <Sparkles className="w-4 h-4 text-white" />
      </div>

      {/* Aesthetic Border Accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-io-blue via-io-red to-io-yellow opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-io-yellow via-io-red to-io-blue opacity-30" />
    </main>
  );
}

