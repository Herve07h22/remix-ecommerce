import { Outlet } from "remix";

export default function TextGenRoute() {
  return (
    <div>
      <h1>Text generation</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
