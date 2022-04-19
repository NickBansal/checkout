import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<Checkout />', () => {
  it('should show a header', () => {
    render(<App />);
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('should update the total of face masks when a face mask is added', () => {
    render(<App />);
    userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('(1)')).toBeInTheDocument();
  });

  it('should update the total of face masks when a face mask is subtracted', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[0]);
    expect(screen.getByText('(2)')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByText('(1)')).toBeInTheDocument();
  });

  it('should update the total of toilet paper when a toilet paper is added', () => {
    render(<App />);
    userEvent.click(screen.getAllByRole('button')[2]);
    expect(screen.getByText('(1)')).toBeInTheDocument();
  });

  it('should update the total of face masks when a face mask is subtracted', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    expect(screen.getByText('(2)')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button')[3]);
    expect(screen.getByText('(1)')).toBeInTheDocument();
  });

  it('should not allow the user to go below zero and it should disable to button', () => {
    render(<App />);
    expect(screen.getAllByRole('button')[1]).toBeDisabled();
    expect(screen.getAllByRole('button')[3]).toBeDisabled();
    userEvent.click(screen.getAllByRole('button')[0]);
    userEvent.click(screen.getAllByRole('button')[2]);
    expect(screen.getAllByRole('button')[1]).not.toBeDisabled();
    expect(screen.getAllByRole('button')[3]).not.toBeDisabled();
  });

  it('should increase the total price when a face mask is added', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[0]);
    expect(screen.getByText('£5.00')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('£7.50')).toBeInTheDocument();
  });

  it('should increase the total price when a toilet paper is added', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    expect(screen.getByText('£1.30')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button')[2]);
    expect(screen.getByText('£1.95')).toBeInTheDocument();
  });

  it('should decrease the total price when a face mask is subtracted', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[0]);
    userEvent.click(screen.getAllByRole('button')[0]);
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByText('£5.00')).toBeInTheDocument();
  });

  it('should decrease the total price when a toilet paper is subtracted', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.click(screen.getAllByRole('button')[2]);
    userEvent.click(screen.getAllByRole('button')[3]);
    expect(screen.getByText('£1.30')).toBeInTheDocument();
  });

  it('should apply a discount on face masks, two for £4', () => {
    render(<App />);
    expect(screen.getAllByText('£0')).toHaveLength(4);
    userEvent.dblClick(screen.getAllByRole('button')[0]);
    expect(screen.getByText('- £1.00')).toBeInTheDocument();
    userEvent.dblClick(screen.getAllByRole('button')[0]);
    expect(screen.getByText('- £2.00')).toBeInTheDocument();
    userEvent.dblClick(screen.getAllByRole('button')[0]);
    expect(screen.getByText('- £3.00')).toBeInTheDocument();
  });

  it('should take away the face masks discount if items are deleted', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[0]);
    expect(screen.getByText('- £1.00')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.queryByText('- £1.00')).not.toBeInTheDocument();
  });

  it('should apply a discount on toilet paper, 6 for 5', () => {
    render(<App />);
    expect(screen.getAllByText('£0')).toHaveLength(4);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    expect(screen.getByText('- £0.65')).toBeInTheDocument();
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    expect(screen.getByText('- £1.30')).toBeInTheDocument();
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    expect(screen.getByText('- £1.95')).toBeInTheDocument();
  });

  it('should take away the toilet paper discount if items are deleted', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    expect(screen.getByText('- £1.30')).toBeInTheDocument();
    userEvent.dblClick(screen.getAllByRole('button')[3]);
    expect(screen.queryByText('- £1.30')).not.toBeInTheDocument();
    expect(screen.getByText('- £0.65')).toBeInTheDocument();
  });

  it('should tally up the total discounts', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    userEvent.dblClick(screen.getAllByRole('button')[0]);
    expect(screen.getByText('£1.65')).toBeInTheDocument();
  });
});
