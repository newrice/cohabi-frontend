import { II18n } from './resource.type'
import ja from './resource_ja'

describe('* ja', () => {
  function implementsI18n(arg: II18n): arg is II18n {
    return (
      arg !== null && typeof arg === 'object' && typeof arg.PH_YEN === 'string'
    )
  }
  test('is exported', () => {
    expect(implementsI18n(ja)).toBe(true)
  })
})
