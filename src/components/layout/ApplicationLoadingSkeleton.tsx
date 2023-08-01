import { Loader2Icon } from "lucide-react";

export default function ApplicationSkeleton() {

    return (
        <div className="h-screen flex items-center justify-center">
            
            <span>
                <Loader2Icon size={43} className="animate-spin"/>
            </span>
        </div>
    )

}