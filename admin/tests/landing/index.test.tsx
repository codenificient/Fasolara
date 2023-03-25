import LandingPage from "@h/page"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

test( "should render the Landing page with Login Form", () =>
{
  render( <LandingPage /> )
  // Events and assertions...
  const mainLabel = screen.getByLabelText( "Email Address" )
  const passLabel = screen.getByLabelText( "Email Address" )

  expect( mainLabel ).toBeInTheDocument()
  expect( passLabel ).toBeInTheDocument()
  // expect(screen.getByTestId("add")).toBeInTheDocument();
  // expect(screen.getByTestId("subtract")).toBeInTheDocument();
  // expect(screen.getByTestId("multiply")).toBeInTheDocument();
  // expect(screen.getByTestId("divide")).toBeInTheDocument();
} )
