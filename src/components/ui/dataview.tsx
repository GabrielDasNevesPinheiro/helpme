import { Card, CardContent, CardDescription, CardHeader } from "./card";


export default function DataView(
    { data, description }:
        { data: React.ReactNode, description: React.ReactNode }
) {
    return (
        <Card>
            <CardHeader>
                <CardDescription className="text-xl text-center">{description}</CardDescription>
                <CardContent className="flex w-40 self-center">
                    <div className="w-full h-full flex justify-center">
                        <p className="text-4xl ">
                            {data}
                        </p>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )
}