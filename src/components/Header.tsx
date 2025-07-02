import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  userName: string;
  onCreateProject?: () => void;
}

export default function Header({ userName, onCreateProject }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-12">
      <div>
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          Добро пожаловать, {userName}
        </h1>
        <p className="text-gray-600">Управляйте своими проектами</p>
      </div>

      <Button
        onClick={onCreateProject}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
      >
        <Icon name="Plus" size={20} />
        Создать новый проект
      </Button>
    </header>
  );
}
