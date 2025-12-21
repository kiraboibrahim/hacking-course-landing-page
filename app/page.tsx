/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Terminal, Lock, Search, FileCode, Database, Eye, ChevronRight, Clock, DollarSign, Calendar, Phone, Mail, Zap, Award, Target, ChevronDown, Menu, X, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';

interface ChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (url: string) => void;
}

function ChallengeModal({ isOpen, onClose, onSuccess }: ChallengeModalProps) {
    const [input, setInput] = useState<string>('');
    const [showHint, setShowHint] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const correctAnswer = 'base64decode';
    const encodedMessage = 'YmFzZTY0ZGVjb2Rl';

    const hints = [
        'This message looks encoded. What common encoding method uses alphanumeric characters and equals signs?',
        'The encoded string is: YmFzZTY0ZGVjb2Rl - Try decoding it!',
        'Use Base64 decoding. The answer is what you need to do to decode this message.'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

        if (trimmedInput === correctAnswer) {
            setSuccess(true);
            setError('');
            setTimeout(() => {
                onSuccess('https://wa.me/256709645302?text=I%20solved%20the%20challenge!%20Ready%20to%20enroll.');
            }, 1500);
        } else {
            setError('Incorrect! Try again or use a hint.');
            setInput('');
        }
    };

    const resetChallenge = () => {
        setInput('');
        setError('');
        setSuccess(false);
        setShowHint(0);
    };

    useEffect(() => {
        if (!isOpen) resetChallenge();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-3 sm:px-6"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-xl sm:max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-cyber bg-black border-4 border-pink-500 rounded-2xl p-4 sm:p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-pink-400 transition-colors"
                >
                    <X size={24} className="sm:hidden" />
                    <X size={28} className="hidden sm:block" />
                </button>

                <div className="text-center mb-6">
                    <Terminal className="mx-auto mb-3 sm:mb-4 text-cyan-400" size={48} />
                    <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">
                        HACKING CHALLENGE
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-base">
                        Prove your skills before enrolling!
                    </p>
                </div>

                {!success ? (
                    <>
                        <div className="bg-slate-900/50 border-2 border-purple-500 rounded-lg p-4 sm:p-6 mb-6">
                            <div className="flex items-start gap-3 mb-4">
                                <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" size={22} />
                                <div>
                                    <p className="text-white font-bold mb-1 text-sm sm:text-base">
                                        MISSION BRIEFING:
                                    </p>
                                    <p className="text-gray-300 text-xs sm:text-base">
                                        An encrypted message has been intercepted. Decode it to unlock enrollment.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-black/50 border-2 border-cyan-400 rounded-lg p-3 sm:p-4 font-mono">
                                <div className="text-cyan-400 text-xs mb-2">
                                    ENCRYPTED MESSAGE:
                                </div>
                                <div className="text-pink-400 text-base sm:text-xl break-all">
                                    {encodedMessage}
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-pink-400 font-bold mb-2 text-sm sm:text-base">
                                    Enter the decoded message:
                                </label>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-3 bg-black border-2 border-purple-500 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors font-mono text-sm sm:text-base"
                                    placeholder="Type your answer here..."
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-xs sm:text-sm bg-red-500/10 border-2 border-red-500 rounded-lg p-3">
                                    <AlertCircle size={18} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="submit"
                                    className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-black border-2 border-pink-400 hover:scale-105 transition-transform text-sm sm:text-base"
                                >
                                    SUBMIT ANSWER
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowHint(Math.min(showHint + 1, hints.length))}
                                    className="w-full sm:w-auto px-6 py-3 bg-black border-2 border-yellow-400 rounded-lg font-bold text-yellow-400 hover:bg-yellow-400/10 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                                    disabled={showHint >= hints.length}
                                >
                                    <Lightbulb size={18} />
                                    HINT {showHint < hints.length ? `(${showHint}/${hints.length})` : '(MAX)'}
                                </button>
                            </div>
                        </form>

                        {showHint > 0 && (
                            <div className="mt-4 bg-yellow-500/10 border-2 border-yellow-400 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                                    <div>
                                        <div className="text-yellow-400 font-bold text-xs sm:text-sm mb-1">
                                            HINT {showHint}:
                                        </div>
                                        <p className="text-gray-300 text-xs sm:text-sm">
                                            {hints[showHint - 1]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-6 sm:py-8">
                        <CheckCircle className="mx-auto mb-4 text-green-400" size={64} />
                        <h3 className="text-2xl sm:text-3xl font-black text-green-400 mb-2">
                            ACCESS GRANTED!
                        </h3>
                        <p className="text-gray-300 mb-4 text-sm sm:text-base">
                            Redirecting to enrollment...
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CyberpunkLanding() {
    const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
    const [activeWeek, setActiveWeek] = useState<number | null>(null);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [showChallenge, setShowChallenge] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setShowMobileMenu(false);
        }
    };

    const handleEnrollClick = () => {
        setShowChallenge(true);
    };

    const handleChallengeSuccess = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
        setShowChallenge(false);
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            <ChallengeModal
                isOpen={showChallenge}
                onClose={() => setShowChallenge(false)}
                onSuccess={handleChallengeSuccess}
            />

            <div className="fixed inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,0,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    animation: 'grid-flow 20s linear infinite'
                }}></div>
            </div>

            <div className="fixed top-20 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <style>{`
        @keyframes grid-flow {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mobile-menu-enter {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>

            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black backdrop-blur-md border-b-2 border-pink-500/30' : 'bg-black/80 backdrop-blur-sm'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                            CODERS CLUB
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-pink-400 transition-colors font-bold">Skills</button>
                            <button onClick={() => scrollToSection('schedule')} className="text-gray-300 hover:text-pink-400 transition-colors font-bold">Schedule</button>
                            <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-pink-400 transition-colors font-bold">Projects</button>
                            <button
                                onClick={handleEnrollClick}
                                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-bold border-2 border-pink-400 hover:scale-105 transition-transform"
                            >
                                ENROLL NOW
                            </button>
                        </div>

                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden text-pink-400 hover:text-cyan-400 transition-colors"
                        >
                            {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    {showMobileMenu && (
                        <div className="md:hidden pb-4 space-y-3 mobile-menu-enter">
                            <button onClick={() => scrollToSection('skills')} className="block w-full text-left text-gray-300 hover:text-pink-400 transition-colors font-bold py-2">Skills</button>
                            <button onClick={() => scrollToSection('schedule')} className="block w-full text-left text-gray-300 hover:text-pink-400 transition-colors font-bold py-2">Schedule</button>
                            <button onClick={() => scrollToSection('projects')} className="block w-full text-left text-gray-300 hover:text-pink-400 transition-colors font-bold py-2">Projects</button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="relative z-10 pt-24 sm:pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full border-2 border-pink-500 backdrop-blur-sm animate-pulse">
                            <span className="text-pink-400 font-bold text-sm sm:text-lg">⚡ NEW COURSE ALERT ⚡</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 px-4" style={{
                            background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundSize: '200% auto',
                            animation: 'gradient 3s linear infinite',
                            textShadow: '0 0 20px rgba(255,0,255,0.3)'
                        }}>
                            ETHICAL HACKING
                        </h1>

                        <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-cyan-400 px-4">
                            [ BECOME THE GUARDIAN OF THE DIGITAL REALM ]
                        </div>

                        <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light px-4">
                            5 weeks • 7 elite skills • Infinite possibilities
                            <br />
                            <span className="text-pink-400">Break in. Build up. Protect the future.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
                            <button
                                onClick={handleEnrollClick}
                                className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-black text-lg sm:text-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-300 border-2 border-pink-400"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    <Phone size={24} className="animate-bounce" />
                                    HACK THE SYSTEM
                                    <Zap size={24} />
                                </span>
                            </button>

                            <button
                                onClick={handleEnrollClick}
                                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-black/50 border-2 border-cyan-400 rounded-lg font-bold text-lg sm:text-xl hover:bg-cyan-400/10 transition-all duration-300 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
                            >
                                <Mail size={24} className="text-cyan-400" />
                                <span className="text-cyan-400">EMAIL US</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                <div className="relative bg-black border-2 border-cyan-400 rounded-xl p-6 sm:p-8 hover:scale-105 transition-transform">
                                    <Clock className="mx-auto mb-3 sm:mb-4 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} size={40} />
                                    <div className="text-3xl sm:text-4xl font-black text-cyan-400 mb-2">5 WEEKS</div>
                                    <div className="text-sm sm:text-base text-gray-400 font-bold">INTENSIVE TRAINING</div>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                <div className="relative bg-black border-2 border-pink-400 rounded-xl p-6 sm:p-8 hover:scale-105 transition-transform">
                                    <DollarSign className="mx-auto mb-3 sm:mb-4 text-pink-400" size={40} style={{ animation: 'float 2s ease-in-out infinite' }} />
                                    <div className="text-3xl sm:text-4xl font-black text-pink-400 mb-2">100K UGX</div>
                                    <div className="text-sm sm:text-base text-gray-400 font-bold">ONE-TIME FEE</div>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                <div className="relative bg-black border-2 border-green-400 rounded-xl p-6 sm:p-8 hover:scale-105 transition-transform">
                                    <Calendar className="mx-auto mb-3 sm:mb-4 text-green-400 animate-pulse" size={40} />
                                    <div className="text-3xl sm:text-4xl font-black text-green-400 mb-2">LIMITED</div>
                                    <div className="text-sm sm:text-base text-gray-400 font-bold">SPOTS AVAILABLE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="schedule" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                        5-WEEK BATTLE PLAN
                    </h2>
                    <p className="text-gray-400 text-lg sm:text-xl font-bold">// STRUCTURED PATH TO MASTERY + CTF CHALLENGES EVERY WEEK</p>
                </div>

                <div className="space-y-6">
                    {[
                        { week: 1, icon: Terminal, title: "Linux Basics", description: "Master terminal commands, file systems, and shell scripting", color: "from-cyan-500 to-blue-500", topics: ["Command Line Mastery", "File Permissions", "Shell Scripting", "System Administration"] },
                        { week: 2, icon: Lock, title: "Cryptography", description: "Understand encryption, hashing, and secure communications", color: "from-purple-500 to-pink-500", topics: ["Symmetric Encryption", "Public Key Cryptography", "Hash Functions", "SSL/TLS"] },
                        { week: 3, icon: Search, title: "Web Exploitation", description: "Identify and exploit web application vulnerabilities", color: "from-green-500 to-cyan-500", topics: ["SQL Injection", "XSS Attacks", "CSRF", "Authentication Bypass"] },
                        { week: 4, icon: FileCode, title: "Reverse Engineering", description: "Decode and analyze compiled programs and malware", color: "from-yellow-500 to-orange-500", topics: ["Assembly Language", "Debugging Tools", "Binary Analysis", "Malware Detection"] },
                        { week: 5, icon: Database, title: "Advanced Topics", description: "Binary exploitation, OSINT, and digital forensics", color: "from-red-500 to-pink-500", topics: ["Buffer Overflows", "Intelligence Gathering", "Evidence Collection", "Incident Response"] }
                    ].map((week, index) => (
                        <div key={index} className="relative group">
                            <div className={`absolute inset-0 bg-gradient-to-r ${week.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition-all duration-300`}></div>

                            <div className="relative bg-black border-2 border-purple-500 group-hover:border-pink-400 rounded-xl overflow-hidden transition-all duration-300">
                                <button
                                    onClick={() => setActiveWeek(activeWeek === index ? null : index)}
                                    className="w-full p-6 sm:p-8 flex items-center justify-between text-left"
                                >
                                    <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                                        <div className="flex-shrink-0">
                                            <week.icon className="text-cyan-400 group-hover:text-pink-400 transition-colors" size={40} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-pink-400 font-black text-sm sm:text-base mb-1">WEEK {week.week}</div>
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors mb-2">
                                                {week.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm sm:text-base">{week.description}</p>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`text-pink-400 flex-shrink-0 transition-transform duration-300 ${activeWeek === index ? 'rotate-180' : ''}`}
                                        size={28}
                                    />
                                </button>

                                {activeWeek === index && (
                                    <div className="border-t-2 border-purple-500/30 p-6 sm:p-8 bg-purple-900/10">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                            {week.topics.map((topic, i) => (
                                                <div key={i} className="flex items-center gap-3 text-gray-300">
                                                    <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                                                    <span className="text-sm sm:text-base">{topic}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-4">
                                            <Target className="text-pink-400 flex-shrink-0" size={24} />
                                            <div>
                                                <div className="text-pink-400 font-black text-sm sm:text-base">CAPTURE THE FLAG SESSION</div>
                                                <div className="text-gray-300 text-xs sm:text-sm">Hands-on challenges to test your skills in real-world scenarios</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="projects" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                        WHAT YOU&lsquo;LL BUILD
                    </h2>
                    <p className="text-gray-400 text-lg sm:text-xl font-bold">// REAL PORTFOLIO PROJECTS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        { title: "Vulnerability Exploitation", icon: Shield, description: "Complete security assessment of a vulnerable system" },
                        { title: "Custom Exploit Development", icon: Target, description: "Build working exploits for real vulnerabilities" },
                        { title: "Forensics Investigation", icon: Eye, description: "Solve complex digital crime scenarios" }
                    ].map((project, index) => (
                        <div key={index} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative bg-black border-2 border-purple-500 group-hover:border-cyan-400 rounded-xl p-6 sm:p-8 text-center hover:scale-105 transition-all duration-300">
                                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full border-2 border-pink-400 mb-4 sm:mb-6">
                                    <project.icon className="text-cyan-400" size={32} />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-pink-400 mb-3 sm:mb-4">{project.title}</h3>
                                <p className="text-gray-400 text-sm sm:text-base">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 sm:mt-16 text-center">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400 rounded-lg px-6 sm:px-8 py-4 sm:py-6">
                        <Award className="text-cyan-400 flex-shrink-0" size={32} />
                        <div className="text-left">
                            <div className="text-cyan-400 font-black text-base sm:text-lg">BUILD YOUR PORTFOLIO</div>
                            <div className="text-gray-300 text-sm sm:text-base">Showcase real-world projects to potential employers</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="skills" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                        YOUR ARSENAL
                    </h2>
                    <p className="text-gray-400 text-lg sm:text-xl font-bold">// 7 ELITE SKILLS TO MASTER</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        { icon: Terminal, title: "Linux Basics", color: "from-cyan-500 to-blue-500" },
                        { icon: Lock, title: "Cryptography", color: "from-purple-500 to-pink-500" },
                        { icon: Search, title: "Web Exploitation", color: "from-green-500 to-cyan-500" },
                        { icon: FileCode, title: "Reverse Engineering", color: "from-yellow-500 to-orange-500" },
                        { icon: Database, title: "Binary Exploitation", color: "from-red-500 to-pink-500" },
                        { icon: Eye, title: "OSINT", color: "from-blue-500 to-purple-500" },
                        { icon: Shield, title: "Forensics", color: "from-pink-500 to-purple-500" }
                    ].map((skill, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredSkill(index)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className="relative group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition-all duration-300`}></div>

                            <div className="relative bg-black border-2 border-purple-500 group-hover:border-pink-400 rounded-xl p-6 sm:p-8 transition-all duration-300 transform group-hover:scale-105">
                                <skill.icon
                                    className={`mb-4 transition-all duration-300 ${hoveredSkill === index ? 'text-pink-400 scale-125' : 'text-cyan-400'
                                        }`}
                                    size={40}
                                />
                                <h3 className="text-xl sm:text-2xl font-black text-pink-400 group-hover:text-cyan-400 transition-colors">
                                    {skill.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>

                    <div className="relative bg-black border-4 border-pink-500 rounded-2xl p-8 sm:p-16 text-center">
                        <Shield className="mx-auto mb-6 text-cyan-400" size={64} style={{ animation: 'float 3s ease-in-out infinite' }} />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                            READY TO JACK IN?
                        </h2>
                        <p className="text-xl sm:text-2xl mb-10 text-purple-300 font-bold px-4">
                            The future needs you. The matrix awaits.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                            <button
                                onClick={handleEnrollClick}
                                className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-black text-lg sm:text-2xl transform hover:scale-110 transition-all duration-300 shadow-xl shadow-pink-500/30 border-2 border-pink-400 flex items-center justify-center gap-3"
                            >
                                <Phone size={24} />
                                +256 709 645 302
                            </button>

                            <button
                                onClick={handleEnrollClick}
                                className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-black border-2 border-cyan-400 rounded-lg font-black text-lg sm:text-xl hover:bg-cyan-400/10 transition-all duration-300 shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-3"
                            >
                                <Mail size={24} className="text-cyan-400" />
                                <span className="text-cyan-400 break-all">kiraboibra268@gmail.com</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 border-t-2 border-purple-500 py-8 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xl sm:text-2xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                        CODERS CLUB
                    </p>
                    <p className="text-gray-400 font-bold text-sm sm:text-base">© 2024 // FORGING THE NEXT GENERATION OF DIGITAL WARRIORS</p>
                </div>
            </div>

            {scrolled && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full border-2 border-pink-400 shadow-lg shadow-pink-500/50 hover:scale-110 transition-all duration-300"
                    aria-label="Back to top"
                >
                    <ChevronRight className="transform -rotate-90" size={24} />
                </button>
            )}
        </div>
    );
}