import React from "react";
import { render, fireEvent, screen, userEvent,cleanup } from "@testing-library/react";
import PlaintextFilesChallenge from "./index";


afterEach(cleanup);

describe("PlaintextFilesChallenge", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });

  it("Should call localStorage getItem on render", () => {
    render(<PlaintextFilesChallenge/>);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

//   it("Should call localStorage setItem on text change", async() => {
    // To Do
    // const { getByText } = render(<PlaintextFilesChallenge />);
    // const targetFile = await getByText(":README.txt");
    // fireEvent.click(targetFile);
    // const fileTextBox = await screen.findByRole("textarea");
    // await userEvent.type(fileTextBox, "New Content");
    // expect(fileTextBox).toHaveValue("New Content");
    // expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(window.localStorage.setItem).toHaveBeenCalledWith(
    // );
//   });

//   it("Should update timestamp on edit", async() => {
    // To Do
//   });

});