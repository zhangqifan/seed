// src/components/SearchBar.tsx
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const SearchBar = () => {
	const [searchText, setSearchText] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return (
		<header className="bg-white shadow">
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					<input
						type="text"
						value={searchText}
						onChange={handleChange}
						placeholder="Search"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
			</div>
		</header>
	);
};

export default SearchBar;
