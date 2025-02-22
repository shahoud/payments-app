import TopNavBar from "@/components/home-ui/TopNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-screen flex-col">
      <nav>
        <TopNavBar />
      </nav>
      <main className="flex flex-1">{children}</main>
    </section>
  );
}
