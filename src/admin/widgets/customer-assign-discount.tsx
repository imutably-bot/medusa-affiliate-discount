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

import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Button, Input, toast } from "@medusajs/ui"
import { useForm } from "react-hook-form"
import React, { useState, useEffect } from "react"

type AffiliateDiscountResult = {
  id: string,
  customerId: string,
  customerEmail: string,
  discountId: string,
  discountCode: string,
  commission: number,
  usageCount: number,
  earnings: number,
  currencyCode: string,
  created_at: string,
  updated_at: string
}

type NewAffiliateDiscountFormType = {
  customerId: string,
  discountId: string,
  commission: number,
  customerEmail: string,
  discountCode: string
}

// Simple affiliate discount list component
const AffiliateDiscountList = ({ customerId }: { customerId: string }) => {
  const [affiliateDiscounts, setAffiliateDiscounts] = useState<AffiliateDiscountResult[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch affiliate discounts for the customer
  const fetchAffiliateDiscounts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/admin/affiliate-discount/customer/${customerId}`)
      if (response.ok) {
        const data = await response.json()
        setAffiliateDiscounts(data.affiliateDiscounts || [])
      } else {
        toast.error("Failed to load affiliate discounts")
      }
    } catch (error) {
      toast.error("Error loading affiliate discounts")
    } finally {
      setLoading(false)
    }
  }

  // Delete affiliate discount
  const deleteAffiliateDiscount = async (affiliateDiscountId: string) => {
    try {
      const response = await fetch(`/admin/affiliate-discount/${affiliateDiscountId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        toast.success("Affiliate discount deleted successfully")
        fetchAffiliateDiscounts() // Refresh the list
      } else {
        toast.error("Failed to delete affiliate discount")
      }
    } catch (error) {
      toast.error("Error deleting affiliate discount")
    }
  }

  useEffect(() => {
    if (customerId) {
      fetchAffiliateDiscounts()
    }
  }, [customerId])

  if (loading) {
    return <div>Loading affiliate discounts...</div>
  }

  return (
    <div className="flex flex-col gap-y-2">
      {affiliateDiscounts.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No affiliate discounts found for this customer.
        </div>
      ) : (
        affiliateDiscounts.map((affiliateDiscount) => (
          <div
            key={affiliateDiscount.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{affiliateDiscount.discountCode}</h4>
                <p className="text-sm text-gray-600">
                  Commission: {affiliateDiscount.commission} {affiliateDiscount.currencyCode}
                </p>
                <p className="text-sm text-gray-600">
                  Usage: {affiliateDiscount.usageCount} | Earnings: {affiliateDiscount.earnings} {affiliateDiscount.currencyCode}
                </p>
              </div>
              <Button
                variant="secondary"
                size="small"
                onClick={() => deleteAffiliateDiscount(affiliateDiscount.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// Simple form component for creating new affiliate discounts
const NewAffiliateDiscountForm = ({ customerId, onSuccess }: { customerId: string, onSuccess: () => void }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewAffiliateDiscountFormType>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: NewAffiliateDiscountFormType) => {
    setLoading(true)
    try {
      const response = await fetch('/admin/affiliate-discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId,
          discountId: data.discountId,
          commission: data.commission,
          customerEmail: data.customerEmail,
          discountCode: data.discountCode
        })
      })
      
      if (response.ok) {
        toast.success("Affiliate discount created successfully")
        reset()
        onSuccess()
      } else {
        toast.error("Failed to create affiliate discount")
      }
    } catch (error) {
      toast.error("Error creating affiliate discount")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Customer Email</label>
        <Input
          {...register('customerEmail', { required: 'Customer email is required' })}
          placeholder="customer@example.com"
        />
        {errors.customerEmail && (
          <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Discount Code</label>
        <Input
          {...register('discountCode', { required: 'Discount code is required' })}
          placeholder="DISCOUNT10"
        />
        {errors.discountCode && (
          <p className="text-red-500 text-sm mt-1">{errors.discountCode.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Discount ID</label>
        <Input
          {...register('discountId', { required: 'Discount ID is required' })}
          placeholder="disc_123"
        />
        {errors.discountId && (
          <p className="text-red-500 text-sm mt-1">{errors.discountId.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Commission</label>
        <Input
          type="number"
          step="0.01"
          {...register('commission', { 
            required: 'Commission is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Commission must be positive' }
          })}
          placeholder="10.00"
        />
        {errors.commission && (
          <p className="text-red-500 text-sm mt-1">{errors.commission.message}</p>
        )}
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Affiliate Discount'}
      </Button>
    </form>
  )
}

// Main widget component
const CustomerAffiliateDiscountWidget = ({ customerId }: { customerId: string }) => {
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleFormSuccess = () => {
    setShowForm(false)
    setRefreshKey(prev => prev + 1) // Trigger refresh
  }

  return (
    <Container className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Affiliate Discounts</h2>
        <Button
          variant="secondary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New'}
        </Button>
      </div>
      
      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-md font-medium mb-4">Create New Affiliate Discount</h3>
          <NewAffiliateDiscountForm
            customerId={customerId}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}
      
      <div key={refreshKey}>
        <AffiliateDiscountList customerId={customerId} />
      </div>
    </Container>
  )
}

// Main export - simplified widget for Medusa v2
const CustomerAffiliateDiscount = ({ customer }: { customer: { id: string } }) => {
  return (
    <div>
      <CustomerAffiliateDiscountWidget customerId={customer.id} />
    </div>
  )
}

export default CustomerAffiliateDiscount

export const config = defineWidgetConfig({
  zone: "customer.details.before",
})
