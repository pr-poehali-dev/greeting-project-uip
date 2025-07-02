import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface ProjectData {
  name: string;
  prompt: string;
  telegramChatId: string;
}

interface ProjectEditProps {
  project?: ProjectData;
  onSave: (data: ProjectData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

interface ValidationErrors {
  name?: string;
  prompt?: string;
  telegramChatId?: string;
}

export default function ProjectEdit({
  project,
  onSave,
  onCancel,
  isEditing = false,
}: ProjectEditProps) {
  const [formData, setFormData] = useState<ProjectData>({
    name: project?.name || "",
    prompt: project?.prompt || "",
    telegramChatId: project?.telegramChatId || "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Обязательное поле";
    }

    if (!formData.prompt.trim()) {
      newErrors.prompt = "Обязательное поле";
    }

    if (!formData.telegramChatId.trim()) {
      newErrors.telegramChatId = "Обязательное поле";
    } else if (!/^-?\d+$/.test(formData.telegramChatId)) {
      newErrors.telegramChatId = "Введите корректный Chat ID";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ProjectData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name={isEditing ? "Edit" : "Plus"} size={24} />
          {isEditing ? "Редактировать проект" : "Создать новый проект"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Название проекта</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Введите название проекта"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <Icon name="AlertCircle" size={14} />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Промт</Label>
            <Textarea
              id="prompt"
              value={formData.prompt}
              onChange={(e) => handleInputChange("prompt", e.target.value)}
              placeholder="Опишите что должен делать ваш проект..."
              rows={4}
              className={errors.prompt ? "border-red-500" : ""}
            />
            {errors.prompt && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <Icon name="AlertCircle" size={14} />
                {errors.prompt}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telegramChatId">Telegram Chat ID</Label>
            <Input
              id="telegramChatId"
              value={formData.telegramChatId}
              onChange={(e) =>
                handleInputChange("telegramChatId", e.target.value)
              }
              placeholder="Например: -1001234567890"
              className={errors.telegramChatId ? "border-red-500" : ""}
            />
            {errors.telegramChatId && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <Icon name="AlertCircle" size={14} />
                {errors.telegramChatId}
              </p>
            )}
            <p className="text-sm text-gray-500">
              ID чата или группы в Telegram для получения уведомлений
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting && (
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
              )}
              {isEditing ? "Обновить" : "Сохранить"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
