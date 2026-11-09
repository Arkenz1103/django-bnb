import Categories from "@/app/components/Categories";
import PropertyList from "@/app/components/properties/PropertyList";

export default function Home() {
  return (
      <main className="w-full px-6">
        <Categories />

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <PropertyList />
        </div>

      </main>
  );
}
