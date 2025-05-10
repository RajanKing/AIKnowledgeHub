import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Convert to minutes
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (minutes < 24 * 60) {
    const hours = Math.floor(minutes / 60);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes < 7 * 24 * 60) {
    const days = Math.floor(minutes / (24 * 60));
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getFileIconByType(type: string): string {
  switch (type.toLowerCase()) {
    case 'pdf':
      return 'ri-file-pdf-line';
    case 'docx':
    case 'doc':
      return 'ri-file-word-line';
    case 'xlsx':
    case 'xls':
      return 'ri-file-excel-line';
    case 'pptx':
    case 'ppt':
      return 'ri-file-ppt-line';
    case 'txt':
      return 'ri-file-text-line';
    case 'md':
      return 'ri-markdown-line';
    case 'youtube':
      return 'ri-youtube-line';
    default:
      return 'ri-file-line';
  }
}

export function getFileTypeColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'pdf':
      return 'text-blue-500 bg-blue-500 bg-opacity-10';
    case 'docx':
    case 'doc':
      return 'text-green-500 bg-green-500 bg-opacity-10';
    case 'xlsx':
    case 'xls':
      return 'text-emerald-500 bg-emerald-500 bg-opacity-10';
    case 'pptx':
    case 'ppt':
      return 'text-orange-500 bg-orange-500 bg-opacity-10';
    case 'txt':
      return 'text-gray-400 bg-gray-400 bg-opacity-10';
    case 'md':
      return 'text-purple-500 bg-purple-500 bg-opacity-10';
    case 'youtube':
      return 'text-red-500 bg-red-500 bg-opacity-10';
    default:
      return 'text-gray-400 bg-gray-400 bg-opacity-10';
  }
}

export function getWorkspaceColor(colorId: number): string {
  const colors = [
    'bg-gradient-to-br from-blue-900 to-purple-900',
    'bg-gradient-to-br from-green-900 to-teal-900',
    'bg-gradient-to-br from-purple-900 to-pink-900',
    'bg-gradient-to-br from-red-900 to-orange-900',
    'bg-gradient-to-br from-indigo-900 to-blue-900',
    'bg-gradient-to-br from-yellow-900 to-amber-900',
  ];
  
  return colors[colorId % colors.length];
}

export function getProjectDotColor(colorId: number): string {
  const colors = [
    'bg-secondary-400', // green
    'bg-yellow-400',    // yellow
    'bg-blue-400',      // blue
    'bg-pink-400',      // pink
    'bg-purple-400',    // purple
    'bg-orange-400',    // orange
  ];
  
  return colors[colorId % colors.length];
}
