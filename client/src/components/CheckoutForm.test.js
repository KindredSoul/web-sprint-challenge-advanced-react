import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
	render(<CheckoutForm />);

	const formHeader = screen.getByText(/checkout form/i);

	expect(formHeader).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
	render(<CheckoutForm />);

	const firstName = screen.getByLabelText(/first name/i);
	const lastName = screen.getByLabelText(/last name/i);
	const address = screen.getByLabelText(/address/i);
	const city = screen.getByLabelText(/city/i);
	const state = screen.getByLabelText(/state/i);
	const zip = screen.getByLabelText(/zip/i);
	const button = screen.getByRole("button", { name: /checkout/i });

	fireEvent.change(firstName, { target: { name: "firstName", value: "Jack" } });
	fireEvent.change(lastName, { target: { name: "lastName", value: "Fruit" } });
	fireEvent.change(address, {
		target: { name: "address", value: "123 papaya lane" },
	});
	fireEvent.change(city, {
		target: { name: "city", value: "Starfruit Valley" },
	});
	fireEvent.change(state, { target: { name: "state", value: "Pepega" } });
	fireEvent.change(zip, { target: { name: "zip", value: "80085" } });
	fireEvent.click(button);
	const successMessage = screen.getByTestId("successMessage");

	const newFirstName = await screen.findByText(/Jack/i);
	console.log(newFirstName);

	expect(successMessage).toHaveTextContent(
		"You have ordered some plants! Woo-hoo!"
	);
});
