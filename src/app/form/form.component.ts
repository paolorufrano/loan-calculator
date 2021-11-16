import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { formatAmount, formatCurrency, sanitizeSelect, interestRatePercentage } from 'src/helpers'
import axios from 'axios'
import { ErrorFieldResponse, SuccessResponse } from 'src/types/responses'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor() {}

  loading = false

  incomeMin = 500
  amountMin = 20000

  loanTerm = {
    min: 36,
    max: 360,
  }

  childrenOptions = ['NONE', 'SINGLE', 'MULTIPLE']
  coapplicantOptions = ['NONE', 'SINGLE_BORROWER', 'MULTIPLE_BORROWERS']

  final: SuccessResponse = {
    loanAmount: 0,
    interestRate: 0,
  }

  globalError = ''
  errors: ErrorFieldResponse[] = []

  loanForm = new FormGroup({
    monthlyIncome: new FormControl(this.incomeMin),
    requestedAmount: new FormControl(this.amountMin),
    loanTerm: new FormControl(this.loanTerm.min),
    children: new FormControl('NONE'),
    coapplicant: new FormControl('NONE'),
  })

  // helpers
  formatCurrency = formatCurrency
  sanitizeSelect = sanitizeSelect
  interestRatePercentage = interestRatePercentage

  clearErrors() {
    this.errors = []
    this.globalError = ''
  }

  resetFinalAmounts() {
    this.final = { loanAmount: 0, interestRate: 0 }
  }

  async onSubmit() {
    this.loading = true
    this.clearErrors()

    const { monthlyIncome, requestedAmount, loanTerm, children, coapplicant } = this.loanForm.value
    const url = environment.production
      ? 'https://homework.fdp.workers.dev/'
      : 'http://localhost:8010/proxy'
    const apiKey = 'swb-222222'

    await axios({
      method: 'post',
      url,
      headers: {
        'X-API-KEY': apiKey,
      },
      data: {
        monthlyIncome: formatAmount(monthlyIncome),
        requestedAmount: formatAmount(requestedAmount),
        loanTerm,
        children,
        coapplicant,
      },
    })
      .then(res => {
        this.loading = false
        if (!res.data) return

        const { loanAmount, interestRate } = res.data

        this.final = {
          loanAmount,
          interestRate,
        }
      })
      .catch(error => {
        this.loading = false
        this.resetFinalAmounts()

        if (!error.response) {
          this.globalError = 'Something went wrong'
          return
        }

        const { fields } = error.response.data
        this.globalError = 'Please see error(s) above'

        if (fields.length) {
          fields.forEach((field: ErrorFieldResponse) => {
            this.errors.push(field)
          })
        }
      })
  }

  onReset() {
    this.clearErrors()
    this.resetFinalAmounts()
  }

  getError(field: string): string {
    const errors = this.errors.filter(error => error.params === field)
    if (!errors.length) return ''
    return errors[0].message
  }

  ngOnInit(): void {}
}
