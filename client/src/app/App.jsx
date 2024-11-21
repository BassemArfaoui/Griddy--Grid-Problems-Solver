import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/parts/Header";
import CustomToaster from "../components/tools/CustomToaster";
import Spinner from "../components/tools/Spinner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Correct 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Lazy-load the components
const MainPage = lazy(() => import("../pages/MainPage"));
const ShortestPath = lazy(() => import("../pages/ShortestPath"));
const Prob2 = lazy(() => import("../pages/Prob2"));
const Prob3 = lazy(() => import("../pages/Prob3"));


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <CustomToaster />
        <Header />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/shortest-path" element={<ShortestPath />} />
            <Route path="/prob2" element={<Prob2 />} />
            <Route path="/prob3" element={<Prob3 />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
