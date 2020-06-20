import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Chart from '@/components/common/Chart.vue'

describe('Chart.vue', () => {
  it('checks on if the chart page renders', () => {
    const name = `Chart Name`
    const wrapper = shallowMount(Chart, {
      propsData: { currentFlat: { name } }
    })
    expect(wrapper.text()).to.include(name)
  })
})
