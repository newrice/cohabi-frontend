import { II18n } from './resource.type'
import en from './resource_en'

describe('* ja', () => {
  function implementsI18n(arg: II18n): arg is II18n {
    return (
      arg !== null && typeof arg === 'object' && typeof arg.PH_YEN === 'string'
    )
  }
  test('is exported', () => {
    expect(implementsI18n(en)).toBe(true)
  })
})
