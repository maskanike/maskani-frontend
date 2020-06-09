import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Health from '@/components/Health.vue'

describe('Health.vue', () => {
  it('checks on if the health page renders', () => {
    const msg = `${process.env.NODE_ENV} env is healthy`
    const wrapper = shallowMount(Health)
    expect(wrapper.text()).to.include(msg)
  })
})
