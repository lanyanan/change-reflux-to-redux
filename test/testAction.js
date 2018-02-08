import expect from 'expect'
import * as actions from '../src/reduxApp/js/Actions/HomeAction.js'
describe('测试action', () => {
  it('should create an action to change lightness', () => {
    const lightness = '80'
    const expectedAction = {
      type: actions.CHANGE_LIGHT_LIGHTNESS,
      lightness
    }
    expect(actions.changeLightness(lightness)).toEqual(expectedAction)
  })
})