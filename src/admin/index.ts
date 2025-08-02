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

// Import the customer assign discount widget
import CustomerAffiliateDiscount from "./widgets/customer-assign-discount"

// Export all widgets as a default export for Medusa v2 admin UI
export default {
  widgetModule: {
    widgets: {
      // Register the widget for the customer details page
      customer: {
        details: {
          "customer-affiliate-discount": CustomerAffiliateDiscount,
        },
      },
    },
  }
}

