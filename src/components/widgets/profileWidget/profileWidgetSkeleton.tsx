import { Skeleton } from "../../ui/skeleton";

export default function ProfileWidgetSkeleton() {
    return (
        <div className="flex space-y-4 flex-col m-8 sm: max-w-md border rounded-md p-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-80" />
            <div className="flex space-x-4 items-center">
                <Skeleton className="h-16 w-16 rounded-full"/>
                <Skeleton className="h-9 w-44"/>
            </div>
            <Skeleton className="h-4 w-80 ml-4" />
            <Skeleton className="h-4 w-80 ml-4" />
            <Skeleton className="h-4 w-80 ml-4" />
        </div>
    )
}