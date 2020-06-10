import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Chart from '@/components/common/Chart.vue'

describe('Chart.vue', () => {
  it('checks on if the chart page renders', () => {
    const title = `Chart Page`
    const wrapper = shallowMount(Chart, {
      propsData: { title }
    })
    expect(wrapper.text()).to.include(title)
  })
})
