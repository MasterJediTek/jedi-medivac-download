import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  Check,
  ChevronRight,
  CircleDollarSign,
  Code2,
  Github,
  Globe2,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  UserPlus,
  X,
  Zap,
} from "lucide-react";

const APK_URL = "https://github.com/MasterJediTek/jedi-medivac-download/releases/download/v1.0.32/medivac-one-v1_0_32.apk";
const ALPHA_APK_URL = "https://github.com/MasterJediTek/medivac-alpha/releases/download/v1.0.29/medivac-one-v1_0_29.apk";
const APK_SHA256 = "4bb03877a79c02310a074018e26d7a090d713769b264b4918cfd282d99822a0c";
const APK_CERT_SHA256 = "e2372158de8c61211222da725b41d6e2459c459153c476463617bcb2731d3fbf";

const apps = [
  {
    name: "Medivac One",
    eyebrow: "Virtual hospital",
    description: "The verified Android field app for patient workflows, communications, and medical operations.",
    version: "v1.0.32",
    type: "APK",
    status: "LIVE",
    color: "cyan",
    install: APK_URL,
    source: "https://github.com/MasterJediTek/jedi-medivac-download",
    details: ["Android 8.0+", "ARM64 + ARMv7", "54.6 MB"],
  },
  {
    name: "MediVacAlpha",
    eyebrow: "JEDITek hospital platform",
    description: "The alpha mobile build for testing the next clinical platform experience on Android.",
    version: "v1.0.29",
    type: "APK + AAB",
    status: "TEST",
    color: "violet",
    install: ALPHA_APK_URL,
    source: "https://github.com/MasterJediTek/medivac-alpha",
    details: ["Android build", "Free test track", "Release APK"],
  },
  {
    name: "JEDI Installer",
    eyebrow: "System utility",
    description: "A rapid side-load utility with Python Hitch integration, local repository deployment, and L3 caching.",
    version: "SOURCE",
    type: "Web / source",
    status: "BUILD",
    color: "amber",
    install: "https://github.com/MasterJediTek/jedi-installer",
    source: "https://github.com/MasterJediTek/jedi-installer",
    details: ["No public release", "GitHub source", "Build pending"],
  },
  {
    name: "JEDI Ecosystem",
    eyebrow: "Command layer",
    description: "The ecosystem control surface for navigation, command terminal, knowledge base, and connected systems.",
    version: "SOURCE",
    type: "Web / source",
    status: "BUILD",
    color: "pink",
    install: "https://github.com/MasterJediTek/jedi-ecosystem",
    source: "https://github.com/MasterJediTek/jedi-ecosystem",
    details: ["Private repository", "Access required", "Build pending"],
  },
  {
    name: "VPN Browser",
    eyebrow: "Secure navigation",
    description: "The JEDITek browser surface for protected navigation and connected system access.",
    version: "SOURCE",
    type: "Web / source",
    status: "BUILD",
    color: "cyan",
    install: "https://github.com/MasterJediTek/jeditek-vpn-browser",
    source: "https://github.com/MasterJediTek/jeditek-vpn-browser",
    details: ["Private repository", "Access required", "Build pending"],
  },
  {
    name: "Communications Station",
    eyebrow: "Team messaging",
    description: "A real-time communications surface for rooms, secure coordination, and JEDI members.",
    version: "SOURCE",
    type: "Web / source",
    status: "BUILD",
    color: "violet",
    install: "https://github.com/MasterJediTek/jedi-communications-station",
    source: "https://github.com/MasterJediTek/jedi-communications-station",
    details: ["Private repository", "Source available", "Build pending"],
  },
  {
    name: "JEDI Train",
    eyebrow: "Communications API",
    description: "The Flask and Socket.IO communications service for connected JEDI training workflows.",
    version: "SOURCE",
    type: "API / source",
    status: "BUILD",
    color: "amber",
    install: "https://github.com/MasterJediTek/JEDI-Train",
    source: "https://github.com/MasterJediTek/JEDI-Train",
    details: ["Private repository", "API source", "Build pending"],
  },
  {
    name: "JEDI WONGI",
    eyebrow: "Integration layer",
    description: "The public WONGI integration repository for marketing and connected ecosystem workflows.",
    version: "SOURCE",
    type: "Source / integration",
    status: "BUILD",
    color: "pink",
    install: "https://github.com/MasterJediTek/JEDI-WONGI",
    source: "https://github.com/MasterJediTek/JEDI-WONGI",
    details: ["Public repository", "No release asset", "Build pending"],
  },
  {
    name: "Ecosystem Portal",
    eyebrow: "Launch surface",
    description: "The connected JEDItek portal for Medieval-One, Command Centre, and system entry points.",
    version: "SOURCE",
    type: "Web / source",
    status: "BUILD",
    color: "cyan",
    install: "https://github.com/MasterJediTek/jeditek-ecosystem-portal",
    source: "https://github.com/MasterJediTek/jeditek-ecosystem-portal",
    details: ["Private repository", "Portal source", "Build pending"],
  },
  {
    name: "MediVac One App",
    eyebrow: "Native clinical system",
    description: "The broader native virtual hospital source project with offline-first clinical workflows and integrations.",
    version: "SOURCE",
    type: "Expo / source",
    status: "BUILD",
    color: "violet",
    install: "https://github.com/MasterJediTek/medivac-one-app",
    source: "https://github.com/MasterJediTek/medivac-one-app",
    details: ["Private repository", "Native source", "Build pending"],
  },
];

