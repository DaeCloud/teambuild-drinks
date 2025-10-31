import Header from "./components/Header";
import InteractiveInput from "./components/InteractiveInput";
import ItemList from "./components/ItemList";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="flex min-h-screen items-center justify-center font-sans bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black sm:items-start">
          <div className="flex flex-col items-center gap-6 text-center w-full sm:items-start sm:text-left">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight w-full text-zinc-50">
              Add your drink preferences below!
            </h1>
            <InteractiveInput />
            <ItemList />
          </div>
        </main>
      </div>
    </div>
  );
}
