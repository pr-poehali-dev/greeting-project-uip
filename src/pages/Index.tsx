import { useState } from "react";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectEdit from "@/components/ProjectEdit";

interface ProjectData {
  name: string;
  prompt: string;
  telegramChatId: string;
}

const Index = () => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleCreateProject = () => {
    setShowEditForm(true);
  };

  const handleSaveProject = (data: ProjectData) => {
    console.log("Сохранение проекта:", data);
    setShowEditForm(false);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
  };

  if (showEditForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <ProjectEdit onSave={handleSaveProject} onCancel={handleCancelEdit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <Header userName="Разработчик" onCreateProject={handleCreateProject} />
        <ProjectGrid />
      </div>
    </div>
  );
};

export default Index;
