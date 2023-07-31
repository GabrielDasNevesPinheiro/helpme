import { Skeleton } from "@/components/ui/skeleton";


export default function CallHistorySkeleton() {
    return (
        <div className="w-full h-screen border rounded-md p-2 space-y-2 overflow-hidden">
            <Skeleton className="h-16 w-full"/>
            <Skeleton className="h-full w-full"/>
        </div>
    )
}