import { getServerSession } from "next-auth";
import { getUserInfo } from "@/app/actions/user.actions";

export default async function ProfileWidget() {
    const session = await getServerSession();
    const user = await getUserInfo(session?.user!.email!);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <div className="flex space-x-4">
                    {session?.user?.image &&
                        <img src={session.user.image}
                            alt="profile image"
                            className="rounded-md border border-white/30 md:w-48 w-36 h-32 md:h-auto"
                        />
                    }
                    <div className="flex flex-col space-y-2 md:text-3xl text-sm sm:text-xl">
                        <p>{user.name}</p>
                        <p>{user.company}</p>
                        <p>{user.level}</p>
                        <p>{user.sector}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}