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

import type { 
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/framework/http"
import { AFFILIATE_DISCOUNT_MODULE } from "../../../../../modules/affiliate-discount";
import type { AffiliateDiscountService } from "../../../../../modules/affiliate-discount/service";
  
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const customerId = req.params.id;
  if (customerId) {
    const affiliateDiscountModuleService = req.scope.resolve(
      AFFILIATE_DISCOUNT_MODULE
    ) as AffiliateDiscountService
    try {
      const result = await affiliateDiscountModuleService.getByCustomerId(customerId);
      res.status(200).json({
        affiliateDiscounts: result
      });
    } catch (e) {
      res.status(400).json({
        message: e.message
      })
    }
  } else {
    res.status(400).json({
      message: `CustomerId ${customerId} not passed`
    })
  }
}