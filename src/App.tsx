import Header from "./components/header";
import Main_1 from "./components/main_parent_1";
import Main_2 from "./components/main_parent_2";
import Fetch from "./components/fetching-api";

function App() {

  return (
    <div className="App">
      <div>
        <Header />
        <Main_1 />
        <Main_2 />
        {/* <Fetch /> */}
      </div>
    </div>
  );
}

export default App;
