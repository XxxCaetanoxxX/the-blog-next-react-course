import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

const PostBaseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, 'Título deve ter, no mínimo, 3 caracteres')
        .max(120, 'Título deve ter um máximo de 120 caracteres'),
    content: z
        .string()
        .trim()
        .min(3, 'Conteúdo é obrigatório')
        .transform(val => sanitizeHtml(val)),
    author: z
        .string()
        .trim()
        .min(4, 'Autor precisa de um mínimo de 4 caracteres')
        .max(100, 'Nome do autor não deve ter mais que 100 caracteres'),
    excerpt: z
        .string()
        .trim()
        .min(3, 'Excerto precisa de um mínimo de 3 caracteres')
        .max(200, 'Excerto não deve ter mais que 200 caracteres'),
    coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
        message: 'URL da capa deve ser uma URL ou caminho para imagem',
    }),
    published: z
        .union([
            z.literal('on'),
            z.literal('true'),
            z.literal('false'),
            z.literal(true),
            z.literal(false),
            z.literal(null),
            z.literal(undefined),
        ])
        .default(false)
        .transform(val => val === 'on' || val === 'true' || val === true),
});

// PostCreateSchema: igual ao base por enquanto
export const PostCreateSchema = PostBaseSchema;

// PostUpdateSchema: pode incluir campos extras no futuro (ex: id)
export const PostUpdateSchema = PostBaseSchema.extend({
    // id: z.string().uuid('ID inválido'),
});

const obj = {
    '$ACTION_REF_1': '',
    '$ACTION_1:0': '{"id":"6063fa223e8ac99146528cbd72b844a1f86321f076","bound":"$@1"}',
    '$ACTION_1:1': '[{"formState":{"id":"1b6a5f57-8a19-4933-91f4-1af678464ded","slug":"como-a-escrita-pode-mudar-sua-carreira","title":"Como a escrita pode mudar sua carreira","excerpt":"Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados.","author":"Pedro Martins","content":"Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados.","coverImageUrl":"/images/bryen_9.png","published":true,"createdAt":"2025-04-06T00:24:38.616Z"},"errors":[]}]',
    '$ACTION_KEY': 'k773029343',
    id: '1b6a5f57-8a19-4933-91f4-1af678464ded',
    slug: 'como-a-escrita-pode-mudar-sua-carreira',
    author: 'Pedro Martins',
    title: 'Como a escrita pode mudar sua carreira',
    excerpt: 'Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados.',
    content: 'Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados.',
    file: {
        size: 0,
        type: 'application/octet-stream',
        name: 'blob',
        lastModified: 1772666339754
  },
    coverImageUrl: '/images/bryen_9.png',
    published: 'on'
};

const zodParsedObject = PostCreateSchema.safeParse(obj);

if(!zodParsedObject.success) {
    const errors= getZodErrorMessages(zodParsedObject.error.format());
    console.log(errors);
}