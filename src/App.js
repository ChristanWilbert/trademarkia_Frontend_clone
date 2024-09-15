import "./App.css";
import Header from "./components/Header";
import SearchResultPane from "./components/Search/SearchResultPane";
import { DataProvider } from "./context/contextProvider";

function App() {
  return (
    <DataProvider>
      <div className="App w-full">
        <Header />
        <SearchResultPane />
      </div>
    </DataProvider>
  );
}

export default App;
