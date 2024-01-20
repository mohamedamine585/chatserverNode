import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async() => {
  render(<App />);
  const MessageInput =await screen.findByPlaceholderText("Write your message here");
 
  expect(MessageInput).toBeInTheDocument();
});



