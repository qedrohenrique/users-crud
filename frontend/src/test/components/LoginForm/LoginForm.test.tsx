import { useLogin } from '@/lib/hooks/useAuthenticate';
import { useDictionary } from '@/lib/providers/dictionary-provider';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginForm } from '../../../components/custom/LoginForm/LoginForm';
import React from 'react';

vi.mock('@/lib/providers/dictionary-provider');
vi.mock('@/lib/hooks/useAuthenticate');

const mockDictionary = {
  AuthPage: {
    loginForm: {
      username: 'Username',
      password: 'Password',
      createAccount: 'Create Account',
      login: 'Login'
    }
  }
};

const mockLoginMutation = {
  mutate: vi.fn(),
  isPending: false
};

describe('LoginForm', () => {
  const mockOnBackToRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDictionary as any).mockReturnValue(mockDictionary);
    (useLogin as any).mockReturnValue(mockLoginMutation);
  });

  it('renders login form with all required elements', () => {
    render(<LoginForm onBackToRegister={mockOnBackToRegister} />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('calls onBackToRegister when create account button is clicked', () => {
    render(<LoginForm onBackToRegister={mockOnBackToRegister} />);

    fireEvent.click(screen.getByText('Create Account'));
    expect(mockOnBackToRegister).toHaveBeenCalledTimes(1);
  });

  it('submits form with correct values', async () => {
    render(<LoginForm onBackToRegister={mockOnBackToRegister} />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockLoginMutation.mutate).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpass',
      });
    });
  });

  it('shows loading state when form is submitting', async () => {
    const loadingMutation = {
      ...mockLoginMutation,
      isPending: true
    };
    (useLogin as any).mockReturnValue(loadingMutation);

    render(<LoginForm onBackToRegister={mockOnBackToRegister} />);

    const submitButton = screen.getByTestId('login-button');
    expect(submitButton).toBeDisabled();
  });
}); 