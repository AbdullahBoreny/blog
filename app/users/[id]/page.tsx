import { getUserById } from "@/app/services/users";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string; }>;
}
export default async function UserPage(props: Props) {
    const { id } = await props.params;
    const user = await getUserById(Number(id));
    if (!user) {
        notFound();
    }
    return (
        <>
            <ul>
                <li>{user?.name}</li>
                <li>user name: {user?.userName}</li>
            </ul>

        </>
    );
}