import { ManagePostForm } from "@/components/admin/ManagePostForm";

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
    return (
        <>
            <h1>Criar Post</h1>
            <ManagePostForm />
        </>
    )
}