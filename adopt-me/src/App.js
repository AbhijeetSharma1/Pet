// this for removing red underlines momentarily-->  " /* global React ReactDOM*/"
//with latest version of react we don't need to write import react evrywhere we use jsx, babel is smart enough to know that where we use jsx its need react

import { render } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import SearchParams from "./SearchParams";

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>

      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <h1>Adopt Me!</h1>
        <SearchParams />
      </ErrorBoundary>
    </div>
  );
};

render(<App />, document.getElementById("root"));

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", { id: "my-brand" }, "Adopt Me!"),
//     React.createElement(Pet, {
//       name: "Luna",
//       animal: "Dog",
//       breed: "Havanese",
//     }),
//     React.createElement(Pet, {
//       name: "Pepper",
//       animal: "Bird",
//       breed: "Cocktiel",
//     }),
//     React.createElement(Pet, {
//       name: "Sudo",
//       animal: "Dog",
//       breed: "Wheaten Terrier",
//     }),
//   ]);
// };
// here App is a react component so its like a rubber stamp that we can use many times
//these curly braces here are actually used to pass attributed to elements like id, class etc