function StatusPill({ status }: { status: string }) {
  const style = status === "LIVE" ? "text-[#63f7ca] bg-[#1be5a5]/10 border-[#1be5a5]/30" : status === "TEST" ? "text-[#c8a7ff] bg-[#a879ff]/10 border-[#a879ff]/30" : "text-[#f6c977] bg-[#efb34c]/10 border-[#efb34c]/30";
  return <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[.18em] ${style}`}><span className="mr-1.5 inline-block size-1.5 rounded-full bg-current" />{status}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showInstall, setShowInstall] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [copied, setCopied] = useState(false);
  const liveApps = useMemo(() => apps.filter((app) => app.status !== "BUILD"), []);

  const copyChecksum = async () => {
    await navigator.clipboard?.writeText(APK_SHA256);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const download = (appName: string) => {
    const analytics = (window as Window & { umami?: { track: (event: string, data?: Record<string, string>) => void } }).umami;
    analytics?.track("marketplace_download", { app: appName, track: "free" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050912] text-[#edf9f7] selection:bg-[#32f2c0] selection:text-[#04110e]">
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(61,242,201,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(61,242,201,.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none fixed -left-32 top-32 size-96 rounded-full bg-[#12e6b0]/10 blur-[120px]" />
      <div className="pointer-events-none fixed -right-32 top-[35%] size-[32rem] rounded-full bg-[#885cf6]/10 blur-[140px]" />

      <header className="relative z-20 border-b border-white/10 bg-[#050912]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="JEDI app hub home">
            <span className="grid size-10 place-items-center rounded-xl border border-[#32f2c0]/50 bg-[#32f2c0]/15 text-[#32f2c0] shadow-[0_0_28px_rgba(50,242,192,.2)]"><ShieldCheck size={21} /></span>
            <span className="text-sm font-bold tracking-[.2em]">JEDI<span className="text-[#32f2c0]">//HUB</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-[#91aaa8] md:flex">
            <a href="#apps" className="transition hover:text-white">App deck</a>
            <a href="#install" className="transition hover:text-white">Install flow</a>
            <a href="#security" className="transition hover:text-white">Security</a>
            <a href="#billing" className="transition hover:text-white">Access</a>
            <a href="https://github.com/MasterJediTek" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-white">GitHub <Github size={14} /></a>
          </nav>
          <div className="hidden items-center gap-3 md:flex"><button onClick={() => setShowSignup(true)} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-[#c8dbd8] transition hover:border-[#32f2c0]/40 hover:bg-white/5"><UserPlus size={15} />Register</button><button onClick={() => setShowCheckout(true)} className="rounded-lg bg-[#32f2c0] px-4 py-2 text-xs font-bold text-[#04110e] transition hover:bg-[#85f9da]">Access console</button></div>
          <button className="rounded-lg p-2 text-[#a9c3bf] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {menuOpen && <nav className="border-t border-white/10 px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm text-[#b9ccca]"><a href="#apps" onClick={() => setMenuOpen(false)}>App deck</a><a href="#install" onClick={() => setMenuOpen(false)}>Install flow</a><a href="#security" onClick={() => setMenuOpen(false)}>Security</a><button className="text-left" onClick={() => { setMenuOpen(false); setShowSignup(true); }}>Register</button></div></nav>}
      </header>

      <section id="top" className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pb-32 lg:pt-28">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#32f2c0]/30 bg-[#32f2c0]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-[#63f7ca]"><Sparkles size={13} /> Free-track marketplace · online</div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[.95] tracking-[-.065em] sm:text-7xl lg:text-[6.2rem]">Your apps.<br /><span className="bg-gradient-to-r from-[#f1fffc] via-[#b9fff0] to-[#32f2c0] bg-clip-text text-transparent">Your mission.</span></h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#9bb4b1]">A vivid control hub for JEDI systems, MediVac releases, and free-track testing. Discover, verify, download, and install from one transparent command surface.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href="#apps" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#32f2c0] px-6 py-4 text-sm font-bold text-[#04110e] shadow-[0_15px_50px_rgba(50,242,192,.2)] transition hover:-translate-y-0.5 hover:bg-[#85f9da]">Open app deck <ChevronRight size={18} /></a><button onClick={() => setShowSignup(true)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-4 text-sm font-semibold text-[#c8dbd8] transition hover:border-[#32f2c0]/40 hover:bg-white/5"><UserPlus size={17} />Create free profile</button></div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#75908c]"><span className="inline-flex items-center gap-2"><Check size={14} className="text-[#32f2c0]" />No-cost track</span><span className="inline-flex items-center gap-2"><Check size={14} className="text-[#32f2c0]" />SHA verified</span><span className="inline-flex items-center gap-2"><Check size={14} className="text-[#32f2c0]" />GitHub source</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">
          <div className="absolute -inset-10 rounded-full bg-[#32f2c0]/10 blur-3xl" />
          <div className="relative aspect-square rounded-[2.5rem] border border-[#32f2c0]/25 bg-[#0b1720]/80 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102c32] via-[#0a1822] to-[#070b14] p-6">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[.22em] text-[#789591]"><span>JEDI command surface</span><span className="flex items-center gap-1.5 text-[#63f7ca]"><span className="size-1.5 animate-pulse rounded-full bg-current" />linked</span></div>
              <div className="relative flex flex-1 items-center justify-center"><div className="absolute size-64 rounded-full border border-[#32f2c0]/20 shadow-[0_0_90px_rgba(50,242,192,.12)]" /><div className="absolute size-44 rounded-full border border-[#a879ff]/20" /><div className="grid size-28 place-items-center rounded-full border border-[#32f2c0]/60 bg-[#32f2c0]/10 text-[#32f2c0] shadow-[0_0_70px_rgba(50,242,192,.25)]"><TerminalSquare size={43} strokeWidth={1.2} /></div><span className="absolute left-5 top-12 rounded-lg border border-[#32f2c0]/25 bg-[#07131c]/90 px-3 py-2 text-[10px] text-[#63f7ca]">{apps.length.toString().padStart(2, "0")} apps indexed</span><span className="absolute bottom-14 right-2 rounded-lg border border-[#a879ff]/25 bg-[#07131c]/90 px-3 py-2 text-[10px] text-[#c8a7ff]">free track</span></div>
              <div className="grid grid-cols-3 gap-2 text-center"><div className="rounded-xl border border-white/10 bg-white/[.04] p-3"><p className="text-lg font-semibold">{liveApps.length}</p><p className="mt-1 text-[9px] uppercase tracking-widest text-[#789591]">ready</p></div><div className="rounded-xl border border-white/10 bg-white/[.04] p-3"><p className="text-lg font-semibold">100%</p><p className="mt-1 text-[9px] uppercase tracking-widest text-[#789591]">verified</p></div><div className="rounded-xl border border-white/10 bg-white/[.04] p-3"><p className="text-lg font-semibold text-[#32f2c0]">LIVE</p><p className="mt-1 text-[9px] uppercase tracking-widest text-[#789591]">network</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="apps" className="relative z-10 border-y border-white/10 bg-[#08121c]/90 px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#32f2c0]">App deck / 01</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Deploy your next move.</h2><p className="mt-4 max-w-xl text-[#91aaa8]">Every card shows the real source, release state, and install path. Public GitHub assets are live; source-only systems are marked honestly until a release is published.</p></div><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs text-[#9bb4b1]"><Globe2 size={15} className="text-[#32f2c0]" /> Free-track network</div></div><div className="mt-12 grid gap-5 md:grid-cols-2">{apps.map((app) => <article key={app.name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1821]/85 p-6 transition duration-200 hover:-translate-y-1 hover:border-[#32f2c0]/30 hover:shadow-[0_16px_60px_rgba(0,0,0,.25)]"><div className={`pointer-events-none absolute -right-20 -top-20 size-56 rounded-full blur-3xl ${app.color === "cyan" ? "bg-[#32f2c0]/10" : app.color === "violet" ? "bg-[#a879ff]/10" : app.color === "amber" ? "bg-[#efb34c]/10" : "bg-[#ec62be]/10"}`} /><div className="relative"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#789591]">{app.eyebrow}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight">{app.name}</h3></div><StatusPill status={app.status} /></div><p className="mt-4 min-h-12 text-sm leading-6 text-[#9bb4b1]">{app.description}</p><div className="mt-6 flex flex-wrap gap-2">{app.details.map((detail) => <span key={detail} className="rounded-lg border border-white/10 bg-white/[.04] px-2.5 py-1.5 text-[10px] text-[#9bb4b1]">{detail}</span>)}</div><div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5"><div><p className="text-[10px] uppercase tracking-[.18em] text-[#789591]">Build</p><p className="mt-1 font-mono text-xs text-[#d6e9e5]">{app.version} · {app.type}</p></div><div className="flex gap-2"><a href={app.source} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-lg border border-white/15 text-[#9bb4b1] transition hover:border-white/30 hover:text-white" aria-label={`${app.name} source`}><Code2 size={16} /></a>{app.status === "BUILD" ? <a href={app.install} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#efb34c]/30 bg-[#efb34c]/10 px-3 py-2 text-xs font-semibold text-[#f6c977]">Open source <ChevronRight size={14} /></a> : <button onClick={() => setShowInstall(app.name)} className="inline-flex items-center gap-2 rounded-lg bg-[#32f2c0] px-3 py-2 text-xs font-bold text-[#04110e] transition hover:bg-[#85f9da]"><ArrowDownToLine size={15} />Install</button>}</div></div></div></article>)}</div></div></section>

      <section id="install" className="relative z-10 px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.85fr_1.15fr]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#32f2c0]">Install flow / 02</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Download. Verify. Launch.</h2><p className="mt-5 text-[#91aaa8]">The hub never claims to silently install software. Each Android install opens the official release asset, then your device controls the final permission step.</p><div className="mt-8 space-y-3"><div className="flex gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#32f2c0]/10 text-xs font-bold text-[#32f2c0]">01</span><div><p className="font-semibold">Choose a public release</p><p className="mt-1 text-xs leading-5 text-[#789591]">Only real GitHub release assets appear as install buttons.</p></div></div><div className="flex gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#32f2c0]/10 text-xs font-bold text-[#32f2c0]">02</span><div><p className="font-semibold">Verify the identity</p><p className="mt-1 text-xs leading-5 text-[#789591]">Use the checksum and certificate fingerprint shown below.</p></div></div><div className="flex gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#32f2c0]/10 text-xs font-bold text-[#32f2c0]">03</span><div><p className="font-semibold">Approve on Android</p><p className="mt-1 text-xs leading-5 text-[#789591]">If needed, allow your browser or file manager to install unknown apps.</p></div></div></div></div><div id="security" className="rounded-2xl border border-[#32f2c0]/20 bg-[#0b1821]/90 p-7 shadow-[0_0_70px_rgba(50,242,192,.06)]"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#32f2c0]/10 text-[#32f2c0]"><LockKeyhole size={20} /></span><div><p className="text-xs uppercase tracking-[.18em] text-[#789591]">Trust layer</p><p className="mt-1 font-semibold">Medivac One v1.0.32</p></div></div><span className="rounded-full bg-[#32f2c0]/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#63f7ca]">VERIFIED</span></div><div className="mt-8 space-y-5 text-sm"><div><p className="text-xs uppercase tracking-[.16em] text-[#789591]">SHA-256 APK checksum</p><button onClick={copyChecksum} className="mt-2 flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 p-3 text-left font-mono text-[11px] text-[#c8dbd8] hover:border-[#32f2c0]/30"><span className="break-all">{APK_SHA256}</span><span className="shrink-0 text-[#32f2c0]">{copied ? "COPIED" : "COPY"}</span></button></div><div><p className="text-xs uppercase tracking-[.16em] text-[#789591]">Signing certificate</p><p className="mt-2 break-all font-mono text-[11px] leading-5 text-[#c8dbd8]">{APK_CERT_SHA256}</p><p className="mt-2 text-xs text-[#789591]">CN=Manus App · APK Signature Scheme v2 · arm64-v8a + armeabi-v7a</p></div></div></div></div></section>

      <section id="billing" className="relative z-10 border-t border-white/10 bg-[#08121c]/90 px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.8fr]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#32f2c0]">Access / 03</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Free now. Ready for scale.</h2><p className="mt-5 max-w-xl text-[#91aaa8]">Registration is available for marketplace preferences and release notifications. Paid in-app access is intentionally held behind a payment connector so no checkout or billing data is faked on this public surface.</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setShowSignup(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#32f2c0] px-5 py-3 text-sm font-bold text-[#04110e]"><UserPlus size={17} />Register free</button><button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-[#c8dbd8] hover:border-[#32f2c0]/40"><CircleDollarSign size={17} />Payment status</button></div></div><div className="rounded-2xl border border-[#a879ff]/20 bg-[#a879ff]/[.05] p-7"><div className="flex items-center gap-3"><Zap className="text-[#c8a7ff]" size={20} /><p className="font-semibold">Connector gate</p></div><p className="mt-4 text-sm leading-6 text-[#afc0be]">Free-track downloads are live. Stripe is present in the session configuration but disabled, so paid checkout remains unavailable until the connector is enabled and authorized.</p><div className="mt-6 flex items-center gap-2 text-xs text-[#c8a7ff]"><span className="size-2 rounded-full bg-[#c8a7ff]" />PAYMENTS CONNECTOR PENDING</div></div></div></section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-8 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-[#627b78] sm:flex-row sm:items-center"><span>© 2026 JEDI//HUB · Free-track distribution</span><span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-[#32f2c0]" /> Open source where published · install approval stays with you</span></div></footer>

      {showSignup && <div className="fixed inset-0 z-50 grid place-items-center bg-[#02050a]/80 p-5 backdrop-blur-md"><div className="w-full max-w-md rounded-2xl border border-[#32f2c0]/30 bg-[#0a1721] p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#32f2c0]">Free profile</p><h2 className="mt-3 text-2xl font-semibold">Join the hub.</h2></div><button onClick={() => setShowSignup(false)} aria-label="Close registration"><X size={20} className="text-[#8da5a2]" /></button></div>{registered ? <div className="mt-8 rounded-xl border border-[#32f2c0]/20 bg-[#32f2c0]/10 p-5 text-sm leading-6 text-[#bcefe1]"><Check className="mb-3 text-[#32f2c0]" />Profile captured locally for this demo. Live account storage requires the app's auth backend.</div> : <form className="mt-7 space-y-4" onSubmit={(event) => { event.preventDefault(); setRegistered(true); }}><input required type="text" placeholder="Display name" className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-[#607774] focus:border-[#32f2c0]/50" /><input required type="email" placeholder="Email address" className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-[#607774] focus:border-[#32f2c0]/50" /><button className="w-full rounded-lg bg-[#32f2c0] px-4 py-3 text-sm font-bold text-[#04110e]">Create free profile</button><p className="text-xs leading-5 text-[#789591]">No password or payment is collected by this static page.</p></form>}</div></div>}
      {showInstall && <div className="fixed inset-0 z-50 grid place-items-center bg-[#02050a]/80 p-5 backdrop-blur-md"><div className="w-full max-w-md rounded-2xl border border-[#32f2c0]/30 bg-[#0a1721] p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#32f2c0]">Install trigger</p><h2 className="mt-3 text-2xl font-semibold">{showInstall}</h2></div><button onClick={() => setShowInstall(null)} aria-label="Close install dialog"><X size={20} className="text-[#8da5a2]" /></button></div><p className="mt-5 text-sm leading-6 text-[#9bb4b1]">You are leaving the hub for the official GitHub release asset. After download, Android will ask you to approve installation.</p><a href={apps.find((app) => app.name === showInstall)?.install} onClick={() => download(showInstall)} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#32f2c0] px-4 py-3 text-sm font-bold text-[#04110e]">Continue to download <ArrowDownToLine size={17} /></a></div></div>}
      {showCheckout && <div className="fixed inset-0 z-50 grid place-items-center bg-[#02050a]/80 p-5 backdrop-blur-md"><div className="w-full max-w-md rounded-2xl border border-[#a879ff]/30 bg-[#0a1721] p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#c8a7ff]">Access console</p><h2 className="mt-3 text-2xl font-semibold">Payments connector pending.</h2></div><button onClick={() => setShowCheckout(false)} aria-label="Close access dialog"><X size={20} className="text-[#8da5a2]" /></button></div><p className="mt-5 text-sm leading-6 text-[#9bb4b1]">The Stripe connector is disabled in this session. Free-track downloads work now; paid checkout will activate only after connector authorization and a secure backend checkout route are configured.</p><button onClick={() => setShowCheckout(false)} className="mt-7 w-full rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-[#c8dbd8]">Return to hub</button></div></div>}
    </main>
  );
}

export { APK_URL };
