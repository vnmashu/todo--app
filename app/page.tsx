import Kanban from "@/components/Kanban";
import Image from "next/image";

/**
 * Represents a Home component.
 *
 * @return {JSX.Element} The main element of the Home component.
 */
const Home = (): JSX.Element => {
  return (
    <main className="w-full p-[2%]">
      <Kanban />
    </main>
  );
}

export default Home;
