import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<Checkout />', () => {
  it('should show a header', () => {
    render(<App />);
    const { getByText } = screen;
    expect(getByText('Checkout')).toBeInTheDocument();
  });

  it('should update the total of face masks when a face mask is added', () => {
    render(<App />);
    const { getByText, getByTestId } = screen;
    userEvent.click(getByTestId('addBtn0'));
    expect(getByText('Face Masks (1)')).toBeInTheDocument();
  });

  it('should update the total of face masks when a face mask is subtracted', () => {
    render(<App />);
    const { getByText, getByTestId } = screen;
    userEvent.dblClick(getByTestId('addBtn0'));
    expect(getByText('Face Masks (2)')).toBeInTheDocument();
    userEvent.click(getByTestId('minusBtn0'));
    expect(getByText('Face Masks (1)')).toBeInTheDocument();
  });

  it('should update the total of toilet paper when a toilet paper is added', () => {
    render(<App />);
    const { getByText, getByTestId } = screen;
    userEvent.click(getByTestId('addBtn1'));
    expect(getByText('Toilet Paper (1)')).toBeInTheDocument();
  });

  it('should update the total of toilet paper when a toilet paper is subtracted', () => {
    render(<App />);
    const { getByText, getByTestId } = screen;
    userEvent.dblClick(getByTestId('addBtn1'));
    expect(getByText('Toilet Paper (2)')).toBeInTheDocument();
    userEvent.click(getByTestId('minusBtn1'));
    expect(getByText('Toilet Paper (1)')).toBeInTheDocument();
  });

  it('should not allow the user to go below zero and it should disable to minus buttons', () => {
    render(<App />);
    const { getByTestId } = screen;
    expect(getByTestId('minusBtn0')).toBeDisabled();
    expect(getByTestId('minusBtn1')).toBeDisabled();
    userEvent.click(getByTestId('addBtn0'));
    userEvent.click(getByTestId('addBtn1'));
    expect(getByTestId('minusBtn0')).not.toBeDisabled();
    expect(getByTestId('minusBtn1')).not.toBeDisabled();
  });

  it('should increase the total price when a face mask is added', () => {
    render(<App />);
    const { getByText, getByTestId } = screen;
    userEvent.dblClick(getByTestId('addBtn0'));
    expect(getByText('£5.00')).toBeInTheDocument();
    userEvent.click(getByTestId('addBtn0'));
    expect(getByText('£7.50')).toBeInTheDocument();
  });

  it('should increase the total price when a toilet paper is added', () => {
    render(<App />);
    const { getByTestId, getAllByRole } = screen;
    const listItem = getAllByRole('listitem')[3];

    userEvent.dblClick(getByTestId('addBtn1'));
    expect(within(listItem).getByText('£1.30')).toBeInTheDocument();
    userEvent.click(getByTestId('addBtn1'));
    expect(within(listItem).getByText('£1.95')).toBeInTheDocument();
  });

  it('should decrease the total price when a face mask is subtracted', () => {
    render(<App />);
    const { getByTestId, getAllByRole } = screen;
    const listItem = getAllByRole('listitem')[3];

    userEvent.dblClick(getByTestId('addBtn0'));
    userEvent.click(getByTestId('addBtn0'));
    userEvent.click(getByTestId('minusBtn0'));
    expect(within(listItem).getByText('£5.00')).toBeInTheDocument();
  });

  it('should decrease the total price when a toilet paper is subtracted', () => {
    render(<App />);
    const { getAllByRole, getByTestId } = screen;
    const listItem = getAllByRole('listitem')[3];

    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.click(getByTestId('addBtn1'));
    userEvent.click(getByTestId('minusBtn1'));
    expect(within(listItem).getByText('£1.30')).toBeInTheDocument();
  });

  it('should apply a discount on face masks, two for £4', () => {
    render(<App />);
    const { getAllByRole, getByTestId } = screen;
    const listItem = getAllByRole('listitem')[1];

    expect(within(listItem).getByText('£0.00')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn0'));
    expect(within(listItem).getByText('- £1.00')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn0'));
    expect(within(listItem).getByText('- £2.00')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn0'));
    expect(within(listItem).getByText('- £3.00')).toBeInTheDocument();
  });

  it('should take away the face masks discount if items are deleted', () => {
    render(<App />);
    const { getAllByRole, getByTestId } = screen;
    const listItem = getAllByRole('listitem')[1];

    userEvent.dblClick(getByTestId('addBtn0'));
    expect(within(listItem).getByText('- £1.00')).toBeInTheDocument();
    userEvent.click(getByTestId('minusBtn0'));
    expect(within(listItem).queryByText('- £1.00')).not.toBeInTheDocument();
  });

  it('should apply a discount on toilet paper, 6 for 5', () => {
    render(<App />);
    const { getByTestId, getAllByRole } = screen;
    const listItem = getAllByRole('listitem')[2];

    expect(within(listItem).getByText('£0.00')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    expect(within(listItem).getByText('- £0.65')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    expect(within(listItem).getByText('- £1.30')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    expect(within(listItem).getByText('- £1.95')).toBeInTheDocument();
  });

  it('should take away the toilet paper discount if items are deleted', () => {
    render(<App />);
    const { getAllByRole, getByTestId, queryByText } = screen;
    const listItem = getAllByRole('listitem')[2];

    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    expect(within(listItem).getByText('- £1.30')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('minusBtn1'));
    expect(queryByText('- £1.30')).not.toBeInTheDocument();
    expect(within(listItem).getByText('- £0.65')).toBeInTheDocument();
  });

  it('should tally up the total discounts', () => {
    render(<App />);
    const { getAllByRole, getByTestId } = screen;
    const listItem = getAllByRole('listitem')[4];

    expect(within(listItem).getByText('£0.00')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn0'));
    expect(within(listItem).getByText('- £1.65')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn0'));
    expect(within(listItem).getByText('- £2.65')).toBeInTheDocument();
  });

  it('should tally down the total discounts', () => {
    render(<App />);
    const { getAllByRole, getByTestId } = screen;
    const listItem = getAllByRole('listitem')[4];

    expect(within(listItem).getByText('£0.00')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn1'));
    userEvent.dblClick(getByTestId('addBtn0'));
    expect(within(listItem).getByText('- £1.65')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('addBtn0'));
    expect(within(listItem).getByText('- £2.65')).toBeInTheDocument();
    userEvent.dblClick(getByTestId('minusBtn1'));
    userEvent.dblClick(getByTestId('minusBtn1'));
    userEvent.dblClick(getByTestId('minusBtn1'));
    expect(within(listItem).getByText('- £2.00')).toBeInTheDocument();
  });
});
