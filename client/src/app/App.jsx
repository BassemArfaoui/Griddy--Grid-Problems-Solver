import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/parts/Header";
import CustomToaster from "../components/tools/CustomToaster";
import Spinner from "../components/tools/Spinner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Correct 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProblemButton from "../components/parts/ProblemButton";
import ExplainButton from "../components/parts/ExplainButton";
import MyDrawer from "../components/tools/MyDrawer";


// Lazy-load the components
const MainPage = lazy(() => import("../pages/MainPage"));
const ShortestPath = lazy(() => import("../pages/ShortestPath"));
const Prob2 = lazy(() => import("../pages/Prob2"));
const Prob3 = lazy(() => import("../pages/Prob3"));


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      
        <CustomToaster />
        <Header />
        <ProblemButton />
        <ExplainButton />

        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/shortest-path" element={<ShortestPath />} />
            <Route path="/function-approximation" element={<Prob2 />} />
            <Route path="/network-coverage" element={<Prob3 />} />
            <Route path="/test" element={<MyDrawer />} />
          </Routes>
        </Suspense>

      </Router>
    </QueryClientProvider>
  );
}

export default App;
