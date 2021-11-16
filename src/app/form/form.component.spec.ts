import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormComponent } from './form.component'

describe('FormComponent', () => {
  let component: FormComponent
  let fixture: ComponentFixture<FormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('render all the required fields', () => {
    const fixture = TestBed.createComponent(FormComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    const fields = ['requestedAmount', 'monthlyIncome', 'loanTerm', 'children', 'coapplicant']

    fields.forEach(field => {
      expect(compiled.querySelector(`#${field}`)).toBeTruthy()
    })
  })

  it('render the action buttons', () => {
    const fixture = TestBed.createComponent(FormComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    const fields = ['primary, secondary']

    fields.forEach(field => {
      expect(compiled.querySelector(`.submit .${field}`)).toBeTruthy()
    })
  })
})
