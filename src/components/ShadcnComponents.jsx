import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl text-slate-100 shadow-xl overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("p-5 border-b border-slate-800/60 flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("text-lg font-bold tracking-tight text-slate-100 flex items-center gap-2", className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn("p-5 border-t border-slate-800/60 flex items-center", className)} {...props}>
      {children}
    </div>
  )
}

export function Button({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  disabled,
  onClick,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
  
  const variants = {
    default: "bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20 active:scale-[0.98]",
    ghost: "bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700",
    outline: "border border-slate-700 bg-transparent hover:bg-slate-800/50 text-slate-200",
    destructive: "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100"
  }

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-12 px-6 text-base rounded-xl font-semibold",
    icon: "h-9 w-9 p-0"
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export function Badge({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    critical: "bg-rose-500/15 text-rose-400 border-rose-500/40 animate-pulse",
    high: "bg-amber-500/15 text-amber-400 border-amber-500/40",
    medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/40",
    low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    verified: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function Tabs({ value, onValueChange, children, className }) {
  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeValue: value, onValueChange })
        }
        return child;
      })}
    </div>
  )
}

export function TabsList({ className, children, activeValue, onValueChange }) {
  return (
    <div className={cn("flex p-1 rounded-xl bg-slate-900/90 border border-slate-800/80 gap-1", className)}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeValue, onValueChange })
        }
        return child;
      })}
    </div>
  )
}

export function TabsTrigger({ value, children, activeValue, onValueChange, className }) {
  const isActive = activeValue === value
  return (
    <button
      onClick={() => onValueChange && onValueChange(value)}
      className={cn(
        "flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2",
        isActive
          ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40",
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, activeValue, children, className }) {
  if (value !== activeValue) return null
  return <div className={cn("mt-3", className)}>{children}</div>
}

export function Progress({ value = 0, className, color = "bg-purple-600" }) {
  return (
    <div className={cn("w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden", className)}>
      <motion.div
        className={cn("h-full rounded-full transition-all", color)}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  )
}
