import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Template } from "@shared/schema";

interface TemplateCardProps {
  template: Template;
  onClick?: () => void;
  className?: string;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onClick,
  className,
}) => {
  return (
    <Card
      className={cn(
        "bg-dark-800 border border-dark-700 rounded-lg p-4 hover:border-primary-500 transition-all cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className={cn(`w-10 h-10 rounded-lg bg-${template.color}-500 bg-opacity-10 flex items-center justify-center mb-3`)}>
        <i className={cn(template.icon, `text-xl text-${template.color}-500`)}></i>
      </div>
      <h3 className="font-medium">{template.name}</h3>
      <p className="text-sm text-gray-400 mt-1">{template.description}</p>
    </Card>
  );
};
