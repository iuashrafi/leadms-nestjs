export default function Home() {
  return (
    <div className="relative container mx-auto p-6 grid grid-cols-12 gap-4">
      <div className="relative bg-green-300 p-6 col-span-3 rounded-xl">
        <span className="absolute right-4 top-4 text-2xl bg-green-400 h-12 w-12 rounded-full flex items-center justify-center">
          14
        </span>
        <span className="text-xl">Restaurants</span>
      </div>
      <div className="bg-green-300 p-4 col-span-3 rounded-xl">hello world</div>
      <div className="bg-green-300 p-4 col-span-3 rounded-xl">hello world</div>
      <div className="bg-green-300 p-4 col-span-3 rounded-xl">hello world</div>
    </div>
  );
}
