import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Homepage } from "./components/Home.page";
import { SuperHerospage } from "./components/SuperHeros.page";
import { RQSuperHerospage } from "./components/RQSuperHeros.page";
import { RQSuperHeropage } from "./components/RQSuperHero.page";
import { ParallelQueriespage } from "./components/ParallelQueries.page";
import DynamicParallelPage from "./components/DynamicParallel.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="rq-parallel" element={<ParallelQueriespage />} />
          <Route
            path="rq-dynamic-parallel"
            element={<DynamicParallelPage heroIds={[1, 3]} />}
          />
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeropage />}
          />
          <Route path="/super-heroes" element={<SuperHerospage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHerospage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
