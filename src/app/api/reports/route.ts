import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ module: "reports", status: "ok", tenantScoped: true, timestamp: new Date().toISOString() }); }
