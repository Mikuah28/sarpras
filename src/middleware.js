import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;

    // Jika bukan admin, tendang ke halaman unauthorized
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return Response.redirect(new URL("/unauthorized", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // butuh login
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"], // folder admin terproteksi
};
