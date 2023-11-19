import { useEffect, useState } from "react";
import { Tables, supabase } from "..";
import ProjectDisplay from "@/components/ProjectDisplay";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const DashboardView = () => {
  const [projects, setProjects] = useState<Tables<"projects">[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("projects").select();
        if (error) {
          console.error("Error fetching projects:", error.message);
          return;
        }
        setProjects(data);
      } catch (error) {
        console.error("Error during data fetching:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ width: "95%", height: "95%" }}
      className="flex justify-center items-center"
    >
      <ScrollArea className="whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {projects.map((project) => (
            <ProjectDisplay key={project.id} project={project}></ProjectDisplay>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default DashboardView;
