const formatAmount = (amount: number): number => {
  return amount * 1000
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    amount / 1000
  )
}

const interestRatePercentage = (amount: number): string => {
  return `${(amount / 1000).toFixed(1)} %`
}

const sanitizeSelect = (word: string): string => {
  return word
    .replace('_', ' ')
    .toLowerCase()
    .replace(/\w/, firstLetter => firstLetter.toUpperCase())
}

export { formatAmount, formatCurrency, sanitizeSelect, interestRatePercentage }
