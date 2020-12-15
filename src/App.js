import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

let url = "https://api.github.com/repos/tannerlinsley/react-query";

const query = () => {
  return fetch(url).then((res) => res.json());
};

function Example() {
  return (
    <ErrorBoundary
      FallbackComponent={() => <div>Oh noes!</div>}
      onError={() => console.log("poof!")}
    >
      <Fetcher />
    </ErrorBoundary>
  );
}

const Fetcher = () => {
  const { isLoading, data } = useQuery("repoData", query, {
    useErrorBoundary: true,
  });

  if (isLoading) return "Loading...";

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};
