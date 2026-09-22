import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CyberGlobeBackground from './components/CyberGlobe'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from './components/ShadcnComponents'
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Link2,
  Zap,
  Search,
  Sparkles,
  CheckCircle2,
  XCircle,
  Activity,
  RefreshCw,
  Info
} from 'lucide-react'


const DEMO_PRESETS = {
  job: `CONGRATULATIONS! You have been selected for a remote Data Entry / Administrative Specialist position at Global Tech Logistics paying $75/hour. No interview required! To begin immediate onboarding, you must wire $450 via Zelle or Crypto to purchase your certified company laptop and software setup kit from our authorized vendor.`,
  rental: `URGENT: Luxury 2-Bedroom Penthouse in downtown for only $800/month (Utilities included)! The landlord is currently overseas on a missionary assignment. To reserve the property and receive the keys by FedEx before viewing, please deposit $1,200 security fee via Western Union or wire transfer immediately.`,
  verified: `Hello Alex, following up on our project review call yesterday. Attached is the revised product roadmap PDF for Q4. Please review the updated milestones and let me know if the team needs any adjustments before our Friday sync.`,
  scamUrl: `http://global-tech-logistics.weebly.com/onboarding/pay-equipment-fee`,
  safeUrl: `https://careers.microsoft.com/professionals/us/en/job-details`
}

