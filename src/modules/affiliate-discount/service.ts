import { MedusaService } from "@medusajs/framework/utils"
import { AffiliateDiscount } from "./models/affiliate-discount"

type AffiliateDiscountData = {
  id?: string
  customerId: string
  customerEmail: string
  discountId: string
  discountCode: string
  commission: number
  usageCount?: number
  earnings?: number
  currencyCode?: string
}

class AffiliateDiscountModuleService extends MedusaService({
  AffiliateDiscount,
}) {
  // Repository methods that will be available through MedusaService
  protected affiliateDiscountRepository_: any

  async getByCustomerId(customerId: string) {
    return await this.affiliateDiscountRepository_.find({
      where: { customerId },
    })
  }

  async getByDiscountId(discountId: string) {
    return await this.affiliateDiscountRepository_.find({
      where: { discountId },
    })
  }

  async incrementUsageCount(affiliateDiscountId: string) {
    const affiliateDiscount = await this.affiliateDiscountRepository_.findOne({
      where: { id: affiliateDiscountId },
    })
    
    if (!affiliateDiscount) {
      throw new Error(`Affiliate discount with id ${affiliateDiscountId} not found`)
    }

    affiliateDiscount.usageCount = (affiliateDiscount.usageCount || 0) + 1
    affiliateDiscount.earnings = (affiliateDiscount.earnings || 0) + affiliateDiscount.commission
    
    return await this.affiliateDiscountRepository_.save(affiliateDiscount)
  }

  async createAffiliateDiscount(data: AffiliateDiscountData) {
    const newAffiliateDiscount = this.affiliateDiscountRepository_.create({
      ...data,
      usageCount: 0,
      earnings: 0,
    })
    
    return await this.affiliateDiscountRepository_.save(newAffiliateDiscount)
  }

  async deleteAffiliateDiscount(affiliateDiscountId: string) {
    return await this.affiliateDiscountRepository_.softDelete(affiliateDiscountId)
  }
}

export default AffiliateDiscountModuleService
export type { AffiliateDiscountModuleService as AffiliateDiscountService }
