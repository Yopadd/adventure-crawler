import vine from '@vinejs/vine'

export const addItemsValidator = vine.compile(
  vine.object({
    itemsName: vine.array(vine.string()),
  })
)

export const getItemsValidator = vine.compile(
  vine.object({
    limit: vine
      .number()
      .withoutDecimals()
      .min(1)
      .max(1000)
      .parse((page) => page ?? 10),
    page: vine
      .number()
      .withoutDecimals()
      .min(1)
      .max(10_000)
      .parse((page) => page ?? 1),
  })
)
