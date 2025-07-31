import AffiliateDiscountModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const AFFILIATE_DISCOUNT_MODULE = "affiliateDiscountModuleService"

export default Module(AFFILIATE_DISCOUNT_MODULE, {
  service: AffiliateDiscountModuleService,
})
