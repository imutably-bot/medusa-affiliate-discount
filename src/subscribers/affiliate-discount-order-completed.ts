/*
 * Copyright (c) 2024 RSC-Labs, https://rsoftcon.com/. All rights reserved.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { AFFILIATE_DISCOUNT_MODULE } from "../modules/affiliate-discount"
import type { AffiliateDiscountService } from "../modules/affiliate-discount/service"

export default async function affiliateDiscountOrderHandler({ 
    event, container 
  }: SubscriberArgs<{ id: string }>) {
    const affiliateDiscountModuleService = container.resolve(
      AFFILIATE_DISCOUNT_MODULE
    ) as AffiliateDiscountService
    
    // TODO: Implement order processing logic for v2
    // This needs to be updated to work with Medusa v2 order events and data structure
    console.log('Order completed event received:', event.data.id)
    
    // Implementation needed for v2 order processing
  }
  
export const config: SubscriberConfig = {
    event: [
      "order.payment_captured",
      "order.completed"
    ],
    context: {
      subscriberId: "affiliate-discount-order-handler",
    },
  }