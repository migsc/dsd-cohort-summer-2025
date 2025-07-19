"use client";



export default function Home() {
	return(
		<header className="flex flex-col items-center h-screen text-black magicpattern bg-cover">
			<nav className="flex justify-between w-full p-4 px-20">
				<div>
					<img src="/logo.png" alt="Logo" className="h-10 w-10" />
					<p className="ml-2 text-2xl font-bold text-blue-600">CleanHub</p>
				</div>
				<div className="flex items-center space-x-4 gap-2.5">
					<ul className="flex space-x-4">
						<li><a href="/">Contact</a></li>
					</ul>
					<span>
						<button className="py-3 rounded-md w-[150px] text-white text-[16px] bg-blue-600 hover:">Login</button>
					</span>
				</div>
			</nav>
			<div className="flex flex-1 w-full px-14 max-w-[1800px] mt-[300px]">
				{/* content */}
				<div className="w-1/2 h-full max-w-[900px]">
					<hr className="bg-blue-600 w-[100px] h-1.5" />
					<h1 className="text-6xl font-black mb-5 mt-3">Your assistant who manages your customers cleaning needs.</h1>
					<p className="max-w-[700px] leading-8 mb-5">Our app is a comprehensive software platform that empowers cleaning businesses to launch and manage their operations online. From initial setup to customer bookings and payment processing, we provide everything cleaning professionals need to run their business efficiently.</p>

					<button className="p-4 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 cursor-pointer">Get Started Managing Your Business <img src="" alt="" /></button>
				</div>
				{/* large logo */}
				<div className="w-1/2 h-full max-w-[900px]">
					<h1>MAIN LOGO</h1>
				</div>
			</div>
		</header>
	);
}
