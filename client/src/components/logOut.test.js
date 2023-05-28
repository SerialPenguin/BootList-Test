import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LogOutBtn from "./logOut";

describe("LogOutBtn", () => {
  it("removes JWT token and navigates to home page on logout button click", () => {
    // Set up mock functions and session storage
    const setLoggedIn = jest.fn();
    const setUsername = jest.fn();
    const sessionStorageMock = {
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, "sessionStorage", { value: sessionStorageMock });

    // Render the component
    render(
      <Router>
        <LogOutBtn setLoggedIn={setLoggedIn} setUsername={setUsername} />
      </Router>
    );

    // Simulate a click on the logout button
    fireEvent.click(screen.getByText("Logout"));

    // Check if functions were called and session storage was modified
    expect(setLoggedIn).toHaveBeenCalledWith(false);
    expect(setUsername).toHaveBeenCalledWith("");
    expect(sessionStorageMock.removeItem).toHaveBeenCalledWith("Token");
    expect(window.location.pathname).toEqual("/"); // Check if navigation to home page (/) occurred
  });
});