// src/components/Sidebar.tsx
import React from "react";
import "tailwindcss/tailwind.css";

const Sidebar = () => {
	return (
		<aside className="bg-gray-100 h-screen w-64 p-6">
			<h1 className="text-2xl font-semibold text-gray-800 mb-6">
				Functionalities
			</h1>
			<nav>
				<ul>
					<li className="mb-3">
						<a
							href="#"
							className="text-gray-600 font-medium hover:text-gray-800 transition-colors"
						>
							TextGenImage
						</a>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
