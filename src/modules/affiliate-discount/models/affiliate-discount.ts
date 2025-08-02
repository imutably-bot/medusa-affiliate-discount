import { model } from "@medusajs/framework/utils"

export const AffiliateDiscount = model.define("affiliate_discount", {
  id: model.id().primaryKey(),
  customerId: model.text(),
  customerEmail: model.text(),
  discountId: model.text(),
  discountCode: model.text(),
  commission: model.float(),
  usageCount: model.number().default(0),
  earnings: model.float().default(0),
  currencyCode: model.text().default("usd"),
})
