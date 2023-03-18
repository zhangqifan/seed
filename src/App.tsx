import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import TextGenImage from "./components/TextGenImage";

function App() {
	return (
		<div className="App">
			<SearchBar />
			<div className="flex">
				<Sidebar />
				<div className="w-full p-6">
					<TextGenImage />
				</div>
			</div>
		</div>
	);
}

export default App;
