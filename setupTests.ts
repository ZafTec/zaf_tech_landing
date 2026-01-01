import { Window } from "happy-dom";
import "@testing-library/jest-dom";

const windowInstance = new Window();

// Basic DOM globals for Testing Library
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = windowInstance as any;
globalThis.window = win;
globalThis.self = win;
globalThis.document = win.document;
globalThis.navigator = win.navigator;
globalThis.HTMLElement = win.HTMLElement;
globalThis.Node = win.Node;
globalThis.Document = win.Document;
globalThis.getComputedStyle = win.getComputedStyle.bind(win);
globalThis.requestAnimationFrame = win.requestAnimationFrame.bind(win);
globalThis.cancelAnimationFrame = win.cancelAnimationFrame.bind(win);
