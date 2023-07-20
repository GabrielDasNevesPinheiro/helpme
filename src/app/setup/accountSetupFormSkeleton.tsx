import { Skeleton } from "@/components/ui/skeleton";


export default function AccountSetupFormSkeleton() {
    return (
        <div className="flex space-y-4 flex-col border rounded-md p-4 m-8 sm: max-w-md">
            <Skeleton className="ml-4 w-72 h-12"/>
            <Skeleton className="ml-4 w-52 h-4"/>
            <Skeleton className="ml-4 w-78 h-8"/>
            <Skeleton className="ml-4 w-52 h-4"/>
            <Skeleton className="ml-4 w-52 h-12"/>
        </div>
    )
}