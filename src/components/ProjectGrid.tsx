import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  lastUpdated: string;
  technology: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    description:
      "Современная платформа для онлайн-торговли с React и TypeScript",
    status: "active",
    lastUpdated: "2 часа назад",
    technology: "React",
  },
  {
    id: "2",
    name: "CRM System",
    description: "Система управления клиентами для малого бизнеса",
    status: "paused",
    lastUpdated: "3 дня назад",
    technology: "Vue.js",
  },
  {
    id: "3",
    name: "Portfolio Website",
    description: "Персональное портфолио с минималистичным дизайном",
    status: "completed",
    lastUpdated: "1 неделю назад",
    technology: "Next.js",
  },
];

const statusConfig = {
  active: { color: "bg-green-100 text-green-800", label: "Активный" },
  paused: { color: "bg-yellow-100 text-yellow-800", label: "Приостановлен" },
  completed: { color: "bg-blue-100 text-blue-800", label: "Завершен" },
};

export default function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockProjects.map((project) => (
        <Card
          key={project.id}
          className="hover:shadow-lg transition-shadow cursor-pointer"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-medium">
                {project.name}
              </CardTitle>
              <Badge className={statusConfig[project.status].color}>
                {statusConfig[project.status].label}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">{project.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{project.technology}</span>
              <span>{project.lastUpdated}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Edit" size={16} className="mr-1" />
                Редактировать
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
