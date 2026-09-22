import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Code2,
  Boxes,
  Flame
} from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('features')
  const [counter, setCounter] = useState(0)

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Vite 6 Fast HMR",
      description: "Lightning-fast cold server start and instant Hot Module Replacement."
    },
    {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: "Tailwind CSS v4",
      description: "Next-generation utility-first styling configured with high performance."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: "Framer Motion",
      description: "Fluid declarative animations, gestures, and smooth layout transitions."
    },
    {
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
      title: "TypeScript Ready",
      description: "Strict end-to-end type safety with modern ES2023 language features."
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white relative overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-purple-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 blur-3xl pointer-events-none rounded-full" />


      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-950/70">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-500/25">
              <Boxes className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              React Stack
            </span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/80 p-1 rounded-full border border-slate-800">
            {['features', 'demo', 'stack'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200 ${activeTab === tab
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <a
            href="https://vite.dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition border border-slate-700 text-slate-200"
          >
            <span>Docs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>


      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-16 pb-24 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Vite + React + Tailwind CSS + Framer Motion</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Ready to build{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              extraordinary apps
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl font-normal leading-relaxed">
            Your workspace is now completely configured with high-performance tooling, smooth motion utilities, and clean project architecture.
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-xl mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
              <h2 className="font-semibold text-slate-200">Interactive Motion Test</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono bg-slate-800/60 px-2.5 py-1 rounded">
              State: {counter}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-sm text-slate-300 font-medium">Framer Motion Button</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCounter((c) => c + 1)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-xs shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition"
              >
                Trigger Action (+1)
              </motion.button>
            </div>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-16">
          {features.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-slate-800/50 w-fit mb-4 border border-slate-700/40">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-slate-200 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center text-xs text-purple-400 font-medium space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Configured</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>


      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>Built with React, Vite, Tailwind CSS & Framer Motion</p>
      </footer>
    </div>
  )
}

export default App
