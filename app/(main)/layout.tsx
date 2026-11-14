import RootShell from "../components/RootShell";
import { buildMetadata, VIEWPORT } from "../lib/site";

export const metadata = buildMetadata("en");
export const viewport = VIEWPORT;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
