import Link from "next/link"; import { nav } from "@/lib/mock-data";
export default function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen"><aside className="w-64 border-r bg-white p-4"><h1 className="text-lg font-semibold">AGenNext ProjectTrack</h1><p className="text-xs text-slate-500">Agentic Project Management for Enterprise</p><nav className="mt-6 space-y-2">{nav.map((item)=><Link className="block rounded px-2 py-1 hover:bg-slate-100" key={item} href={`/${item.toLowerCase().replace(/ /g,'-')}`}>{item}</Link>)}</nav></aside><main className="flex-1 p-6">{children}</main></div>
}
