export default defineEventHandler(async (event) => {
  const auth = await requireUser(event)

  const user = await prisma.user.findUnique({ where: { id: auth.id } })
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  return { user: publicUser(user) }
})
