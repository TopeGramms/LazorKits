import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-red-500/10 mb-2">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-4xl font-display font-bold text-white">404 Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="inline-flex px-6 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}
