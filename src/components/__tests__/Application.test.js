import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getByPlaceholderText, prettyDOM, getAllByTestId, getByAltText, queryByAltText, getByTestId, queryByText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
  
    fireEvent.click(getByText(/tuesday/i))
    expect(getByText(/Leopold Silvers/i)).toBeInTheDocument()
  
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />)
    //container calling container means that query functions will only search the DOM we are working with
    await waitForElement(() => getByText(container, /Archie Cohen/i));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const days = getAllByTestId(container, "day")
    const day = days.find(element => queryByText(element, "Monday"));
    expect(getByText(day, /No spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    ); 
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, /Cancel this interview/i)).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "Cancelling")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
    const days = getAllByTestId(container, "day")
    const day = days.find(element => queryByText(element, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => { 
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const days = getAllByTestId(container, "day")
    const day = days.find(element => queryByText(element, "Monday"));
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
    console.log(prettyDOM(container));
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />)
    //container calling container means that query functions will only search the DOM we are working with
    await waitForElement(() => getByText(container, /Archie Cohen/i));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByAltText(appointment, "Close"));
    expect(getByText(appointment, "There was an error saving your appointment")).toBeInTheDocument();
    console.log(prettyDOM(appointment));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, /Cancel this interview/i)).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "Cancelling")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Close"));
    expect(getByText(appointment, "There was an error deleting your appointment")).toBeInTheDocument();
    console.log(prettyDOM(appointment));
  });
  
});
