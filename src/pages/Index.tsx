import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <Header userName="Разработчик" />
        <ProjectGrid />
      </div>
    </div>
  );
};

export default Index;
