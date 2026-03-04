'use server';

type CreatePostActionState = {
    numero: number;
};

export async function createPostAction(prevState: CreatePostActionState): Promise<CreatePostActionState> {
    console.log('Criando post com estado:', prevState);
    return {
        numero: prevState.numero + 1
    }
}