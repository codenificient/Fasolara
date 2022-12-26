describe( 'empty spec', () =>
{
  beforeEach( () =>
  {
    cy.visit( 'http://localhost:3000/' )
    cy.viewport( 1800, 2000 )
  } )

  it( 'Homepage is loading correctly', () =>
  {
    cy.get( "h1" ).contains( 'La Référence Africaine' )
    cy.get( 'button' ).contains( 'Voir' )
    cy.get( 'img' ).invoke( 'attr', 'alt' ).should( 'equal', 'FasoLara Logo' )
  } )

  it( "can read the hero section", () =>
  {
    cy.get( 'button' ).contains( 'Voir Plus' )
  } )
} )