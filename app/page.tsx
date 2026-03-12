/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal, Lock, Search, FileCode, Database, Eye,
    ChevronRight, Clock, DollarSign, Calendar, Phone, Mail,
    Zap, Award, Target, Menu, X, Lightbulb,
    AlertCircle, CheckCircle, Shield, Radio, Crosshair, Cpu
} from 'lucide-react';
import Image from 'next/image';

type Icon = React.ComponentType<{ size?: number; className?: string }>;

// ─── GLITCH TEXT ──────────────────────────────────────────────────────────────
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
    return (
        <span className={`relative inline-block ${className}`} data-text={text}
            style={{
                WebkitTextStroke: '1px transparent',
            }}>
            {text}
            <span aria-hidden className="absolute inset-0 text-cyan-400 opacity-0 hover:opacity-100 transition-opacity duration-75"
                style={{ clipPath: 'polygon(0 30%, 100% 30%, 100% 50%, 0 50%)', transform: 'translateX(-2px)' }}>
                {text}
            </span>
            <span aria-hidden className="absolute inset-0 text-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-75"
                style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)', transform: 'translateX(2px)' }}>
                {text}
            </span>
        </span>
    );
}

// ─── TERMINAL TYPEWRITER ──────────────────────────────────────────────────────
function TerminalLine({ lines }: { lines: string[] }) {
    const [displayed, setDisplayed] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);

    useEffect(() => {
        if (currentLine >= lines.length) return;
        if (currentChar < lines[currentLine].length) {
            const t = setTimeout(() => {
                setDisplayed(prev => {
                    const next = [...prev];
                    next[currentLine] = (next[currentLine] || '') + lines[currentLine][currentChar];
                    return next;
                });
                setCurrentChar(c => c + 1);
            }, 28);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => { setCurrentLine(l => l + 1); setCurrentChar(0); }, 400);
            return () => clearTimeout(t);
        }
    }, [currentLine, currentChar, lines]);

    return (
        <div className="font-mono text-xs sm:text-sm space-y-1">
            {lines.map((_, i) => (
                <div key={i} className="flex gap-2">
                    <span className="text-green-500 select-none">$</span>
                    <span className="text-gray-300">{displayed[i] || ''}</span>
                    {i === currentLine && currentLine < lines.length && (
                        <span className="w-2 h-4 bg-green-400 inline-block animate-pulse" />
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── CHALLENGE MODAL ──────────────────────────────────────────────────────────
interface ChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (url: string) => void;
}

function ChallengeModal({ isOpen, onClose, onSuccess }: ChallengeModalProps) {
    const [input, setInput] = useState('');
    const [showHint, setShowHint] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const correctAnswer = 'base64decode';
    const encodedMessage = 'YmFzZTY0ZGVjb2Rl';
    const hints = [
        'This message looks encoded. What common encoding method uses alphanumeric characters and equals signs?',
        'The encoded string is: YmFzZTY0ZGVjb2Rl — Try decoding it online.',
        'Use Base64 decoding. The answer is what the process is called.'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleaned = input.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleaned === correctAnswer) {
            setSuccess(true);
            setTimeout(() => onSuccess('https://chat.whatsapp.com/LBScjzzvhVz5QA8n68olgG'), 1600);
        } else {
            setAttempts(a => a + 1);
            setError(`ACCESS DENIED — Attempt ${attempts + 1}. Try again.`);
            setInput('');
        }
    };

    const reset = () => { setInput(''); setError(''); setSuccess(false); setShowHint(0); setAttempts(0); };
    useEffect(() => { if (!isOpen) reset(); }, [isOpen]);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md px-4"
            onClick={onClose}>
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}>

                {/* Outer glow border */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-green-500 via-cyan-400 to-green-500 opacity-80 blur-sm" />
                <div className="relative bg-[#020d05] rounded-xl border border-green-500/50 overflow-hidden">

                    {/* Header bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-green-500/10 border-b border-green-500/30">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="font-mono text-xs text-green-400">challenge_gate.sh</span>
                        <button onClick={onClose} className="text-gray-500 hover:text-green-400 transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="p-6 sm:p-8">
                        {!success ? (
                            <>
                                <div className="mb-6">
                                    <TerminalLine lines={[
                                        'ssh operator@coders-club.ug',
                                        'Intercepted transmission detected...',
                                        'Decrypt to gain access.'
                                    ]} />
                                </div>

                                <div className="bg-black rounded-lg border border-cyan-500/40 p-4 mb-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                                        <span className="font-mono text-xs text-yellow-400 uppercase tracking-widest">Intercepted Transmission</span>
                                    </div>
                                    <div className="font-mono text-lg sm:text-2xl text-green-300 tracking-wider break-all">
                                        {encodedMessage}
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
                                            &gt; Enter decoded string:
                                        </label>
                                        <input type="text" value={input} onChange={e => setInput(e.target.value)}
                                            className="w-full px-4 py-3 bg-black border border-green-500/50 rounded-lg text-green-300 focus:border-green-400 focus:outline-none font-mono text-sm placeholder-gray-700 focus:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                                            placeholder="_ _ _ _ _ _ _ _ _ _ _ _" autoFocus />
                                    </div>

                                    {error && (
                                        <div className="font-mono text-xs text-red-400 bg-red-500/10 border border-red-500/40 rounded px-3 py-2 flex items-center gap-2">
                                            <span className="text-red-500">✗</span> {error}
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button type="submit"
                                            className="flex-1 py-3 bg-green-500 hover:bg-green-400 text-black font-black rounded-lg transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] font-mono text-sm tracking-widest">
                                            AUTHENTICATE
                                        </button>
                                        <button type="button" disabled={showHint >= hints.length}
                                            onClick={() => setShowHint(h => Math.min(h + 1, hints.length))}
                                            className="px-4 py-3 bg-transparent border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/10 transition-colors font-mono text-xs disabled:opacity-40 flex items-center gap-1">
                                            <Lightbulb size={14} /> HINT
                                        </button>
                                    </div>
                                </form>

                                {showHint > 0 && (
                                    <div className="mt-4 p-3 border border-yellow-500/30 rounded bg-yellow-500/5 font-mono text-xs text-yellow-300">
                                        <span className="text-yellow-500">// hint_{showHint}: </span>{hints[showHint - 1]}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
                                    <CheckCircle className="text-green-400" size={32} />
                                </div>
                                <div className="font-mono text-green-400 text-xl font-black mb-2">ACCESS GRANTED</div>
                                <div className="font-mono text-xs text-gray-500">// Redirecting to squad channel...</div>
                                <div className="flex justify-center gap-1 mt-4">
                                    {[0, 0.15, 0.3].map((d, i) => (
                                        <div key={i} className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                                            style={{ animationDelay: `${d}s` }} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function Navigation({ scrolled, onEnrollClick }: { scrolled: boolean; onEnrollClick: () => void }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    const navLinks = [
        { label: 'Missions', id: 'missions' },
        { label: 'Arsenal', id: 'arsenal' },
        { label: 'Ops Board', id: 'opsboard' },
        { label: 'Instructor', id: 'instructor' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 border-b border-green-500/20 backdrop-blur-xl' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Image
                        src="/logo-04-nav-dark.png"
                        alt="Harmless Hacking"
                        width={280}
                        height={50}
                        className="h-8 w-auto mix-blend-screen"
                        priority
                    />

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(l => (
                            <button key={l.id} onClick={() => scrollTo(l.id)}
                                className="font-mono text-xs text-gray-400 hover:text-green-400 transition-colors tracking-widest uppercase">
                                {l.label}
                            </button>
                        ))}
                        <button onClick={onEnrollClick}
                            className="font-mono text-xs px-5 py-2 bg-green-500 text-black font-black rounded hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all tracking-widest">
                            ENROLL
                        </button>
                    </div>

                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-green-400">
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-black/98 border-t border-green-500/20 py-4 space-y-1">
                        {navLinks.map(l => (
                            <button key={l.id} onClick={() => scrollTo(l.id)}
                                className="block w-full text-left px-4 py-3 font-mono text-sm text-gray-400 hover:text-green-400 hover:bg-green-500/5 transition-colors tracking-widest">
                                &gt; {l.label}
                            </button>
                        ))}
                        <div className="px-4 pt-2">
                            <button onClick={onEnrollClick}
                                className="w-full py-3 bg-green-500 text-black font-black font-mono text-sm rounded tracking-widest">
                                ENROLL NOW
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection({ onEnrollClick }: { onEnrollClick: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Matrix rain effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cols = Math.floor(canvas.width / 20);
        const drops: number[] = Array(cols).fill(1);
        const chars = '01アイウエオカキクケコサシスセソ';

        const draw = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff4115';
            ctx.font = '14px monospace';
            drops.forEach((y, i) => {
                const ch = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillStyle = i % 7 === 0 ? '#00ff4130' : '#00ff4110';
                ctx.fillText(ch, i * 20, y * 20);
                if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            });
        };

        const interval = setInterval(draw, 50);
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />

            {/* Radial vignette */}
            <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 30%, black 80%)' }} />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 border border-green-500/40 rounded-full bg-green-500/5 mb-8">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                    <span className="font-mono text-[10px] sm:text-xs text-green-400 tracking-widest uppercase">New Cohort — Feb 9th, 2026</span>
                </div>

                {/* Main headline */}
                <div className="mb-6">
                    <div className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest mb-3 uppercase">// Coders Club Presents</div>
                    <h1 className="text-4xl sm:text-7xl md:text-8xl font-black leading-none mb-2 tracking-tight"
                        style={{ fontFamily: "'Courier New', monospace" }}>
                        <span className="text-white">ETHICAL</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-300 to-green-400"
                            style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
                            HACKING
                        </span>
                    </h1>
                    <div className="font-mono text-[10px] sm:text-sm text-gray-500 tracking-[0.15em] sm:tracking-[0.3em] mt-4 uppercase">
                        Break systems. Build defenses. <span className="text-green-400">Protect the future.</span>
                    </div>
                </div>

                {/* Stats row — 2x2 on mobile, 4-across on sm+ */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-6 sm:gap-12 my-10">
                    {[
                        { icon: Clock, val: '5 WEEKS', sub: 'Intensive' },
                        { icon: DollarSign, val: '100K UGX', sub: 'One-time fee' },
                        { icon: Target, val: '5 MODULES', sub: 'CTF-based' },
                        { icon: Award, val: 'CAPSTONE', sub: 'Live red team op' },
                    ].map(({ icon: Icon, val, sub }) => (
                        <div key={val} className="text-center">
                            <Icon size={18} className="text-green-400 mx-auto mb-1" />
                            <div className="font-mono font-black text-white text-base sm:text-xl">{val}</div>
                            <div className="font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">{sub}</div>
                        </div>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                    <button onClick={onEnrollClick}
                        className="group w-full sm:w-auto px-6 sm:px-10 py-4 bg-green-500 text-black font-black font-mono text-xs sm:text-sm rounded-lg hover:bg-green-400 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all tracking-widest flex items-center justify-center gap-2">
                        <Zap size={16} className="group-hover:animate-bounce flex-shrink-0" />
                        <span>CRACK THE CHALLENGE — ENROLL</span>
                    </button>
                    <a href="tel:+256709645302"
                        className="w-full sm:w-auto px-6 sm:px-8 py-4 border border-gray-700 text-gray-400 hover:border-green-500/50 hover:text-green-400 font-mono text-xs sm:text-sm rounded-lg transition-all tracking-widest flex items-center justify-center gap-2">
                        <Phone size={16} className="flex-shrink-0" /> +256 709 645 302
                    </a>
                </div>

                {/* Scroll hint */}
                <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
                    <div className="font-mono text-xs text-gray-500 tracking-widest">SCROLL</div>
                    <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
                </div>
            </div>
        </section>
    );
}

// ─── MISSIONS / CURRICULUM ────────────────────────────────────────────────────
const missions = [
    {
        id: '01',
        codename: 'GHOST IN THE SHELL',
        module: 'Linux Operations',
        brief: "Master the terminal before you master anything else. You'll work through CTF challenges that put you inside a live Linux environment — navigating filesystems, abusing permissions, escalating privileges, and covering your tracks.",
        icon: Terminal,
        color: '#00ff41',
        skills: ['Filesystem navigation & permissions', 'SUID/SUDO exploitation', 'Cron job hijacking', 'Log tampering & evasion', 'SSH key persistence'],
        tools: ['LinPEAS / LinEnum', 'find, grep, awk, sed', 'netstat, ps, lsof', '/etc/passwd & /etc/shadow', 'Bash scripting'],
        ctf: 'Solve a series of Linux challenges: capture flags by escalating from a low-priv user to root across increasingly hardened machines.',
        cve: 'CVE-2021-4034 (PwnKit) used this exact SUID escalation to compromise millions of Linux systems. The 2020 SolarWinds attackers used identical lateral movement after initial access.',
    },
    {
        id: '02',
        codename: 'BREAK THE CIPHER',
        module: 'Cryptography',
        brief: "You can't hack what you can't read — and you can't read what you can't decode. CTF challenges in this module put you up against encoded messages, hashed passwords, and broken crypto implementations to crack open.",
        icon: Lock,
        color: '#a855f7',
        skills: ['Encoding vs encryption', 'Hash cracking (MD5, SHA1)', 'JWT token manipulation', 'Classical & modern ciphers', 'Steganography basics'],
        tools: ['Hashcat / John the Ripper', 'Wireshark', 'CyberChef', 'jwt.io / jwt_tool', 'OpenSSL'],
        ctf: 'Decrypt intercepted messages, crack password hashes, and forge tokens — each flag unlocked only when the cipher breaks.',
        cve: 'CVE-2022-21449 "Psychic Signatures" — JWT algorithm confusion let attackers forge tokens for any Java app. The 2012 LinkedIn breach cracked 6.5M unsalted SHA-1 hashes in hours.',
    },
    {
        id: '03',
        codename: 'BREACH THE PERIMETER',
        module: 'Web Exploitation',
        brief: "Most attacks start at a web app. CTF challenges here put you against deliberately vulnerable web targets — finding injection points, bypassing login pages, and stealing data the way real attackers do.",
        icon: Search,
        color: '#06b6d4',
        skills: ['SQL injection (manual + automated)', 'XSS (reflected, stored, DOM)', 'IDOR & broken access control', 'CSRF attacks', 'Directory traversal'],
        tools: ['Burp Suite', 'SQLmap', 'OWASP ZAP', 'ffuf / gobuster', 'Browser DevTools'],
        ctf: 'Attack a vulnerable web application from login bypass to database dump — flags hidden behind each exploited vulnerability.',
        cve: 'CVE-2017-5638 — A single Apache Struts injection exposed 147M Equifax records. IDOR was behind the 2021 Parler scrape: no hacking required, just incrementing IDs.',
    },
    {
        id: '04',
        codename: 'TARGET PROFILING',
        module: 'OSINT',
        brief: "Before any attack, there is reconnaissance. CTF challenges test your ability to gather intelligence from public sources — piecing together targets from nothing but open data, just like real threat actors do.",
        icon: Eye,
        color: '#f97316',
        skills: ['Passive DNS & IP enumeration', 'Breach data & credential leaks', 'LinkedIn & social recon', 'Google dorking', 'Image & metadata analysis'],
        tools: ['Maltego / SpiderFoot', 'Shodan / Censys', 'theHarvester', 'WHOIS / DNSdumpster', 'HaveIBeenPwned'],
        ctf: 'Given only a name or domain, hunt down flags hidden across public-facing infrastructure, leaked data, and social profiles.',
        cve: 'The 2020 Twitter hack started with OSINT and a single phone call — no malware. The 2016 DNC breach began with one spear-phishing email built entirely from public information.',
    },
    {
        id: '05',
        codename: 'DISSECT THE MACHINE',
        module: 'Reverse Engineering & Binary Exploitation',
        brief: "The deepest layer of hacking. CTF challenges here give you compiled binaries and ask one question: what does this do, and how do you break it? You'll analyze, debug, and exploit your way to the flag.",
        icon: Cpu,
        color: '#ec4899',
        skills: ['Static & dynamic analysis', 'Stack buffer overflows', 'Return-oriented programming (ROP)', 'Shellcode writing', 'ASLR/NX bypass basics'],
        tools: ['Ghidra / IDA Free', 'GDB + pwndbg', 'pwntools', 'strings, ltrace, strace', 'file, checksec'],
        ctf: 'Reverse binaries to find hidden flags, then exploit vulnerabilities in live services to pop a shell and capture the final flag.',
        cve: 'CVE-2021-3156 (Baron Samedit) — a heap overflow in sudo, present for 10 years, found via reverse engineering. The 2023 MOVEit breach used a SQLi discovered by binary analysis.',
    },
];

function MissionsSection() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <section id="missions" className="bg-black py-20 sm:py-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* Section header */}
                <div className="mb-16">
                    <div className="font-mono text-xs text-green-400 tracking-widest uppercase mb-3">// Mission Sequence</div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white font-mono leading-tight">
                        YOU ARE THE<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">RED TEAM.</span>
                    </h2>
                    <p className="mt-4 text-gray-500 font-mono text-sm max-w-xl">
                        Every module is taught through CTF challenges — hands-on problems set inside a real attack context. Each week you solve, you learn. The final target ties it all together.
                    </p>
                </div>

                {/* Mission list */}
                <div className="space-y-3">
                    {missions.map((m) => {
                        const isOpen = active === m.id;
                        const Icon = m.icon;
                        return (
                            <div key={m.id} className="rounded-lg border overflow-hidden transition-all duration-300"
                                style={{ borderColor: isOpen ? m.color + '60' : '#1a2e1f' }}>

                                {/* Header row */}
                                <button
                                    onClick={() => setActive(isOpen ? null : m.id)}
                                    className="w-full flex items-center gap-4 sm:gap-6 p-4 sm:p-6 text-left hover:bg-white/2 transition-colors group"
                                    style={{ background: isOpen ? m.color + '08' : 'transparent' }}>

                                    {/* Mission number */}
                                    <div className="font-mono text-2xl sm:text-3xl font-black flex-shrink-0 w-10 sm:w-12"
                                        style={{ color: m.color + '50' }}>
                                        {m.id}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-10 h-10 rounded border flex-shrink-0 flex items-center justify-center transition-colors"
                                        style={{ borderColor: m.color + '40', background: m.color + '10' }}>
                                        <Icon size={18} style={{ color: m.color }} />
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <div className="font-mono text-[10px] sm:text-xs tracking-widest uppercase mb-0.5 truncate"
                                            style={{ color: m.color + 'aa' }}>
                                            {m.module}
                                        </div>
                                        <div className="font-mono font-black text-white text-sm sm:text-lg tracking-wide group-hover:text-green-100 transition-colors leading-tight">
                                            {m.codename}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                                        <ChevronRight size={18} style={{ color: m.color }} />
                                    </div>
                                </button>

                                {/* Expanded details */}
                                {isOpen && (
                                    <div className="px-4 sm:px-6 pb-6 border-t"
                                        style={{ borderColor: m.color + '20', background: m.color + '04' }}>

                                        {/* Brief */}
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed pt-5 mb-6">
                                            <span style={{ color: m.color }}>MISSION: </span>{m.brief}
                                        </p>

                                        {/* Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-5">
                                            {[
                                                { label: 'Skills Unlocked', items: m.skills },
                                                { label: 'Tools Used', items: m.tools },
                                                { label: 'CTF Challenge', items: [m.ctf] },
                                            ].map(({ label, items }) => (
                                                <div key={label} className="bg-black/60 rounded border border-white/5 p-4">
                                                    <div className="font-mono text-xs tracking-widest uppercase mb-3"
                                                        style={{ color: m.color + 'aa' }}>
                                                        {label}
                                                    </div>
                                                    <ul className="space-y-1.5">
                                                        {items.map(item => (
                                                            <li key={item} className="font-mono text-xs text-gray-400 flex gap-2">
                                                                <span style={{ color: m.color }}>›</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Real-world */}
                                        <div className="flex gap-3 p-4 rounded border border-red-500/20 bg-red-500/5">
                                            <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-mono text-xs text-red-400 uppercase tracking-widest mb-1">Real-World Incident</div>
                                                <p className="font-mono text-xs text-gray-400 leading-relaxed">{m.cve}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Capstone */}
                <div className="mt-8 rounded-lg border border-green-500/30 bg-green-500/5 p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 font-mono text-xs bg-green-500 text-black px-3 py-1 rounded-bl tracking-widest font-black">
                        CAPSTONE
                    </div>
                    <div className="font-mono text-xs text-green-400 tracking-widest uppercase mb-2">Final Operation</div>
                    <h3 className="font-mono font-black text-white text-xl sm:text-2xl mb-3">
                        OPERATION MEGACORP
                    </h3>
                    <p className="font-mono text-sm text-gray-400 leading-relaxed mb-5 max-w-2xl">
                        The final challenge of the bootcamp. MegaCorp Inc. is a purpose-built target that draws on every module — Linux, crypto, web, OSINT, and binary exploitation all in one. Solve it and you've proven you can connect the dots.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['Linux Access', 'Crypto Layer', 'Web Vulnerabilities', 'OSINT Recon', 'Binary Challenge', 'Final Flag'].map(p => (
                            <span key={p} className="font-mono text-xs px-3 py-1.5 border border-green-500/30 text-green-400 rounded">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── ARSENAL / SKILLS ─────────────────────────────────────────────────────────
const arsenal = [
    { icon: Terminal, label: 'Linux Operations', desc: 'Shell mastery, privilege escalation, persistence' },
    { icon: Lock, label: 'Cryptography', desc: 'Encryption, hash cracking, JWT attacks' },
    { icon: Search, label: 'Web Exploitation', desc: 'SQLi, XSS, IDOR, auth bypass' },
    { icon: Eye, label: 'OSINT', desc: 'Recon, profiling, social engineering' },
    { icon: Cpu, label: 'Reverse Engineering', desc: 'Binary analysis, disassembly, debugging' },
    { icon: Database, label: 'Binary Exploitation', desc: 'Buffer overflows, shellcode, ROP chains' },
    { icon: Shield, label: 'Digital Forensics', desc: 'Evidence collection, incident response' },
];

function ArsenalSection() {
    return (
        <section id="arsenal" className="bg-[#020d05] py-20 sm:py-32 border-y border-green-500/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="mb-12">
                    <div className="font-mono text-xs text-green-400 tracking-widest uppercase mb-3">// Your Arsenal</div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white font-mono">
                        7 ELITE<br /><span className="text-green-400">WEAPONS.</span>
                    </h2>
                </div>

                <div className="border border-green-500/10 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-green-500/10">
                        {arsenal.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="group bg-black p-5 sm:p-6 hover:bg-green-500/5 transition-colors cursor-default border-b-0 sm:odd:border-r sm:odd:border-green-500/10 lg:border-r-0 lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+1)]:border-green-500/10 lg:[&:nth-child(3n+2)]:border-r lg:[&:nth-child(3n+2)]:border-green-500/10">
                                <div className="flex items-start gap-4">
                                    <Icon size={20} className="text-green-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <div>
                                        <div className="font-mono font-black text-white text-sm mb-1 group-hover:text-green-300 transition-colors">{label}</div>
                                        <div className="font-mono text-xs text-gray-600">{desc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="bg-black p-5 sm:p-6 flex items-center justify-center">
                            <div className="font-mono text-xs text-green-400/40 text-center leading-loose">
                                + CTF Challenges<br />Every Week
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── OPS BOARD / SCHEDULE + PRICING ──────────────────────────────────────────
function OpsBoardSection({ onEnrollClick }: { onEnrollClick: () => void }) {
    return (
        <section id="opsboard" className="bg-black py-20 sm:py-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="mb-12">
                    <div className="font-mono text-xs text-green-400 tracking-widest uppercase mb-3">// Ops Board</div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white font-mono">
                        MISSION<br /><span className="text-green-400">PARAMETERS.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Schedule */}
                    <div className="border border-white/10 rounded-lg overflow-hidden">
                        <div className="px-6 py-4 bg-white/3 border-b border-white/10 font-mono text-xs text-gray-400 tracking-widest uppercase">
                            Weekly Schedule
                        </div>
                        <div className="divide-y divide-white/5">
                            {[
                                { wk: '01', title: 'Linux Operations', tag: 'Foundation' },
                                { wk: '02', title: 'Cryptography', tag: 'Intercept' },
                                { wk: '03', title: 'Web Exploitation', tag: 'Attack Surface' },
                                { wk: '04', title: 'OSINT & Social Eng.', tag: 'Intelligence' },
                                { wk: '05', title: 'Rev Eng + Bin Exploit', tag: 'Deep Access' },
                            ].map(({ wk, title, tag }) => (
                                <div key={wk} className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors">
                                    <span className="font-mono text-xs text-green-400/50 w-6 flex-shrink-0">W{wk}</span>
                                    <span className="font-mono text-sm text-white flex-1">{title}</span>
                                    <span className="font-mono text-xs text-gray-600 hidden sm:block">{tag}</span>
                                    <Radio size={12} className="text-green-400/40 flex-shrink-0" />
                                </div>
                            ))}
                            <div className="flex items-center gap-4 px-6 py-4 bg-green-500/5">
                                <span className="font-mono text-xs text-green-400/50 w-6 flex-shrink-0">CAP</span>
                                <span className="font-mono text-sm text-green-300 flex-1">Operation MegaCorp</span>
                                <Crosshair size={12} className="text-green-400 flex-shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Info */}
                    <div className="space-y-4">
                        {/* Price card */}
                        <div className="border border-green-500/30 rounded-lg p-6 bg-green-500/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/5 rounded-full blur-2xl" />
                            <div className="font-mono text-xs text-green-400 tracking-widest uppercase mb-2">Investment</div>
                            <div className="font-mono font-black text-4xl text-white mb-1">100,000 <span className="text-2xl text-green-400">UGX</span></div>
                            <div className="font-mono text-xs text-gray-500 mb-5">One-time. No hidden fees.</div>
                            <ul className="space-y-2 mb-6">
                                {['5 weeks of live instruction', 'CTF challenges every module', 'MegaCorp final target', 'Real-world CVE context', 'Squad WhatsApp access'].map(f => (
                                    <li key={f} className="font-mono text-xs text-gray-400 flex items-center gap-2">
                                        <CheckCircle size={12} className="text-green-400 flex-shrink-0" /> {f}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={onEnrollClick}
                                className="w-full py-3 bg-green-500 text-black font-black font-mono text-sm rounded hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all tracking-widest">
                                ENROLL — CRACK THE CHALLENGE
                            </button>
                        </div>

                        {/* Spots */}
                        <div className="border border-white/10 rounded-lg p-5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded border border-red-500/40 bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                <Target size={18} className="text-red-400" />
                            </div>
                            <div>
                                <div className="font-mono font-black text-white text-sm">LIMITED SPOTS</div>
                                <div className="font-mono text-xs text-gray-500">Small cohort for maximum instructor attention</div>
                            </div>
                        </div>

                        {/* Start date */}
                        <div className="border border-white/10 rounded-lg p-5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                                <Calendar size={18} className="text-cyan-400" />
                            </div>
                            <div>
                                <div className="font-mono font-black text-white text-sm">FEBRUARY 9TH, 2026</div>
                                <div className="font-mono text-xs text-gray-500">Cohort kickoff date</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── INSTRUCTOR ───────────────────────────────────────────────────────────────
function InstructorSection() {
    return (
        <section id="instructor" className="bg-[#020d05] border-y border-green-500/10 overflow-hidden">

            {/* Section label */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 mb-10">
                <div className="font-mono text-xs text-green-400 tracking-widest uppercase mb-3">// Your Instructor</div>
                <h2 className="text-3xl sm:text-5xl font-black text-white font-mono">
                    MEET THE<br /><span className="text-green-400">OPERATOR.</span>
                </h2>
            </div>

            {/* Full-bleed dossier card */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
                <div className="relative rounded-xl overflow-hidden border border-green-500/20"
                    style={{ background: '#000' }}>

                    {/* Corner bracket decorations */}
                    {[
                        'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl',
                        'top-0 right-0 border-t-2 border-r-2 rounded-tr-xl',
                        'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl',
                        'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl',
                    ].map((cls, i) => (
                        <div key={i} className={`absolute w-8 h-8 border-green-400/60 z-20 ${cls}`} />
                    ))}

                    <div className="grid grid-cols-1 md:grid-cols-5">

                        {/* ── LEFT: Photo panel ── */}
                        <div className="md:col-span-2 relative min-h-[280px] sm:min-h-[380px] md:min-h-[520px]">

                            {/* Photo fills entire left panel */}
                            <Image
                                src="/profile.jpeg"
                                alt="Ibrahim Kirabo S."
                                fill
                                className="object-cover object-top"
                                priority
                                style={{ objectPosition: 'center top' }}
                            />

                            {/* Green duotone tint overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 mix-blend-normal" />
                            <div className="absolute inset-0"
                                style={{ background: 'linear-gradient(180deg, rgba(0,255,65,0.04) 0%, rgba(0,0,0,0.55) 100%)' }} />

                            {/* Scanline overlay on photo */}
                            <div className="absolute inset-0 pointer-events-none opacity-20"
                                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)' }} />

                            {/* Target reticle in corner */}
                            <div className="absolute top-4 left-4 z-10 opacity-50">
                                <div className="w-8 h-8 relative">
                                    <div className="absolute inset-0 border border-green-400 rounded-full" />
                                    <div className="absolute top-1/2 left-0 right-0 h-px bg-green-400 -translate-y-px" />
                                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-400 -translate-x-px" />
                                </div>
                            </div>

                            {/* Classification stamp */}
                            <div className="absolute top-4 right-4 z-10 rotate-12">
                                <div className="border-2 border-green-500/60 rounded px-2 py-0.5">
                                    <span className="font-mono text-[10px] text-green-400/70 tracking-[0.2em] font-black uppercase">Verified</span>
                                </div>
                            </div>

                            {/* Bottom label bar */}
                            <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-3"
                                style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%)' }}>
                                <div className="font-mono text-[10px] text-green-400/50 tracking-[0.3em] uppercase mb-0.5">Operator ID</div>
                                <div className="font-mono font-black text-white text-sm tracking-wider">HARMLESS</div>
                            </div>
                        </div>

                        {/* ── RIGHT: Dossier panel ── */}
                        <div className="md:col-span-3 p-5 sm:p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-green-500/10">

                            {/* Header */}
                            <div>
                                <div className="flex items-start justify-between mb-5 sm:mb-6">
                                    <div>
                                        <div className="font-mono text-[10px] text-green-400/50 tracking-[0.3em] uppercase mb-1">Full Name</div>
                                        <h3 className="font-mono font-black text-white text-xl sm:text-2xl md:text-3xl leading-tight tracking-wide">
                                            IBRAHIM<br />KIRABO S.
                                        </h3>
                                    </div>
                                    {/* Live status pill */}
                                    <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-green-500/30 rounded-full bg-green-500/5 flex-shrink-0">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        <span className="font-mono text-[10px] text-green-400 tracking-widest uppercase">Online</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-green-500/30 to-transparent mb-5 sm:mb-6" />

                                {/* Field rows — dossier style, 2-col on mobile */}
                                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                    {[
                                        { field: 'Callsign', value: 'HARMLESS', highlight: true },
                                        { field: 'Role', value: 'Software Engineer' },
                                        { field: 'Clearance', value: 'Certified Linux System Administrator' },
                                        { field: 'Distinction', value: 'Finalist — UCC CyberStars Competition, 3rd Ed.' },
                                        { field: 'Speciality', value: 'Offensive Security & Systems Programming' },
                                    ].map(({ field, value, highlight }) => (
                                        <div key={field} className="flex gap-3 sm:gap-4 items-start">
                                            <div className="font-mono text-[10px] text-green-400/50 uppercase tracking-widest pt-0.5 w-16 sm:w-20 flex-shrink-0">
                                                {field}
                                            </div>
                                            <div className={`font-mono text-xs sm:text-sm flex-1 ${highlight ? 'text-green-400 font-black tracking-widest' : 'text-gray-300'}`}>
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-green-500/30 to-transparent mb-5 sm:mb-6" />

                                {/* Contact block */}
                                <div className="space-y-2 mb-6 sm:mb-8">
                                    <div className="font-mono text-[10px] text-green-400/50 uppercase tracking-widest mb-3">Secure Channels</div>
                                    <a href="tel:+256709645302"
                                        className="flex items-center gap-3 py-2.5 px-3 sm:px-4 rounded border border-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition-all group">
                                        <Phone size={14} className="text-green-400 flex-shrink-0" />
                                        <span className="font-mono text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors">+256 709 645 302</span>
                                    </a>
                                    <a href="mailto:kiraboibra268@gmail.com"
                                        className="flex items-center gap-3 py-2.5 px-3 sm:px-4 rounded border border-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition-all group min-w-0">
                                        <Mail size={14} className="text-green-400 flex-shrink-0" />
                                        <span className="font-mono text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors break-all">kiraboibra268@gmail.com</span>
                                    </a>
                                </div>
                            </div>

                            {/* Bottom barcode-style decoration */}
                            <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
                                <div className="flex gap-0.5 items-end h-8">
                                    {[4, 7, 3, 9, 2, 6, 4, 8, 1, 5, 7, 3, 6, 2, 8, 4, 7, 5, 3, 9, 2, 6, 4].map((h, i) => (
                                        <div key={i} className="w-0.5 bg-green-400/20 rounded-sm"
                                            style={{ height: `${h * 8}%` }} />
                                    ))}
                                </div>
                                <div className="font-mono text-[9px] text-green-400/20 tracking-widest text-right">
                                    CODERS_CLUB // COHORT_2026<br />
                                    CC-OPS-IK268HAR
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── CTA FOOTER ───────────────────────────────────────────────────────────────
function CTAFooter({ onEnrollClick }: { onEnrollClick: () => void }) {
    return (
        <section className="bg-black py-20 sm:py-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                <div className="font-mono text-xs text-green-400 tracking-widest uppercase mb-4">// End Transmission</div>
                <h2 className="font-mono font-black text-4xl sm:text-6xl text-white mb-4 leading-tight">
                    READY TO<br />
                    <span className="text-green-400">JACK IN?</span>
                </h2>
                <p className="font-mono text-sm text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
                    Solve the challenge. Join the squad. Run the ops.
                    <br />The matrix awaits.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={onEnrollClick}
                        className="group px-10 py-4 bg-green-500 text-black font-black font-mono rounded-lg hover:bg-green-400 hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] transition-all tracking-widest flex items-center justify-center gap-2 text-sm">
                        <Zap size={18} className="group-hover:animate-bounce" />
                        CRACK CHALLENGE — ENROLL
                    </button>
                    <a href="mailto:kiraboibra268@gmail.com"
                        className="px-10 py-4 border border-white/20 text-gray-400 hover:border-green-500/50 hover:text-green-400 font-mono text-sm rounded-lg transition-all tracking-widest flex items-center justify-center gap-2">
                        <Mail size={16} /> EMAIL US
                    </a>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5">
                    <div className="font-mono font-black text-white text-sm tracking-widest mb-1">CODERS_CLUB</div>
                    <div className="font-mono text-xs text-gray-700">
                        © 2025 // Forging the next generation of digital warriors
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── SCROLL TO TOP ────────────────────────────────────────────────────────────
function ScrollTop({ show }: { show: boolean }) {
    if (!show) return null;
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 border border-green-500/40 bg-black rounded flex items-center justify-center text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            aria-label="Back to top">
            <ChevronRight className="-rotate-90" size={18} />
        </button>
    );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
function GlobalStyles() {
    return (
        <style>{`
            @keyframes shimmer {
              0% { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
            * { cursor: default; }
            a, button { cursor: pointer; }
            ::selection { background: rgba(34,197,94,0.3); color: white; }
            ::-webkit-scrollbar { width: 4px; }
            ::-webkit-scrollbar-track { background: #000; }
            ::-webkit-scrollbar-thumb { background: #1a4a1f; border-radius: 2px; }
            ::-webkit-scrollbar-thumb:hover { background: #22c55e40; }
        `}</style>
    );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function CodersClubLanding() {
    const [scrolled, setScrolled] = useState(false);
    const [showChallenge, setShowChallenge] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSuccess = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
        setShowChallenge(false);
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <GlobalStyles />
            <ChallengeModal isOpen={showChallenge} onClose={() => setShowChallenge(false)} onSuccess={handleSuccess} />
            <Navigation scrolled={scrolled} onEnrollClick={() => setShowChallenge(true)} />
            <HeroSection onEnrollClick={() => setShowChallenge(true)} />
            <MissionsSection />
            <ArsenalSection />
            <OpsBoardSection onEnrollClick={() => setShowChallenge(true)} />
            <InstructorSection />
            <CTAFooter onEnrollClick={() => setShowChallenge(true)} />
            <ScrollTop show={scrolled} />
        </div>
    );
}