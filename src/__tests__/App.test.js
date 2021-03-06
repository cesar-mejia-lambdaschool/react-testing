import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import App from '../App'

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })
  it('should match snapshot', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should have total, next, and operation on state', () => {
    const component = shallow(<App />)
    expect(component.state().total).toBeDefined()
    expect(component.state().next).toBeDefined()
    expect(component.state().operation).toBeDefined()
  })

  it('should render a div class with component-app', () => {
    const component = shallow(<App />)
    expect(component.find('.component-app')).toHaveLength(1)
  })

  it('should render component Display', () => {
    const component = shallow(<App />)
    expect(component.find('Display')).toHaveLength(1)
  })

  it('should render component Panel', () => {
    const component = shallow(<App />)
    expect(component.find('Panel')).toHaveLength(1)
  })
  it('should have a "handleClick" method that updates state', () => {
    const component = shallow(<App />)
    component.instance().handleClick('5')
    expect(component.state('next')).toEqual('5')
    expect(component.state('total')).toBeNull()
    expect(component.state('operation')).toBeNull()
  })
  it('should have handle several clicks properly', () => {
    const component = shallow(<App />)
    component.instance().handleClick('5')
    component.instance().handleClick('-')
    component.instance().handleClick('3')
    expect(component.state('next')).toEqual('3')
    expect(component.state('operation')).toEqual('-')
    expect(component.state('total')).toEqual('5')
  })
})
