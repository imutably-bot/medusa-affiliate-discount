import { MedusaService } from "@medusajs/framework/utils"
import { AffiliateDiscount } from "./models/affiliate-discount"

class AffiliateDiscountModuleService extends MedusaService({
  AffiliateDiscount,
}) {
  async getByCustomerId(customerId: string) {
    return await this.listAffiliateDiscounts({
      customerId,
    })
  }

  async getByDiscountId(discountId: string) {
    return await this.listAffiliateDiscounts({
      discountId,
    })
  }

  async incrementUsageCount(affiliateDiscountId: string) {
    const affiliateDiscount = await this.retrieveAffiliateDiscount(affiliateDiscountId)
    
    return await this.updateAffiliateDiscounts([{
      id: affiliateDiscountId,
      usageCount: affiliateDiscount.usageCount + 1,
      earnings: affiliateDiscount.earnings + affiliateDiscount.commission,
    }])
  }

  async createAffiliateDiscount(data: {
    customerId: string
    customerEmail: string
    discountId: string
    discountCode: string
    commission: number
    currencyCode?: string
  }) {
    return await this.createAffiliateDiscounts([data])
  }

  async deleteAffiliateDiscount(affiliateDiscountId: string) {
    return await this.softDeleteAffiliateDiscounts([affiliateDiscountId])
  }
}

export default AffiliateDiscountModuleService
export type { AffiliateDiscountModuleService as AffiliateDiscountService }
