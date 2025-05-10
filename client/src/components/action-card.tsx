import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  onClick?: () => void;
  className?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  iconColor,
  onClick,
  className,
}) => {
  return (
    <Card
      className={cn(
        "bg-dark-800 border border-dark-700 rounded-xl p-5 hover:border-primary-500 transition-all cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={cn(`rounded-lg bg-${iconColor}-500 bg-opacity-10 p-3`)}>
          <i className={cn(icon, `text-xl text-${iconColor}-500`)}></i>
        </div>
        <div className="ml-4">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
};
