import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ module: "dashboard", status: "ok", tenantScoped: true, timestamp: new Date().toISOString() }); }
