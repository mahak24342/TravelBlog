"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to home page if a session exists
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to the homepage if user is already signed in
    }
  }, [status, router]);

  // If loading the session, display a loading message or spinner
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 dark:from-blue-700 dark:to-purple-800">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {session ? (
          <>
            <p className="text-gray-800 dark:text-gray-200 text-lg mb-4">
              Signed in as <span className="font-bold">{session.user.email}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-800 dark:text-gray-200 text-2xl mb-6">Hey There!! Login Here</p>
            <div className="space-y-4">
              <button
                onClick={() => signIn('google')}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign in with Google
              </button>
              <button
                onClick={() => signIn('github')} 
                className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300"
              >
                Sign in with GitHub
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
