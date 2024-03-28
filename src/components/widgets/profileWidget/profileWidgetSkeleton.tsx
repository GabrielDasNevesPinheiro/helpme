import { Skeleton } from "../../ui/skeleton";

export default function ProfileWidgetSkeleton() {
    return (
        <div className="flex gap-x-2">
            <Skeleton className="md:w-48 md:h-48 w-36 h-36 rounded-full" />
            <div className="flex flex-col gap-y-4">
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
            </div>
        </div>
    )
}