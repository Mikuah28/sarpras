import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return { ok: false, response: new Response(JSON.stringify({
      error: "Unauthorized (Admin only)"
    }), { status: 401 }) };
  }

  return { ok: true };
}
