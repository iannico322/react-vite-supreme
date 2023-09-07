import { ThemeProvider } from "@/components/theme-provider"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


import { Suspense, lazy } from "react";
import Loader from "./components/loader/loader";
import NotFound from "./screens/notFound";
const  ItsyMain= lazy(() =>
  wait(2300).then(() => import("./screens"))
);

function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router  >
      <Routes >
          <Route path="/react-vite-supreme" element={<Navigate replace to="/react-vite-supreme/main" />} />
          <Route
          path="/react-vite-supreme/main"
          element={
            <>
              <Suspense fallback={<Loader />}>
                <ItsyMain />
              </Suspense>
            </>
          }
          />
          <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

function wait( time:number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export default App