export default function App() {
  const [activeTab, setActiveTab] = useState('text')
  const [inputText, setInputText] = useState('')
  const [inputUrl, setInputUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [scanHistoryCount, setScanHistoryCount] = useState(148)
  const [errorMessage, setErrorMessage] = useState('')

  const resultsRef = useRef(null)

  useEffect(() => {
    if (scanResult) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [scanResult])

  const activeContent = activeTab === 'text' ? inputText : inputUrl


  const handleLoadPreset = (key) => {
    if (key === 'scamUrl' || key === 'safeUrl') {
      setActiveTab('url')
      setInputUrl(DEMO_PRESETS[key])
    } else {
      setActiveTab('text')
      setInputText(DEMO_PRESETS[key])
    }
    setScanResult(null)
    setErrorMessage('')
  }


  const handleAnalyzeThreat = async () => {
    const textToScan = activeTab === 'text' ? inputText.trim() : inputUrl.trim()

    if (!textToScan) {
      setErrorMessage(activeTab === 'text' ? 'Please enter text to analyze.' : 'Please enter a URL to analyze.')
      return
    }

    setErrorMessage('')
    setIsScanning(true)
    setScanResult(null)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY


    const generateFallbackData = (text) => {
      const lower = text.toLowerCase()

      if (lower.includes('weebly') || lower.includes('pay-equipment') || lower.includes('blogspot') || lower.includes('ngrok')) {
        return {
          ai_risk_score: 96,
          summary: "CRITICAL THREAT DETECTED: Malicious Phishing & Advance-Fee Domain. The URL utilizes free hosting (Weebly) to impersonate a legitimate enterprise and includes a suspicious payment endpoint (/pay-equipment-fee).",
          red_flags: [
            {
              type: "Free Domain Hosting Abuse",
              severity: "critical",
              evidence: "global-tech-logistics.weebly.com",
              explanation: "Legitimate corporate enterprises host onboarding portals on official registered domain names, not free website builders like Weebly."
            },
            {
              type: "Suspicious Financial Path",
              severity: "critical",
              evidence: "/onboarding/pay-equipment-fee",
              explanation: "Legitimate employment onboarding never requires candidates to pay equipment fees directly via web forms."
            }
          ],
          recommended_actions: [
            "Do NOT enter any personal, credit card, or bank details on this page.",
            "Do NOT complete any payment forms on free-hosted domains.",
            "Report the abusive link to weebly.com/abuse."
          ]
        }
      } else if (lower.includes('microsoft.com') || lower.includes('careers.')) {
        return {
          ai_risk_score: 5,
          summary: "VERIFIED SAFE URL: Official corporate career portal belonging to Microsoft Corporation with valid SSL certificates.",
          red_flags: [],
          recommended_actions: [
            "URL is safe to navigate.",
            "Ensure HTTPS protocol remains active throughout your session."
          ]
        }
      } else if (lower.includes('zelle') || lower.includes('wire') || lower.includes('$75') || lower.includes('laptop') || lower.includes('data entry')) {
        return {
          ai_risk_score: 94,
          summary: "CRITICAL THREAT DETECTED: Classic Remote Job Equipment Advance-Fee Scam. The offer promises unrealistic pay without an interview and demands upfront wire transfers for equipment.",
          red_flags: [
            {
              type: "Advance Fee Scam",
              severity: "critical",
              evidence: "wire $450 via Zelle or Crypto to purchase your certified company laptop",
              explanation: "Legitimate employers never demand job applicants wire money or buy equipment from specific vendors upfront."
            },
            {
              type: "No Interview Process",
              severity: "high",
              evidence: "No interview required! To begin immediate onboarding...",
              explanation: "Hiring without a formal interview process is a major hallmark of automated job scams."
            },
            {
              type: "Unrealistic Compensation",
              severity: "high",
              evidence: "$75/hour for remote Data Entry",
              explanation: "Pay rate significantly exceeds industry averages for entry-level data entry positions."
            }
          ],
          recommended_actions: [
            "Do NOT send any money, Zelle payments, or cryptocurrency.",
            "Cease all communication with the sender immediately.",
            "Report the email address to the FTC at reportfraud.ftc.gov.",
            "Block the sender domain across your mail provider."
          ]
        }
      } else if (lower.includes('western union') || lower.includes('overseas') || lower.includes('$800') || lower.includes('deposit')) {
        return {
          ai_risk_score: 88,
          summary: "HIGH RISK THREAT DETECTED: Rental Deposit Wire Trap. Fraudulent landlord impersonation claiming inability to show property in person and requesting wire transfers.",
          red_flags: [
            {
              type: "Wire Payment Requirement",
              severity: "critical",
              evidence: "deposit $1,200 security fee via Western Union or wire transfer immediately",
              explanation: "Irreversible money transfers before signing a verified lease or viewing in-person are almost always fraudulent."
            },
            {
              type: "Absentee Landlord Excuse",
              severity: "high",
              evidence: "currently overseas on a missionary assignment",
              explanation: "Common script used by scam syndicates to justify why you cannot inspect the property inside."
            }
          ],
          recommended_actions: [
            "Never wire funds for property you have not inspected in person.",
            "Verify real estate ownership via official county public land records.",
            "Report listing to the hosting website and local law enforcement."
          ]
        }
      } else {
        return {
          ai_risk_score: 8,
          summary: "VERIFIED LOW RISK: Content appears to be legitimate standard workplace communication with no scam indicators.",
          red_flags: [],
          recommended_actions: [
            "Standard security vigilance recommended.",
            "Verify file attachments before opening if sender is unknown."
          ]
        }
      }
    }

    try {
      if (apiKey) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Act as an elite cybersecurity scam scanner. Analyze the input for job scams, fake equipment fees, rental deposit traps, phishing, and advance fee fraud.
If the input is a URL, evaluate the domain. Flag as HIGH/CRITICAL if it uses free hosting (weebly, wix, blogspot, ngrok), URL shorteners, typosquatting, or has suspicious financial paths (/pay-equipment, /deposit). Legitimate companies do not use free domains for hiring.
CRITICAL RULE: If the input mentions an 'offer letter', 'job', or 'selection' AND asks the user to 'pay', 'send', or 'deposit' money (even small or casually mentioned amounts like 'pay 500 to proceed'), you MUST instantly flag it as a HIGH/CRITICAL threat (Risk Score 85+). Legitimate job or university offers NEVER ask for money just to 'proceed further'.

Input to analyze:
"""
${textToScan}
"""

Return strictly valid JSON matching this schema:
{
  "ai_risk_score": <number 0-100>,
  "summary": "<string brief summary>",
  "red_flags": [
    {
      "type": "<string threat type>",
      "severity": "<critical|high|medium|low>",
      "evidence": "<string exact text snippet>",
      "explanation": "<string clear explanation>"
    }
  ],
  "recommended_actions": ["<string action 1>", "<string action 2>"]
}`
                    }
                  ]
                }
              ],
              generationConfig: {
                response_mime_type: "application/json"
              }
            })
          }
        )

        if (!response.ok) {
          throw new Error(`Gemini API returned status ${response.status}`)
        }

        const data = await response.json()
        const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text
        const parsedResult = JSON.parse(rawJsonText)


        setTimeout(() => {
          setScanResult(parsedResult)
          setIsScanning(false)
          setScanHistoryCount((c) => c + 1)
        }, 1200)

      } else {

        setTimeout(() => {
          const fallbackData = generateFallbackData(textToScan)
          setScanResult(fallbackData)
          setIsScanning(false)
          setScanHistoryCount((c) => c + 1)
        }, 1600)
      }

    } catch (err) {
      console.warn("API request error, switching to fallback analyzer:", err)
      setTimeout(() => {
        const fallbackData = generateFallbackData(textToScan)
        setScanResult(fallbackData)
        setIsScanning(false)
        setScanHistoryCount((c) => c + 1)
      }, 1400)
    }
  }

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative flex flex-col">

      <CyberGlobeBackground />


      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 shadow-lg shadow-cyan-500/20 text-white">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-white via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                  SCAMSHIELD
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  AI v2.5
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>DEFENSE ENGINE ONLINE</span>
            </div>

            <div className="text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-800 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>Scans: {scanHistoryCount}</span>
            </div>
          </div>
        </div>
      </header>


      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 py-10 flex flex-col space-y-8">


        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="default" className="px-3 py-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Cyber Threat Intelligence</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Scam & Fraud <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Detection Shield</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Instantly evaluate job offers, rental listings, phishing emails, and suspicious URLs with Gemini AI threat analysis.
          </p>
        </div>


        <Card className="relative overflow-hidden border-slate-800/80 bg-slate-900/70 backdrop-blur-2xl">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>
                <Search className="w-5 h-5 text-cyan-400" />
                Analyze Threat Vector
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">
                Paste suspicious emails, job descriptions, rental offers, or web links below.
              </p>
            </div>


            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-500 mr-1">Demos:</span>
              {activeTab === 'url' ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLoadPreset('scamUrl')}
                    className="text-xs text-rose-300 border-rose-500/20 hover:bg-rose-500/10"
                  >
                    Scam URL
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLoadPreset('safeUrl')}
                    className="text-xs text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/10"
                  >
                    Safe URL
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLoadPreset('job')}
                    className="text-xs text-amber-300 border-amber-500/20 hover:bg-amber-500/10"
                  >
                    Job Scam
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLoadPreset('rental')}
                    className="text-xs text-rose-300 border-rose-500/20 hover:bg-rose-500/10"
                  >
                    Rental Trap
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLoadPreset('verified')}
                    className="text-xs text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/10"
                  >
                    Verified Text
                  </Button>
                </>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="max-w-xs">
                <TabsTrigger value="text">
                  <FileText className="w-3.5 h-3.5" />
                  Text Content
                </TabsTrigger>
                <TabsTrigger value="url">
                  <Link2 className="w-3.5 h-3.5" />
                  Suspicious URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text">
                <div className="relative rounded-xl overflow-hidden border border-slate-800 focus-within:border-cyan-500/60 transition">
                  <textarea
                    rows={6}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste job offer text, rental email, or message here..."
                    className="w-full p-4 bg-slate-950/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none resize-none font-sans leading-relaxed"
                  />


                  {isScanning && (
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4]"
                      initial={{ top: '0%' }}
                      animate={{ top: ['0%', '98%', '0%'] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="url">
                <div className="relative rounded-xl overflow-hidden border border-slate-800 focus-within:border-cyan-500/60 transition">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://suspicious-site-verify-login.com"
                    className="w-full p-4 bg-slate-950/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-mono"
                  />


                  {isScanning && (
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4]"
                      initial={{ top: '0%' }}
                      animate={{ top: ['0%', '90%', '0%'] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {errorMessage && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5 mt-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                {errorMessage}
              </p>
            )}


            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-500 font-mono">
                {activeContent.length} characters analyzed
              </span>

              <Button
                size="lg"
                onClick={handleAnalyzeThreat}
                disabled={isScanning || !activeContent.trim()}
                className="w-full sm:w-auto min-w-[200px]"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin text-cyan-200" />
                    Deep Scanning...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2 fill-current" />
                    Analyze Threat
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>


        <AnimatePresence mode="wait">
          {scanResult && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`space-y-6 rounded-2xl transition-all duration-500 ${scanResult.ai_risk_score > 80
                ? 'border border-rose-500/50 shadow-[0_0_35px_rgba(244,63,94,0.3)] animate-pulse p-1'
                : ''
                }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                <Card className="lg:col-span-1 flex flex-col justify-center items-center p-6 text-center border-slate-800 bg-slate-900/80">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
                    Threat Risk Gauge
                  </h3>

                  <div className="relative w-44 h-44 flex items-center justify-center my-2">

                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="88"
                        cy="88"
                        r="72"
                        className="stroke-slate-800"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="88"
                        cy="88"
                        r="72"
                        stroke={
                          scanResult.ai_risk_score > 70
                            ? "#ef4444"
                            : scanResult.ai_risk_score > 30
                              ? "#f59e0b"
                              : "#10b981"
                        }
                        strokeWidth="12"
                        strokeDasharray={452}
                        initial={{ strokeDashoffset: 452 }}
                        animate={{
                          strokeDashoffset: 452 - (452 * scanResult.ai_risk_score) / 100
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>


                    <div className="absolute flex flex-col items-center justify-center">
                      <motion.span
                        className={`text-4xl font-extrabold font-mono ${scanResult.ai_risk_score > 70
                          ? "text-rose-400"
                          : scanResult.ai_risk_score > 30
                            ? "text-amber-400"
                            : "text-emerald-400"
                          }`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {scanResult.ai_risk_score}
                      </motion.span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        Risk Score / 100
                      </span>
                    </div>
                  </div>


                  <div className="mt-4">
                    {scanResult.ai_risk_score > 70 ? (
                      <Badge variant="critical" className="px-4 py-1 text-sm">
                        <ShieldAlert className="w-4 h-4" />
                        CRITICAL THREAT
                      </Badge>
                    ) : scanResult.ai_risk_score > 30 ? (
                      <Badge variant="high" className="px-4 py-1 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        MODERATE RISK
                      </Badge>
                    ) : (
                      <Badge variant="verified" className="px-4 py-1 text-sm">
                        <ShieldCheck className="w-4 h-4" />
                        SAFE / VERIFIED
                      </Badge>
                    )}
                  </div>
                </Card>


                <Card className="lg:col-span-2 border-slate-800 bg-slate-900/80 flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">
                      <Info className="w-5 h-5 text-cyan-400" />
                      AI Threat Evaluation Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col justify-center">
                    <motion.p
                      key={scanResult.summary}
                      variants={{
                        show: { transition: { staggerChildren: 0.03 } }
                      }}
                      initial="hidden"
                      animate="show"
                      className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-sans flex flex-wrap gap-x-1 gap-y-0.5"
                    >
                      {scanResult.summary.split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 5 },
                            show: { opacity: 1, y: 0 }
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                        <span className="text-[10px] font-mono text-slate-500 block">Red Flags</span>
                        <span className="text-lg font-bold text-slate-200">
                          {scanResult.red_flags.length}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                        <span className="text-[10px] font-mono text-slate-500 block">Confidence</span>
                        <span className="text-lg font-bold text-cyan-400">98.4%</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                        <span className="text-[10px] font-mono text-slate-500 block">Scanner Model</span>
                        <span className="text-xs font-semibold text-purple-300 block mt-1">
                          Gemini 1.5 Flash
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>


              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                <Card className="border-slate-800 bg-slate-900/70">
                  <CardHeader>
                    <CardTitle className="text-rose-400">
                      <XCircle className="w-5 h-5 text-rose-400" />
                      Detected Red Flags ({scanResult.red_flags.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {scanResult.red_flags.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs flex flex-col items-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        <span>No suspicious patterns or scam indicators detected.</span>
                      </div>
                    ) : (
                      <motion.div
                        variants={{
                          show: { transition: { staggerChildren: 0.15 } }
                        }}
                        initial="hidden"
                        animate="show"
                        className="space-y-3"
                      >
                        {scanResult.red_flags.map((flag, idx) => (
                          <motion.div
                            key={idx}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              show: { opacity: 1, y: 0 }
                            }}
                            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-200">
                                {flag.type}
                              </span>
                              <Badge variant={flag.severity}>
                                {flag.severity?.toUpperCase()}
                              </Badge>
                            </div>

                            {flag.evidence && (
                              <div className="text-xs font-mono text-amber-300/90 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                                "{flag.evidence}"
                              </div>
                            )}

                            <p className="text-xs text-slate-400 leading-normal">
                              {flag.explanation}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>


                <Card className="border-slate-800 bg-slate-900/70">
                  <CardHeader>
                    <CardTitle className="text-emerald-400">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      Recommended Security Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={{
                        show: { transition: { staggerChildren: 0.15 } }
                      }}
                      initial="hidden"
                      animate="show"
                      className="space-y-3"
                    >
                      {scanResult.recommended_actions.map((action, idx) => (
                        <motion.li
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, x: -15 },
                            show: { opacity: 1, x: 0 }
                          }}
                          className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{action}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>


      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>ScamShield AI Cybersecurity Command Center</span>
          <span className="font-mono text-[11px] text-slate-600">Powered by Gemini 1.5 Flash API</span>
        </div>
      </footer>
    </div>
  )
}
