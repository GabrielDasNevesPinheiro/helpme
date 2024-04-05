import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimeDiff(time: Date): string {

  const now = new Date();
  const differenceInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000); // Difference in seconds

  // Difference between call createdAt and date.now
  let timeResult: string;

  if (differenceInSeconds < 60) { // if created seconds ago

    timeResult = `há ${differenceInSeconds} segundo${differenceInSeconds !== 1 ? 's' : ''}`;

  } else if (differenceInSeconds < 3600) { // if created minutes ago

    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    timeResult = `há ${differenceInMinutes} minuto${differenceInMinutes !== 1 ? 's' : ''}`;

  } else if (differenceInSeconds < 86400) { // if created hours ago

    const differenceInHours = Math.floor(differenceInSeconds / 3600);
    timeResult = `há ${differenceInHours} hora${differenceInHours !== 1 ? 's' : ''}`;

  } else {

    const differenceInDays = Math.floor(differenceInSeconds / 86400); // if created days ago
    timeResult = `há ${differenceInDays} dia${differenceInDays !== 1 ? 's' : ''}`;

  }

  return timeResult;
}

export function getFormattedDate(date: Date) {
  return `${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

export function createEmptyCall(): Call {
  return {
    id: "",
    user: "",
    description: "",
    sector: "",
    status: false,
    closedBy: "",
    time: "",
    datetime: "",
  }
}