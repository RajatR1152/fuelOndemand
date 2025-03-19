import React from 'react'

export default function PriceFormatter({price}) {
    return Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(price)
}
