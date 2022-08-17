import { Provider } from "react-redux";
import MainPage from "./pages";
import {setupStore} from "redux/store";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient()

const store = setupStore();

function App() {
  return (
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
        <MainPage />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
