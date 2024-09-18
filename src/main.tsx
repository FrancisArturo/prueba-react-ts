import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppWithReactQuery from "./AppWithReactQuery";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		{/* <App/> */}
		<AppWithReactQuery />
	</QueryClientProvider>,
);
