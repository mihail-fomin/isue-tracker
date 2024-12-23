import prisma from '@/app/utils/connect'
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions'

export const getCommentsWithAuthors = async (issueId: string) => {
  const comments = await prisma.comment.findMany({
    where: { issueId },
    include: {
      user: true,
    },
  })

  return comments.map((comment) => ({
    comment: {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      userId: comment.userId,
      issueId: comment.issueId,
    },
    author: {
      id: comment.user.id,
      name: comment.user.name || '',
      imageUrl: comment.user.image || null,
    },
  }));
}


export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null; // Пользователь не авторизован

  return {
    name: session.user.name,
    imageUrl: session.user.image,
  };
};
