
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfigComp from "./Routers";
import ErrorBoundary from "../error-boundary";
import { Suspense } from "react";
function App() {

  return (
    <ErrorBoundary>
      <Suspense fallback={<p>加载中......</p>}>
        <Router>
          <RouterConfigComp />
        </Router>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
