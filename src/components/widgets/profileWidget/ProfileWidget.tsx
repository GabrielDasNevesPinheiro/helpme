import { getServerSession } from "next-auth";
import { getUserInfo } from "@/app/actions/user.actions";
import { Badge } from "@/components/ui/badge";

export default async function ProfileWidget() {
    const session = await getServerSession();
    const user = await getUserInfo(session?.user!.email!);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <div className="flex space-x-4 items-center justify-center md:justify-start">
                    {session?.user?.image &&
                        <img src={session.user.image}
                            alt="profile image"
                            className="rounded-full border border-white/30 md:h-auto"
                        />
                    }

                    <div className="md:flex flex-col space-y-2 md:text-3xl text-sm sm:text-xl hidden">
                        <p>{user.name}</p>
                        <p>{user.company}</p>
                        <p>{user.level}</p>
                        <p>{user.sector}</p>
                    </div>
                </div>
                <div className="flex  w-full justify-center items-center gap-2 pt-2 pb-2 md:hidden">
                    <p className="text-2xl">{user.name}</p>
                    <Badge className="md:hidden max-h-6">{user.company}</Badge>
                </div>
            </div>
        </div>
    )
}