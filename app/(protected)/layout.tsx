import Footer from "#/components/footer";
import Header from "#/components/header";

export default async function Layout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex flex-col w-full h-dvh">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
}
