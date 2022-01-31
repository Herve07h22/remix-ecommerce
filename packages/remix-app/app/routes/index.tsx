import { App } from "@sugggest/core/App";

export async function loader() {
  const result = await App.getAToken({ email: "herve@camilab.co" });
  console.log("result: ", result);
  return { status: "success" };
}

export default function IndexRoute() {
  return <div>Hello Index Route</div>;
}
