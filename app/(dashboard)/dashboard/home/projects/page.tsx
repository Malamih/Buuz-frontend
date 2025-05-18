import { Page } from "@/app/(dashboard)/components/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const Projects = () => {
  return (
    <Page>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-xl">Total: 34</h1>
        <Button className="bg-darkPrimary">
          <Plus />
        </Button>
      </header>
      <div className="search mt-4">
        <Input placeholder="Search..." className="w-full max-w-[400px]" />
      </div>
    </Page>
  );
};

export default Projects;
