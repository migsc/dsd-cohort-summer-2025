export default function Navigation() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <h1 className="mb-4 text-2xl font-bold">
        Welcome to the DSD Cohort Summer 2025 Project
      </h1>
      <div className="mb-4 flex items-center gap-2">
        <a
          href="./"
          className="rounded-xs bg-red-400 p-1 text-white transition-all duration-200 ease-in-out hover:bg-red-200 hover:text-black"
        >
          Home
        </a>
        <a
          href="./dashboard"
          className="rounded-xs bg-red-400 p-1 text-white transition-all duration-200 ease-in-out hover:bg-red-200 hover:text-black"
        >
          Go to Dashboard
        </a>
        <a
          href="./login"
          className="rounded-xs bg-red-400 p-1 text-white transition-all duration-200 ease-in-out hover:bg-red-200 hover:text-black"
        >
          Login Page
        </a>
        <a
          href="./service"
          className="rounded-xs bg-red-400 p-1 text-white transition-all duration-200 ease-in-out hover:bg-red-200 hover:text-black"
        >
          Service
        </a>
      </div>
    </div>
  );
}
