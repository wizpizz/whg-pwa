import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  // useTheme,
  FormHelperText,
} from '@mui/material';
import { Lock, Visibility, VisibilityOff, Person } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [usernameBlurred, setUsernameBlurred] = useState(false);
  const [usernameValidated, setUsernameValidated] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [confirmPasswordBlurred, setConfirmPasswordBlurred] = useState(false);
  // const theme = useTheme();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (passwordBlurred && passwordError) {
      validatePassword(newPassword);
    }
    if (confirmPasswordBlurred) {
      validateConfirmPassword(confirmPassword, newPassword);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    if (usernameBlurred || usernameValidated) {
      validateUsername(newUsername);
    }
  };

  const validatePassword = (pass: string) => {
    if (pass.length === 0) {
      setPasswordError(false);
    } else {
      const isValid = pass.length >= 8 && /\d/.test(pass);
      setPasswordError(!isValid);
    }
  };

  const validateUsername = (user: string) => {
    const isValid = user.length >= 4;
    setUsernameError(!isValid);
    setUsernameValidated(true);
  };

  const validateConfirmPassword = (confirm: string, pass: string = password) => {
    if (confirm.length === 0) {
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(confirm !== pass);
    }
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    if (confirmPasswordBlurred) {
      validateConfirmPassword(newConfirmPassword, password);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !isLogin &&
      (passwordError ||
        usernameError ||
        confirmPasswordError ||
        username.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0)
    ) {
      return;
    }
    // Handle form submission
  };

  const handleToggleLoginRegister = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setPasswordError(false);
    setConfirmPasswordError(false);
    setUsernameError(false);
    setUsernameBlurred(false);
    setUsernameValidated(false);
    // ... reset other fields ...
  };

  const isFormValid = () => {
    if (isLogin) {
      return username.length > 0 && password.length > 0;
    } else {
      return (
        usernameValidated &&
        !usernameError &&
        !passwordError &&
        !confirmPasswordError &&
        username.length > 0 &&
        password.length > 0 &&
        confirmPassword.length > 0
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Sign In' : 'Register'}
        </Typography>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
            onBlur={() => {
              if (!isLogin) {
                validateUsername(username);
                setUsernameBlurred(true);
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            error={!isLogin && usernameError && username.length > 0}
          />
          {!isLogin && usernameError && username.length > 0 && (
            <FormHelperText error>Username must be at least 4 characters long.</FormHelperText>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => {
              if (!isLogin) {
                validatePassword(password);
                setPasswordBlurred(true);
                validateConfirmPassword(confirmPassword, password);
              }
            }}
            error={!isLogin && passwordError && password.length > 0}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!isLogin && passwordError && password.length > 0 && (
            <FormHelperText error>
              Password must be at least 8 characters long and contain at least one number.
            </FormHelperText>
          )}
          {!isLogin && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => {
                validateConfirmPassword(confirmPassword);
                setConfirmPasswordBlurred(true);
              }}
              error={confirmPasswordError && confirmPassword.length > 0}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          )}
          {!isLogin && confirmPasswordError && confirmPassword.length > 0 && (
            <FormHelperText error>Passwords do not match.</FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isFormValid()}
          >
            {isLogin ? 'SIGN IN' : 'REGISTER'}
          </Button>
        </StyledForm>
        <Button onClick={handleToggleLoginRegister} color="primary">
          {isLogin ? 'NEED AN ACCOUNT? REGISTER' : 'ALREADY HAVE AN ACCOUNT? SIGN IN'}
        </Button>
      </StyledPaper>
    </Container>
  );
}

export default AuthScreen;
