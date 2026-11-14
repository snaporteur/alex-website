import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub",
  robots: { index: false, follow: false },
};

export default function GithubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
