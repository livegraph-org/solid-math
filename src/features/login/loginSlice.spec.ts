/** @TODO this doesn't work, we just took it from
 * npx create-react-app --template redux-typescript
 * so we need to fix it to work with loginSlice
 */
test.skip('loginSlice', () => {})
/*
import counterReducer, {
  CounterState,
  increment,
  decrement,
  incrementByAmount,
} from './loginSlice'

describe('counter reducer', () => {
  const initialState: CounterState = {
    value: 3,
    status: 'idle',
  }
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    })
  })

  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment())
    expect(actual.value).toEqual(4)
  })

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement())
    expect(actual.value).toEqual(2)
  })

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(2))
    expect(actual.value).toEqual(5)
  })
})
*/
