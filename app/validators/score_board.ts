import vine from '@vinejs/vine'

export const getScoreBoardValidator = vine.compile(
  vine.object({
    limit: vine
      .number()
      .withoutDecimals()
      .min(0)
      .max(1000)
      .parse((limit) => limit ?? 15),
    page: vine
      .number()
      .withoutDecimals()
      .min(0)
      .max(10_000)
      .parse((page) => page ?? 1),
  })
)
