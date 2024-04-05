import vine from '@vinejs/vine'

export const addPlayerValidator = vine.compile(
  vine.object({
    name: vine.string().alpha({
      allowDashes: true,
      allowUnderscores: true,
      allowSpaces: false,
    }),
    password: vine.string(),
  })
)
