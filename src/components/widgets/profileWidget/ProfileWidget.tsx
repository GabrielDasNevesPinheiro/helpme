import Image from "next/image";
import { getServerSession } from "next-auth";
import { getUserInfo } from "@/app/actions/userActions";

export default async function ProfileWidget() {
    const session = await getServerSession();
    const user = await getUserInfo(session?.user?.email!);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <div className="flex space-x-4">
                    <figure>
                        <Image src={`${session?.user?.image}`}
                            loading="eager"
                            width={200}
                            height={200}
                            alt="profile image"
                            className="rounded-md border border-white/30 md:w-auto w-36"
                        />
                    </figure>
                    <div className="flex flex-col space-y-2 md:text-3xl text-xl">
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