describe('Admin Flats', () => {
  it('Visits the admin flats url and list flats', () => {
    cy.login('admin@admin.com')
    cy.visit('/admin/flats')
    // url should be /admin/flats
    cy.url().should('include', '/admin/flats')
  })
  it('Checks input types for create/edit new flat', () => {
    cy.login('admin@admin.com')
    cy.visit('/admin/flats')

    // Click create new flat
    cy.get('button.btnNewItem').contains('New Item').click()
    cy.get('div.dlgNewEditItem.v-dialog--active').should('be.visible')

    // Checks input type is text
    cy.get('input[name=name]').invoke('attr', 'type').should('contain', 'text')
  })
  it('Create new flat', () => {
    cy.login('admin@admin.com')
    cy.setLocaleToEN()
    cy.visit('/admin/flats')

    // Click create new flat
    cy.get('button.btnNewItem').contains('New Item').click()
    cy.get('div.dlgNewEditItem.v-dialog--active').should('be.visible')

    // Type new flat data and save
    cy.get('input[name=name]').clear().type('A New Flat')
    cy.get('button.btnSave').click()
    cy.get('div.success').should('be.visible').contains('Saved successfully')
  })
  it('Edit flat', () => {
    cy.login('admin@admin.com')
    cy.setLocaleToEN()
    cy.visit('/admin/flats')

    // Search flat
    cy.get('#search').clear().type('A New Flat')
    cy.wait(1000)
    // Click and edit first element
    cy.get('button#edit').eq(0).click()
    cy.get('input[name=name]').clear().type('A New Flat Edited')
    cy.get('button.btnSave').click()
    cy.get('div.success').should('be.visible').contains('Saved successfully')
  })
  it('Search flat', () => {
    cy.login('admin@admin.com')
    cy.setLocaleToEN()
    cy.visit('/admin/flats')

    // Search edited flat
    cy.get('#search').clear().type('A New Flat Edited')
    // Wait for api to reply
    cy.wait(1000)
    // Ensure there´s only one result
    cy.get('table > tbody > tr').should('have.length', 1)
    // Check if result is the same as entered in edit
    cy.get('table > tbody > tr > td').eq(1).contains('A New Flat Edited')
  })
  it('Delete flat', () => {
    cy.login('admin@admin.com')
    cy.setLocaleToEN()
    cy.visit('/admin/flats')

    // Search flat
    cy.get('#search').clear().type('A New Flat Edited')
    // Wait for api to reply
    cy.wait(1000)
    // Ensure there´s only one result
    cy.get('table > tbody > tr').should('have.length', 1)
    // Check if result is the same as entered in edit
    cy.get('table > tbody > tr > td').eq(1).contains('A New Flat Edited')

    // Click and delete first element
    cy.get('button#delete').eq(0).click()
    cy.get('div.v-dialog.v-dialog--active').should('be.visible')
    cy.get('button > span.v-btn__content').contains('Delete').click()
    cy.get('div.success').should('be.visible').contains('Deleted successfully')
  })
})
